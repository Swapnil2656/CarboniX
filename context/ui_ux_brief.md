<!-- GENERATED FROM CARBONIX_MASTER_DOCUMENT.md - DO NOT EDIT DIRECTLY unless updating context -->

# UI_UX_BRIEF - Context from Master Document

## 16. UI/UX DESIGN SYSTEM

### 16.1 Design Philosophy

**Creative North Star: "The Programmable Console"**

Carbonix's UI evokes the precision of a code editor, the authority of a cloud console (AWS/GCP dashboards), and the clarity of data visualization tools (Grafana/Datadog). Sustainability is treated as **programmable infrastructure data**, not a vague corporate goal.

Design principles:
1. Dark mode by default
2. Data clarity first — complex carbon math distilled through crisp typography
3. Programmable aesthetic — UI elements belong in a sophisticated code editor
4. Tactile depth — subtle glass effects, layered surfaces
5. Information density — maximize useful info per screen

### 16.2 Design System Tokens

```css
:root {
  /* ── Surfaces ──────────────────────────────────────── */
  --surface:                   #101417;
  --surface-dim:               #101417;
  --surface-bright:            #363a3d;
  --surface-container-lowest:  #0b0f11;
  --surface-container-low:     #191c1f;
  --surface-container:         #1d2023;
  --surface-container-high:    #272a2d;
  --surface-container-highest: #323538;
  --background:                #121212;
  --surface-elevated:          #1E1E1E;
  --border-subtle:             #2D2D2D;

  /* ── Brand Colors ─────────────────────────────────── */
  --primary:            #d7baff;       /* Light purple (text on dark) */
  --primary-container:  #BD93F9;       /* Electric Purple (buttons, CTA, focus) */
  --on-primary:         #411478;       /* Dark purple (text on primary button) */
  --secondary:          #75d4e8;       /* Neon Cyan */
  --secondary-container: #008092;

  /* ── Text ─────────────────────────────────────────── */
  --text-header:    #E5E7EB;
  --text-body:      #D1D5DB;
  --text-muted:     #9CA3AF;
  --on-surface:     #e0e2e6;

  /* ── Semantic Colors ──────────────────────────────── */
  --success: #50FA7B;    /* LOW carbon, success states */
  --warning: #FFB86C;    /* MEDIUM carbon, warnings */
  --error:   #FF5555;    /* HIGH/CRITICAL carbon, errors */
  --info:    #8BE9FD;    /* Neon Cyan, info badges */

  /* ── Spacing (4px base unit) ──────────────────────── */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;     /* Default */
  --space-6:  24px;
  --space-8:  32px;
  --space-12: 48px;

  /* ── Borders ──────────────────────────────────────── */
  --rounded-sm:   0.125rem;
  --rounded:      0.25rem;
  --rounded-md:   0.375rem;
  --rounded-lg:   0.5rem;
  --rounded-xl:   0.75rem;
  --rounded-full: 9999px;
}
```

### 16.3 Dark Mode Surface Hierarchy

```
Level 0 — App Background:     #121212  (deepest)
Level 1 — Cards/Containers:   #1E1E1E  (elevated surface)
Level 2 — Nested Elements:    #272A2D  (inputs, code blocks)
Level 3 — Hover States:       #323538  (interactive highlight)
Level 4 — Active/Selected:    #4A4451  (outline variant)
```

### 16.4 Typography System

```
Font 1: Inter          → All UI text, navigation, buttons, body copy
Font 2: JetBrains Mono → ALL numbers, CO₂ values, JSON, code, metric labels

RULE: Every CO₂ value must use JetBrains Mono. No exceptions.
RULE: All numbers (kg, kWh, %, ms) use JetBrains Mono.
RULE: Form labels use JetBrains Mono uppercase.

Typography Scale:
headline-lg:      Inter 32px Bold    → Page titles
headline-md:      Inter 24px SemiBold → Screen titles
body-lg:          Inter 18px Regular → Section headers
body-md:          Inter 16px Regular → Body content
body-sm:          Inter 14px Regular → Metadata
code-md:          JetBrains Mono 14px → JSON, code blocks, form values
code-sm:          JetBrains Mono 12px → Timestamps, metadata
label-caps:       JetBrains Mono 11px Bold UPPERCASE 0.1em tracking → All labels
```

### 16.5 Carbon Rating Color System

| Rating | Background | Border | Text | Badge |
| :--- | :--- | :--- | :--- | :--- |
| LOW | rgba(80, 250, 123, 0.2) | #50FA7B | #50FA7B | `● LOW` |
| MEDIUM | rgba(255, 184, 108, 0.2) | #FFB86C | #FFB86C | `● MEDIUM` |
| HIGH | rgba(255, 85, 85, 0.2) | #FF5555 | #FF5555 | `● HIGH` |
| CRITICAL | rgba(255, 85, 85, 0.35) | #FF5555 | #FF5555 | `◉ CRITICAL` (pulsing) |

### 16.6 60-30-10 Color Distribution

