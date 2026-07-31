/**
 * CarboniX Platform Token Service
 *
 * Handles AES-256-GCM encryption of platform API tokens at rest.
 * Also performs lightweight "verify" calls against each platform API
 * to confirm a token is valid before storing it.
 *
 * Key is read from TOKEN_ENCRYPTION_KEY env (32-byte hex string).
 * If the key is missing the service throws immediately — fail-safe.
 */

import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_BYTES = 16;
const AUTH_TAG_BYTES = 16;

function getEncryptionKey(): Buffer {
  const hex = process.env.TOKEN_ENCRYPTION_KEY;
  if (!hex || hex.length !== 64) {
    throw new Error(
      '[PlatformTokenService] TOKEN_ENCRYPTION_KEY env var is missing or not a 64-char hex string. ' +
      'Set it to the 32-byte hex value printed during setup and never commit it to the repo.'
    );
  }
  return Buffer.from(hex, 'hex');
}

// ─── Encrypt / Decrypt ────────────────────────────────────────────────────────

/**
 * Encrypts a plaintext token.
 * Returns "<iv_hex>:<authTag_hex>:<ciphertext_hex>"
 */
export function encryptToken(plaintext: string): string {
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(IV_BYTES);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return [iv.toString('hex'), authTag.toString('hex'), encrypted.toString('hex')].join(':');
}

/**
 * Decrypts a ciphertext produced by encryptToken.
 */
export function decryptToken(ciphertext: string): string {
  const [ivHex, authTagHex, encryptedHex] = ciphertext.split(':');
  if (!ivHex || !authTagHex || !encryptedHex) {
    throw new Error('[PlatformTokenService] Invalid ciphertext format.');
  }

  const key = getEncryptionKey();
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  const encrypted = Buffer.from(encryptedHex, 'hex');

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8');
}

// ─── Platform Verification ────────────────────────────────────────────────────

export interface VerifyResult {
  valid: boolean;
  /** Human-readable error for display in the UI/API response */
  error?: string;
  /** Platform-specific metadata (e.g. project name, account name) */
  meta?: Record<string, string>;
}

