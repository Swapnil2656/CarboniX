import { PlatformAuthError, PlatformTransientError, PlatformQuotaError } from './errors';

export async function fetchT(url: string, init: RequestInit, platform: string, timeoutMs = 10_000): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  let res: Response;
  try {
    res = await fetch(url, { ...init, signal: ctrl.signal });
  } catch (err: any) {
    clearTimeout(timer);
    if (err.name === 'AbortError') throw new PlatformTransientError(platform, 'Request timed out after 10 s');
    throw new PlatformTransientError(platform, err.message);
  }
  clearTimeout(timer);

  if (res.status === 401 || res.status === 403) {
    throw new PlatformAuthError(platform, `HTTP ${res.status} from ${url}`);
  }
  if (res.status === 402 || res.status === 429) {
    throw new PlatformQuotaError(platform, `HTTP ${res.status} from ${url}`);
  }
  if (res.status >= 500) {
    throw new PlatformTransientError(platform, `HTTP ${res.status} from ${url}`);
  }
  return res;
}
