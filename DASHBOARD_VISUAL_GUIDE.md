# My Information Dashboard - Visual Guide

## 🎨 Layout Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        HEADER / NAVIGATION                       │
├──────────────┬────────────────────────────────────────────────────┤
│              │                                                    │
│   SIDEBAR    │         MAIN CONTENT AREA                         │
│              │                                                    │
│  • Dashboard │  ┌──────────────────────────────────────────┐    │
│              │  │     Activity Trends Graph                │    │
│  • Personal  │  │     (Line Chart)                        │    │
│              │  ├──────────────────────────────────────────┤    │
│  • Prefs     │  │ Pie Chart │ Bar Chart │ Statistics Cards│    │
│              │  ├──────────────────────────────────────────┤    │
│  • Password  │  │     Recent Activity Timeline             │    │
│              │  └──────────────────────────────────────────┘    │
│  • Budget    │                                                    │
│              │  OR                                                │
│  • Settings  │                                                    │
│              │  ┌──────────────────────────────────────────┐    │
│  [Logout]    │  │   Personal Information Form              │    │
│              │  │   (Based on selected section)            │    │
│              │  └──────────────────────────────────────────┘    │
└──────────────┴────────────────────────────────────────────────────┘
```

## 📊 Dashboard Section Details

### Statistics Cards
```
┌────────────────┐  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│  Total Views   │  │   Purchases    │  │   Favorites    │  │    Wishlist    │
│     3,640      │  │       41       │  │      287       │  │      156       │
│   ↑12% ▲       │  │    ↑8% ▲       │  │    ↑15% ▲      │  │    ↑5% ▲       │
└────────────────┘  └────────────────┘  └────────────────┘  └────────────────┘
```

### Graphs Section
```
LINE CHART (Activity Trends)           PIE CHART (Activity Distribution)
├─ Views   ━━━━━━━━━━━━━               ├─ Local Artists (35%)
├─ Purchases ─ ─ ─ ─ ─ ─               ├─ International (25%)
└─ Favorites ──────────────            ├─ Galleries (20%)
                                       └─ Collections (20%)

BAR CHART (Purchases by Category)
├─ Paintings (12)
├─ Sculptures (8)
├─ Digital Art (15)
└─ Photography (6)
```

## 🎯 Sidebar Sections

### 1. **Dashboard**
   - Hero section with background
   - Statistics overview
   - Activity trends graphs
   - Recent activity timeline

### 2. **Personal Information**
   - Last Name (text input)
   - First Name (text input)
   - Date of Birth (month/day/year)
   - Email (read-only)
   - Phone Number (with country code)
   - Save button

### 3. **Preferences**
   - Country selector
   - Language selector
   - Currency selector
   - Measurement unit selector
   - Email Notifications (checkboxes)
   - Update button

### 4. **Password**
   - Current Password
   - New Password
   - Repeat New Password
   - Change Password button

### 5. **My Budget**
   - Multiple budget range options:
     - Under $500
     - $500 - $1,000
     - $1,000 - $2,500
     - ... and more
   - Save button

### 6. **Settings**
   - Account Settings
     - Two-Factor Authentication
     - Privacy Settings
     - Session Management
   - Privacy & Data
     - Download Your Data
     - Data Preferences
     - Delete Account

## 🎨 Color Scheme

| Element | Color | Tailwind Class |
|---------|-------|-----------------|
| Primary | Teal | `teal-600`, `teal-700` |
| Secondary | Amber | `amber-500`, `amber-300` |
| Success | Green | `green-600` |
| Error | Red | `red-600` |
| Background | Gray | `gray-50`, `gray-200` |

## 📱 Responsive Breakpoints

| Device | Sidebar | Layout |
|--------|---------|--------|
| Mobile (<768px) | Hamburger Menu | Full Width |
| Tablet (768px-1024px) | Toggleable | Flex |
| Desktop (>1024px) | Always Visible | Flex |

## 🔄 User Flow

```
User Opens My Information
    │
    ├─→ Sees Sidebar
    │   ├─→ Can click "Dashboard" (DEFAULT)
    │   ├─→ Can click "Personal Information"
    │   ├─→ Can click "Preferences"
    │   ├─→ Can click "Password"
    │   ├─→ Can click "My Budget"
    │   ├─→ Can click "Settings"
    │   └─→ Can click "Logout"
    │
    └─→ Main Content Area Updates
        ├─→ Shows selected section
        ├─→ Displays forms or graphs
        └─→ User can interact/save
```

## 📈 Sample Data Structure

### Activity Data
```javascript
[
  { month: 'Jan', views: 400, purchases: 240, favorites: 320 },
  { month: 'Feb', views: 500, purchases: 310, favorites: 420 },
  { month: 'Mar', views: 450, purchases: 280, favorites: 380 },
  { month: 'Apr', views: 620, purchases: 420, favorites: 510 },
  { month: 'May', views: 780, purchases: 580, favorites: 650 },
  { month: 'Jun', views: 890, purchases: 720, favorites: 780 },
]
```

### Artist Visits (Pie Chart)
```javascript
[
  { name: 'Local Artists', value: 35, color: '#F59E0B' },
  { name: 'International', value: 25, color: '#D97706' },
  { name: 'Galleries', value: 20, color: '#92400E' },
  { name: 'Collections', value: 20, color: '#78350F' },
]
```

## 🚀 Deployment Notes

1. **Development**: `npm run dev` (runs on port 5174)
2. **Build**: `npm run build`
3. **Preview**: `npm run preview`

## 🔧 Customization Guide

### Change Sidebar Color
Find and replace:
- `from-teal-700` → `from-blue-700`
- `to-teal-900` → `to-blue-900`
- `teal-600` → `blue-600`

### Add New Menu Item
In `menuItems` array:
```javascript
{ id: 'new-section', label: 'New Section', icon: NewIcon }
```

Then add rendering:
```javascript
{activeSection === 'new-section' && (
  <div>Your content here</div>
)}
```

### Connect Real Data
Replace mock data in:
- `activityData`
- `artistVisits`
- `purchaseStats`

With API calls:
```javascript
useEffect(() => {
  fetchActivityData().then(setActivityData);
}, []);
```

## ✨ Key Features Summary

✅ Sidebar Navigation with Profile  
✅ Dashboard with Multiple Graphs  
✅ Line Chart for Activity Trends  
✅ Pie Chart for Distribution  
✅ Bar Chart for Categories  
✅ Statistics Cards with KPIs  
✅ Recent Activity Timeline  
✅ Personal Information Form  
✅ Preferences Management  
✅ Password Change  
✅ Budget Selection  
✅ Settings Panel  
✅ Mobile Responsive  
✅ Smooth Transitions  
✅ Professional Color Scheme  

## 🎓 Learning Points

- React hooks (useState)
- Component state management
- Conditional rendering
- Responsive design with Tailwind
- Chart integration with Recharts
- Icon integration with Lucide React
- Mobile-first responsive design
- Form handling in React