```
60% → Backgrounds, surfaces: #121212, #1E1E1E, #101417
30% → Text, borders, secondary UI: #E5E7EB, #D1D5DB, #2D2D2D
10% → Accents, actions: #BD93F9, #8BE9FD, #50FA7B
```

### 16.7 Component Specifications

**Carbon Result Card:**
```
Background:  var(--surface-elevated) = #1E1E1E
Border:      1px solid rating-color at 40% opacity
Border-left: 4px solid rating-color at 100%
Border-radius: 12px
Padding:     24px
CO₂ number: JetBrains Mono 48px Bold, rating-color
Unit (kg/month): JetBrains Mono 16px, --text-muted
```

**Rating Badge:**
```
Background:  rating-bg (20% opacity)
Border:      1px solid rating-color
Border-radius: 4px (pill with full round)
Padding:     4px 10px
Text:        JetBrains Mono 11px Bold uppercase, rating-color
```

**Primary Button:**
```
Background:  #BD93F9 (Electric Purple)
Text color:  #411478 (Dark purple)
Font:        Inter 14px SemiBold
Border-radius: 8px
Padding:     12px 24px
Hover:       #C9A4FF
Active:      scale(0.97)
```

**Code Block / JSON View:**
```
Background:  #0b0f11 (surface-container-lowest)
Border:      1px solid #2D2D2D
Font:        JetBrains Mono 13px
Line-height: 1.6
Padding:     16px
Border-radius: 8px
```

---


---

## 13. MOBILE APPLICATION

### 13.1 Screens — Priority & Offline Support

| Screen | Route | Priority | Offline Support |
| :--- | :--- | :--- | :--- |
| Config Builder | `/(tabs)/config` | P0 | No |
| Results | `/results/[id]` | P0 | Yes (cached) |
| Compare | `/(tabs)/compare` | P0 | No |
| API Console | `/(tabs)/console` | P0 | No |
| History | `/(tabs)/history` | P1 | Yes (local cache) |
| SDK Docs | `/docs` | P1 | Partial (static) |
| Settings | `/settings` | P2 | Yes |
| Login | `/auth/login` | P0 | No |
| Signup | `/auth/signup` | P0 | No |

### 13.2 Screen Specifications

#### Screen 1: Config Builder (Home, P0)

The entry point of the entire app. The main demo screen for judges.

**Fields:**
- Provider selector: AWS / GCP / Azure (segmented control / toggle buttons)
- Region dropdown: filtered by selected provider, shows region name + code
- Instance type picker: searchable list, shows vCPU + RAM + category
- Server count: numeric input with +/- stepper
- Hours/month slider: 1–744 (default 720)
- CPU utilization slider: 0–100% (default 40%)
- Storage GB: numeric input
- RAM GB: numeric input (optional override)

**Behavior:**
- Full Zod validation before submit
- Loading animation on Calculate button while API call is in progress
- Navigates to Results screen on success
- Inline error toast on validation failure

#### Screen 2: Results (P0)

Pushed from Config Builder after calculation.

**Components:**
- Animated CO₂ result card: large JetBrains Mono number (kg/month + grams/hour)
- Carbon rating badge: color-coded (LOW=green, MEDIUM=orange, HIGH=red, CRITICAL=red pulsing)
- Breakdown bar chart (Victory Native): compute vs memory vs storage
- Real-world equivalent string: "≈ driving 145 km"
- Recommendation card: "Switch to eu-north-1 to reduce by 98%"
- Share button (Expo Sharing): shareable URL via deep link

#### Screen 3: Compare (P0)

Fires same config at all 3 providers simultaneously.

**Components:**
- Three parallel API calls using Promise.all
- Side-by-side provider cards (AWS / GCP / Azure)
- Each card: provider name, CO₂ kg/month, rating badge
- Winner badge on lowest-carbon card
- Percentage diff labels between cards
- Bar chart comparing all three
- Tap any card → push to detailed Results screen for that provider

#### Screen 4: API Console (P0)

The "Postman" feature. The key differentiator proving developer tool angle to judges.

**Components:**
- Endpoint selector dropdown: `/calculate`, `/compare`, `/recommend`, `/history`
- Editable JSON parameter editor (multiline text input with monospace font)
- Fire button
- Live JSON response view with syntax highlighting (JetBrains Mono)
- Response time indicator in ms
- Copy response button

**Why this matters:** This screen proves the API exists as a real service, demonstrates the response format, and shows judges the developer tool angle in a way no desktop app can replicate on demo day.

#### Screen 5: History (P1)

**Components:**
- List of past calculations with timestamps
- Each entry: provider + region + CO₂ kg/month + rating badge
- Swipe left to delete (Gesture Handler)
- Pull to refresh (React Query)
- Filter chips: by provider (AWS/GCP/Azure) or by rating
- Share individual entry (Expo Sharing)
- Export all as JSON (Expo File System)

#### Screen 6: SDK Docs (P1)

In-app documentation proving the SDK is real.

