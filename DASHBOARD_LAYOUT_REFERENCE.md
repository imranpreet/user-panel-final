# Dashboard Layout Reference

## Full Page Layout

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                            TOP NAVIGATION BAR                                 │
│  (Header with Logo, Search, User Account, etc.)                              │
├───────────────────────────┬────────────────────────────────────────────────────┤
│                           │                                                    │
│        SIDEBAR            │              MAIN CONTENT AREA                    │
│     (w-64 / 256px)        │         (flex-1 / responsive)                    │
│                           │                                                    │
│  ┌─────────────────────┐  │  Breadcrumb:                                      │
│  │   User Profile      │  │  Home > My Account > My Information               │
│  │  ┌───────────────┐  │  │                                                    │
│  │  │      AS       │  │  │  ┌──────────────────────────────────────────────┐ │
│  │  │  (Initials)   │  │  │  │                                              │ │
│  │  └───────────────┘  │  │  │          SECTION CONTENT                     │ │
│  │  Arsh Deep          │  │  │                                              │ │
│  │  arshdeep@...       │  │  │  (Dashboard, Personal Info, Preferences,    │ │
│  │                     │  │  │   Password, Budget, or Settings)             │ │
│  └─────────────────────┘  │  │                                              │ │
│  ┌─────────────────────┐  │  │                                              │ │
│  │  NAVIGATION ITEMS   │  │  │                                              │ │
│  ├─────────────────────┤  │  │                                              │ │
│  │ 📊 Dashboard        │  │  │                                              │ │
│  ├─────────────────────┤  │  │                                              │ │
│  │ 👤 Personal Info    │  │  │                                              │ │
│  ├─────────────────────┤  │  │                                              │ │
│  │ 🔔 Preferences      │  │  │                                              │ │
│  ├─────────────────────┤  │  │                                              │ │
│  │ 🔒 Password         │  │  │                                              │ │
│  ├─────────────────────┤  │  │                                              │ │
│  │ 💰 My Budget        │  │  │                                              │ │
│  ├─────────────────────┤  │  │                                              │ │
│  │ ⚙️ Settings         │  │  │                                              │ │
│  └─────────────────────┘  │  └──────────────────────────────────────────────┘ │
│                           │                                                    │
│  ┌─────────────────────┐  │                                                    │
│  │   [ LOGOUT BTN ]    │  │                                                    │
│  │   (Red Button)      │  │                                                    │
│  └─────────────────────┘  │                                                    │
│                           │                                                    │
└───────────────────────────┴────────────────────────────────────────────────────┘
```

## Dashboard Section - Detailed View

```
┌─────────────────────────────────────────────────────────────────────────┐
│ HOME > MY ACCOUNT > DASHBOARD                                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                     HERO SECTION                                   │ │
│  │            Welcome Back!                                          │ │
│  │    Track your activities...                                       │ │
│  │                                                                   │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  STATISTICS CARDS ROW                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  │ Total Views  │  │  Purchases   │  │  Favorites   │  │   Wishlist   │
│  │    3,640     │  │      41      │  │     287      │  │     156      │
│  │  ↑ 12% ▲     │  │   ↑ 8% ▲     │  │  ↑ 15% ▲     │  │  ↑ 5% ▲      │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
│
│  CHARTS SECTION (2 row layout)
│  ┌────────────────────────────────────┐  ┌──────────────────────┐
│  │                                    │  │                      │
│  │   LINE CHART                       │  │   PIE CHART          │
│  │   Activity Trends                  │  │   Distribution       │
│  │   (Views, Purchases, Favorites)    │  │   (Categories)       │
│  │                                    │  │                      │
│  └────────────────────────────────────┘  └──────────────────────┘
│
│  ┌──────────────────────────────────────────────────────────┐
│  │             BAR CHART                                    │
│  │   Purchases by Category                                 │
│  │   (Paintings, Sculptures, Digital Art, Photography)     │
│  └──────────────────────────────────────────────────────────┘
│
│  RECENT ACTIVITY TIMELINE
│  ┌──────────────────────────────────────────────────────────┐
│  │ • Purchased "Abstract Dreams"          Today at 2:30 PM  │
│  │ • Added "Moon Light" to favorites      Yesterday 5:45 PM │
│  │ • Visited Gallery "Modern Art Space"   2 days ago        │
│  │ • Followed Artist "John Smith"         3 days ago        │
│  │ • Purchased "Sculpture Series"         1 week ago        │
│  └──────────────────────────────────────────────────────────┘
│
└─────────────────────────────────────────────────────────────────────────┘
```

## Personal Information Section - Detailed View

```
┌─────────────────────────────────────────────────────────────────────────┐
│ HOME > MY ACCOUNT > PERSONAL INFORMATION                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  PERSONAL INFORMATION                                                   │
│  ════════════════════════════════════════════════════════════════      │
│                                                                          │
│  ┌──────────────────────┐  ┌──────────────────────┐                    │
│  │ Last name            │  │ First name           │                    │
│  │ [_______________]    │  │ [_______________]    │                    │
│  └──────────────────────┘  └──────────────────────┘                    │
│                                                                          │
│  Date of Birth                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                              │
│  │ MM       │  │ DD       │  │ YYYY     │                              │
│  │[____]    │  │[____]    │  │[______]  │                              │
│  └──────────┘  └──────────┘  └──────────┘                              │
│                                                                          │
│  Email *                                                                 │
│  ┌──────────────────────────────────────────┐                          │
│  │ arshdeepkaur24@navgurukul.org (READONLY) │                          │
│  └──────────────────────────────────────────┘                          │
│                                                                          │
│  Phone number *                                                          │
│  ┌──────────┐  ┌──────────────────────────┐                            │
│  │ 🇮🇳 +91 │  │ [_____________________]  │                            │
│  └──────────┘  └──────────────────────────┘                            │
│                                                                          │
│  ┌─────────────────────────────────────────┐                           │
│  │  [ Save my information ] (Black Button)  │                          │
│  └─────────────────────────────────────────┘                           │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

