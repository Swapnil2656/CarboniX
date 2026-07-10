var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Carbonix: () => Carbonix,
  CarbonixApiError: () => CarbonixApiError,
  CarbonixNetworkError: () => CarbonixNetworkError,
  CarbonixTimeoutError: () => CarbonixTimeoutError,
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);

// src/errors/index.ts
var CarbonixApiError = class _CarbonixApiError extends Error {
  statusCode;
  name = "CarbonixApiError";
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, _CarbonixApiError.prototype);
  }
};
var CarbonixNetworkError = class _CarbonixNetworkError extends Error {
  name = "CarbonixNetworkError";
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, _CarbonixNetworkError.prototype);
  }
};
var CarbonixTimeoutError = class _CarbonixTimeoutError extends Error {
  name = "CarbonixTimeoutError";
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, _CarbonixTimeoutError.prototype);
  }
};

// src/http/client.ts
var HttpClient = class {
  baseUrl;
  apiKey;
  timeoutMs;
  sdkVersion;
  constructor(config) {
    this.baseUrl = (config.baseUrl ?? "http://localhost:4000").replace(/\/$/, "");
    this.apiKey = config.apiKey;
    this.timeoutMs = config.timeoutMs ?? 1e4;
    this.sdkVersion = config.sdkVersion ?? "1.0.0";
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
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`,
          "x-sdk-version": this.sdkVersion,
          "x-client": "carbonix-sdk"
        },
        body: body !== void 0 ? JSON.stringify(body) : void 0
      });
      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new CarbonixApiError(
          json.error ?? `HTTP ${response.status}: ${response.statusText}`,
          response.status
        );
      }
      return json.data;
    } catch (err) {
      if (err instanceof CarbonixApiError) throw err;
      const isAbort = err instanceof Error && (err.name === "AbortError" || err.message.includes("abort"));
      if (isAbort) {
        throw new CarbonixTimeoutError(
          `Request to ${url} timed out after ${this.timeoutMs}ms`
        );
      }
      throw new CarbonixNetworkError(
        `Network error reaching CarboniX API: ${err.message}`
      );
    } finally {
      clearTimeout(timer);
    }
  }
  // ─── Convenience Wrappers ─────────────────────────────────────────────────
  get(path) {
    return this.request("GET", path);
  }
  post(path, body) {
    return this.request("POST", path, body);
  }
};

// src/methods/calculate.ts
async function calculate(client, input) {
  return client.post("/api/v1/carbon/calculate", input);
}

// src/methods/ingest.ts
async function ingest(client, input) {
  return client.post("/api/v1/carbon/telemetry/ingest", input);
}

// src/methods/compare.ts
async function compare(client, input) {
  return client.post("/api/v1/carbon/compare", input);
}

// src/methods/recommend.ts
async function recommend(client, input) {
  return client.post("/api/v1/carbon/recommend", input);
}

// src/index.ts
var Carbonix = class {
  client;
  /**
   * Create a new CarboniX SDK instance.
   *
   * @param config.apiKey   - Your CarboniX API key (required)
   * @param config.baseUrl  - Override the API URL (default: http://localhost:4000)
   * @param config.timeoutMs - Request timeout in ms (default: 10_000)
   */
  constructor(config) {
    if (!config.apiKey) {
      throw new Error("[CarboniX SDK] apiKey is required. Get yours at app.carbonix.dev");
    }
    this.client = new HttpClient(config);
  }
  // ─── Carbon Calculation ───────────────────────────────────────────────────
  /**
   * Calculate the monthly carbon footprint of a cloud workload.
   *
   * Returns a full breakdown: CPU / Memory / Storage energy (kWh),
   * total CO₂ in grams and kg, a carbon rating (LOW → CRITICAL),
   * a real-world equivalent (e.g. "equivalent to 12 car trips"),
   * and a greener-region recommendation if one exists.
   */
  calculate(input) {
    return calculate(this.client, input);
  }
  // ─── Region Comparison ────────────────────────────────────────────────────
  /**
   * Compare the carbon footprint of your workload across multiple
   * cloud providers and regions simultaneously.
   *
   * Returns your current setup as `base` and a ranked list of
   * greener `options` across AWS eu-west-1, GCP eu-north-1, and Azure northeurope.
   */
  compare(input) {
    return compare(this.client, input);
  }
  // ─── Green Region Recommendation ─────────────────────────────────────────
  /**
   * Get the single best alternative region for your workload.
   *
   * Only returns a recommendation if switching would save >10% of emissions —
   * otherwise returns a message confirming you are already optimally placed.
   */
  recommend(input) {
    return recommend(this.client, input);
  }
  // ─── Live Telemetry Ingestion ─────────────────────────────────────────────
  /**
   * Push live server telemetry into CarboniX for AI analysis.
   *
   * Call this periodically (e.g. every 5 minutes) from a background job
   * on each server. The Analyst Agent will automatically detect idle
   * instances (CPU < 5%) and oversized instances (CPU < 20%) and
   * surface actionable recommendations on your Dashboard.
   */
  ingest(input) {
    return ingest(this.client, input);
  }
};
var index_default = Carbonix;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Carbonix,
  CarbonixApiError,
  CarbonixNetworkError,
  CarbonixTimeoutError
});
