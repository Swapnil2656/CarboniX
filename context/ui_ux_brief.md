# UI/UX Design Brief: Carbonix

> **Version:** 1.0  
> **Last Updated:** June 9, 2026  
> **Design System Source:** Stitch MCP — "Midnight Developer Interface" project  
> **Design Philosophy:** Ultra-Dark Developer Aesthetic + Glassmorphism  

---

## Table of Contents

1. [Design Vision](#1-design-vision)
2. [Design System Tokens](#2-design-system-tokens)
3. [Typography System](#3-typography-system)
4. [Color System](#4-color-system)
5. [Spacing & Layout](#5-spacing--layout)
6. [Elevation & Depth](#6-elevation--depth)
7. [Component Specifications](#7-component-specifications)
8. [Mobile App Screen Designs](#8-mobile-app-screen-designs)
9. [Website Screen Designs](#9-website-screen-designs)
10. [Animation & Interaction Patterns](#10-animation--interaction-patterns)
11. [Iconography & Imagery](#11-iconography--imagery)
12. [Accessibility Guidelines](#12-accessibility-guidelines)
13. [Stitch MCP Design Reference](#13-stitch-mcp-design-reference)

---

## 1. Design Vision

### 1.1 Creative North Star: "The Programmable Console"

Carbonix's UI is designed to feel like a **premium developer tool** — not a consumer sustainability app. The interface should evoke the precision of a code editor, the authority of a cloud console (AWS/GCP dashboards), and the clarity of data visualization tools (Grafana/Datadog). Sustainability is treated as **programmable infrastructure data**, not a vague corporate goal.

### 1.2 Brand Personality

| Attribute | Expression |
| :--- | :--- |
| **Technical** | Monospaced metrics, JSON response views, terminal-inspired labels |
| **Precise** | Grid-aligned layouts, consistent spacing, exact numeric displays |
| **Authoritative** | High-contrast data, clear hierarchy, decisive color coding |
| **Ethically-Driven** | Green accents for success, real-world impact equivalents |
| **Premium** | Glassmorphic overlays, subtle animations, polished micro-interactions |

### 1.3 Design Principles

1. **Dark Mode by Default** — Matches developer environment ergonomics (IDE, terminal)
2. **Data Clarity First** — Complex carbon math is distilled through crisp typography and high-contrast status colors
3. **Programmable Aesthetic** — UI elements should look like they belong in a sophisticated code editor
4. **Tactile Depth** — Subtle glass effects and layered surfaces provide depth without breaking the flat developer tool feel
5. **Information Density** — Maximize useful information per screen without sacrificing readability

---

## 2. Design System Tokens

### 2.1 Token Architecture

All design tokens are derived from the Stitch MCP "Midnight Developer Interface" project, which uses an Ultra-Dark Developer Aesthetic with Glassmorphism.

```
Design System Name: CarbonSDK
Design Tool: Stitch MCP (Google)
Project ID: projects/18234059665191599873
Color Mode: DARK
Font Family: Inter (UI) + JetBrains Mono (Data)
Roundness: ROUND_FOUR (4px base)
Custom Primary: #BD93F9 (Electric Purple)
```

### 2.2 Design Token Export

```css
:root {
  /* Surface Colors */
  --surface: #101417;
  --surface-dim: #101417;
  --surface-bright: #363a3d;
  --surface-container-lowest: #0b0f11;
  --surface-container-low: #191c1f;
  --surface-container: #1d2023;
  --surface-container-high: #272a2d;
  --surface-container-highest: #323538;
  
  /* Brand Colors */
  --primary: #d7baff;
  --primary-container: #bd93f9;
  --on-primary: #411478;
  --on-primary-container: #4e2484;
  --inverse-primary: #714aaa;
  
  /* Secondary (Cyan) */
  --secondary: #75d4e8;
  --secondary-container: #008092;
  --on-secondary: #00363e;
  
  /* Functional Colors */
  --background: #121212;
  --surface-elevated: #1E1E1E;
  --border-subtle: #2D2D2D;
  --on-surface: #e0e2e6;
  --on-surface-variant: #ccc3d3;
  --outline: #968e9c;
  --outline-variant: #4a4451;
  
  /* Text Colors */
  --text-header: #E5E7EB;
  --text-body: #D1D5DB;
  --text-muted: #9CA3AF;
  
  /* Semantic Colors */
  --success: #50FA7B;
  --warning: #FFB86C;
  --error: #FF5555;
  --info: #8BE9FD;
  
  /* Spacing */
  --space-unit: 4px;
  --gutter-mobile: 16px;
  --gutter-desktop: 24px;
  --container-max: 1200px;
  --density-compact: 8px;
  --density-default: 16px;
  
  /* Roundness */
  --rounded-sm: 0.125rem;
  --rounded: 0.25rem;
  --rounded-md: 0.375rem;
  --rounded-lg: 0.5rem;
  --rounded-xl: 0.75rem;
  --rounded-full: 9999px;
}
```

---

## 3. Typography System

### 3.1 Typeface Strategy

Carbonix uses a **dual-typeface strategy** to separate UI navigation from technical data:

| Typeface | Role | Rationale |
| :--- | :--- | :--- |
| **Inter** | Headlines, body copy, buttons, navigation | Readability, modern professional feel |
| **JetBrains Mono** | Metrics, CO₂ values, code, labels, JSON | Emphasizes data-first nature, "terminal" look |

### 3.2 Typography Scale

| Token | Font | Size | Weight | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `headline-lg` | Inter | 32px | 700 (Bold) | 1.2 | -0.02em |
| `headline-lg-mobile` | Inter | 24px | 700 (Bold) | 1.2 | — |
| `headline-md` | Inter | 24px | 600 (SemiBold) | 1.3 | — |
| `body-lg` | Inter | 18px | 400 (Regular) | 1.6 | — |
| `body-md` | Inter | 16px | 400 (Regular) | 1.6 | — |
| `body-sm` | Inter | 14px | 400 (Regular) | 1.5 | — |
| `code-md` | JetBrains Mono | 14px | 450 (Medium) | 1.5 | — |
| `code-sm` | JetBrains Mono | 12px | 450 (Medium) | 1.4 | — |
| `label-caps` | JetBrains Mono | 11px | 700 (Bold) | 1.0 | 0.1em |

### 3.3 Typography Usage Rules

```
SCREEN TITLES        → headline-md (Inter SemiBold)
SECTION HEADERS      → body-lg (Inter Regular) + label-caps (JetBrains Mono)
BODY CONTENT         → body-md (Inter Regular)
CO₂ METRIC VALUES    → headline-lg (JetBrains Mono) — CRITICAL: use mono for all numbers
RATING BADGES        → label-caps (JetBrains Mono, UPPERCASE)
JSON RESPONSES       → code-md (JetBrains Mono)
FORM LABELS          → label-caps (JetBrains Mono, UPPERCASE)
FORM VALUES          → code-md (JetBrains Mono)
BUTTON TEXT          → body-sm (Inter, SemiBold override)
METADATA             → code-sm (JetBrains Mono)
TIMESTAMPS           → code-sm (JetBrains Mono)
```

---

## 4. Color System

### 4.1 60-30-10 Distribution

The palette follows a strict **60-30-10 distribution** to maintain a professional "Infrastructure-as-Code" feel:

| Proportion | Usage | Colors |
| :--- | :--- | :--- |
| **60%** | Backgrounds, surfaces | `#121212`, `#1E1E1E`, `#101417` |
| **30%** | Text, borders, secondary UI | `#E5E7EB`, `#D1D5DB`, `#2D2D2D` |
| **10%** | Accents, actions, highlights | `#BD93F9`, `#8BE9FD`, `#50FA7B` |

### 4.2 Accent Color Usage

| Color | Hex | Usage |
| :--- | :--- | :--- |
| **Electric Purple** | `#BD93F9` | Primary CTA buttons, active states, focus indicators, brand |
| **Neon Cyan** | `#8BE9FD` | Secondary accents, info badges, chart lines, links |
| **Success Green** | `#50FA7B` | LOW carbon rating, success states, positive deltas |
| **Warning Orange** | `#FFB86C` | MEDIUM carbon rating, warning badges, caution states |
| **Error Red** | `#FF5555` | HIGH/CRITICAL ratings, error states, destructive actions |

### 4.3 Carbon Rating Color Map

| Rating | Background (20% opacity) | Border (100%) | Text (100%) | Badge |
| :--- | :--- | :--- | :--- | :--- |
| **LOW** | `rgba(80, 250, 123, 0.2)` | `#50FA7B` | `#50FA7B` | `● LOW` |
| **MEDIUM** | `rgba(255, 184, 108, 0.2)` | `#FFB86C` | `#FFB86C` | `● MEDIUM` |
| **HIGH** | `rgba(255, 85, 85, 0.2)` | `#FF5555` | `#FF5555` | `● HIGH` |
| **CRITICAL** | `rgba(255, 85, 85, 0.35)` | `#FF5555` | `#FF5555` | `◉ CRITICAL` |

### 4.4 Dark Mode Surface Hierarchy

```
Level 0 — App Background:       #121212  (deepest layer)
Level 1 — Cards/Containers:      #1E1E1E  (elevated surface)
Level 2 — Nested Elements:       #272A2D  (inputs, code blocks)
Level 3 — Hover States:          #323538  (interactive highlight)
Level 4 — Active/Selected:       #4A4451  (outline variant)
```

---

## 5. Spacing & Layout

### 5.1 Base Grid

All spacing uses a **4px base unit** to ensure alignment of technical data points:

| Token | Value | Usage |
| :--- | :--- | :--- |
| `1 unit` | 4px | Minimal spacing (icon padding) |
| `2 units` | 8px | Compact density (form elements, between related items) |
| `3 units` | 12px | Standard padding (badge padding) |
| `4 units` | 16px | Default density (card padding, section gaps) |
| `6 units` | 24px | Desktop gutters, section separators |
| `8 units` | 32px | Large section gaps |
| `12 units` | 48px | Page section separation |
| `16 units` | 64px | Major layout divisions |

### 5.2 Mobile Layout

```
┌──────────────────────────────────────┐
│  Status Bar                          │  System controlled
├──────────────────────────────────────┤
│  Header (56px height)                │  16px horizontal padding
│  [< Back]  Screen Title   [⚙ icon]  │
├──────────────────────────────────────┤
│                                      │
│  Content Area                        │  16px horizontal padding
│  (ScrollView)                        │  8px compact vertical rhythm
│                                      │  between form elements
│  ┌──────────────────────────────┐    │
│  │  Card (12px padding)         │    │  12px vertical gap between cards
│  │                              │    │
│  └──────────────────────────────┘    │
│                                      │
│  ┌──────────────────────────────┐    │
│  │  Card                        │    │
│  └──────────────────────────────┘    │
│                                      │
├──────────────────────────────────────┤
│  Tab Bar (64px height)               │  4 tabs equally spaced
│  [Config] [Compare] [Console] [History]
└──────────────────────────────────────┘
```

### 5.3 Website Layout

```
Desktop: 12-column grid, 1200px max-width, 24px gutters
Tablet: 8-column fluid grid, 24px margins
Mobile: Single column, 16px margins
```

---

## 6. Elevation & Depth

### 6.1 Tonal Layering (No Heavy Shadows)

Depth is conveyed through **Tonal Layering** and **Glassmorphism**, avoiding traditional heavy shadows which look muddy on charcoal backgrounds.

| Element | Background | Border | Effect |
| :--- | :--- | :--- | :--- |
| **Base (App BG)** | `#121212` | None | Deepest layer |
| **Card** | `#1E1E1E` | `1px solid rgba(255,255,255,0.06)` | Ghost border |
| **Card (hover)** | `#1E1E1E` | `1px solid #BD93F9` | Purple active border |
| **Modal/Overlay** | `rgba(30,30,30,0.85)` | `1px solid rgba(255,255,255,0.1)` | `backdrop-filter: blur(12px)` |
| **Sticky Header** | `rgba(18,18,18,0.8)` | Bottom border `#2D2D2D` | `backdrop-filter: blur(12px)` |
| **Input Field** | `#0F0F0F` | `1px solid #2D2D2D` | Darker than card |
| **Input (Focus)** | `#0F0F0F` | `1px solid #BD93F9` | Purple glow ring |

### 6.2 Glass Effects Specification

```css
/* Glassmorphic overlay (modals, bottom sheets) */
.glass-overlay {
  background: rgba(30, 30, 30, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Glassmorphic card (premium elements) */
.glass-card {
  background: rgba(30, 30, 30, 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
}
```

### 6.3 Data Glow Effect

For visualization components (charts, live metrics), a subtle outer glow using accent colors signifies "live" or "critical" data:

```css
/* Live data glow — Cyan accent */
.data-glow-live {
  box-shadow: 0 0 20px rgba(139, 233, 253, 0.15);
}

/* Critical data glow — Red accent */
.data-glow-critical {
  box-shadow: 0 0 20px rgba(255, 85, 85, 0.2);
}

/* Success data glow — Green accent */
.data-glow-success {
  box-shadow: 0 0 20px rgba(80, 250, 123, 0.15);
}
```

---

## 7. Component Specifications

### 7.1 Buttons

| Variant | Background | Text | Border | Radius | Height |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Primary** | `#BD93F9` | `#411478` (dark) | None | 4px | 44px (mobile), 40px (web) |
| **Secondary (Ghost)** | Transparent | `#E5E7EB` | `1px solid rgba(255,255,255,0.1)` | 4px | 44px |
| **Danger** | `rgba(255,85,85,0.15)` | `#FF5555` | `1px solid #FF5555` | 4px | 44px |
| **Icon Button** | Transparent | `#9CA3AF` | None | 4px | 32×32px |
| **Primary (Hover)** | `#C9A4FF` | `#411478` | None | 4px | — |
| **Primary (Pressed)** | `#A87DE8` | `#411478` | None | 4px | — |

### 7.2 Input Fields (Config Builder)

```
┌──────────────────────────────────────────────────┐
│  PROVIDER                           ← label-caps │
│  ┌──────────────────────────────────────────────┐│
│  │  Amazon Web Services (AWS)              ▾    ││ ← code-md, #E5E7EB text
│  │  Background: #0F0F0F                          ││
│  │  Border: 1px solid #2D2D2D                    ││
│  │  Border-radius: 4px                           ││
│  │  Padding: 12px 16px                           ││
│  │  Height: 48px                                 ││
│  └──────────────────────────────────────────────┘│
│                                                   │
│  Focus State:                                     │
│  Border: 1px solid #BD93F9                        │
│  Box-shadow: 0 0 0 2px rgba(189,147,249,0.2)     │
└──────────────────────────────────────────────────┘
```

### 7.3 Cards

| Card Type | Background | Border | Radius | Padding | Shadow |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Standard** | `#1E1E1E` | `1px solid rgba(255,255,255,0.06)` | 8px | 16px | None |
| **Result Card** | Glassmorphic | `1px solid rgba(255,255,255,0.1)` | 8px | 20px | Glow (rating color) |
| **Provider Card** | `#1E1E1E` | `1px solid #2D2D2D` | 8px | 16px | None |
| **Provider (Winner)** | `rgba(80,250,123,0.08)` | `1px solid #50FA7B` | 8px | 16px | Green glow |
| **Code Block** | `#000000` | None | 8px | 16px | None |

### 7.4 Rating Badges

```
LOW:      ┌──────────────────────┐
          │  ● LOW               │  bg: rgba(80,250,123,0.2)
          │                      │  border: 1px solid #50FA7B
          │  text: #50FA7B       │  radius: 12px (pill)
          │  font: label-caps    │  padding: 4px 12px
          └──────────────────────┘

MEDIUM:   ┌──────────────────────┐
          │  ● MEDIUM            │  bg: rgba(255,184,108,0.2)
          │                      │  border: 1px solid #FFB86C
          │  text: #FFB86C       │  
          └──────────────────────┘

HIGH:     ┌──────────────────────┐
          │  ● HIGH              │  bg: rgba(255,85,85,0.2)
          │                      │  border: 1px solid #FF5555
          │  text: #FF5555       │  
          └──────────────────────┘

CRITICAL: ┌──────────────────────┐
          │  ◉ CRITICAL          │  bg: rgba(255,85,85,0.35)
          │                      │  border: 2px solid #FF5555
          │  text: #FF5555       │  PULSING animation
          └──────────────────────┘
```

### 7.5 Tab Bar

```
┌────────────────────────────────────────────────────┐
│  Height: 64px                                       │
│  Background: #121212 (with top border #2D2D2D)     │
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────┐
│  │  ⚡       │  │  ⚖       │  │  🔌       │  │  📊  │
│  │  Config   │  │  Compare  │  │  Console  │  │ Hist │
│  │           │  │           │  │           │  │      │
│  │ ACTIVE:   │  │ INACTIVE: │  │           │  │      │
│  │ #BD93F9   │  │ #9CA3AF   │  │           │  │      │
│  │ text      │  │ text      │  │           │  │      │
│  └──────────┘  └──────────┘  └──────────┘  └──────┘
│                                                     │
│  Active tab has purple dot indicator below icon      │
└────────────────────────────────────────────────────┘
```

### 7.6 Data Visualization (Charts)

| Chart Element | Color | Stroke | Style |
| :--- | :--- | :--- | :--- |
| Primary data line/bar | `#8BE9FD` (Cyan) | 1px | Smooth |
| Secondary data | `#4A4451` (Muted) | 1px | Dashed |
| Compute breakdown | `#BD93F9` (Purple) | — | Filled bar |
| Memory breakdown | `#8BE9FD` (Cyan) | — | Filled bar |
| Storage breakdown | `#50FA7B` (Green) | — | Filled bar |
| Grid/Axis lines | `rgba(255,255,255,0.06)` | 1px | — |
| Axis labels | `#9CA3AF` (Muted) | — | code-sm |
| Data point values | `#E5E7EB` | — | code-md |

### 7.7 Code Blocks (API Console / SDK Docs)

```
Background: #000000 (pure black)
Font: JetBrains Mono
Border-radius: 8px
Padding: 16px

Syntax Highlighting:
  Keywords:    #BD93F9 (Purple)
  Strings:     #50FA7B (Green)
  Variables:   #8BE9FD (Cyan)
  Numbers:     #FFB86C (Orange)
  Comments:    #6272A4 (Muted Blue-Gray)
  Brackets:    #F8F8F2 (Off-White)
  Properties:  #FF79C6 (Pink)
```

---

## 8. Mobile App Screen Designs

### 8.1 Stitch MCP Screen Reference

The following screens have been designed in the Stitch MCP "Midnight Developer Interface" project:

| Screen Name | Stitch Screen ID | Device | Dimensions |
| :--- | :--- | :--- | :--- |
| **Config Builder** | `a357580dc3874936b739316f497b8696` | Mobile | 780×2214 |
| **Calculation Results** | `8e88b6de0938434a8283d31436aec98c` | Mobile | 780×2642 |
| **Compare Providers** | `cf19a951b4a6436cb0d2a3744cfcdac4` | Mobile | 780×2666 |
| **API Console** | `50249fa314c5439a9645024f970447e7` | Mobile | 780×1768 |
| **Calculation History** | `224cf81a123a4e3fadeab4a8f816df77` | Mobile | 780×1768 |
| **History with Trends** | `5959139084b341c98598a5edffb41c47` | Mobile | 780×2182 |
| **History + Provider Comparison** | `0402465c77e444f3be9d29c8cb9f0826` | Mobile | 780×2600 |
| **Settings** | `10de0fdae7a34091a5ab3ff1bce2754e` | Mobile | 780×1768 |
| **SDK Documentation** | `cfd34e9a00db41348d61b6dfbad12081` | Mobile | 780×3600 |
| **CarbonSDK Logo** | `b9fe31f9b4e9488a9f6336b0986015d6` | — | 512×512 |

### 8.2 Website Screen Reference

| Screen Name | Stitch Screen ID | Device | Dimensions |
| :--- | :--- | :--- | :--- |
| **Landing Page** | `de1913d6c4614b4e96e09f390e2c8f43` | Desktop | 2560×3648 |
| **Developer Documentation** | `788a8b05ce3b4d7e80dc97f22dfd86c4` | Desktop | 2560×4048 |
| **Admin Panel Dashboard** | `dec2ff342db44ad298deaf266352de43` | Desktop | 2560×2928 |
| **Admin Dashboard (Alt)** | `3aed8b9bb31b46ee9f034f02c408b9fc` | Desktop | 2560×2048 |
| **Feature Control Panel** | `eda47494d36a44c3b25d0488a94237bb` | Desktop | 2560×2048 |

---

## 9. Website Screen Designs

### 9.1 Landing Page Layout

```
┌──────────────────────────────────────────────────────────────┐
│  NAVBAR (Glassmorphic, sticky)                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  backdrop-filter: blur(12px)                            │  │
│  │  background: rgba(18,18,18,0.8)                         │  │
│  │  border-bottom: 1px solid #2D2D2D                       │  │
│  │                                                         │  │
│  │  [🌱 Carbonix Logo]  [Docs] [Playground] [GitHub] [npm] │  │
│  │                                            [Get SDK ▸]  │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
│  HERO (Full viewport height)                                 │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Background: Gradient mesh (#121212 → #1a0d2e)         │  │
│  │                                                         │  │
│  │  headline-lg: "The carbon cost of your                  │  │
│  │               cloud infrastructure."                    │  │
│  │  headline-md (text-muted): "In 5 lines of code."       │  │
│  │                                                         │  │
│  │  ┌────────────── Code Block ──────────────┐            │  │
│  │  │  import { Carbonix } from 'carbonix'   │            │  │
│  │  │  const sdk = new Carbonix({            │            │  │
│  │  │    apiKey: 'your-key'                  │            │  │
│  │  │  })                                    │            │  │
│  │  │  const result = await sdk.calculate... │            │  │
│  │  └────────────────────────────────────────┘            │  │
│  │                                                         │  │
│  │  [Get the SDK (Primary)] [Open the Docs (Ghost)]        │  │
│  │                                                         │  │
│  │  ┌─── Animated Counter ───┐                             │  │
│  │  │  ↑ 1,247 kg CO₂        │  (counting up animation)   │  │
│  │  │  tracked today          │                             │  │
│  │  └────────────────────────┘                             │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
│  ... Problem → How It Works → SDK Install → Comparison ...   │
└──────────────────────────────────────────────────────────────┘
```

### 9.2 Admin Panel Layout

```
┌──────────────────────────────────────────────────────────────┐
│  Sidebar (240px width, fixed)       │   Main Content Area    │
│  ┌──────────────────────────┐       │   ┌────────────────┐   │
│  │  bg: #0b0f11              │       │   │                │   │
│  │  border-right: #2D2D2D   │       │   │  Dashboard     │   │
│  │                           │       │   │  Overview      │   │
│  │  [🌱 Carbonix Admin]     │       │   │  Cards (4x)    │   │
│  │                           │       │   │                │   │
│  │  📊 Dashboard ← active   │       │   │  ┌──┐ ┌──┐    │   │
│  │  📈 Analytics             │       │   │  │  │ │  │    │   │
│  │  🎛 Feature Flags         │       │   │  └──┘ └──┘    │   │
│  │  📝 Content               │       │   │  ┌──┐ ┌──┐    │   │
│  │  👥 Users                 │       │   │  │  │ │  │    │   │
│  │  🔑 API Keys              │       │   │  └──┘ └──┘    │   │
│  │  👤 Team                  │       │   │                │   │
│  │  🔔 Notifications         │       │   │  Live Feed     │   │
│  │  📋 Audit Log             │       │   │  (table)       │   │
│  │                           │       │   │                │   │
│  │  ─────────────            │       │   └────────────────┘   │
│  │  ⚙ Settings               │       │                        │
│  │  🚪 Logout                │       │                        │
│  └──────────────────────────┘       │                        │
└──────────────────────────────────────────────────────────────┘
```

---

## 10. Animation & Interaction Patterns

### 10.1 Micro-Animations

| Element | Animation | Duration | Easing |
| :--- | :--- | :--- | :--- |
| CO₂ result number | Count-up from 0 | 800ms | `easeOutExpo` |
| Rating badge | Scale in (0 → 1) | 300ms | `spring(damping: 15)` |
| Breakdown bars | Width expand from 0% | 600ms | `easeOutCubic` (staggered 100ms) |
| Card entry | Fade in + slide up (20px) | 400ms | `easeOut` |
| Tab switch | Cross-fade content | 200ms | `easeInOut` |
| Button press | Scale to 0.95 | 100ms | `linear` |
| Pull-to-refresh | Spinner rotate | Continuous | `linear` |
| Critical pulse | Opacity 1 → 0.5 → 1 | 2000ms | `easeInOut` (loop) |
| Swipe-to-delete | Translate X, reveal red background | Gesture-driven | `spring` |
| Toast notification | Slide down from top + fade | 300ms in / 200ms out | `spring` |

### 10.2 Transition Patterns

```
Screen transitions:     React Navigation default (slide from right)
Modal presentations:    Slide up from bottom + backdrop fade
Bottom sheet:          Spring animation with drag dismissal
Loading states:        Skeleton screens (shimmer effect on #1E1E1E → #272A2D)
Error states:          Shake animation (translateX ±10px, 3 cycles)
```

### 10.3 Loading State Pattern

```
Skeleton Screen:
┌──────────────────────────────────┐
│  ████████████████░░░░░░░░░░░░░░  │  ← Shimmer animation
│  ████████████░░░░░░░░░░░░░░░░░░  │     bg: #1E1E1E
│  ┌──────────────────────────────┐│     shimmer: #272A2D gradient
│  │  ████████████████░░░░░░░░░░  ││     sweeping left to right
│  │  ██████████░░░░░░░░░░░░░░░░  ││     duration: 1500ms
│  │  ████████████████████░░░░░░  ││     infinite loop
│  └──────────────────────────────┘│
└──────────────────────────────────┘
```

---

## 11. Iconography & Imagery

### 11.1 Icon System

| Category | Library | Style | Size |
| :--- | :--- | :--- | :--- |
| Navigation icons | Lucide React Native | Outline, 1.5px stroke | 24×24 |
| Action icons | Lucide React Native | Outline | 20×20 |
| Provider logos | Custom SVG | Monochrome (white on dark) | 32×32 |
| Status icons | Custom SVG | Filled circles | 8×8 |

### 11.2 Provider Logo Treatment

All cloud provider logos are rendered in **monochrome white** (`#E5E7EB`) on dark backgrounds to maintain the neutral developer-tool aesthetic. Color provider logos are only used in the website's comparison section.

---

## 12. Accessibility Guidelines

### 12.1 Color Contrast Compliance

| Text Type | Foreground | Background | Ratio | WCAG AA |
| :--- | :--- | :--- | :--- | :--- |
| Body text | `#D1D5DB` | `#121212` | 12.5:1 | ✓ |
| Header text | `#E5E7EB` | `#121212` | 14.7:1 | ✓ |
| Muted text | `#9CA3AF` | `#121212` | 7.2:1 | ✓ |
| Primary button text | `#411478` | `#BD93F9` | 5.8:1 | ✓ |
| Success badge | `#50FA7B` | `rgba(80,250,123,0.2)` on `#121212` | 9.1:1 | ✓ |
| Error badge | `#FF5555` | `rgba(255,85,85,0.2)` on `#121212` | 4.7:1 | ✓ |

### 12.2 Touch Targets

All interactive elements must meet minimum touch target sizes:
- **iOS:** 44×44 pt minimum
- **Android:** 48×48 dp minimum
- **Web:** 44×44 px minimum (pointer), 48×48 px (touch)

---

## 13. Stitch MCP Design Reference

### 13.1 Project Details

| Attribute | Value |
| :--- | :--- |
| **Project Title** | Midnight Developer Interface |
| **Project ID** | `projects/18234059665191599873` |
| **Project Type** | TEXT_TO_UI_PRO |
| **Device Type** | MOBILE (primary) + DESKTOP (website) |
| **Created** | May 22, 2026 |
| **Last Updated** | June 9, 2026 |
| **Total Screens** | 17 (10 mobile + 5 desktop + 1 logo + 1 image) |

### 13.2 Design System Configuration

```yaml
Color Mode: DARK
Primary Font: Inter
Headline Font: Inter
Body Font: Inter
Label Font: JetBrains Mono
Roundness: ROUND_FOUR
Color Variant: FIDELITY
Primary Override: #BD93F9
Secondary Override: #8BE9FD
Tertiary Override: #121212
Neutral Override: #E5E7EB
Spacing Scale: 2
```

### 13.3 Accessing Designs

To access screen designs from the Stitch MCP:

```
# List all screens
StitchMCP → list_screens(projectId: "projects/18234059665191599873")

# Get specific screen HTML/screenshot
StitchMCP → get_screen(screenId: "projects/18234059665191599873/screens/<screen_id>")
```

Each screen includes:
- **Screenshot:** Preview image of the rendered design
- **HTML Code:** Full HTML/CSS implementation ready for reference
- **Dimensions:** Width × Height in pixels
- **Device Type:** Mobile (780px width) or Desktop (2560px width)