## Preferences Section - Detailed View

```
┌─────────────────────────────────────────────────────────────────────────┐
│ HOME > MY ACCOUNT > PREFERENCES                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  CHOOSE YOUR PREFERENCES                                                │
│  ════════════════════════════════════════════════════════════════      │
│                                                                          │
│  Country *                                                               │
│  ┌──────────────────────────────────────────┐                          │
│  │ India                                    │                          │
│  └──────────────────────────────────────────┘                          │
│                                                                          │
│  Language *                                                              │
│  ┌──────────────────────────────────────────┐                          │
│  │ English                                  │                          │
│  └──────────────────────────────────────────┘                          │
│                                                                          │
│  Currency *                                                              │
│  ┌──────────────────────────────────────────┐                          │
│  │ USD ($)                                  │                          │
│  └──────────────────────────────────────────┘                          │
│                                                                          │
│  Measure *                                                               │
│  ┌──────────────────────────────────────────┐                          │
│  │ Cm                                       │                          │
│  └──────────────────────────────────────────┘                          │
│                                                                          │
│  ┌─────────────────────────────────────────┐                           │
│  │  [ Update preferences ] (Black Button)   │                          │
│  └─────────────────────────────────────────┘                           │
│                                                                          │
│  MY EMAIL NOTIFICATIONS                                                 │
│  ─────────────────────────────────────────────────────────────────    │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │ ☑️ 🎁 Notifications concerning promotions                        │ │
│  └──────────────────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │ ☑️ 🎨 Notifications concerning your favorite artists             │ │
│  └──────────────────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │ ☑️ 🏛️ Notifications concerning your favorite galleries           │ │
│  └──────────────────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │ ☑️ ✨ Notifications concerning your favorite artworks            │ │
│  └──────────────────────────────────────────────────────────────────┘ │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

## Settings Section - Detailed View

```
┌─────────────────────────────────────────────────────────────────────────┐
│ HOME > MY ACCOUNT > SETTINGS                                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  TWO-COLUMN LAYOUT                                                      │
│  ┌────────────────────────────┐  ┌────────────────────────────┐        │
│  │  ACCOUNT SETTINGS          │  │  PRIVACY & DATA            │        │
│  ├────────────────────────────┤  ├────────────────────────────┤        │
│  │ • Two-Factor Auth...       │  │ • Download Your Data       │        │
│  │   Enhance security         │  │   Get a copy               │        │
│  │                            │  │                            │        │
│  │ • Privacy Settings         │  │ • Data Preferences         │        │
│  │   Control visibility       │  │   Control collection       │        │
│  │                            │  │                            │        │
│  │ • Session Management       │  │ • Delete Account           │        │
│  │   Manage active sessions   │  │   Permanently delete       │        │
│  └────────────────────────────┘  └────────────────────────────┘        │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

