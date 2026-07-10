# `carbonix` — Node.js SDK

The official Node.js SDK for [CarboniX](https://github.com/Swapnil2656/CarboniX).  
Track your cloud carbon footprint, get AI-powered green-region recommendations, and push live server telemetry — all in one package.

---

## Installation

```bash
npm install carbonix
```

---

## Quick Start

```ts
import Carbonix from 'carbonix';

const cx = new Carbonix({
  apiKey: 'cx_your_api_key_here',   // Generate from your CarboniX Dashboard
  baseUrl: 'http://localhost:4000', // Omit in production (defaults to hosted API)
});
```

---

## Methods

### `cx.calculate(input)` — Carbon Footprint

Calculates the monthly CO₂ footprint of a cloud workload.

```ts
const result = await cx.calculate({
  provider: 'aws',
  region: 'ap-south-1',         // Mumbai (dirty grid)
  instanceType: 'm5.xlarge',
  instanceCount: 3,
  hoursPerMonth: 730,
  cpuUtilization: 0.45,         // 45% average CPU
  storageGb: 200,
});

console.log(result.co2KgMonth);           // → 145.3 (kg CO₂/month)
console.log(result.rating.rating);        // → 'HIGH'
console.log(result.recommendation);       // → { recommendedRegion: 'eu-north-1', reductionPercent: 85 }
```

---

### `cx.ingest(input)` — Live Telemetry

Push real-time server metrics from a background job. The Analyst Agent will automatically flag **idle** (CPU < 5%) and **oversized** (CPU < 20%) instances on your Dashboard.

```ts
// Call this every 5 minutes from your server
setInterval(async () => {
  await cx.ingest({
    instanceId: 'i-0abc123def456',
    instanceType: 'm5.xlarge',
    provider: 'aws',
    region: 'ap-south-1',
    cpuUtilization: getCpuUsage(),   // Your monitoring metric
    storageGb: 500,
    projectName: 'payments-api',
  });
}, 5 * 60 * 1000);
```

---

### `cx.recommend(input)` — Greener Region

Returns the single best region to move to for maximum carbon reduction.

```ts
const rec = await cx.recommend({ ...input });

if (rec.recommended) {
  // Potential migration target found!
  console.log(`Switch to ${rec.recommended.region}`);
  console.log(`Save: ${rec.recommended.reductionPercent}% CO₂`);
  console.log(`Save: ${rec.recommended.savingsKg} kg/month`);
} else {
  console.log(rec.message); // 'Already in the greenest region'
}
```

---

### `cx.compare(input)` — Multi-Cloud Comparison

Compare your workload across AWS, GCP, and Azure simultaneously.

```ts
const comparison = await cx.compare({ ...input });

console.log('Current:', comparison.base.co2KgMonth, 'kg CO₂');
comparison.options.forEach(opt => {
  console.log('Alternative:', opt.co2KgMonth, 'kg CO₂');
});
```

---

## Error Handling

The SDK throws typed errors so you can handle failures precisely:

```ts
import Carbonix, { CarbonixApiError, CarbonixNetworkError, CarbonixTimeoutError } from 'carbonix';

try {
  await cx.calculate({ ... });
} catch (err) {
  if (err instanceof CarbonixApiError) {
    console.error('API error:', err.message, 'Status:', err.statusCode);
  } else if (err instanceof CarbonixTimeoutError) {
    console.error('Request timed out');
  } else if (err instanceof CarbonixNetworkError) {
    console.error('Could not reach CarboniX API');
  }
}
```

---

## Config Options

| Option | Type | Default | Description |
|---|---|---|---|
| `apiKey` | `string` | **required** | Your CarboniX API key |
| `baseUrl` | `string` | `http://localhost:4000` | API base URL |
| `timeoutMs` | `number` | `10000` | Request timeout in milliseconds |
