<!-- GENERATED FROM CARBONIX_MASTER_DOCUMENT.md - DO NOT EDIT DIRECTLY unless updating context -->

# APP_FLOW - Context from Master Document

## 17. APPLICATION FLOW

### 17.1 App Launch Flow

```
App Launch
  → Splash Screen (expo-splash-screen)
  → Initialize Services:
      • Load cached config
      • Check auth token (Expo Secure Store)
      • Fetch feature flags (GET /admin/feature-flags)
      • Register push token (expo-notifications)
  → Token exists? → Validate JWT
      • Valid → Home (Config Builder)
      • Invalid/expired → Auth Screen
  → No token → Auth Screen (Login/Signup)
```

### 17.2 Core Calculation Flow

```
Config Builder
  → User fills all fields
  → Tap "Calculate Carbon Cost"
  → Zod validation
      • Fail → inline error toast
      • Pass → show loading animation
  → POST /api/v1/calculate
      • Error (4xx/5xx) → error toast + retry button
      • Success → navigate to Results screen
  → Results Screen renders:
      • Animated CO₂ card (Reanimated spring animation)
      • Breakdown chart
      • Recommendation card
      • Share button
```

### 17.3 Compare Flow

```
Compare Tab
  → Inherits last config from Config Builder (Zustand)
  → User can modify region per provider
  → Tap "Compare All"
  → 3 parallel API calls (Promise.all)
  → Show loading skeleton on all 3 cards
  → All resolve → animate cards in
  → Winner badge on lowest CO₂ card
  → Tap any card → push to Results screen
```

### 17.4 Error Handling Pattern

```
Any API Call
  → 200 → Success flow
  → 401 → Refresh JWT → retry → if fail → navigate to Login
  → 429 → Toast: "Slow down — rate limited"
  → 500 → Toast: "Something went wrong" + Retry button
  → Offline → Banner + disabled buttons
```

### 17.5 Feature Flag Polling

```
App polls GET /api/v1/admin/feature-flags every 60 seconds
  → Updates featureFlagStore in Zustand
  → React component rerenders based on flag value
  → If config_builder_screen disabled → hide tab from bottom navigation
  → If maintenance_mode enabled → show maintenance banner
```

---


---

## 19. DEMO FLOW FOR JUDGES

### 19.1 The 4-Minute Demo Sequence

1. **Open Expo app** → Config Builder screen
2. **Select:** AWS, `ap-south-1` (Mumbai), `t3.medium` × 4, 720h, 40% CPU
3. **Tap "Calculate Carbon Cost"** → show loading animation
4. **Results screen:** 33.8 kg CO₂/month — CRITICAL (red) → "≈ driving 145 km per month"
5. **Show recommendation:** *"Switch to eu-north-1 to reduce emissions by 98%"*
6. **Navigate to Compare tab** → show all 3 providers side-by-side
7. **Switch to eu-north-1** on Config Builder → recalculate → **0.65 kg CO₂/month — LOW (green)**
8. **Open API Console** → show raw JSON response → prove this is a real API
9. **Switch to GitHub** → open a PR with a Terraform file → show CI/CD carbon gate blocking it
10. **Show the PR comment** with the carbon breakdown table
11. **Back to app** → Settings → show push notification for carbon budget exceeded
12. **Open laptop** → `npm install carbonix` → 5 lines → `console.log(result.co2_kg_month)` → 33.8

**Pitch conclusion:** *"Infrastructure has a financial cost and a carbon cost. Carbonix makes both measurable — and gives developers the tools to act on it."*

### 19.2 The Story Arc for Judges

**Hook:** "Every Indian developer defaults to ap-south-1. Nobody tells them it's one of the worst grids on earth for carbon."

**Problem:** BRSR mandate requires Scope 2 reporting. Indian IT companies manage cloud for European clients who need CSRD compliance. Zero automated tooling for this. Manually computed with spreadsheets.

**Gap:** Every existing tool is retrospective. Carbonix is prospective — it stops carbon debt before it's created.

**Solution:** API + SDK + mobile console. The CI/CD gate blocks bad infrastructure decisions before they deploy. Temporal shifting runs flexible jobs when the grid is clean. Right-sizing eliminates carbon waste from idle machines.

**Proof:** Live numbers. Real API. Real GitHub Actions block. `npm install carbonix` working on screen.

**Scale:** Every Indian startup on `ap-south-1`. Every IT services company needing CSRD data. Every DevOps team that cares about their cloud bill also cares about this — once it's visible.

---
