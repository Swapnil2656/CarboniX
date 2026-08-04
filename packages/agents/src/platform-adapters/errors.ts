/** Thrown on 401/403 — token is invalid, should mark INVALID and alert user */
export class PlatformAuthError extends Error {
  constructor(platform: string, detail: string) {
    super(`[PlatformCollector] Auth error on ${platform}: ${detail}`);
    this.name = 'PlatformAuthError';
  }
}

/** Thrown on transient failures (timeout, 5xx) — caller should retry */
export class PlatformTransientError extends Error {
  constructor(platform: string, detail: string) {
    super(`[PlatformCollector] Transient error on ${platform}: ${detail}`);
    this.name = 'PlatformTransientError';
  }
}
