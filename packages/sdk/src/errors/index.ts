/**
 * CarboniX SDK — Custom Error Classes
 *
 * Three distinct error types so callers can handle them precisely:
 *
 *  CarbonixApiError     — The API responded with an error (4xx / 5xx)
 *  CarbonixNetworkError — Could not reach the API at all (DNS, firewall, etc.)
 *  CarbonixTimeoutError — Request exceeded the configured timeout
 */

export class CarbonixApiError extends Error {
  readonly statusCode: number;
  readonly name = 'CarbonixApiError';

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, CarbonixApiError.prototype);
  }
}

export class CarbonixNetworkError extends Error {
  readonly name = 'CarbonixNetworkError';

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CarbonixNetworkError.prototype);
  }
}

export class CarbonixTimeoutError extends Error {
  readonly name = 'CarbonixTimeoutError';

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CarbonixTimeoutError.prototype);
  }
}