## Mobile Layout (≤768px)

```
┌─────────────────────────────┐
│ ☰ Menu     LOGO    Account  │  ← Header
├─────────────────────────────┤
│                             │
│  ┌─────────────────────────┐│
│  │   MAIN CONTENT AREA     ││
│  │                         ││
│  │  (Full width when      ││
│  │   sidebar is hidden)    ││
│  │                         ││
│  │                         ││
│  └─────────────────────────┘│
│                             │
└─────────────────────────────┘

When Menu is clicked:
┌─────────────────────────────┐
│ ✕ Menu     LOGO    Account  │
├───────────────────┐         │
│ SIDEBAR OVERLAY   │ CONTENT │
│ ┌───────────────┐ │         │
│ │ • Dashboard   │ │         │
│ │ • Personal    │ │         │
│ │ • Preferences │ │         │
│ │ • Password    │ │         │
│ │ • Budget      │ │         │
│ │ • Settings    │ │         │
│ │               │ │         │
│ │  [LOGOUT]     │ │         │
│ └───────────────┘ │         │
│                   │         │
└───────────────────┴─────────┘
(Semi-transparent dark overlay in background)
```

## Color Reference

```
SIDEBAR
├── Background: Linear gradient from teal-700 to teal-900
│   └── Color codes: from #0d9488 to #134e4a
├── Text: White (teal-100)
├── Active Button: White background with teal text
└── Logout: Red-600 (#dc2626)

MAIN CONTENT
├── Background: White & Gray-50
├── Headers: Black text
├── Borders: Gray-200 & Gray-300
├── Highlights: Teal-500 (focus rings)
└── Accents: Amber-300, Amber-500

STATISTICS CARDS
├── Teal: #0d9488
├── Amber: #d97706
├── Purple: #a855f7
└── Pink: #ec4899

CHARTS
├── Line Colors: Teal, Amber, Purple
├── Bar Color: Teal
└── Pie Colors: Various warm tones
```

## Responsive Breakpoints

```
Mobile (<768px)
├── Sidebar: Hidden by default, hamburger menu visible
├── Main content: Full width
└── Layout: Single column

Tablet (768px - 1024px)
├── Sidebar: Can toggle
├── Main content: Responsive
└── Layout: Flex (can adjust)

Desktop (>1024px)
├── Sidebar: Always visible
├── Main content: Takes remaining space
└── Layout: Fixed two-column
```

## Interactive Elements

```
BUTTONS
├── Primary: Black background, white text, rounded-full
├── Secondary: Teal background, white text
├── Danger: Red background
└── All: Hover effects with color changes

INPUTS
├── Text inputs: Border on focus, teal ring
├── Checkboxes: Amber accent color
├── Radio buttons: Teal accent
└── Disabled: Gray background

LINKS & NAVIGATION
├── Active: Highlight with white background
├── Hover: Background color change
└── Transitions: Smooth 200-300ms
```

---

This reference shows the complete visual structure of your new dashboard!
