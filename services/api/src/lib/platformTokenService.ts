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
