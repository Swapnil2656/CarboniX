# Implementation Plan: Carbonix

> **Version:** 1.0  
> **Last Updated:** June 9, 2026  
> **Timeline:** 3-Week Sprint (Hackathon Build)  
> **Team:** Solo Developer (Swapnil Sen) + AI Multi-Agent Workflow  

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Phase Overview](#2-phase-overview)
3. [Phase 1: Foundation (Days 1–4)](#3-phase-1-foundation-days-14)
4. [Phase 2: Core Engine (Days 5–8)](#4-phase-2-core-engine-days-58)
5. [Phase 3: Mobile App (Days 9–13)](#5-phase-3-mobile-app-days-913)
6. [Phase 4: Website & Admin (Days 14–17)](#6-phase-4-website--admin-days-1417)
7. [Phase 5: SDK Package (Days 14–15)](#7-phase-5-sdk-package-days-1415)
8. [Phase 6: Integration & Polish (Days 18–19)](#8-phase-6-integration--polish-days-1819)
9. [Phase 7: Demo Prep & Deploy (Days 20–21)](#9-phase-7-demo-prep--deploy-days-2021)
10. [Risk Mitigation](#10-risk-mitigation)
11. [Multi-Agent Workflow Allocation](#11-multi-agent-workflow-allocation)
12. [Expo-Specific Build Guide (LLM-Powered)](#12-expo-specific-build-guide-llm-powered)
13. [Verification Checklist](#13-verification-checklist)

---

## 1. Executive Summary

Carbonix is a three-layer developer platform: **API → SDK → Mobile App**. The implementation follows a bottom-up approach: build the engine first (backend), wrap it (SDK), then showcase it (mobile + web). This ensures every layer has a working dependency beneath it before it's built.

**Key Principle:** At any point during development, the backend should be deployable and functional. The SDK should independently work against the backend. The mobile app should independently work against the SDK.

---

## 2. Phase Overview

```
Week 1 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Day 1-2  │ Phase 1: Monorepo Setup + DB + Auth
Day 3-4  │ Phase 1: Carbon Engine + Core Endpoints
Day 5-6  │ Phase 2: Compare, Recommend, History APIs
Day 7    │ Phase 2: Admin API + Feature Flags
         │
Week 2 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Day 8-9  │ Phase 3: Expo App Scaffold + Auth Screens
Day 10   │ Phase 3: Config Builder + Results Screens
Day 11   │ Phase 3: Compare + API Console Screens
Day 12   │ Phase 3: History + Settings + SDK Docs
Day 13   │ Phase 3: Push Notifications + Offline + Deep Links
Day 14   │ Phase 5: SDK npm Package (parallel)
         │ Phase 4: Website Landing Page (parallel)
         │
Week 3 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Day 15   │ Phase 4: Docs Portal + Playground
Day 16   │ Phase 4: Admin Panel Dashboard + Analytics
Day 17   │ Phase 4: Admin Panel Features + Users
Day 18   │ Phase 6: Integration Testing
Day 19   │ Phase 6: Bug Fixes + Polish
Day 20   │ Phase 7: EAS Build + Deploy All
Day 21   │ Phase 7: Demo Rehearsal + Final QA
```

---

## 3. Phase 1: Foundation (Days 1–4)

### 3.1 Monorepo Initialization (Day 1)

| Task | Details | Time |
| :--- | :--- | :--- |
| Initialize Turborepo | `npx create-turbo@latest` with npm workspaces | 1h |
| Create directory structure | `apps/`, `packages/`, `services/`, `infrastructure/` | 30m |
| Configure TypeScript | Base `tsconfig.json` + workspace-specific configs | 30m |
| Setup ESLint + Prettier | Shared config across all workspaces | 30m |
| Initialize Git | `.gitignore`, branch strategy (`main`, `dev`) | 15m |
| Setup environment variables | `.env.example` for all workspaces | 15m |

**Deliverable:** Empty monorepo with working `npm run dev` across workspaces.

### 3.2 Backend API Scaffold (Day 1–2)

| Task | Details | Time |
| :--- | :--- | :--- |
| Init Express + TypeScript | `services/api/` setup with ts-node-dev | 1h |
| MongoDB connection | Mongoose setup, connection pooling, Atlas SRV | 1h |
| Authentication system | Register, Login, JWT + Refresh tokens, bcrypt | 3h |
| RBAC middleware | Role-based route guards, permission checks | 2h |
| Error handling | Global error handler, custom error classes | 1h |
| Request validation | Zod schemas for all inputs | 1h |
| Rate limiting | express-rate-limit per endpoint group | 30m |
| Security headers | Helmet, CORS, sanitization | 30m |
| Health check endpoint | `GET /api/v1/health` | 15m |
| Swagger/OpenAPI setup | swagger-jsdoc + swagger-ui-express | 1h |
| Logging | Winston structured JSON logging | 30m |

**Deliverable:** Running API with auth, RBAC, and Swagger docs at `/docs`.

### 3.3 Database & Seed Data (Day 2)

| Task | Details | Time |
| :--- | :--- | :--- |
| Create all Mongoose models | All 11 collections from backend_schema.md | 3h |
| Create seed scripts | Regions (130+), Instance types (200+), Feature flags | 2h |
| Seed super admin account | Default admin user for panel | 15m |
| Create indexes | All compound and unique indexes | 30m |
| Write validation tests | Jest unit tests for models | 1h |

**Deliverable:** Seeded database with reference data, passing model tests.

### 3.4 Carbon Calculation Engine (Day 3–4)

| Task | Details | Time |
| :--- | :--- | :--- |
| Implement carbon formula | Energy calculation (compute + memory + storage) | 2h |
| Grid intensity lookup | Region → grid intensity mapping | 1h |
| Instance spec resolver | Instance type → TDP watts lookup | 1h |
| Rating engine | CO₂ → Low/Medium/High/Critical classification | 1h |
| Real-world equivalents | CO₂ kg → "driving X km" / "X smartphone charges" | 1h |
| Recommendation engine | Find lowest carbon region for same config | 2h |
| `POST /calculate` endpoint | Full endpoint with validation, engine, response | 2h |
| Unit tests for engine | Test formula accuracy with known values | 1h |

**Deliverable:** Working `/calculate` endpoint returning accurate CO₂ results.

---

## 4. Phase 2: Core Engine (Days 5–8)

### 4.1 Remaining Core Endpoints (Day 5–6)

| Task | Details | Time |
| :--- | :--- | :--- |
| `POST /compare` | 3 parallel calculations across providers | 2h |
| `POST /recommend` | Recommendation engine endpoint | 1.5h |
| `GET /history` | Paginated history with filters (provider, rating) | 2h |
| `GET /history/:id` | Single calculation detail | 30m |
| `DELETE /history/:id` | Delete with ownership check | 30m |
| `GET /regions` | List all regions with grid intensities | 1h |
| `GET /instances` | List instance types by provider | 1h |
| `GET /providers` | List supported cloud providers | 30m |
| Integration tests | Supertest suite for all endpoints | 2h |

**Deliverable:** All public API endpoints functional with tests.

### 4.2 Admin API (Day 7)

| Task | Details | Time |
| :--- | :--- | :--- |
| Dashboard overview API | Aggregate stats (calls, users, avg CO₂) | 2h |
| Analytics API | Charts data (by provider, region, time) | 2h |
| Feature flags CRUD | GET (public) + PUT (admin) | 1.5h |
| Remote config CRUD | Thresholds, recommendations management | 1.5h |
| User management API | List, detail, ban/unban | 1.5h |
| API key management | Generate, list, revoke, usage stats | 2h |
| Team management | Invite, list, remove (super admin) | 1.5h |
| Notification API | Compose, schedule, send via Expo Push | 2h |
| Audit logging middleware | Auto-log all admin actions | 1h |

**Deliverable:** Full admin API with RBAC enforcement.

### 4.3 Deploy Backend (Day 7–8)

| Task | Details | Time |
| :--- | :--- | :--- |
| Railway setup | Create project, link repo, environment vars | 1h |
| Production env config | MongoDB Atlas prod connection, JWT secrets | 30m |
| Domain setup | `api.carbonix.dev` custom domain | 30m |
| Smoke tests | Verify all endpoints on deployed instance | 30m |
| Seed production DB | Run seed script against Atlas | 15m |

**Deliverable:** Live API at `api.carbonix.dev` with Swagger docs.

---

## 5. Phase 3: Mobile App (Days 9–13)

### 5.1 Expo App Scaffold (Day 8–9)

| Task | Details | Time |
| :--- | :--- | :--- |
| Create Expo app | `npx create-expo-app` in `apps/mobile-expo/` | 30m |
| Configure Expo Router | File-based routing, tab layout | 1.5h |
| Setup design system | Colors, typography (Inter + JetBrains Mono), spacing | 2h |
| Install dependencies | Zustand, React Query, Axios, Victory Native, Reanimated | 1h |
| Configure Axios instance | Base URL, JWT interceptors, request timing | 1h |
| Setup Zustand stores | Auth store, config store, feature flag store | 1.5h |
| React Query provider | QueryClient with cache config | 30m |
| Navigation structure | Tab bar (Config, Compare, Console, History) + stack screens | 1.5h |

### 5.2 Auth Screens (Day 9)

| Task | Details | Time |
| :--- | :--- | :--- |
| Login screen UI | Email + password form, validation | 1.5h |
| Signup screen UI | Name + email + password + confirm, validation | 1.5h |
| Auth flow logic | API integration, JWT storage via Secure Store | 1.5h |
| Token refresh logic | Auto-refresh on 401, retry failed request | 1h |
| Auth guard | Redirect to login if unauthenticated | 30m |

### 5.3 Config Builder Screen (Day 10)

| Task | Details | Time |
| :--- | :--- | :--- |
| Provider selector | Animated AWS/GCP/Azure cards | 1h |
| Region dropdown | Searchable dropdown with grid intensity hint | 1.5h |
| Instance type picker | Categorized picker by family | 1h |
| Server count input | Numeric stepper with validation | 30m |
| Hours/month slider | Reanimated-powered slider (1–744) | 1h |
| CPU utilization slider | Percentage slider (0–100%) | 30m |
| Storage + RAM inputs | Numeric inputs with units | 30m |
| Form validation | Zod-based client validation | 30m |
| Submit flow | Loading state → API call → Navigate to results | 1h |

### 5.4 Results Screen (Day 10)

| Task | Details | Time |
| :--- | :--- | :--- |
| Animated CO₂ card | Counting animation (Reanimated) for kg/month | 1.5h |
| Carbon rating badge | Color-coded Low/Medium/High/Critical | 1h |
| Breakdown bar chart | Victory Native horizontal bar (compute/memory/storage) | 1.5h |
| Real-world equivalent | Animated text reveal | 30m |
| Recommendation card | Styled recommendation with target region | 1h |
| Share button | Expo Sharing with deep link generation | 1h |
| Navigate to compare | CTA button linking to compare with same config | 30m |

### 5.5 Compare Screen (Day 11)

| Task | Details | Time |
| :--- | :--- | :--- |
| Config summary card | Show current config at top | 30m |
| Parallel API calls | Fire 3 provider comparisons via POST /compare | 1h |
| Provider result cards | Side-by-side cards with CO₂ values | 1.5h |
| Winner badge | Animated "Greenest" badge on lowest emission | 1h |
| Percentage diff labels | "X% more than winner" per provider | 30m |
| Comparison bar chart | Victory Native grouped bar chart | 1.5h |
| Tap card → detail modal | Bottom sheet with full breakdown | 1h |

### 5.6 API Console Screen (Day 11)

| Task | Details | Time |
| :--- | :--- | :--- |
| Endpoint selector dropdown | All available endpoints | 1h |
| JSON editor | Editable JSON with syntax highlighting | 2h |
| Fire button | Execute request with loading animation | 30m |
| Response viewer | Syntax-highlighted JSON response | 1.5h |
| Response time display | Milliseconds from Axios interceptor | 30m |
| Status code badge | Color-coded 200/4xx/5xx | 30m |
| Request history | Last 5 requests stored locally | 1h |

### 5.7 History Screen (Day 12)

| Task | Details | Time |
| :--- | :--- | :--- |
| Calculation list | FlatList with pagination | 1.5h |
| Filter bar | Provider tabs + rating filter | 1h |
| Swipe to delete | Gesture Handler swipeable rows | 1h |
| Pull to refresh | RefreshControl integration | 30m |
| Share per entry | Expo Sharing for individual entries | 30m |
| Export all as JSON | File System API for JSON export | 1h |
| Empty state | Illustrated empty state for no history | 30m |

### 5.8 Settings + SDK Docs (Day 12)

| Task | Details | Time |
| :--- | :--- | :--- |
| Settings screen UI | All sections from app_flow.md | 2h |
| API base URL toggle | Staging vs Production switch | 30m |
| Theme toggle | Light/Dark/System with persistence | 1h |
| Notification preferences | Toggle + threshold input | 30m |
| Clear history | Confirmation + bulk delete | 30m |
| SDK Docs screen | In-app markdown renderer for SDK reference | 2h |
| Copyable code snippets | TouchableOpacity → Clipboard | 30m |

### 5.9 Expo-Native Features (Day 13)

| Task | Details | Time |
| :--- | :--- | :--- |
| Push notifications setup | expo-notifications config, token registration | 2h |
| Notification handling | Foreground/background/tap handlers | 1h |
| Offline mode | NetInfo detection, cached data display | 1.5h |
| Deep linking setup | expo-linking config, URL scheme | 1.5h |
| Deep link handlers | Parse params, navigate to correct screen | 1h |
| Feature flag polling | 60s interval, Zustand sync, UI reactivity | 1h |
| Pull-to-refresh | History + Results screens | 30m |
| Splash screen config | Custom branded splash with expo-splash-screen | 30m |

---

## 6. Phase 4: Website & Admin (Days 14–17)

### 6.1 Landing Page (Day 14)

| Task | Details | Time |
| :--- | :--- | :--- |
| Next.js 14 setup | App Router, TypeScript, Tailwind CSS | 1h |
| Hero section | Headline, SDK snippet, CTAs, animated counter | 2h |
| Problem section | Data center emissions stats, visual | 1.5h |
| How it Works section | 3-step flow with embedded live demo | 2h |
| SDK install section | npm install, JS/TS toggle, copy button | 1h |
| Provider comparison | Static chart with region data | 1.5h |
| Footer | Links, social, contact | 30m |
| SEO optimization | Meta tags, Open Graph, structured data | 30m |
| Responsive design | Mobile-first responsive layout | 1h |

### 6.2 Docs Portal (Day 15)

| Task | Details | Time |
| :--- | :--- | :--- |
| Sidebar navigation | Hierarchical doc navigation | 1.5h |
| Quick Start page | Install → Auth → First calculation | 1h |
| API Reference pages | All endpoints with examples | 2h |
| SDK Reference page | All methods with TypeScript examples | 1.5h |
| Region data page | Full grid intensity table | 1h |
| Methodology page | Carbon math explanation | 1h |
| Code block component | Syntax highlighted, copyable, JS/TS/cURL tabs | 1.5h |
| Interactive playground | Postman-style request builder in browser | 2h |

### 6.3 Admin Panel (Day 16–17)

| Task | Details | Time |
| :--- | :--- | :--- |
| Admin auth flow | Login page, JWT, session management | 1.5h |
| Dashboard page | Overview cards, live API feed | 2.5h |
| Analytics page | Recharts: API calls, regions, providers | 2.5h |
| Feature flags page | Toggle table with sync indicator | 2h |
| Content management | Threshold editor, recommendation strings | 1.5h |
| User management | User list, detail, ban controls | 2h |
| API key management | Generate, list, revoke UI | 1.5h |
| Team management | Invite, assign roles, revoke | 1.5h |
| Notification center | Compose, schedule, view stats | 1.5h |
| Audit log | Filterable, paginated action log | 1h |
| Deploy to Vercel | Custom domain, env vars | 30m |

---

## 7. Phase 5: SDK Package (Days 14–15)

### 7.1 SDK Implementation (Parallel with Phase 4)

| Task | Details | Time |
| :--- | :--- | :--- |
| Package scaffold | `packages/sdk/` with TypeScript, tsup bundler | 1h |
| Type definitions | All interfaces from TRD | 1h |
| HTTP client layer | Axios wrapper with interceptors, retries | 1.5h |
| `calculateCarbon()` | Core method implementation | 1h |
| `compareProviders()` | Multi-provider comparison method | 1h |
| `getRecommendation()` | Recommendation method | 30m |
| `getHistory()` | History retrieval with pagination | 30m |
| Reference methods | `getRegions()`, `getInstanceTypes()`, `getProviders()` | 1h |
| Error handling | Custom CarbonixError class | 30m |
| ESM + CJS builds | Dual build output with tsup | 1h |
| README.md | Usage docs with examples | 1h |
| Unit tests | Jest tests for all methods (mocked HTTP) | 2h |
| Publish to npm | `npm publish` with proper package.json | 30m |

**Deliverable:** Published `carbonix` npm package.

---

## 8. Phase 6: Integration & Polish (Days 18–19)

### 8.1 Integration Testing (Day 18)

| Task | Details | Time |
| :--- | :--- | :--- |
| Mobile ↔ Backend | Full flow testing on real API | 2h |
| SDK ↔ Backend | SDK methods against live API | 1h |
| Website ↔ Backend | Live demo, playground, admin panel | 1.5h |
| Push notification E2E | Admin sends → Device receives | 1h |
| Deep linking E2E | Share link → Open in app → Correct screen | 1h |
| Feature flag E2E | Admin toggles → App updates within 60s | 1h |
| Cross-browser testing | Website on Chrome, Safari, Firefox | 1h |

### 8.2 Polish & Bug Fixes (Day 19)

| Task | Details | Time |
| :--- | :--- | :--- |
| Fix integration bugs | Issues found in Day 18 | 3h |
| Animation refinement | Smooth all transitions, fix janky animations | 2h |
| Loading states | Add skeleton screens, spinners where missing | 1h |
| Error states | Add error boundaries, retry UIs | 1h |
| Empty states | Add illustrations for empty data screens | 1h |
| Performance optimization | React Query cache tuning, lazy loading | 1h |

---

## 9. Phase 7: Demo Prep & Deploy (Days 20–21)

### 9.1 EAS Build & Deployment (Day 20)

| Task | Details | Time |
| :--- | :--- | :--- |
| EAS Build configuration | `eas.json` with preview and production profiles | 1h |
| Generate Android APK | `eas build -p android --profile preview` | 1h (build time) |
| Test APK on device | Install and full walkthrough on physical Android | 1h |
| Verify OTA updates | `eas update` deployment and verification | 30m |
| Final deploy: Backend | Railway production deploy, smoke tests | 30m |
| Final deploy: Website | Vercel production deploy, lighthouse check | 30m |
| Seed demo data | Populate history with realistic calculations | 1h |
| SSL/Domain verification | Verify custom domains + HTTPS | 15m |

### 9.2 Demo Rehearsal (Day 21)

| Task | Details | Time |
| :--- | :--- | :--- |
| Write demo script | 10-step flow from PRD Section 13 | 1h |
| Record demo video | Screen record full demo flow | 1h |
| Rehearse live demo | Practice 3x with timer (aim: 3 minutes) | 1.5h |
| Prepare pitch deck | Key slides with screenshots | 1h |
| Emergency fallbacks | Record backup video, prepare offline screenshots | 1h |
| Final QA checklist | Run verification checklist (Section 13) | 1h |

---

## 10. Risk Mitigation

| Risk | Impact | Probability | Mitigation |
| :--- | :--- | :--- | :--- |
| EAS Build failures | Cannot demo APK | Medium | Build early (Day 18), keep backup expo go | 
| MongoDB Atlas downtime | API unavailable | Low | Local fallback data, cached results in app |
| Railway deploy issues | API unavailable | Medium | Render as backup deployment target |
| Expo SDK compatibility | Build breaks | Medium | Pin all versions, test early |
| Carbon formula errors | Wrong results | Medium | Unit tests with known CCF values |
| Demo day network issues | Live demo fails | Medium | Pre-recorded backup video, offline mode |
| Time overrun | Incomplete features | High | Priority-ranked features, cut P2 if needed |

### Cut List (If Time Runs Short)

1. **Cut first:** Admin team management, 2FA, notification scheduling
2. **Cut second:** Interactive web playground, CI/CD docs page
3. **Cut third:** Offline mode, export to JSON
4. **Never cut:** Config Builder, Results, Compare, API Console (core demo)

---

## 11. Multi-Agent Workflow Allocation

As a solo developer using AI agents for parallelized development:

| Agent Role | Workstreams | Tools |
| :--- | :--- | :--- |
| **Agent 1: Backend** | Express API, Carbon engine, Auth, Admin API | Node.js, MongoDB, Jest |
| **Agent 2: SDK** | npm package, TypeScript types, docs | TypeScript, tsup, Jest |
| **Agent 3: Mobile** | Expo app, all screens, Expo features | Expo, React Native, Victory |
| **Agent 4: Website** | Landing page, Docs, Admin panel | Next.js, Tailwind, shadcn |
| **Agent 5: DevOps** | EAS config, Railway, Vercel, CI/CD | EAS CLI, GitHub Actions |
| **Agent 6: Demo** | Demo script, pitch, mock data, video | Screen recording tools |

### Parallelization Windows

```
Days 1-8:   Sequential (Backend first — other agents have no dependency)
Days 9-13:  Agent 3 (Mobile) runs independently against deployed API
Days 14-17: Agent 4 (Website) + Agent 2 (SDK) run in parallel
Day 18-19:  All agents converge for integration
Day 20-21:  Agent 5 (DevOps) + Agent 6 (Demo)
```

---

## 12. Expo-Specific Build Guide (LLM-Powered)

### 12.1 LLM Documentation Resources

The build process leverages Expo's official LLM documentation endpoints for AI-assisted development:

| Resource | URL | When to Use |
| :--- | :--- | :--- |
| **Per-page docs** | `https://docs.expo.dev/<path>.md` | Specific API questions during coding |
| **Full docs bundle** | `https://docs.expo.dev/llms-full.txt` | Initial project setup context |
| **EAS docs bundle** | `https://docs.expo.dev/llms-eas.txt` | Build/Update/Workflow configuration |
| **SDK docs bundle** | `https://docs.expo.dev/llms-sdk.txt` | SDK API reference during development |
| **llms.txt index** | `https://docs.expo.dev/llms.txt` | Discover all available doc pages |

### 12.2 Expo SDK Modules Usage Map

| Module | App Feature | Doc Page |
| :--- | :--- | :--- |
| `expo-router` | File-based navigation | `/develop/app-navigation.md` |
| `expo-notifications` | Push alerts for carbon thresholds | `/versions/latest/sdk/notifications.md` |
| `expo-secure-store` | JWT token storage | `/versions/latest/sdk/securestore.md` |
| `expo-file-system` | JSON export of history | `/versions/latest/sdk/filesystem.md` |
| `expo-linking` | Deep link handling | `/versions/latest/sdk/linking.md` |
| `expo-splash-screen` | Branded launch screen | `/versions/latest/sdk/splash-screen.md` |
| `expo-constants` | Environment detection | `/versions/latest/sdk/constants.md` |
| `expo-updates` | OTA updates via EAS | `/deploy/send-over-the-air-updates.md` |
| `react-native-reanimated` | Smooth animations | `/develop/user-interface/animation.md` |
| `react-native-gesture-handler` | Swipe-to-delete | External docs |

### 12.3 EAS Configuration Workflow

```bash
# 1. Install EAS CLI
npm install -g eas-cli

# 2. Login to Expo account
eas login

# 3. Configure project
eas init --id <project-id>

# 4. Configure build profiles (eas.json)
# - development: dev client for testing
# - preview: APK for demo day
# - production: production build

# 5. Build APK for demo day
eas build -p android --profile preview

# 6. Deploy OTA update
eas update --branch preview --message "Pre-demo fixes"

# 7. Verify EAS Workflows (if applicable)
# Define workflow YAML for automated builds on push
```

### 12.4 Push Notification Setup Sequence

```
1. Configure expo-notifications in app.json
2. Request permissions on app launch
3. Get Expo Push Token → send to backend
4. Backend stores token in push_tokens collection
5. Admin composes notification → Backend calls Expo Push API
6. Device receives notification → handleNotification callback
7. User taps → deep link opens specific screen
```

---

## 13. Verification Checklist

### 13.1 Pre-Demo Checklist

- [ ] **Backend API is live** at `api.carbonix.dev`
- [ ] **Swagger docs** accessible at `api.carbonix.dev/docs`
- [ ] **POST /calculate** returns correct CO₂ for known input
- [ ] **POST /compare** returns results for all 3 providers
- [ ] **POST /recommend** returns greener alternative
- [ ] **Authentication** flow works (register → login → protected routes)
- [ ] **API rate limiting** is active
- [ ] **Mobile app builds** via EAS Build (APK available)
- [ ] **Config Builder** submits and navigates to results
- [ ] **Results screen** shows animated CO₂, rating, breakdown chart
- [ ] **Compare screen** shows 3 provider cards with winner badge
- [ ] **API Console** fires requests and shows syntax-highlighted response
- [ ] **History screen** lists past calculations
- [ ] **Push notifications** received on device from admin panel
- [ ] **Deep links** open correct screens in app
- [ ] **Feature flags** toggle screens on/off within 60s
- [ ] **Website landing page** is live at `carbonix.dev`
- [ ] **Live demo calculator** on website works
- [ ] **SDK docs** are accessible in-app and on website
- [ ] **npm package** `carbonix` is published and installable
- [ ] **Admin panel** login, dashboard, and feature toggles work
- [ ] **Demo video** is recorded as backup
- [ ] **APK is installed** on demo device

### 13.2 Demo Day Sequence Verification

| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Open Expo app | Splash screen → Config Builder |
| 2 | Select AWS, us-east-1, t3.medium × 4 | Form populated |
| 3 | Tap "Calculate Carbon Cost" | Loading → Results screen |
| 4 | View result | ~28.2 kg CO₂/month, HIGH rating |
| 5 | View recommendation | "Switch to eu-north-1..." |
| 6 | Tap "Compare Providers" | 3 provider cards load |
| 7 | Note winner | Lowest carbon provider highlighted |
| 8 | Open API Console | Endpoint selector visible |
| 9 | Fire POST /calculate | JSON response with timing |
| 10 | Open website docs | SDK install instructions |
| 11 | Show `npm install carbonix` | Package installs |
| 12 | Show 5-line integration | Code snippet with result |
| 13 | Pitch conclusion | "Carbon cost, made measurable" |