/** Shared helper: one fetch with a 10-second abort timeout */
async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs = 10_000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function verifyVercel(token: string, projectSlug?: string): Promise<VerifyResult> {
  try {
    // Verify token via /v2/user
    const userRes = await fetchWithTimeout('https://api.vercel.com/v2/user', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (userRes.status === 401 || userRes.status === 403) {
      return { valid: false, error: 'Vercel token is invalid or has been revoked. Generate a new token in Vercel → Account Settings → Tokens.' };
    }
    if (!userRes.ok) {
      return { valid: false, error: `Vercel API returned HTTP ${userRes.status}. Try again or check Vercel status.` };
    }

    const user = await userRes.json() as { user?: { name?: string; username?: string } };

    // If a projectSlug is supplied, confirm the token can read that project
    if (projectSlug) {
      const projRes = await fetchWithTimeout(
        `https://api.vercel.com/v9/projects/${encodeURIComponent(projectSlug)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (projRes.status === 404) {
        return { valid: false, error: `Vercel project "${projectSlug}" not found. Check the project slug and try again.` };
      }
      if (projRes.status === 403) {
        return { valid: false, error: `Token does not have access to Vercel project "${projectSlug}".` };
      }
      if (!projRes.ok) {
        return { valid: false, error: `Could not read Vercel project "${projectSlug}": HTTP ${projRes.status}.` };
      }
    }

    return {
      valid: true,
      meta: { accountName: user.user?.name || user.user?.username || 'unknown' },
    };
  } catch (err: any) {
    if (err.name === 'AbortError') return { valid: false, error: 'Vercel API timed out. Check your network and try again.' };
    return { valid: false, error: `Unexpected error verifying Vercel token: ${err.message}` };
  }
}

async function verifyNetlify(token: string, projectSlug?: string): Promise<VerifyResult> {
  try {
    const res = await fetchWithTimeout('https://api.netlify.com/api/v1/user', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401 || res.status === 403) {
      return { valid: false, error: 'Netlify token is invalid or has been revoked. Generate a new Personal Access Token in Netlify → User Settings → Applications.' };
    }
    if (!res.ok) {
      return { valid: false, error: `Netlify API returned HTTP ${res.status}.` };
    }

    const user = await res.json() as { full_name?: string; email?: string };

    if (projectSlug) {
      const siteRes = await fetchWithTimeout(
        `https://api.netlify.com/api/v1/sites/${encodeURIComponent(projectSlug)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!siteRes.ok) {
        return { valid: false, error: `Cannot access Netlify site "${projectSlug}": HTTP ${siteRes.status}.` };
      }
    }

    return { valid: true, meta: { accountName: user.full_name || user.email || 'unknown' } };
  } catch (err: any) {
    if (err.name === 'AbortError') return { valid: false, error: 'Netlify API timed out.' };
    return { valid: false, error: `Unexpected error verifying Netlify token: ${err.message}` };
  }
}

async function verifyRailway(token: string, projectSlug?: string): Promise<VerifyResult> {
  try {
    const query = JSON.stringify({
      query: projectSlug
        ? `query { project(id: "${projectSlug}") { id name } }`
        : `query { me { id email name } }`,
    });

    const res = await fetchWithTimeout('https://backboard.railway.com/graphql/v2', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: query,
    });

    if (res.status === 401 || res.status === 403) {
      return { valid: false, error: 'Railway token is invalid. Generate a new API token in Railway → Account Settings → Tokens.' };
    }
    if (!res.ok) {
      return { valid: false, error: `Railway API returned HTTP ${res.status}.` };
    }

    const json = await res.json() as { data?: { me?: { name?: string; email?: string }; project?: { id: string } }; errors?: any[] };
    if (json.errors?.length) {
      const msg = json.errors[0]?.message || 'Unknown GraphQL error';
      if (msg.toLowerCase().includes('not found') || msg.toLowerCase().includes('unauthorized')) {
        return { valid: false, error: `Railway: ${msg}` };
      }
      return { valid: false, error: `Railway API error: ${msg}` };
    }

    return {
      valid: true,
      meta: { accountName: json.data?.me?.name || json.data?.me?.email || 'unknown' },
    };
  } catch (err: any) {
    if (err.name === 'AbortError') return { valid: false, error: 'Railway API timed out.' };
    return { valid: false, error: `Unexpected error verifying Railway token: ${err.message}` };
  }
}

async function verifyRender(token: string, projectSlug?: string): Promise<VerifyResult> {
  try {
    const res = await fetchWithTimeout('https://api.render.com/v1/owners?limit=1', {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    });

    if (res.status === 401 || res.status === 403) {
      return { valid: false, error: 'Render token is invalid. Generate a new API Key in Render → Account Settings → API Keys.' };
    }
    if (!res.ok) {
      return { valid: false, error: `Render API returned HTTP ${res.status}.` };
    }

    const owners = await res.json() as Array<{ owner?: { name?: string } }>;
    const ownerName = owners[0]?.owner?.name;

    if (projectSlug) {
      const svcRes = await fetchWithTimeout(
        `https://api.render.com/v1/services/${encodeURIComponent(projectSlug)}`,
        { headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' } }
      );
      if (!svcRes.ok) {
        return { valid: false, error: `Cannot access Render service "${projectSlug}": HTTP ${svcRes.status}.` };
      }
    }

    return { valid: true, meta: { accountName: ownerName || 'unknown' } };
  } catch (err: any) {
    if (err.name === 'AbortError') return { valid: false, error: 'Render API timed out.' };
    return { valid: false, error: `Unexpected error verifying Render token: ${err.message}` };
  }
}

// ─── Public dispatch ──────────────────────────────────────────────────────────

export async function verifyPlatformToken(
  platform: 'VERCEL' | 'NETLIFY' | 'RAILWAY' | 'RENDER',
  token: string,
  projectSlug?: string
): Promise<VerifyResult> {
  switch (platform) {
    case 'VERCEL':   return verifyVercel(token, projectSlug);
    case 'NETLIFY':  return verifyNetlify(token, projectSlug);
    case 'RAILWAY':  return verifyRailway(token, projectSlug);
    case 'RENDER':   return verifyRender(token, projectSlug);
    default:
      return { valid: false, error: `Unsupported platform: ${platform}` };
  }
}
