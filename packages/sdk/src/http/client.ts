/**
 * CarboniX SDK — HTTP Client
 *
 * A thin, dependency-free fetch wrapper that handles:
 *  - API key injection via the Authorization header
 *  - JSON serialization / deserialization
 *  - Timeout enforcement
 *  - Typed error responses
 */

import { CarbonixConfig, ApiResponse } from '../types/index.js';
import { CarbonixApiError, CarbonixNetworkError, CarbonixTimeoutError } from '../errors/index.js';

export class HttpClient {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly timeoutMs: number;
  private readonly sdkVersion: string;

  constructor(config: CarbonixConfig) {
    this.baseUrl = (config.baseUrl ?? 'http://localhost:4000').replace(/\/$/, '');
    this.apiKey = config.apiKey;
    this.timeoutMs = config.timeoutMs ?? 10_000;
    this.sdkVersion = config.sdkVersion ?? '1.0.0';
  }

  // ─── Core Request ─────────────────────────────────────────────────────────

  async request<T>(
    method: 'GET' | 'POST' | 'DELETE',
    path: string,
    body?: unknown
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(url, {
        method,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'x-sdk-version': this.sdkVersion,
          'x-client': 'carbonix-sdk',
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
      });

      const json: ApiResponse<T> = await response.json();

      if (!response.ok || !json.success) {
        throw new CarbonixApiError(
          json.error ?? `HTTP ${response.status}: ${response.statusText}`,
          response.status
        );
      }

      return json.data as T;
    } catch (err: unknown) {
      if (err instanceof CarbonixApiError) throw err;

      const isAbort =
        err instanceof Error &&
        (err.name === 'AbortError' || err.message.includes('abort'));

      if (isAbort) {
        throw new CarbonixTimeoutError(
          `Request to ${url} timed out after ${this.timeoutMs}ms`
        );
      }

      throw new CarbonixNetworkError(
        `Network error reaching CarboniX API: ${(err as Error).message}`
      );
    } finally {
      clearTimeout(timer);
    }
  }

  // ─── Convenience Wrappers ─────────────────────────────────────────────────

  get<T>(path: string) {
    return this.request<T>('GET', path);
  }

  post<T>(path: string, body: unknown) {
    return this.request<T>('POST', path, body);
  }
}
