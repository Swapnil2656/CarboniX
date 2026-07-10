"use strict";
/**
 * CarboniX SDK — HTTP Client
 *
 * A thin, dependency-free fetch wrapper that handles:
 *  - API key injection via the Authorization header
 *  - JSON serialization / deserialization
 *  - Timeout enforcement
 *  - Typed error responses
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
const index_js_1 = require("../errors/index.js");
class HttpClient {
    baseUrl;
    apiKey;
    timeoutMs;
    sdkVersion;
    constructor(config) {
        this.baseUrl = (config.baseUrl ?? 'http://localhost:4000').replace(/\/$/, '');
        this.apiKey = config.apiKey;
        this.timeoutMs = config.timeoutMs ?? 10_000;
        this.sdkVersion = config.sdkVersion ?? '1.0.0';
    }
    // ─── Core Request ─────────────────────────────────────────────────────────
    async request(method, path, body) {
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
            const json = await response.json();
            if (!response.ok || !json.success) {
                throw new index_js_1.CarbonixApiError(json.error ?? `HTTP ${response.status}: ${response.statusText}`, response.status);
            }
            return json.data;
        }
        catch (err) {
            if (err instanceof index_js_1.CarbonixApiError)
                throw err;
            const isAbort = err instanceof Error &&
                (err.name === 'AbortError' || err.message.includes('abort'));
            if (isAbort) {
                throw new index_js_1.CarbonixTimeoutError(`Request to ${url} timed out after ${this.timeoutMs}ms`);
            }
            throw new index_js_1.CarbonixNetworkError(`Network error reaching CarboniX API: ${err.message}`);
        }
        finally {
            clearTimeout(timer);
        }
    }
    // ─── Convenience Wrappers ─────────────────────────────────────────────────
    get(path) {
        return this.request('GET', path);
    }
    post(path, body) {
        return this.request('POST', path, body);
    }
}
exports.HttpClient = HttpClient;
//# sourceMappingURL=client.js.map