**Components:**
- SDK method list: `calculateCarbon()`, `compareProviders()`, `getRecommendation()`
- For each method: parameters, return type, copyable TypeScript snippet
- Links to full docs website
- `npm install carbonix` snippet with copy button

#### Screen 7: Settings (P2)

**Components:**
- API base URL toggle (staging vs production)
- Light/dark theme toggle
- Push notification preferences toggle
- Carbon alert threshold slider (kg/month)
- App version info
- Clear history button

### 13.3 State Management Architecture

```
Zustand Stores:
├── authStore        → { user, token, isAuthenticated, login(), logout() }
├── configStore      → { lastConfig, lastResult, saveConfig() }
└── featureFlagStore → { flags, fetchFlags(), isEnabled(key) }

React Query:
├── useCalculation   → POST /calculate, cached by config hash
├── useCompare       → POST /compare, cached by config hash
├── useHistory       → GET /history, paginated, background refetch
└── useReferenceData → GET /regions + /instances, stale 24h
```

### 13.4 Push Notification Setup

```
Triggers:
├── Carbon budget threshold exceeded (user's custom threshold)
├── Agent recommendation available (idle/oversized instances found)
├── Monthly BRSR report ready
└── Admin broadcast messages

Flow:
App launch → expo-notifications.registerForPushNotificationsAsync()
           → POST /api/v1/notifications/token with Expo push token
           → Token stored in PushToken table
           → Admin panel or agent sends via Expo Push API
```

### 13.5 Offline Mode

```
NetInfo detects offline:
  → Show banner: "You're offline — showing cached data"
  → Disable: Calculate button, Compare tab, API Console
  → Enable: Last results (AsyncStorage cache), History list, Settings
```

### 13.6 Deep Linking

```
Scheme: carbonix://
Result deep link: carbonix://results/[calculationId]
SDK install link: carbonix://docs/sdk
```

### 13.7 Performance Targets

| Metric | Target |
| :--- | :--- |
| Cold start | < 2 seconds |
| Screen transition | < 300ms |
| API response render | < 500ms after response received |
| JS bundle size | < 5 MB |
| Idle memory | < 150 MB |
| Frame rate | ≥ 58 FPS |

---


---

## 14. WEBSITE & ADMIN PANEL

### 14.1 Public Landing Page Sections

1. **Hero:** Headline: *"The carbon cost of your cloud infrastructure. In 5 lines of code."* + SDK code snippet + CTAs: "Get the SDK" and "Open the Docs" + animated carbon counter

2. **Problem Section (general audience):** Visuals of data center emissions, grid intensity map, "50× Virginia vs Stockholm" stat

3. **How It Works (technical):** 3-step flow: enter config → API calculates → get result + embedded live demo

4. **SDK Install Section:** `npm install carbonix` + copy button + JS/TS toggle + full snippet with syntax highlighting

5. **Provider Comparison:** Static visual of AWS vs GCP vs Azure carbon intensity by region

6. **Footer:** GitHub, npm, docs, contact

### 14.2 Docs Portal Pages

- Install (`npm install carbonix`)
- Authentication
- Quick Start
- API Reference (all endpoints)
- SDK Reference (all methods)
- Region Comparisons
- Methodology (the carbon formula)
- CI/CD Integration

### 14.3 Admin Panel — Role System

| Role | Permissions |
| :--- | :--- |
| **SUPER_ADMIN** | Full access including team management, delete members |
| **ADMIN** | Full access except cannot manage other admins |
| **ANALYST** | Read-only: analytics, dashboard, user list |
| **CONTENT_EDITOR** | Edit only: thresholds, recommendation strings, maintenance banner |

### 14.4 Admin Panel — Screens

**Dashboard:**
- Overview cards: total API calls (today/week/month), unique mobile sessions, most used endpoint, average CO₂ result, SDK npm installs, realtime active users
- Live feed: last 20 API calls in real time (endpoint, response time, status)

**Analytics:**
- Charts: API calls over time, region popularity, provider pie chart, SDK vs mobile usage, top instance types
- Exportable as PNG/CSV

**Feature Flags:**
- Table of app screens/features with on/off toggles
- Change reflected in mobile app within 60 seconds (polling)
- Confirmation modal before disabling any screen

**Content Management:**
- Edit carbon rating thresholds (what kg = LOW/MEDIUM/HIGH/CRITICAL)
- Edit recommendation strings per rating level
- Toggle/edit maintenance mode banner with custom message

**User Management:**
- Global list of mobile app users: device ID, timestamps, country, calculation count
- Per-user history and carbon trend
- Ban/unban device with reason
- Bulk actions

**API Key Management:**
- List active SDK keys: name, creator, timestamps, usage count, limits
- Generate new key (shows once)
- Revoke key instantly
- Set rate limits per key

**Team Management (Super Admin only):**
- Invite members via email
- Assign roles
- Revoke access
- View activity timestamps
- Audit log: every admin action logged with actorId, action, resource, timestamp

**Notifications:**
- Compose push notification (title, body)
- Target: ALL / by provider / custom device IDs
- Schedule for future time
- View open rates

---
