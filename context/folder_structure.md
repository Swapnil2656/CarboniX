# Carbonix — Complete Folder Structure

> **Version:** 1.0  
> **Last Updated:** June 9, 2026  
> **Database:** PostgreSQL + Prisma ORM  
> **Auth:** vyana-auth-universal (adapted as carbonix-auth)  
> **Monorepo:** Turborepo with npm workspaces  

---

## Table of Contents

1. [Root Monorepo Structure](#1-root-monorepo-structure)
2. [Backend API (`services/api`)](#2-backend-api-servicesapi)
3. [Mobile App (`apps/mobile`)](#3-mobile-app-appsmobile)
4. [Website + Admin (`apps/web`)](#4-website--admin-appsweb)
5. [SDK Package (`packages/sdk`)](#5-sdk-package-packagessdk)
6. [Shared Packages](#6-shared-packages)
7. [Infrastructure](#7-infrastructure)
8. [Auth Integration Map](#8-auth-integration-map-vyana-auth--carbonix)

---

## 1. Root Monorepo Structure

```
CarbonSDK/
│
├── context/                                # 📚 Project documentation (all .md files)
│   ├── FEATURES.md                         # Feature specifications
│   ├── README.md                           # Project overview & pitch
│   ├── prd.md                              # Product requirements document
│   ├── trd.md                              # Technical requirements document
│   ├── app_flow.md                         # Application flow diagrams
│   ├── backend_schema.md                   # Database schema (Prisma)
│   ├── implementation_plan.md              # Build plan & timeline
│   ├── ui_ux_brief.md                      # UI/UX design system & brief
│   └── folder_structure.md                 # ← This file
│
├── apps/                                   # 🏗️ Application workspaces
│   ├── mobile/                             # Expo React Native mobile app
│   └── web/                                # Next.js website + admin panel
│
├── packages/                               # 📦 Shared packages
│   ├── sdk/                                # carbonix npm SDK package
│   ├── types/                              # Shared TypeScript types
│   └── config/                             # Shared ESLint, Prettier, TSConfig
│
├── services/                               # ⚙️ Backend microservices
│   └── api/                                # Express REST API + Prisma
│
├── infrastructure/                         # 🔧 Deployment & CI/CD
│   ├── docker/                             # Dockerfiles per service
│   ├── scripts/                            # Seed scripts, migration helpers
│   └── github/                             # GitHub Actions workflows
│
├── .github/                                # GitHub configuration
│   └── workflows/
│       ├── ci.yml                          # Lint + Type check + Test
│       ├── deploy-api.yml                  # Railway deploy trigger
│       ├── deploy-web.yml                  # Vercel deploy trigger
│       └── eas-build.yml                   # EAS Build trigger
│
├── turbo.json                              # Turborepo pipeline config
├── package.json                            # Root workspace config
├── tsconfig.base.json                      # Base TypeScript config
├── .gitignore                              # Git ignore rules
├── .env.example                            # Root environment template
├── .prettierrc                             # Prettier config
├── .eslintrc.js                            # Root ESLint config
└── README.md                               # Root README (quick start)
```

---

## 2. Backend API (`services/api`)

The Express backend with Prisma ORM and PostgreSQL.

```
services/api/
│
├── prisma/
│   ├── schema.prisma                       # ⭐ Complete Prisma schema (see Section below)
│   ├── migrations/                         # Auto-generated Prisma migrations
│   │   └── ...
│   └── seed/
│       ├── index.ts                        # Master seed runner
│       ├── regions.ts                      # Cloud regions + grid intensities (130+)
│       ├── instance-types.ts               # Cloud instance specs (200+)
│       ├── providers.ts                    # AWS, GCP, Azure metadata
│       ├── feature-flags.ts                # Default feature flags (12+)
│       ├── remote-config.ts                # Default thresholds & recommendations
│       └── admin-user.ts                   # Default super admin account
│
├── src/
│   ├── index.ts                            # Express app entry point
│   ├── server.ts                           # HTTP server bootstrap
│   ├── app.ts                              # Express app setup (middleware chain)
│   │
│   ├── config/
│   │   ├── index.ts                        # Config barrel export
│   │   ├── env.ts                          # Environment variable validation (zod)
│   │   ├── cors.ts                         # CORS whitelist config
│   │   ├── rate-limit.ts                   # Rate limiter presets per endpoint group
│   │   └── swagger.ts                      # OpenAPI/Swagger configuration
│   │
│   ├── lib/
│   │   ├── prisma.ts                       # Singleton Prisma client instance
│   │   ├── logger.ts                       # Winston structured JSON logger
│   │   ├── errors.ts                       # Custom error classes (AppError, ValidationError)
│   │   ├── response.ts                     # Standardized API response builder
│   │   └── utils.ts                        # Shared helpers (hash, slug, formatters)
│   │
│   ├── middleware/
│   │   ├── auth.middleware.ts              # JWT verification middleware
│   │   ├── rbac.middleware.ts              # Role-based access control guard
│   │   ├── api-key.middleware.ts           # SDK API key validation
│   │   ├── rate-limit.middleware.ts         # express-rate-limit wrapper
│   │   ├── validate.middleware.ts          # Zod schema validation middleware
│   │   ├── audit.middleware.ts             # Auto-log admin actions
│   │   └── error.middleware.ts             # Global error handler
│   │
│   ├── modules/
│   │   │
│   │   ├── auth/                           # 🔐 Authentication module
│   │   │   ├── auth.routes.ts              # POST /register, /login, /refresh, /logout, /me
│   │   │   ├── auth.controller.ts          # Request handlers
│   │   │   ├── auth.service.ts             # Business logic (hash, JWT, email verify)
│   │   │   ├── auth.schema.ts              # Zod validation schemas
│   │   │   └── auth.types.ts               # Auth-specific TypeScript types
│   │   │
│   │   ├── carbon/                         # 🧮 Carbon Calculation Engine
│   │   │   ├── carbon.routes.ts            # POST /calculate, /compare, /recommend
│   │   │   ├── carbon.controller.ts        # Request handlers
│   │   │   ├── carbon.service.ts           # Core calculation logic
│   │   │   ├── carbon.engine.ts            # Formula: energy_kwh → co2_grams
│   │   │   ├── carbon.rating.ts            # CO₂ → Low/Medium/High/Critical mapper
│   │   │   ├── carbon.equivalents.ts       # CO₂ → real-world equivalents
│   │   │   ├── carbon.recommendations.ts   # Greenest region finder
│   │   │   ├── carbon.schema.ts            # Zod input validation
│   │   │   └── carbon.types.ts             # Calculation types
│   │   │
│   │   ├── history/                        # 📊 Calculation History
│   │   │   ├── history.routes.ts           # GET /history, /history/:id, DELETE /history/:id
│   │   │   ├── history.controller.ts
│   │   │   ├── history.service.ts
│   │   │   └── history.schema.ts
│   │   │
│   │   ├── reference/                      # 📋 Reference Data (regions, instances, providers)
│   │   │   ├── reference.routes.ts         # GET /regions, /instances, /providers
│   │   │   ├── reference.controller.ts
│   │   │   └── reference.service.ts
│   │   │
│   │   ├── admin/                          # 🛡️ Admin API
│   │   │   ├── admin.routes.ts             # Admin route aggregator
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── dashboard.routes.ts     # GET /admin/dashboard
│   │   │   │   ├── dashboard.controller.ts
│   │   │   │   └── dashboard.service.ts    # Aggregate stats, live feed
│   │   │   │
│   │   │   ├── analytics/
│   │   │   │   ├── analytics.routes.ts     # GET /admin/analytics
│   │   │   │   ├── analytics.controller.ts
│   │   │   │   └── analytics.service.ts    # Charts data (provider, region, time)
│   │   │   │
│   │   │   ├── feature-flags/
│   │   │   │   ├── flags.routes.ts         # GET (public) + PUT (admin) /admin/feature-flags
│   │   │   │   ├── flags.controller.ts
│   │   │   │   └── flags.service.ts
│   │   │   │
│   │   │   ├── remote-config/
│   │   │   │   ├── config.routes.ts        # GET (public) + PUT /admin/config
│   │   │   │   ├── config.controller.ts
│   │   │   │   └── config.service.ts
│   │   │   │
│   │   │   ├── users/
│   │   │   │   ├── users.routes.ts         # GET /admin/users, /:id, POST /:id/ban
│   │   │   │   ├── users.controller.ts
│   │   │   │   └── users.service.ts
│   │   │   │
│   │   │   ├── api-keys/
│   │   │   │   ├── keys.routes.ts          # CRUD /admin/api-keys
│   │   │   │   ├── keys.controller.ts
│   │   │   │   └── keys.service.ts
│   │   │   │
│   │   │   ├── team/
│   │   │   │   ├── team.routes.ts          # GET /admin/team, POST /invite, DELETE /:id
│   │   │   │   ├── team.controller.ts
│   │   │   │   └── team.service.ts
│   │   │   │
│   │   │   ├── notifications/
│   │   │   │   ├── notifications.routes.ts # POST /admin/notifications
│   │   │   │   ├── notifications.controller.ts
│   │   │   │   └── notifications.service.ts # Expo Push API integration
│   │   │   │
│   │   │   └── audit/
│   │   │       ├── audit.routes.ts         # GET /admin/audit-log
│   │   │       ├── audit.controller.ts
│   │   │       └── audit.service.ts
│   │   │
│   │   └── health/
│   │       └── health.routes.ts            # GET /health
│   │
│   ├── routes/
│   │   └── index.ts                        # Route aggregator (v1 prefix)
│   │
│   └── types/
│       ├── express.d.ts                    # Express request augmentation
│       └── global.d.ts                     # Global type declarations
│
├── tests/
│   ├── unit/
│   │   ├── carbon/
│   │   │   ├── engine.test.ts              # Formula accuracy tests
│   │   │   ├── rating.test.ts              # Rating threshold tests
│   │   │   └── equivalents.test.ts         # Real-world equivalent tests
│   │   └── auth/
│   │       └── auth.service.test.ts        # Auth flow unit tests
│   │
│   ├── integration/
│   │   ├── calculate.test.ts               # POST /calculate E2E
│   │   ├── compare.test.ts                 # POST /compare E2E
│   │   ├── history.test.ts                 # History CRUD E2E
│   │   └── auth.test.ts                    # Auth flow E2E
│   │
│   └── helpers/
│       ├── setup.ts                        # Test database setup
│       └── factories.ts                    # Test data factories
│
├── package.json
├── tsconfig.json
├── jest.config.ts
├── nodemon.json
├── .env.example
└── Dockerfile
```

---

## 3. Mobile App (`apps/mobile`)

Expo React Native app with file-based routing (Expo Router).

```
apps/mobile/
│
├── app/                                    # 📱 Expo Router — file-based routing
│   ├── _layout.tsx                         # Root layout (providers, fonts, splash)
│   ├── index.tsx                           # Entry redirect (→ auth or tabs)
│   │
│   ├── (auth)/                             # 🔐 Auth route group (unauthenticated)
│   │   ├── _layout.tsx                     # Auth layout (no tab bar)
│   │   ├── login.tsx                       # Login screen
│   │   ├── signup.tsx                      # Signup screen
│   │   ├── verify.tsx                      # Email verification handler
│   │   └── forgot-password.tsx             # Password reset (future)
│   │
│   ├── (tabs)/                             # 📊 Main tab navigator (authenticated)
│   │   ├── _layout.tsx                     # Tab bar layout (Config, Compare, Console, History)
│   │   ├── config.tsx                      # Config Builder tab (home)
│   │   ├── compare.tsx                     # Compare Providers tab
│   │   ├── console.tsx                     # API Console tab
│   │   └── history.tsx                     # Calculation History tab
│   │
│   ├── results/
│   │   └── [id].tsx                        # Results detail screen (pushed from config)
│   │
│   ├── docs/
│   │   ├── index.tsx                       # SDK docs overview
│   │   └── [section].tsx                   # Dynamic docs section
│   │
│   ├── settings/
│   │   └── index.tsx                       # Settings screen
│   │
│   └── +not-found.tsx                      # 404 catch-all screen
│
├── src/
│   ├── components/                         # 🧩 Reusable components
│   │   ├── ui/                             # Design system primitives
│   │   │   ├── Button.tsx                  # Primary, Ghost, Danger variants
│   │   │   ├── Card.tsx                    # Glass card, standard card
│   │   │   ├── Input.tsx                   # Text input with label
│   │   │   ├── Select.tsx                  # Dropdown select
│   │   │   ├── Slider.tsx                  # Animated value slider
│   │   │   ├── Badge.tsx                   # Rating badge (Low/Med/High/Crit)
│   │   │   ├── Toast.tsx                   # Toast notification
│   │   │   ├── Skeleton.tsx                # Loading skeleton shimmer
│   │   │   ├── Modal.tsx                   # Bottom sheet modal
│   │   │   ├── Divider.tsx                 # Section divider
│   │   │   └── IconButton.tsx              # Icon-only button
│   │   │
│   │   ├── config/                         # Config Builder screen components
│   │   │   ├── ProviderSelector.tsx        # AWS/GCP/Azure animated cards
│   │   │   ├── RegionPicker.tsx            # Searchable region dropdown
│   │   │   ├── InstancePicker.tsx          # Instance type by family
│   │   │   ├── ServerCountInput.tsx        # Numeric stepper
│   │   │   ├── ResourceSliders.tsx         # Hours, CPU utilization sliders
│   │   │   └── StorageRamInputs.tsx        # Storage + RAM numeric inputs
│   │   │
│   │   ├── results/                        # Results screen components
│   │   │   ├── CO2Card.tsx                 # Animated CO₂ value display
│   │   │   ├── RatingBadge.tsx             # Color-coded carbon rating
│   │   │   ├── BreakdownChart.tsx          # Victory bar chart (compute/mem/storage)
│   │   │   ├── EquivalentCard.tsx          # Real-world equivalent display
│   │   │   ├── RecommendationCard.tsx      # Green region recommendation
│   │   │   └── ShareButton.tsx             # Expo Sharing deep link
│   │   │
│   │   ├── compare/                        # Compare screen components
│   │   │   ├── ProviderCard.tsx            # Individual provider result card
│   │   │   ├── WinnerBadge.tsx             # Animated "Greenest" badge
│   │   │   ├── ComparisonChart.tsx         # Grouped bar chart
│   │   │   └── BreakdownModal.tsx          # Detail bottom sheet
│   │   │
│   │   ├── console/                        # API Console screen components
│   │   │   ├── EndpointSelector.tsx        # Endpoint dropdown
│   │   │   ├── JsonEditor.tsx              # Editable JSON with highlighting
│   │   │   ├── ResponseViewer.tsx          # Syntax-highlighted response
│   │   │   ├── StatusBadge.tsx             # HTTP status code badge
│   │   │   └── TimingDisplay.tsx           # Response time in ms
│   │   │
│   │   ├── history/                        # History screen components
│   │   │   ├── HistoryCard.tsx             # Calculation entry card
│   │   │   ├── FilterBar.tsx              # Provider + rating filters
│   │   │   ├── SwipeableRow.tsx            # Swipe-to-delete gesture
│   │   │   └── EmptyState.tsx              # Empty history illustration
│   │   │
│   │   ├── auth/                           # Auth screen components
│   │   │   ├── LoginForm.tsx               # Email + password form
│   │   │   ├── SignupForm.tsx              # Registration form
│   │   │   └── AuthGuard.tsx               # Auth state redirect wrapper
│   │   │
│   │   └── shared/                         # Cross-screen shared components
│   │       ├── ScreenHeader.tsx            # Screen title + action buttons
│   │       ├── TabBarIcon.tsx              # Custom tab bar icon
│   │       ├── OfflineBanner.tsx           # "You're offline" banner
│   │       ├── MaintenanceBanner.tsx       # Maintenance mode banner
│   │       ├── LoadingScreen.tsx           # Full-screen loading state
│   │       └── ErrorBoundary.tsx           # Error boundary wrapper
│   │
│   ├── hooks/                              # 🪝 Custom hooks
│   │   ├── useAuth.ts                      # Authentication state hook
│   │   ├── useCalculation.ts               # Calculate mutation hook
│   │   ├── useComparison.ts                # Compare mutation hook
│   │   ├── useHistory.ts                   # History query hook
│   │   ├── useFeatureFlags.ts              # Feature flag polling hook
│   │   ├── useNetworkStatus.ts             # Online/offline detection
│   │   ├── useDeepLink.ts                  # Deep link handler hook
│   │   ├── usePushNotifications.ts         # Push notification setup hook
│   │   └── useTheme.ts                     # Theme preference hook
│   │
│   ├── stores/                             # 🏪 Zustand state stores
│   │   ├── auth.store.ts                   # Auth state (user, tokens)
│   │   ├── config.store.ts                 # Config builder form state
│   │   ├── feature-flags.store.ts          # Feature flags cache
│   │   ├── history.store.ts                # Cached history for offline
│   │   └── settings.store.ts               # User preferences
│   │
│   ├── services/                           # 🌐 API service layer
│   │   ├── api.ts                          # Axios instance (base URL, interceptors)
│   │   ├── auth.service.ts                 # Login, signup, refresh, logout
│   │   ├── carbon.service.ts               # Calculate, compare, recommend
│   │   ├── history.service.ts              # History CRUD
│   │   ├── reference.service.ts            # Regions, instances, providers
│   │   ├── feature-flags.service.ts        # GET /feature-flags polling
│   │   └── push.service.ts                 # Push token registration
│   │
│   ├── lib/                                # 🔧 Utilities
│   │   ├── constants.ts                    # App constants (URLs, timing)
│   │   ├── colors.ts                       # Design system color tokens
│   │   ├── typography.ts                   # Font config (Inter + JetBrains Mono)
│   │   ├── spacing.ts                      # Spacing scale (4px base)
│   │   ├── formatters.ts                   # CO₂ formatters, number utils
│   │   ├── validators.ts                   # Client-side zod schemas
│   │   ├── deep-link.ts                    # Deep link URL parser
│   │   ├── storage.ts                      # Expo SecureStore + AsyncStorage wrappers
│   │   └── query-client.ts                 # TanStack React Query client config
│   │
│   └── types/                              # 📝 TypeScript type definitions
│       ├── navigation.ts                   # Navigation param types
│       ├── api.ts                          # API response types
│       ├── carbon.ts                       # Calculation types
│       └── feature-flags.ts                # Feature flag types
│
├── assets/                                 # 🎨 Static assets
│   ├── images/
│   │   ├── splash.png                      # Splash screen image
│   │   ├── icon.png                        # App icon (1024×1024)
│   │   ├── adaptive-icon.png               # Android adaptive icon
│   │   └── favicon.png                     # Web favicon
│   ├── fonts/
│   │   ├── Inter-Regular.ttf
│   │   ├── Inter-SemiBold.ttf
│   │   ├── Inter-Bold.ttf
│   │   ├── JetBrainsMono-Regular.ttf
│   │   ├── JetBrainsMono-Medium.ttf
│   │   └── JetBrainsMono-Bold.ttf
│   └── animations/                         # Lottie animations (optional)
│       ├── loading.json
│       └── success.json
│
├── app.json                                # Expo configuration
├── eas.json                                # EAS Build profiles
├── metro.config.js                         # Metro bundler config
├── babel.config.js                         # Babel config (Reanimated plugin)
├── package.json
├── tsconfig.json
└── .env.example
```

---

## 4. Website + Admin (`apps/web`)

Next.js 14 (App Router) with vyana-auth-universal integrated as carbonix-auth.

```
apps/web/
│
├── prisma/
│   ├── schema.prisma                       # ⭐ Web-specific Prisma schema (auth models)
│   └── migrations/
│       └── ...
│
├── src/
│   │
│   │  ═══════════════════════════════════════════════════════
│   │  ║  CARBONIX-AUTH MODULE (adapted from vyana-auth)    ║
│   │  ║  Only edit: carbonix-auth.config.ts + auth-theme   ║
│   │  ═══════════════════════════════════════════════════════
│   │
│   ├── carbonix-auth.config.ts             # ✏️ Carbonix auth identity + roles + routes
│   ├── auth.ts                             # NextAuth v5 config (reads carbonix-auth.config)
│   ├── middleware.ts                        # Route protection middleware
│   │
│   ├── hooks/
│   │   ├── useAuth.ts                      # Client-side auth hook (from vyana-auth)
│   │   ├── useDashboard.ts                 # Admin dashboard data hook
│   │   └── useAnalytics.ts                 # Analytics charts data hook
│   │
│   ├── lib/
│   │   ├── carbonix-auth/                  # 🔐 Auth module (adapted from vyana-auth)
│   │   │   ├── auth-actions.ts             # signInUser, signUp, verifyEmail (Carbonix)
│   │   │   ├── email.ts                    # Gmail SMTP sender (branded Carbonix)
│   │   │   ├── prisma.ts                   # Singleton Prisma client
│   │   │   ├── prisma-db.ts                # DB abstraction (user, token, profile)
│   │   │   ├── zod.ts                      # Auth validation schemas
│   │   │   └── utils.ts                    # cn() helper
│   │   │
│   │   ├── api-client.ts                   # Axios/fetch client for backend API
│   │   ├── formatters.ts                   # Number/date formatters
│   │   └── constants.ts                    # API URLs, config
│   │
│   ├── styles/
│   │   ├── auth-theme.css                  # ✏️ Carbonix brand colors for auth pages
│   │   └── globals.css                     # Tailwind + global styles
│   │
│   ├── components/
│   │   ├── ui/                             # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── table.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── tooltip.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── command.tsx
│   │   │   └── chart.tsx                   # Recharts wrapper
│   │   │
│   │   ├── landing/                        # 🌐 Public landing page components
│   │   │   ├── Navbar.tsx                  # Glassmorphic sticky nav
│   │   │   ├── Hero.tsx                    # Headline + code snippet + CTAs
│   │   │   ├── AnimatedCounter.tsx         # CO₂ counting animation
│   │   │   ├── ProblemSection.tsx          # Data center emissions visual
│   │   │   ├── HowItWorks.tsx             # 3-step interactive flow
│   │   │   ├── LiveDemo.tsx               # Embedded calculator demo
│   │   │   ├── SDKInstall.tsx             # npm install + code snippet
│   │   │   ├── ProviderComparison.tsx     # AWS vs GCP vs Azure chart
│   │   │   └── Footer.tsx                 # Links, social, contact
│   │   │
│   │   ├── docs/                           # 📖 Documentation components
│   │   │   ├── DocsSidebar.tsx             # Hierarchical navigation
│   │   │   ├── DocsContent.tsx            # Markdown renderer
│   │   │   ├── CodeBlock.tsx              # Syntax highlighted, copyable
│   │   │   ├── EndpointCard.tsx           # API endpoint documentation card
│   │   │   ├── LanguageTabs.tsx           # JS/TS/cURL toggle tabs
│   │   │   └── RegionTable.tsx            # Grid intensity data table
│   │   │
│   │   ├── admin/                          # 🛡️ Admin panel components
│   │   │   ├── layout/
│   │   │   │   ├── AdminSidebar.tsx        # Fixed sidebar navigation
│   │   │   │   ├── AdminHeader.tsx         # Top bar with user avatar
│   │   │   │   └── AdminShell.tsx          # Sidebar + header + content wrapper
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── OverviewCards.tsx        # Stat cards (API calls, users, CO₂)
│   │   │   │   ├── LiveFeed.tsx            # Real-time API call feed
│   │   │   │   └── QuickActions.tsx        # Common action shortcuts
│   │   │   │
│   │   │   ├── analytics/
│   │   │   │   ├── APICallsChart.tsx       # API calls over time (Recharts)
│   │   │   │   ├── RegionPieChart.tsx      # Region usage distribution
│   │   │   │   ├── ProviderBarChart.tsx    # Provider comparison
│   │   │   │   ├── SDKvsMobileChart.tsx    # Source breakdown
│   │   │   │   └── TopInstancesTable.tsx   # Most used instance types
│   │   │   │
│   │   │   ├── feature-flags/
│   │   │   │   ├── FlagTable.tsx           # Toggle table with sync indicator
│   │   │   │   └── FlagToggleRow.tsx       # Individual flag row
│   │   │   │
│   │   │   ├── content/
│   │   │   │   ├── ThresholdEditor.tsx     # Carbon rating threshold editor
│   │   │   │   └── RecommendationEditor.tsx # Recommendation string editor
│   │   │   │
│   │   │   ├── users/
│   │   │   │   ├── UserTable.tsx           # User list table
│   │   │   │   ├── UserDetail.tsx          # User detail + history
│   │   │   │   └── BanUserDialog.tsx       # Ban confirmation dialog
│   │   │   │
│   │   │   ├── api-keys/
│   │   │   │   ├── KeyTable.tsx            # API key list
│   │   │   │   ├── GenerateKeyDialog.tsx   # New key form dialog
│   │   │   │   └── RevokeKeyDialog.tsx     # Revoke confirmation
│   │   │   │
│   │   │   ├── team/
│   │   │   │   ├── TeamTable.tsx           # Team member list
│   │   │   │   ├── InviteDialog.tsx        # Invite member dialog
│   │   │   │   └── RoleSelector.tsx        # Role assignment dropdown
│   │   │   │
│   │   │   ├── notifications/
│   │   │   │   ├── ComposeForm.tsx         # Notification composer
│   │   │   │   └── NotificationHistory.tsx # Past notifications + stats
│   │   │   │
│   │   │   └── audit/
│   │   │       ├── AuditTable.tsx          # Filterable audit log
│   │   │       └── AuditFilters.tsx        # Filter controls
│   │   │
│   │   └── shared/                         # Cross-page shared components
│   │       ├── Logo.tsx                    # Carbonix logo (SVG)
│   │       ├── ThemeToggle.tsx             # Light/Dark theme switcher
│   │       └── CopyButton.tsx             # Copy-to-clipboard button
│   │
│   ├── app/                                # 📄 Next.js App Router pages
│   │   ├── layout.tsx                      # Root layout (SessionProvider, fonts, theme)
│   │   ├── page.tsx                        # Landing page (public)
│   │   │
│   │   ├── (auth)/                         # 🔐 Auth pages (from vyana-auth)
│   │   │   ├── layout.tsx                  # Auth layout (imports auth-theme.css)
│   │   │   ├── login/
│   │   │   │   ├── page.tsx                # Login form page
│   │   │   │   └── confirm/
│   │   │   │       └── page.tsx            # Post-login role redirect hub
│   │   │   ├── signup/
│   │   │   │   └── page.tsx                # Standard user signup
│   │   │   ├── verify/
│   │   │   │   └── page.tsx                # Email verification handler
│   │   │   └── [role]/
│   │   │       └── signup/
│   │   │           └── page.tsx            # Dynamic role signup (analyst, editor)
│   │   │
│   │   ├── docs/                           # 📖 Documentation portal (public)
│   │   │   ├── layout.tsx                  # Docs layout (sidebar + content)
│   │   │   ├── page.tsx                    # Docs landing (Quick Start)
│   │   │   ├── api-reference/
│   │   │   │   └── page.tsx                # API endpoint reference
│   │   │   ├── sdk-reference/
│   │   │   │   └── page.tsx                # SDK method reference
│   │   │   ├── regions/
│   │   │   │   └── page.tsx                # Region grid intensity table
│   │   │   ├── methodology/
│   │   │   │   └── page.tsx                # Carbon math explanation
│   │   │   └── ci-cd/
│   │   │       └── page.tsx                # CI/CD integration guide
│   │   │
│   │   ├── playground/                     # 🎮 Interactive API playground (public)
│   │   │   └── page.tsx                    # Web-based Postman-style calculator
│   │   │
│   │   ├── admin/                          # 🛡️ Admin panel (protected by RBAC)
│   │   │   ├── layout.tsx                  # Admin shell layout (sidebar + header)
│   │   │   ├── page.tsx                    # Dashboard (redirects to /admin/dashboard)
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx                # Dashboard overview
│   │   │   ├── analytics/
│   │   │   │   └── page.tsx                # Analytics charts
│   │   │   ├── feature-flags/
│   │   │   │   └── page.tsx                # Feature flag toggles
│   │   │   ├── content/
│   │   │   │   └── page.tsx                # Content management (thresholds, recs)
│   │   │   ├── users/
│   │   │   │   ├── page.tsx                # User list
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx            # User detail
│   │   │   ├── api-keys/
│   │   │   │   └── page.tsx                # API key management
│   │   │   ├── team/
│   │   │   │   └── page.tsx                # Team management (super admin)
│   │   │   ├── notifications/
│   │   │   │   └── page.tsx                # Push notification composer
│   │   │   ├── audit/
│   │   │   │   └── page.tsx                # Audit log
│   │   │   └── settings/
│   │   │       └── page.tsx                # Admin settings
│   │   │
│   │   └── api/                            # Next.js API routes
│   │       └── auth/
│   │           └── [...nextauth]/
│   │               └── route.ts            # NextAuth API handler
│   │
│   └── generated/                          # Auto-generated Prisma client
│       └── prisma/
│           └── ...
│
├── public/                                 # Static assets
│   ├── fonts/
│   │   ├── Inter-Regular.woff2
│   │   ├── Inter-SemiBold.woff2
│   │   ├── Inter-Bold.woff2
│   │   ├── JetBrainsMono-Regular.woff2
│   │   └── JetBrainsMono-Medium.woff2
│   ├── images/
│   │   ├── carbonix-logo.svg
│   │   ├── carbonix-og.png                 # Open Graph image
│   │   └── providers/
│   │       ├── aws-mono.svg
│   │       ├── gcp-mono.svg
│   │       └── azure-mono.svg
│   ├── favicon.ico
│   └── robots.txt
│
├── tailwind.config.ts                      # Tailwind config with design tokens
├── next.config.ts                          # Next.js config
├── components.json                         # shadcn/ui config
├── postcss.config.js
├── package.json
├── tsconfig.json
└── .env.example
```

---

## 5. SDK Package (`packages/sdk`)

The `carbonix` npm package — wraps the REST API.

```
packages/sdk/
│
├── src/
│   ├── index.ts                            # Main entry — exports Carbonix class
│   ├── client.ts                           # Carbonix class (constructor + all methods)
│   │
│   ├── methods/
│   │   ├── calculate.ts                    # calculateCarbon() implementation
│   │   ├── compare.ts                      # compareProviders() implementation
│   │   ├── recommend.ts                    # getRecommendation() implementation
│   │   ├── history.ts                      # getHistory(), getCalculation()
│   │   └── reference.ts                    # getRegions(), getInstanceTypes(), getProviders()
│   │
│   ├── http/
│   │   ├── http-client.ts                  # Axios/fetch wrapper with retries
│   │   └── interceptors.ts                 # API key header, error mapping
│   │
│   ├── errors/
│   │   └── carbonix-error.ts               # CarbonixError class + error codes
│   │
│   └── types/
│       ├── config.ts                       # CarbonixConfig interface
│       ├── calculate.ts                    # CalculateParams, CalculationResult
│       ├── compare.ts                      # CompareParams, ComparisonResult
│       ├── recommend.ts                    # RecommendParams, RecommendationResult
│       ├── history.ts                      # HistoryOptions, HistoryResult
│       ├── reference.ts                    # Region, InstanceType, Provider
│       └── index.ts                        # Type barrel export
│
├── tests/
│   ├── client.test.ts                      # Carbonix class instantiation tests
│   ├── calculate.test.ts                   # Calculate method tests (mocked)
│   ├── compare.test.ts                     # Compare method tests
│   ├── errors.test.ts                      # Error handling tests
│   └── mocks/
│       └── responses.ts                    # Mock API responses
│
├── tsup.config.ts                          # tsup bundler (ESM + CJS dual)
├── package.json                            # name: "carbonix"
├── tsconfig.json
├── README.md                               # npm README with usage examples
├── CHANGELOG.md
└── LICENSE
```

---

## 6. Shared Packages

```
packages/types/
├── src/
│   ├── index.ts                            # Barrel export
│   ├── carbon.ts                           # Shared carbon calculation types
│   ├── api.ts                              # API response envelope types
│   ├── feature-flags.ts                    # Feature flag type definitions
│   └── remote-config.ts                    # Remote config types
├── package.json
└── tsconfig.json

packages/config/
├── eslint/
│   └── base.js                             # Shared ESLint config
├── prettier/
│   └── index.js                            # Shared Prettier config
├── typescript/
│   ├── base.json                           # Base tsconfig
│   ├── react.json                          # React/RN specific
│   └── node.json                           # Node.js specific
└── package.json
```

---

## 7. Infrastructure

```
infrastructure/
│
├── docker/
│   ├── api.Dockerfile                      # Backend API Dockerfile
│   ├── web.Dockerfile                      # Next.js web Dockerfile
│   └── docker-compose.dev.yml              # Local dev (API + Postgres + PgAdmin)
│
├── scripts/
│   ├── seed.sh                             # Run all seed scripts
│   ├── migrate.sh                          # Prisma migrate wrapper
│   ├── generate-api-key.sh                 # CLI tool to generate SDK API keys
│   └── setup-dev.sh                        # One-command dev environment setup
│
└── github/
    └── CODEOWNERS                          # Code ownership rules
```

---

## 8. Auth Integration Map (vyana-auth → Carbonix)

### 8.1 File Mapping: What Changes, What Stays

This table maps every file from `vyana-auth-universal` to its Carbonix location and describes the changes:

| vyana-auth-universal | Carbonix Location | Changes |
| :--- | :--- | :--- |
| `src/auth.config.ts` | `apps/web/src/carbonix-auth.config.ts` | ✏️ **Renamed + Rewritten** — Carbonix identity, 5 roles, admin prefix |
| `src/auth.ts` | `apps/web/src/auth.ts` | 🔧 Import path to `carbonix-auth.config`, type extended with Carbonix roles |
| `src/middleware.ts` | `apps/web/src/middleware.ts` | 🔧 Import path to `carbonix-auth.config`, analyst/editor prefix guards added |
| `src/hooks/useAuth.ts` | `apps/web/src/hooks/useAuth.ts` | ✅ No changes needed |
| `src/lib/auth-actions.ts` | `apps/web/src/lib/carbonix-auth/auth-actions.ts` | 🔧 Import paths, `CarbonixRole` type, email branding |
| `src/lib/email.ts` | `apps/web/src/lib/carbonix-auth/email.ts` | 🔧 `MAIL_FROM_NAME` defaults to "Carbonix" |
| `src/lib/prisma.ts` | `apps/web/src/lib/carbonix-auth/prisma.ts` | ✅ No changes needed |
| `src/lib/prisma-db.ts` | `apps/web/src/lib/carbonix-auth/prisma-db.ts` | 🔧 Import path for generated Prisma types |
| `src/lib/zod.ts` | `apps/web/src/lib/carbonix-auth/zod.ts` | ✅ No changes needed |
| `src/lib/utils.ts` | `apps/web/src/lib/carbonix-auth/utils.ts` | ✅ No changes needed |
| `src/styles/auth-theme.css` | `apps/web/src/styles/auth-theme.css` | ✏️ **Rewritten** — Carbonix brand (#BD93F9 purple, dark surfaces) |
| `src/app/(auth)/layout.tsx` | `apps/web/src/app/(auth)/layout.tsx` | ✅ No changes needed |
| `src/app/(auth)/login/page.tsx` | `apps/web/src/app/(auth)/login/page.tsx` | ✅ No changes needed (reads config) |
| `src/app/(auth)/login/confirm/page.tsx` | `apps/web/src/app/(auth)/login/confirm/page.tsx` | ✅ No changes needed (reads roleRedirects) |
| `src/app/(auth)/signup/page.tsx` | `apps/web/src/app/(auth)/signup/page.tsx` | ✅ No changes needed |
| `src/app/(auth)/verify/page.tsx` | `apps/web/src/app/(auth)/verify/page.tsx` | ✅ No changes needed |
| `src/app/(auth)/[role]/signup/page.tsx` | `apps/web/src/app/(auth)/[role]/signup/page.tsx` | ✅ No changes needed (dynamic roles) |
| `src/app/api/auth/[...nextauth]/route.ts` | `apps/web/src/app/api/auth/[...nextauth]/route.ts` | ✅ No changes needed |
| `prisma/schema.prisma` | `apps/web/prisma/schema.prisma` | ✏️ **Extended** — 5 Carbonix roles added to enum |

### 8.2 Carbonix Auth Config (`carbonix-auth.config.ts`)

The only file that needs major editing — defines Carbonix-specific identity, roles, and routes:

```typescript
/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║     CARBONIX AUTH CONFIG — edit this file only           ║
 * ║  All pages, middleware, and redirects read from here     ║
 * ╚══════════════════════════════════════════════════════════╝
 */

export const authConfig = {
  // ─── App Identity ──────────────────────────────────────────
  app: {
    name: "Carbonix",
    tagline: "The carbon cost of your cloud infrastructure",
    description: "Admin panel for the Carbonix developer platform.",
  },

  // ─── Hero Image ────────────────────────────────────────────
  heroImage: "/images/carbonix-og.png",
  heroImageAlt: "Carbonix — Carbon footprint calculation platform",

  // ─── Role → Dashboard Redirect Map ─────────────────────────
  // Matches Prisma userType enum. Each role lands on its own route.
  roleRedirects: {
    SUPER_ADMIN: "/admin/dashboard",
    ADMIN: "/admin/dashboard",
    ANALYST: "/admin/analytics",
    CONTENT_EDITOR: "/admin/content",
    USER: "/",  // regular users redirect to landing page
  } as Record<string, string>,

  defaultRedirect: "/",

  // ─── Routes ────────────────────────────────────────────────
  routes: {
    signIn: "/login",
    afterSignOut: "/login",
    afterSignUp: "/login",
    verify: "/verify",
  },

  // ─── Public Routes ─────────────────────────────────────────
  publicRoutes: [
    "/",
    "/login",
    "/signup",
    "/verify",
    "/docs",
    "/docs/api-reference",
    "/docs/sdk-reference",
    "/docs/regions",
    "/docs/methodology",
    "/docs/ci-cd",
    "/playground",
    "/analyst/signup",
    "/content_editor/signup",
  ],

  // ─── Admin Route Prefix ────────────────────────────────────
  adminPrefix: "/admin",
};
```

### 8.3 Prisma Schema (Web — Auth Models with Carbonix Roles)

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── Carbonix Roles ─────────────────────────────────────────
enum userType {
  SUPER_ADMIN
  ADMIN
  ANALYST
  CONTENT_EDITOR
  USER
}

// ─── Auth Models (from vyana-auth-universal) ─────────────────

model User {
  id                 String              @id @default(cuid())
  userName           String              @unique
  email              String              @unique
  password           String
  isVerified         Boolean             @default(false)
  type               userType            @default(USER)
  profile            Profile?
  verificationTokens VerificationToken[]
  createdAt          DateTime            @default(now())
  updatedAt          DateTime            @updatedAt
}

model Profile {
  id          String   @id @default(cuid())
  userId      String   @unique
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  fullName    String?
  avatarUrl   String?
  phoneNumber String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model VerificationToken {
  id      String   @id @default(cuid())
  token   String   @unique
  expires DateTime
  userId  String
  user    User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### 8.4 Auth Theme CSS (Carbonix Branded)

```css
/* ─── Carbonix Auth Theme ──────────────────────────────── */
/* Override these CSS variables to match Carbonix brand     */

:root {
  --button: #BD93F9;          /* Electric Purple — primary CTA */
  --button-hover: #C9A4FF;
  --button-text: #411478;

  --surface: #121212;         /* App background */
  --surface-card: #1E1E1E;   /* Card surface */
  --surface-input: #0F0F0F;  /* Input background */

  --border: #2D2D2D;
  --border-focus: #BD93F9;

  --text-primary: #E5E7EB;
  --text-secondary: #9CA3AF;
  --text-error: #FF5555;

  --success: #50FA7B;
}
```

### 8.5 Environment Variables (`.env.example` for `apps/web`)

```bash
# ─── Database (PostgreSQL) ───────────────────────────────────
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/carbonix_web"

# ─── NextAuth ─────────────────────────────────────────────────
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# ─── Email (Gmail SMTP) ──────────────────────────────────────
MAIL_USER="carbonix.dev@gmail.com"
MAIL_PASS="your-gmail-app-password"
MAIL_FROM_NAME="Carbonix"

# ─── Branding ─────────────────────────────────────────────────
BRAND_COLOR="#BD93F9"

# ─── Carbonix Backend API ────────────────────────────────────
NEXT_PUBLIC_API_URL="http://localhost:3001/api/v1"
```
