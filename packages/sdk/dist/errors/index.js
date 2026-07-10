"use strict";
/**
 * CarboniX SDK — Custom Error Classes
 *
 * Three distinct error types so callers can handle them precisely:
 *
 *  CarbonixApiError     — The API responded with an error (4xx / 5xx)
 *  CarbonixNetworkError — Could not reach the API at all (DNS, firewall, etc.)
 *  CarbonixTimeoutError — Request exceeded the configured timeout
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarbonixTimeoutError = exports.CarbonixNetworkError = exports.CarbonixApiError = void 0;
class CarbonixApiError extends Error {
    statusCode;
    name = 'CarbonixApiError';
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, CarbonixApiError.prototype);
    }
}
exports.CarbonixApiError = CarbonixApiError;
class CarbonixNetworkError extends Error {
    name = 'CarbonixNetworkError';
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, CarbonixNetworkError.prototype);
    }
}
exports.CarbonixNetworkError = CarbonixNetworkError;
class CarbonixTimeoutError extends Error {
    name = 'CarbonixTimeoutError';
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, CarbonixTimeoutError.prototype);
    }
}
exports.CarbonixTimeoutError = CarbonixTimeoutError;
//# sourceMappingURL=index.js.map