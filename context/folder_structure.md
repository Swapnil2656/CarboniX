<!-- GENERATED FROM CARBONIX_MASTER_DOCUMENT.md - DO NOT EDIT DIRECTLY unless updating context -->

# FOLDER_STRUCTURE - Context from Master Document

## 10. MONOREPO STRUCTURE

```
CarbonSDK/                                  ← Root (Turborepo)
│
├── context/                                ← Project documentation (.md files)
│
├── apps/
│   ├── mobile/                             ← Expo React Native app
│   │   ├── app/                            ← Expo Router file-based routes
│   │   │   ├── (auth)/
│   │   │   │   ├── login.tsx
│   │   │   │   └── signup.tsx
│   │   │   ├── (tabs)/
│   │   │   │   ├── _layout.tsx             ← Bottom tab navigator
│   │   │   │   ├── config.tsx              ← Config Builder (P0)
│   │   │   │   ├── compare.tsx             ← Compare Screen (P0)
│   │   │   │   ├── console.tsx             ← API Console (P0)
│   │   │   │   └── history.tsx             ← History Screen (P1)
│   │   │   ├── results/[id].tsx            ← Results Screen (push from Config)
│   │   │   ├── docs.tsx                    ← SDK Docs Screen (P1)
│   │   │   ├── settings.tsx                ← Settings Screen (P2)
│   │   │   └── _layout.tsx                 ← Root layout
│   │   ├── components/                     ← Reusable components
│   │   │   ├── ui/                         ← Base UI primitives
│   │   │   ├── carbon/                     ← Carbon-specific components
│   │   │   │   ├── CarbonRatingBadge.tsx
│   │   │   │   ├── BreakdownChart.tsx
│   │   │   │   ├── EquivalentString.tsx
│   │   │   │   └── RecommendationCard.tsx
│   │   │   └── layout/
│   │   ├── stores/                         ← Zustand stores
│   │   │   ├── authStore.ts
│   │   │   ├── configStore.ts
│   │   │   └── featureFlagStore.ts
│   │   ├── hooks/                          ← Custom hooks
│   │   ├── lib/                            ← Axios instance, utilities
│   │   ├── constants/                      ← Colors, typography, spacing
│   │   ├── assets/                         ← Images, fonts
│   │   ├── app.json                        ← Expo app config
│   │   └── eas.json                        ← EAS build config
│   │
│   └── web/                                ← Next.js 14 website + admin panel
│       ├── src/
│       │   ├── app/
│       │   │   ├── (auth)/                 ← Login, signup, verify (vyana-auth)
│       │   │   ├── (public)/               ← Landing page, docs, playground
│       │   │   ├── admin/                  ← Protected admin panel
│       │   │   │   ├── dashboard/
│       │   │   │   ├── analytics/
│       │   │   │   ├── features/
│       │   │   │   ├── content/
│       │   │   │   ├── users/
│       │   │   │   ├── api-keys/
│       │   │   │   ├── team/
│       │   │   │   ├── notifications/
│       │   │   │   └── audit/
│       │   │   └── api/                    ← Next.js API routes (NextAuth)
│       │   ├── components/
│       │   ├── lib/
│       │   │   └── carbonix-auth/          ← Adapted vyana-auth-universal
│       │   └── styles/
│       ├── prisma/
│       │   └── schema.prisma               ← Web auth schema (User, Profile, VerificationToken)
│       └── carbonix-auth.config.ts         ← Auth config (only file needing major edits)
│
├── packages/
│   ├── sdk/                                ← carbonix npm package
│   │   ├── src/
│   │   │   ├── index.ts                    ← Main export
│   │   │   ├── client.ts                   ← Carbonix class
│   │   │   ├── calculate.ts                ← calculateCarbon method
│   │   │   ├── compare.ts                  ← compareProviders method
│   │   │   ├── recommend.ts                ← getRecommendation method
│   │   │   └── types.ts                    ← All TypeScript types
│   │   └── package.json
│   │
│   ├── agents/                             ← Agentic layer (NEW)
│   │   ├── src/
│   │   │   ├── collector.ts                ← CloudWatch agent
│   │   │   ├── analyst.ts                  ← LLM-powered analysis agent
│   │   │   ├── cicdGate.ts                 ← CI/CD gate agent
│   │   │   ├── reporter.ts                 ← BRSR report agent
│   │   │   └── temporal.ts                 ← Temporal shifting agent
│   │   └── package.json
│   │
│   ├── core/                               ← Calculation engine (no external API dependency)
│   │   ├── src/
│   │   │   ├── calculator.ts               ← Master formula implementation
│   │   │   ├── gridCache.ts                ← Electricity Maps cache layer
│   │   │   ├── rating.ts                   ← CO₂ → rating mapper
│   │   │   ├── equivalents.ts              ← CO₂ → real-world equivalents
│   │   │   └── recommendations.ts          ← Greenest region finder
│   │   ├── data/
│   │   │   └── instance-coefficients.json  ← CCF open dataset (CPU TDP, RAM coefficients)
│   │   └── package.json
│   │
│   ├── types/                              ← Shared TypeScript interfaces
│   └── config/                             ← Shared ESLint, Prettier, TSConfig
│
├── services/
│   └── api/                                ← Express REST API
│       ├── prisma/
│       │   ├── schema.prisma               ← Full API database schema
│       │   └── seed/
│       │       ├── index.ts
│       │       ├── regions.ts              ← 130+ cloud regions
│       │       ├── instance-types.ts       ← 200+ instance specs
│       │       ├── providers.ts
│       │       ├── feature-flags.ts
│       │       └── remote-config.ts
│       └── src/
│           ├── index.ts
│           ├── app.ts
│           ├── config/
│           ├── lib/
│           ├── middleware/
│           └── modules/
│               ├── auth/
│               ├── carbon/
│               ├── history/
│               ├── reference/
│               └── admin/
│
├── infrastructure/
│   ├── docker/
│   └── github/
│
├── .github/
│   └── workflows/
│       ├── ci.yml                          ← Lint + type check + test
│       ├── deploy-api.yml                  ← Railway deploy
│       ├── deploy-web.yml                  ← Vercel deploy
│       ├── eas-build.yml                   ← EAS Build trigger
│       └── carbon-gate.yml                 ← Carbon gate for Carbonix's own infra
│
├── turbo.json
├── package.json                            ← Root workspace config
├── tsconfig.base.json
└── .env.example
```

---
