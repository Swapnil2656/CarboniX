<!-- GENERATED FROM CARBONIX_MASTER_DOCUMENT.md - DO NOT EDIT DIRECTLY unless updating context -->

# IMPLEMENTATION_PLAN - Context from Master Document

## 18. IMPLEMENTATION PLAN

### 18.1 Phase Overview (21-Day Sprint)

```
Week 1
Day 1-2  → Phase 1: Monorepo setup + PostgreSQL + Auth
Day 3-4  → Phase 1: Carbon Engine + /calculate endpoint
Day 5-6  → Phase 2: /compare, /recommend, /history APIs
Day 7    → Phase 2: Admin API + Feature Flags

Week 2
Day 8-9  → Phase 3: Expo App scaffold + Auth screens
Day 10   → Phase 3: Config Builder + Results screens
Day 11   → Phase 3: Compare + API Console screens
Day 12   → Phase 3: History + Settings + SDK Docs
Day 13   → Phase 3: Push notifications + Offline + Deep links
Day 14   → Phase 5: SDK npm package (parallel)
         → Phase 4: Website landing page (parallel)

Week 3
Day 15   → Phase 4: Docs portal + Interactive playground
Day 16   → Phase 4: Admin panel Dashboard + Analytics
Day 17   → Phase 4: Admin panel Features + Users
Day 18   → Phase 6: Integration testing + bug fixes
Day 19   → Phase 6: Polish + performance
Day 20   → Phase 7: EAS Build + Deploy all services
Day 21   → Phase 7: Demo rehearsal + final QA
```

### 18.2 Build Order (Most Critical Path)

```
1. packages/core      → calculator.ts, gridCache.ts  (no external deps)
2. services/api       → carbon engine, /calculate endpoint
3. packages/agents    → cicdGate.ts                  (CI/CD gate for demo)
4. .github/workflows  → carbon-gate.yml              (hook to test repo)
5. services/api       → /compare, /recommend, /history, admin endpoints
6. apps/mobile        → auth → config builder → results → compare → console
7. packages/sdk       → wrap the API
8. apps/web           → landing page → docs → admin panel
9. packages/agents    → collector.ts (needs AWS creds, do last)
10. packages/agents   → analyst.ts (needs collector working)
```

### 18.3 Day 1 Checklist

- [ ] `npx create-turbo@latest` — Turborepo init
- [ ] Create `apps/mobile`, `apps/web`, `packages/sdk`, `packages/core`, `packages/agents`, `services/api`
- [ ] Base `tsconfig.json` + workspace TSConfigs
- [ ] Shared ESLint + Prettier config
- [ ] Root `.gitignore` + `.env.example`
- [ ] Initialize Git, create `main` + `dev` branches
- [ ] Setup Railway project for API
- [ ] Setup Neon PostgreSQL for both databases
- [ ] Express app scaffold with middleware chain
- [ ] First Prisma migration + seed

### 18.4 Build Sequence for Carbon Engine (Days 3-4)

```
1. Create packages/core/data/instance-coefficients.json
   (Download from: github.com/cloud-carbon-footprint/cloud-carbon-footprint)

2. Implement packages/core/src/gridCache.ts
   (Static fallback map + Electricity Maps API call + 1h cache)

3. Implement packages/core/src/calculator.ts
   (The master formula — see Section 4)

4. Implement services/api/src/modules/carbon/carbon.engine.ts
   (Wraps core calculator, adds DB lookups for instance specs)

5. Implement carbon.rating.ts, carbon.equivalents.ts, carbon.recommendations.ts

6. Implement carbon.controller.ts + carbon.routes.ts

7. Test with known values:
   4× t3.medium, ap-south-1, 40% CPU, 720h → should return ~33.8 kg CO₂/month
   Same config, eu-north-1 → should return ~0.65 kg CO₂/month
```

### 18.5 Risk Mitigation

| Risk | Mitigation |
| :--- | :--- |
| Electricity Maps free tier exhausted | Static fallback values ship with code — app never crashes |
| CloudWatch API not available in demo | Collector Agent has full mock mode via `USE_MOCK_CARBON=true` env var |
| EAS Build fails on demo day | Pre-build APK ready 48h before demo |
| Railway goes down | Backup deployment on Render prepared |
| Claude API rate limit | Analyst Agent has hardcoded fallback recommendations |

---
