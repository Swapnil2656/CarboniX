# Application Flow Document: Carbonix

> **Version:** 1.0  
> **Last Updated:** June 9, 2026  
> **Covers:** Mobile Application (Expo) + Website (Next.js)  

---

## Table of Contents

1. [Mobile Application Flow](#1-mobile-application-flow)
2. [Website Flow](#2-website-flow)
3. [Shared Flow Patterns](#3-shared-flow-patterns)
4. [State Machine Diagrams](#4-state-machine-diagrams)

---

## 1. Mobile Application Flow

### 1.1 App Launch & Initialization Flow

```
┌──────────────────────────────────────────────────────────────┐
│                        APP LAUNCH                            │
└──────────────────────┬───────────────────────────────────────┘
                       ▼
               ┌───────────────┐
               │  Splash Screen │
               │  (expo-splash) │
               └───────┬───────┘
                       ▼
           ┌───────────────────────┐
           │  Initialize Services  │
           │  • Load cached config │
           │  • Check auth token   │
           │  • Fetch feature flags│
           │  • Register push token│
           └───────────┬──────────┘
                       ▼
              ┌─────────────────┐
              │  Token exists?  │
              └────┬───────┬────┘
                   │       │
              YES  │       │  NO
                   ▼       ▼
          ┌────────────┐  ┌──────────────┐
          │ Validate   │  │  Auth Screen  │
          │ JWT Token  │  │  (Login/      │
          │            │  │   Signup)     │
          └─────┬──────┘  └──────┬───────┘
                │                │
          ┌─────┴──────┐        │
          │ Valid?      │        │
          └──┬─────┬───┘        │
         YES │     │ NO         │
             │     └────────────┤
             ▼                  │
     ┌───────────────┐         │
     │  Home Screen   │◄────────┘
     │  (Config       │
     │   Builder)     │
     └───────────────┘
```

### 1.2 Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     AUTH SCREENS                             │
│                                                             │
│  ┌──────────────────────┐    ┌────────────────────────┐     │
│  │      LOGIN            │    │       SIGNUP            │    │
│  │                       │    │                         │    │
│  │  ┌─────────────┐     │    │  ┌──────────────┐      │    │
│  │  │ Email Input  │     │    │  │ Name Input    │      │    │
│  │  └─────────────┘     │    │  └──────────────┘      │    │
│  │  ┌─────────────┐     │    │  ┌──────────────┐      │    │
│  │  │ Password     │     │    │  │ Email Input   │      │    │
│  │  └─────────────┘     │    │  └──────────────┘      │    │
│  │                       │    │  ┌──────────────┐      │    │
│  │  [Login Button]       │    │  │ Password     │      │    │
│  │                       │    │  └──────────────┘      │    │
│  │  "Don't have an       │    │  ┌──────────────┐      │    │
│  │   account? Sign up"   │    │  │ Confirm Pass  │      │    │
│  │          │            │    │  └──────────────┘      │    │
│  │          └────────────┼────┤                         │    │
│  │                       │    │  [Create Account]       │    │
│  │  "Forgot Password?"   │    │                         │    │
│  │          │            │    │  "Already have an       │    │
│  │          ▼            │    │   account? Log in"      │    │
│  │  Reset Password Flow  │    │          │              │    │
│  └──────────────────────┘    └──────────┼──────────────┘    │
│                                          │                   │
└──────────────────────────────────────────┘                   │
                                                               │
                        On Success                             │
                           ▼                                   │
                  ┌────────────────────┐                       │
                  │ Store JWT in       │                       │
                  │ Expo Secure Store  │                       │
                  └────────┬───────────┘                       │
                           ▼                                   │
                  ┌────────────────────┐                       │
                  │ Navigate to Home   │                       │
                  │ (Config Builder)   │                       │
                  └────────────────────┘                       │
```

### 1.3 Main Navigation Flow (Tab-based)

```
┌──────────────────────────────────────────────────────────┐
│                    BOTTOM TAB BAR                         │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐│
│  │ ⚡ Config │  │ ⚖ Compare│  │ 🔌 Console│  │ 📊 History││
│  │  Builder  │  │          │  │          │  │          ││
│  │  (Home)   │  │          │  │          │  │          ││
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘│
│       │              │             │              │      │
└───────┼──────────────┼─────────────┼──────────────┼──────┘
        │              │             │              │
        ▼              ▼             ▼              ▼
   Config Screen  Compare Screen  API Console  History Screen
        │                                          │
        │ ┌──────────────────────────────────────┐ │
        └─┤       Additional Screens              ├─┘
          │                                        │
          │  📄 Results Screen (push from Config)  │
          │  📖 SDK Docs Screen (accessible from   │
          │     header or settings)                │
          │  ⚙ Settings Screen (accessible from    │
          │     header)                            │
          └────────────────────────────────────────┘
```

### 1.4 Config Builder → Calculation Flow (Core Path)

```
┌─────────────────────────────────────────────────────────────┐
│                    CONFIG BUILDER SCREEN                      │
│                                                              │
│  Step 1: Provider Selection                                  │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                       │
│  │   AWS   │ │   GCP   │ │  Azure  │                       │
│  └────┬────┘ └─────────┘ └─────────┘                       │
│       ▼                                                     │
│  Step 2: Region Dropdown                                     │
│  ┌──────────────────────────────────────┐                   │
│  │  us-east-1 (Virginia)           ▾   │                   │
│  └──────────────────────────────────────┘                   │
│                                                              │
│  Step 3: Instance Configuration                              │
│  ┌────────────────┐  ┌────────────────────┐                 │
│  │ Instance Type   │  │ Server Count       │                │
│  │ t3.medium    ▾  │  │ [  4  ]           │                │
│  └────────────────┘  └────────────────────┘                 │
│                                                              │
│  Step 4: Resource Configuration                              │
│  ┌────────────────┐  ┌────────────────────┐                 │
│  │ Hours/Month     │  │ CPU Utilization     │                │
│  │ ◀━━━━━●━━━━━▶  │  │ ◀━━●━━━━━━━━━━▶   │                │
│  │    720 hrs      │  │      40%           │                │
│  └────────────────┘  └────────────────────┘                 │
│  ┌────────────────┐  ┌────────────────────┐                 │
│  │ Storage (GB)    │  │ RAM (GB)           │                │
│  │ [  100  ]       │  │ [  8  ]            │                │
│  └────────────────┘  └────────────────────┘                 │
│                                                              │
│  ┌──────────────────────────────────────────┐               │
│  │        🔥 CALCULATE CARBON COST          │               │
│  └──────────────────┬───────────────────────┘               │
│                     │                                        │
└─────────────────────┼────────────────────────────────────────┘
                      │
           ┌──────────┴──────────┐
           │  Validation Pass?   │
           └────┬──────────┬─────┘
                │          │
           YES  │          │  NO
                ▼          ▼
       ┌────────────┐  ┌──────────────┐
       │ Show Loading│  │ Show Inline  │
       │ Animation   │  │ Error Toast  │
       └──────┬─────┘  └──────────────┘
              │
              ▼
       ┌─────────────────┐
       │  POST /calculate │
       │  to Backend API  │
       └────────┬────────┘
                │
       ┌────────┴────────┐
       │  API Response?   │
       └───┬──────────┬───┘
           │          │
      SUCCESS      ERROR
           │          │
           ▼          ▼
    ┌────────────┐  ┌──────────────────┐
    │ Save to    │  │  Show Error      │
    │ local      │  │  Modal with      │
    │ cache +    │  │  retry option    │
    │ Zustand    │  └──────────────────┘
    └──────┬─────┘
           │
           ▼
    ┌──────────────────────────────────────────────┐
    │              RESULTS SCREEN                   │
    │                                               │
    │  ┌─────────────────────────────────────────┐  │
    │  │  CO₂ Result Card (Animated Entry)       │  │
    │  │  ┌─────────────────────────────────┐    │  │
    │  │  │     28.2 kg CO₂ / month          │   │  │
    │  │  │     39.2 g CO₂ / hour            │   │  │
    │  │  └─────────────────────────────────┘    │  │
    │  │                                         │  │
    │  │  [HIGH] Carbon Rating Badge             │  │
    │  └─────────────────────────────────────────┘  │
    │                                               │
    │  ┌─────────────────────────────────────────┐  │
    │  │  Breakdown Bar Chart                    │  │
    │  │  ████████████████░░░░░ Compute (93%)    │  │
    │  │  ██░░░░░░░░░░░░░░░░░░ Memory (6.6%)    │  │
    │  │  ░░░░░░░░░░░░░░░░░░░░ Storage (0.4%)   │  │
    │  └─────────────────────────────────────────┘  │
    │                                               │
    │  ┌─────────────────────────────────────────┐  │
    │  │  💡 Recommendation                      │  │
    │  │  "Switch to eu-north-1 to reduce        │  │
    │  │   emissions by ~98%"                    │  │
    │  └─────────────────────────────────────────┘  │
    │                                               │
    │  ┌─────────────────────────────────────────┐  │
    │  │  🌍 Real-world Equivalent               │  │
    │  │  "≈ driving 73 km in a petrol car"      │  │
    │  └─────────────────────────────────────────┘  │
    │                                               │
    │  [📤 Share Result]   [📊 Compare Providers]   │
    │                                               │
    └──────────────────────────────────────────────┘
```

### 1.5 Compare Providers Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    COMPARE SCREEN                            │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Same config is fired at AWS, GCP, Azure             │    │
│  │  simultaneously using POST /compare                  │    │
│  └─────────────────────────┬───────────────────────────┘    │
│                            │                                 │
│                            ▼                                 │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Three parallel API calls                            │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │    │
│  │  │ AWS      │  │ GCP      │  │ Azure    │          │    │
│  │  │ Loading  │  │ Loading  │  │ Loading  │          │    │
│  │  └──────────┘  └──────────┘  └──────────┘          │    │
│  └─────────────────────────┬───────────────────────────┘    │
│                            │                                 │
│                      All resolved                            │
│                            │                                 │
│                            ▼                                 │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Side-by-Side Provider Cards                         │    │
│  │                                                      │    │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐    │    │
│  │  │  AWS 🏆    │  │  GCP       │  │  Azure     │    │    │
│  │  │  0.54 kg   │  │  12.3 kg   │  │  8.7 kg    │    │    │
│  │  │  eu-north-1│  │  europe-n1 │  │  sweden    │    │    │
│  │  │  ★ WINNER  │  │  -94% diff │  │  -88% diff │    │    │
│  │  │            │  │            │  │            │    │    │
│  │  │  [Details] │  │  [Details] │  │  [Details] │    │    │
│  │  └────────────┘  └────────────┘  └────────────┘    │    │
│  │                                                      │    │
│  │  ┌──────────────────────────────────────────────┐   │    │
│  │  │  Comparison Bar Chart                         │   │    │
│  │  │  AWS   █                                      │   │    │
│  │  │  GCP   █████████████████████████              │   │    │
│  │  │  Azure ██████████████████                     │   │    │
│  │  └──────────────────────────────────────────────┘   │    │
│  │                                                      │    │
│  │  Tap any card → Full breakdown modal                 │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### 1.6 API Console Flow (Postman Feature)

```
┌─────────────────────────────────────────────────────────────┐
│                    API CONSOLE SCREEN                         │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Endpoint Selector                                    │    │
│  │  ┌──────────────────────────────────────────────┐    │    │
│  │  │  POST /api/v1/calculate                   ▾  │    │    │
│  │  └──────────────────────────────────────────────┘    │    │
│  │  Available: /calculate, /compare, /recommend,        │    │
│  │             /history, /regions, /instances            │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Request Body (Editable JSON)                        │    │
│  │  ┌──────────────────────────────────────────────┐    │    │
│  │  │ {                                             │    │    │
│  │  │   "provider": "aws",                         │    │    │
│  │  │   "region": "us-east-1",                     │    │    │
│  │  │   "instanceType": "t3.medium",               │    │    │
│  │  │   "instanceCount": 4,                        │    │    │
│  │  │   "hoursPerMonth": 720,                      │    │    │
│  │  │   "cpuUtilization": 0.4                      │    │    │
│  │  │ }                                             │    │    │
│  │  └──────────────────────────────────────────────┘    │    │
│  │  (Syntax highlighted, editable with soft keyboard)   │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌──────────────────────────────────────────┐               │
│  │         🚀 FIRE REQUEST                   │               │
│  └──────────────────┬───────────────────────┘               │
│                     │                                        │
│                     ▼                                        │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Response Panel                                      │    │
│  │  ┌──────────────────────────────────────────────┐    │    │
│  │  │  Status: 200 OK          ⏱ 142ms             │    │    │
│  │  └──────────────────────────────────────────────┘    │    │
│  │  ┌──────────────────────────────────────────────┐    │    │
│  │  │ {                                             │    │    │
│  │  │   "co2_kg_month": 28.2,                      │    │    │
│  │  │   "co2_grams_hour": 39.2,                    │    │    │
│  │  │   "rating": "high",                          │    │    │
│  │  │   "breakdown": {                             │    │    │
│  │  │     "compute_kwh": 63.4,                     │    │    │
│  │  │     "memory_kwh": 4.5,                       │    │    │
│  │  │     "storage_kwh": 0.01                      │    │    │
│  │  │   },                                         │    │    │
│  │  │   "recommendation": "Switch to..."           │    │    │
│  │  │ }                                             │    │    │
│  │  └──────────────────────────────────────────────┘    │    │
│  │  (Syntax highlighted JSON, scrollable)               │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### 1.7 History Screen Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    HISTORY SCREEN                            │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Filter Bar                                          │    │
│  │  [All] [AWS] [GCP] [Azure] │ [Low][Med][High][Crit] │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Pull-to-refresh (expo-gesture-handler)              │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Calculation Entry (FlatList)                        │    │
│  │  ┌──────────────────────────────────────────────┐   │    │
│  │  │  AWS / us-east-1 / t3.medium × 4             │   │    │
│  │  │  28.2 kg CO₂/month  [HIGH]    Jun 8, 2026   │   │    │
│  │  │  ◄ Swipe left to delete ►                    │   │    │
│  │  └──────────────────────────────────────────────┘   │    │
│  │  ┌──────────────────────────────────────────────┐   │    │
│  │  │  AWS / eu-north-1 / t3.medium × 4            │   │    │
│  │  │  0.54 kg CO₂/month  [LOW]     Jun 8, 2026   │   │    │
│  │  └──────────────────────────────────────────────┘   │    │
│  │  ... more entries                                    │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌──────────────────────────────────┐                       │
│  │  📤 Export All as JSON            │                       │
│  └──────────────────────────────────┘                       │
│                                                              │
│  Tap Entry → Navigate to Results Screen with cached data     │
│  Swipe Left → Delete confirmation → DELETE /history/:id      │
│  Share Button → Expo Sharing with deep link                  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### 1.8 Settings Screen Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    SETTINGS SCREEN                           │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  API Configuration                                   │    │
│  │  ┌────────────────────────────────────────┐          │    │
│  │  │ Base URL:  [https://api.carbonix.dev]  │          │    │
│  │  │ Toggle: ○ Production  ● Staging        │          │    │
│  │  └────────────────────────────────────────┘          │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Appearance                                          │    │
│  │  Theme:  ○ Light  ● Dark  ○ System                   │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Notifications                                       │    │
│  │  Push notifications:     [Toggle ON]                 │    │
│  │  Carbon alert threshold: [  50  ] kg CO₂/month      │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Data                                                │    │
│  │  [Clear History]  [Export Data]                       │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  About                                               │    │
│  │  Version: 1.0.0 (Build 1)                            │    │
│  │  [View SDK Docs]  [Open Source Licenses]              │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌──────────────────────────────────────────┐               │
│  │           🚪 LOGOUT                       │               │
│  └──────────────────────────────────────────┘               │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### 1.9 Push Notification Flow

```
┌──────────────────┐     ┌──────────────────┐     ┌───────────────┐
│  Admin Panel      │────▶│  Backend API      │────▶│  Expo Push    │
│  Compose          │     │  /notifications   │     │  API          │
│  Notification     │     │  endpoint         │     │               │
└──────────────────┘     └──────────────────┘     └───────┬───────┘
                                                           │
                                                           ▼
                                              ┌───────────────────┐
                                              │  User's Device     │
                                              │  Push Notification │
                                              │  Banner            │
                                              └─────────┬─────────┘
                                                        │
                                                   User taps
                                                        │
                                                        ▼
                                              ┌───────────────────┐
                                              │  Deep Link         │
                                              │  Opens specific    │
                                              │  screen in app     │
                                              │  (Results/Compare) │
                                              └───────────────────┘
```

### 1.10 Deep Linking Flow

```
Deep Link URL Format:
  carbonix://result/{calculationId}
  carbonix://compare?provider=aws&region=us-east-1&instance=t3.medium&count=4

┌──────────────────┐     ┌──────────────────┐     ┌───────────────┐
│  User taps        │────▶│  Expo Linking     │────▶│  Parse URL    │
│  shared link      │     │  handler          │     │  parameters   │
│  (SMS/WhatsApp/   │     │                   │     │               │
│   Browser)        │     │                   │     │               │
└──────────────────┘     └──────────────────┘     └───────┬───────┘
                                                           │
                                              ┌────────────┴────────────┐
                                              │                         │
                                         App Installed?            Not Installed
                                              │                         │
                                              ▼                         ▼
                                   ┌────────────────┐       ┌────────────────┐
                                   │ Navigate to     │       │ App Store /    │
                                   │ specific screen │       │ Play Store     │
                                   │ with params     │       │ redirect       │
                                   └────────────────┘       └────────────────┘
```

### 1.11 Feature Flag Sync Flow

```
┌────────────────────────────────────────────────────────────────┐
│                    FEATURE FLAG POLLING                         │
│                                                                │
│  App Launch                                                    │
│       │                                                        │
│       ▼                                                        │
│  GET /admin/feature-flags ───────────────────────────────────  │
│       │                                                        │
│       ▼                                                        │
│  Store in Zustand + AsyncStorage (cache)                       │
│       │                                                        │
│       ▼                                                        │
│  Apply flags to UI ──────────────┐                             │
│  • Hide/show screens             │                             │
│  • Enable/disable features       │                             │
│  • Show maintenance banner       │                             │
│       │                          │                             │
│       ▼                          │                             │
│  Set Interval: 60 seconds ───────┘ (polling loop)             │
│                                                                │
│  If flag changes detected:                                     │
│  • Animate UI transition                                       │
│  • Show toast: "App updated"                                   │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## 2. Website Flow

### 2.1 Landing Page Flow

```
┌──────────────────────────────────────────────────────────────┐
│                    LANDING PAGE                               │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  NAVBAR                                                 │  │
│  │  [Logo] [Docs] [Playground] [GitHub] [npm] [Get SDK]   │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  HERO SECTION                                           │  │
│  │  "The carbon cost of your cloud infrastructure.         │  │
│  │   In 5 lines of code."                                  │  │
│  │                                                         │  │
│  │  ┌─────────────────────────────────────┐               │  │
│  │  │ import { Carbonix } from 'carbonix' │               │  │
│  │  │ const sdk = new Carbonix({...})     │               │  │
│  │  │ const result = await sdk.calculate..│               │  │
│  │  └─────────────────────────────────────┘               │  │
│  │                                                         │  │
│  │  [Get the SDK]  [Open the Docs]                         │  │
│  │                                                         │  │
│  │  ┌───────────────────────┐                              │  │
│  │  │ Animated Carbon        │                              │  │
│  │  │ Counter: 1,247 kg ↑    │                              │  │
│  │  └───────────────────────┘                              │  │
│  └────────────────────────────────────────────────────────┘  │
│                         │ Scroll                              │
│                         ▼                                     │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  PROBLEM SECTION                                        │  │
│  │  Data center emissions visualization                    │  │
│  │  Grid intensity map                                     │  │
│  │  "50× Virginia vs Stockholm" stat                       │  │
│  └────────────────────────────────────────────────────────┘  │
│                         │ Scroll                              │
│                         ▼                                     │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  HOW IT WORKS (3-step interactive flow)                 │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐             │  │
│  │  │ 1. Enter │──▶│ 2. API   │──▶│ 3. Get   │            │  │
│  │  │   Config │  │ Calculates│  │   Result │            │  │
│  │  └──────────┘  └──────────┘  └──────────┘             │  │
│  │                                                         │  │
│  │  ┌──────────────────────────────────────────────┐      │  │
│  │  │  EMBEDDED LIVE DEMO CALCULATOR                │      │  │
│  │  │  (Interactive — visitor can try it)            │      │  │
│  │  └──────────────────────────────────────────────┘      │  │
│  └────────────────────────────────────────────────────────┘  │
│                         │ Scroll                              │
│                         ▼                                     │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  SDK INSTALL SECTION                                    │  │
│  │  $ npm install carbonix  [📋 Copy]                      │  │
│  │  [JavaScript] [TypeScript] toggle                       │  │
│  │  Full code snippet with syntax highlighting             │  │
│  └────────────────────────────────────────────────────────┘  │
│                         │ Scroll                              │
│                         ▼                                     │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  PROVIDER COMPARISON SECTION                            │  │
│  │  AWS vs GCP vs Azure carbon intensity by region         │  │
│  │  (Static visual, editable from admin)                   │  │
│  └────────────────────────────────────────────────────────┘  │
│                         │ Scroll                              │
│                         ▼                                     │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  FOOTER                                                 │  │
│  │  [GitHub] [npm] [Docs] [Contact] [Privacy]              │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### 2.2 Documentation Portal Flow

```
┌──────────────────────────────────────────────────────────────┐
│                    DOCS PORTAL                                │
│                                                               │
│  ┌──────────────┐  ┌────────────────────────────────────┐    │
│  │  SIDEBAR       │  │  CONTENT AREA                      │   │
│  │                │  │                                     │   │
│  │  ▸ Quick Start │  │  Based on selected sidebar item:    │   │
│  │  ▸ Install     │  │                                     │   │
│  │  ▸ Auth        │  │  • Markdown-rendered docs           │   │
│  │  ▸ API Ref     │  │  • Interactive code examples        │   │
│  │    - /calculate│  │  • Copy-to-clipboard snippets       │   │
│  │    - /compare  │  │  • Request/Response tables           │   │
│  │    - /recommend│  │  • TypeScript type definitions       │   │
│  │    - /history  │  │                                     │   │
│  │  ▸ SDK Ref     │  │  ┌─────────────────────────────┐   │   │
│  │  ▸ Regions     │  │  │  Code Example                │   │   │
│  │  ▸ Methodology │  │  │  [JS] [TS] [cURL]           │   │   │
│  │  ▸ CI/CD Guide │  │  │  ```typescript               │   │   │
│  │                │  │  │  const result = await...      │   │   │
│  │  ──────────────│  │  │  ```                          │   │   │
│  │  ▸ Playground  │  │  │                 [📋 Copy]    │   │   │
│  │                │  │  └─────────────────────────────┘   │   │
│  └──────────────┘  └────────────────────────────────────┘    │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### 2.3 Admin Panel Flow

```
┌──────────────────────────────────────────────────────────────┐
│                    ADMIN LOGIN                                │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Email: [_________________________]                     │  │
│  │  Password: [______________________]                     │  │
│  │  [Login]                                                │  │
│  │  Optional: 2FA Code [______]                            │  │
│  └────────────────────────────────────────────────────────┘  │
│                         │                                     │
│                    Success                                    │
│                         │                                     │
│                         ▼                                     │
│  ┌──────────────────────────────────────────────────────────┐│
│  │                    ADMIN DASHBOARD                        ││
│  │                                                           ││
│  │  ┌────────────┐  ┌────────────────────────────────────┐  ││
│  │  │ SIDEBAR     │  │  MAIN CONTENT                      │  ││
│  │  │             │  │                                     │  ││
│  │  │ 📊 Dashboard│  │  Overview Cards:                    │  ││
│  │  │ 📈 Analytics│  │  ┌──────┐ ┌──────┐ ┌──────┐       │  ││
│  │  │ 🎛 Features │  │  │ API  │ │Mobile│ │ Avg  │       │  ││
│  │  │ 📝 Content  │  │  │Calls │ │Users │ │ CO₂  │       │  ││
│  │  │ 👥 Users    │  │  │12.4K │ │ 847  │ │28.2kg│       │  ││
│  │  │ 🔑 API Keys│  │  └──────┘ └──────┘ └──────┘       │  ││
│  │  │ 👤 Team     │  │                                     │  ││
│  │  │ 🔔 Notifs   │  │  Live Feed (last 20 API calls):    │  ││
│  │  │ 📋 Audit    │  │  ┌─────────────────────────────┐   │  ││
│  │  │             │  │  │ POST /calculate - 142ms      │   │  ││
│  │  │ ──────────  │  │  │ POST /compare - 487ms        │   │  ││
│  │  │ ⚙ Settings │  │  │ GET /history - 89ms           │   │  ││
│  │  │ 🚪 Logout  │  │  └─────────────────────────────┘   │  ││
│  │  └────────────┘  └────────────────────────────────────┘  ││
│  │                                                           ││
│  └──────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────┘
```

### 2.4 Admin → Feature Flag Toggle Flow

```
Admin clicks Feature Flag toggle
         │
         ▼
┌─────────────────────┐
│ Confirmation Modal   │
│ "Disable Config      │
│  Builder screen?"    │
│ [Cancel] [Confirm]   │
└──────────┬──────────┘
           │ Confirm
           ▼
┌─────────────────────┐
│ PUT /admin/          │
│ feature-flags        │
│ { configBuilder:     │
│   false }            │
└──────────┬──────────┘
           │ Success
           ▼
┌─────────────────────┐
│ Toast: "Flag updated │
│ App syncs in ~60s"   │
└──────────┬──────────┘
           │
           ▼
  Mobile app polls after 60s
           │
           ▼
  Config Builder tab hidden
  from bottom navigation
```

---

## 3. Shared Flow Patterns

### 3.1 Error Handling Pattern

```
Any API Call
     │
     ▼
┌─────────────┐
│ Response?    │
└──┬──────┬───┘
   │      │
 200    4xx/5xx
   │      │
   ▼      ▼
Success  ┌─────────────────┐
         │ Error Type?      │
         └──┬───┬───┬──────┘
            │   │   │
          401  429  500
            │   │   │
            ▼   ▼   ▼
    ┌──────┐ ┌──────┐ ┌──────────┐
    │Refresh│ │Rate  │ │ Show     │
    │Token  │ │Limit │ │ Generic  │
    │Flow   │ │Toast │ │ Error    │
    │       │ │"Slow │ │ + Retry  │
    │If fail│ │ down"│ │ Button   │
    │→Login │ └──────┘ └──────────┘
    └──────┘
```

### 3.2 Offline Mode Pattern (Mobile)

```
┌──────────────────┐
│  Network Check    │
│  (NetInfo)        │
└──────┬──────┬────┘
       │      │
    Online  Offline
       │      │
       ▼      ▼
  Normal   ┌──────────────────┐
  Flow     │ Show Banner:      │
           │ "You're offline"  │
           ├──────────────────┤
           │ Load cached data: │
           │ • Last results    │
           │ • History list    │
           │ • Settings        │
           ├──────────────────┤
           │ Disable:          │
           │ • Calculate btn   │
           │ • Compare tab     │
           │ • API Console     │
           └──────────────────┘
```

---

## 4. State Machine Diagrams

### 4.1 Calculation State Machine

```
┌─────────┐    submit    ┌───────────┐   success   ┌──────────┐
│  IDLE   │ ───────────▶ │ LOADING   │ ──────────▶ │ SUCCESS  │
│         │              │           │             │          │
│  Form   │              │ Spinner   │             │ Results  │
│  ready  │              │ Animation │             │ Display  │
└─────────┘              └─────┬─────┘             └──────────┘
     ▲                         │                        │
     │                      error                       │
     │                         │                    new calc
     │                         ▼                        │
     │                   ┌───────────┐                  │
     └───────────────────│  ERROR    │──────────────────┘
          retry          │           │
                         │ Error msg │
                         │ + Retry   │
                         └───────────┘
```

### 4.2 Authentication State Machine

```
┌──────────────┐     login      ┌──────────────────┐
│ UNAUTHENTICATED│ ────────────▶ │ AUTHENTICATING   │
│               │               │                  │
│ Show Auth     │               │ API call in      │
│ Screens       │               │ progress         │
└──────────────┘               └────────┬─────────┘
       ▲                                │
       │                      ┌─────────┴─────────┐
       │                   success               error
       │                      │                    │
       │                      ▼                    ▼
       │              ┌───────────────┐    ┌──────────────┐
       │              │ AUTHENTICATED │    │ AUTH_ERROR    │
       │              │               │    │              │
       │              │ Store JWT     │    │ Show error   │
       │              │ Navigate home │    │ Allow retry  │
       │              └───────┬───────┘    └──────┬───────┘
       │                      │                    │
       │                   logout               retry
       │                      │                    │
       └──────────────────────┴────────────────────┘
```
