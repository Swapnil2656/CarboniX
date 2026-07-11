/**
 * CarboniX SDK — HTTP Client
 *
 * A thin, dependency-free fetch wrapper that handles:
 *  - API key injection via the Authorization header
 *  - JSON serialization / deserialization
 *  - Timeout enforcement
 *  - Typed error responses
 */
import { CarbonixConfig } from '../types/index.js';
export declare class HttpClient {
    private readonly baseUrl;
    private readonly apiKey;
    private readonly timeoutMs;
    private readonly sdkVersion;
    constructor(config: CarbonixConfig);
    request<T>(method: 'GET' | 'POST' | 'DELETE', path: string, body?: unknown): Promise<T>;
    get<T>(path: string): Promise<T>;
    post<T>(path: string, body: unknown): Promise<T>;
}
//# sourceMappingURL=client.d.ts.map