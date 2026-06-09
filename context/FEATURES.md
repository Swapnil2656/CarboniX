# Carbonix Feature List

## Mobile App (Expo — React Native)

### Core Screens

#### 1. Config Builder Screen
*   **Purpose:** The entry point of the entire app.
*   **Features:** Provider selector (AWS/GCP/Azure), region dropdown, instance type picker, server count, hours/month slider, storage GB, RAM input.
*   **Validation:** Full validation before submit.

#### 2. Results Screen
*   **Features:** Animated CO₂ result card — kg/month, grams/hour.
*   **Visuals:** Carbon rating badge (Low/Medium/High/Critical, color-coded green→red), breakdown bar chart (compute vs memory vs storage), real-world equivalent string ("≈ driving 73 km").
*   **Functionality:** Recommendation from API, Share button.

#### 3. Compare Screen
*   **Purpose:** Same config fired at all 3 providers simultaneously.
*   **Visuals:** Side-by-side provider cards with carbon values, winner badge, percentage diff labels, bar chart.
*   **Functionality:** Tap any provider card to see its full breakdown.

#### 4. API Console Screen
*   **Purpose:** The Postman feature. Proves the developer tool angle to judges. Cannot be replicated on desktop.
*   **Features:** Endpoint selector dropdown, editable JSON params, fire button, live JSON response with syntax highlighting, response time in ms.

#### 5. History Screen
*   **Features:** Past calculations list with timestamps, CO₂ totals, provider/region.
*   **Functionality:** Swipe to delete, share per entry via Expo Sharing, export all as JSON. Filterable by provider or rating.

#### 6. SDK Docs Screen
*   **Features:** In-app documentation — SDK methods, parameters, response shape, copyable TypeScript snippets. Links to website for full docs.

#### 7. Settings Screen
*   **Features:** API base URL (staging vs prod), light/dark theme toggle, notification preferences, carbon alert threshold, app version, clear history.

### Expo-Specific Capabilities
*   **Push Notifications:** Alerts when saved config crosses admin-set carbon threshold.
*   **Offline Mode:** Locally cached last results.
*   **UX Enhancements:** Pull-to-refresh on History and Results.
*   **Deep Linking:** Share result as a URL that opens directly in app.
*   **EAS Build:** Pipeline for APK generation on demo day.

### Remote Config (via Admin Panel)
*   **Feature Flags:** Toggle any screen on/off, changes reflect in 60 seconds (no app update needed).
*   **Carbon Rating Thresholds:** Define what kg value = Low/Medium/High/Critical.
*   **Recommendation Strings:** Admin edits what text appears on Results screen.
*   **Maintenance Mode:** Global banner with custom message.
*   **API Key Rotation:** App picks up new keys automatically.
*   **Push Notifications:** Broadcast from admin.

---

## 🌐 Website

### Part 1 — Public Landing Page

*   **Hero:** Headline: "The carbon cost of your cloud infrastructure. In 5 lines of code." SDK code snippet. CTAs: "Get the SDK" + "Open the Docs". Animated carbon counter (illustrative).
*   **Problem Section (general audience):** Visuals of data center emissions, grid intensity map, "50× Virginia vs Stockholm" stat. No jargon.
*   **How It Works (technical audience):** 3-step flow (enter config → API calculates → get result). Embedded live demo where visitors can try calculations.
*   **SDK Install Section:** `npm install carbonix`, Copy button, JS/TS toggle, full snippet with syntax highlighting.
*   **Provider Comparison Section:** Static visual of AWS vs GCP vs Azure carbon intensity by region (editable from admin).
*   **Footer:** GitHub, npm, docs, contact.

---

### Part 2 — Admin Panel (protected)

#### Auth & Role System
*   **Super Admin:** Full access to everything, can create/delete team members.
*   **Admin:** Full access except cannot manage other admins or super admin.
*   **Analyst:** Read-only access to analytics and user data.
*   **Content Editor:** Editable access only to recommendation strings, thresholds, and landing page content.

#### Login Page
*   Email + password with JWT. Optional 2FA per role.
*   Session management (view active sessions, force logout).

#### Team Management (Super Admin only)
*   Invite members via email, assign roles, revoke access, view activity timestamps.
*   Audit log tracking every action taken by members.

#### Admin Dashboard
*   **Overview Cards:** Total API calls (today/week/month), unique mobile sessions, most used endpoint, average CO₂ result, SDK npm installs, realtime active users.
*   **Live Feed:** Last 20 API calls in real time.

#### Mobile App Control
*   **Feature Flags:** Table of app features with toggles. Syncs in 60s via polling.
*   **Content Management:** Edit thresholds, recommendations, and maintenance banner. Version controlled.
*   **Maintenance Mode:** Manual toggle or scheduled.

#### User Management
*   Global list of mobile app users (device ID, timestamps, country, calculations run).
*   Detailed history and carbon trend per user.
*   Moderation (Ban device ID with reason, Bulk actions).

#### API Key Management
*   Active SDK keys (name, creator, timestamps, usage, limits).
*   Generate/Revoke instantly. Set rate limits.

#### Analytics
*   Charts: API calls, region popularity, provider pie chart, SDK vs mobile usage, top instance types.
*   Exportable as PNG/CSV.

#### Notification Control
*   Compose/send/schedule broadcast push notifications to users. View open rates.

---

## Tech Stack
| Layer | Tech |
| :--- | :--- |
| **Mobile app** | Expo, React Native, TypeScript, Victory Native, Zustand |
| **Website frontend** | Next.js 14, TypeScript, Tailwind CSS |
| **Admin UI components** | shadcn/ui |
| **Backend API** | Node.js, Express, TypeScript |
| **Database** | MongoDB + Mongoose |
| **Auth** | JWT + bcrypt, role-based middleware |
| **Push notifications** | Expo Push Notifications API |
| **Remote config** | MongoDB feature flags, polled every 60s by app |
| **Analytics** | Custom (MongoDB) or Posthog free tier |
| **Deployment** | Railway (backend + API), Vercel (website) |
| **SDK package** | npm, TypeScript, wraps the REST API |

## Role Permission Matrix

| Feature | Super Admin | Admin | Analyst | Content Editor |
| :--- | :---: | :---: | :---: | :---: |
| View dashboard | ✓ | ✓ | ✓ | ✗ |
| View analytics | ✓ | ✓ | ✓ | ✗ |
| Toggle feature flags | ✓ | ✓ | ✗ | ✗ |
| Edit content/thresholds | ✓ | ✓ | ✗ | ✓ |
| Manage users | ✓ | ✓ (read-only) | ✗ | ✗ |
| Ban users | ✓ | ✓ | ✗ | ✗ |
| API key management | ✓ | ✓ | ✗ | ✗ |
| Send notifications | ✓ | ✓ | ✗ | ✗ |
| Manage team members | ✓ | ✗ | ✗ | ✗ |
| View audit log | ✓ | ✓ | ✗ | ✗ |
| Delete team members | ✓ | ✗ | ✗ | ✗ |