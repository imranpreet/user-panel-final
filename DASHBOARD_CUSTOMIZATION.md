# Dashboard Customization Guide

## 📋 Component Structure

```
MyInformationDashboard
├── State Management
│   ├── activeSection (which section to show)
│   ├── sidebarOpen (mobile sidebar toggle)
│   └── formData (all form inputs)
│
├── Sidebar Section
│   ├── Profile Card (user info)
│   ├── Menu Items (navigation)
│   └── Logout Button
│
├── Main Content
│   ├── Breadcrumb (navigation trail)
│   └── Section Content (dynamic based on activeSection)
│       ├── Dashboard (graphs & stats)
│       ├── Personal Info (form)
│       ├── Preferences (form + notifications)
│       ├── Password (form)
│       ├── Budget (radio buttons)
│       └── Settings (cards)
│
└── Mobile Overlay
    └── Toggles sidebar visibility
```

## 🎨 Customization Examples

### Example 1: Change Color Scheme

**Current**: Teal/Amber  
**To Change To**: Blue/Orange

```jsx
// Find all instances of:
from-teal-700  →  from-blue-700
to-teal-900    →  to-blue-900
teal-600       →  blue-600
teal-500       →  blue-500
teal-100       →  blue-100
teal-50        →  blue-50
amber-500      →  orange-500
amber-300      →  orange-300

// Replace in entire file
```

### Example 2: Add New Sidebar Section

**Step 1**: Add to menuItems array (around line 85)
```jsx
const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  // ... existing items ...
  { id: 'my-orders', label: 'My Orders', icon: ShoppingBag }, // NEW
  { id: 'settings', label: 'Settings', icon: Settings },
];
```

**Step 2**: Add new icon import at top
```jsx
import { ShoppingBag } from 'lucide-react';
```

**Step 3**: Add rendering section (find other sections like "Personal Information")
```jsx
{activeSection === 'my-orders' && (
  <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-serif font-bold text-black mb-8 pb-4 border-b-3 border-teal-500">
        MY ORDERS
      </h2>
      {/* Your order content here */}
    </div>
  </div>
)}
```

### Example 3: Update Statistics Cards Data

**Find**: Statistics Cards section (around line 400)
**Current Data**:
```jsx
<div className="text-3xl font-bold text-teal-700 mt-2">3,640</div>
```

**Change To**:
```jsx
// Connect to real data via API
const [stats, setStats] = useState({
  views: 0,
  purchases: 0,
  favorites: 0,
  wishlist: 0
});

useEffect(() => {
  // Fetch from API
  fetchUserStats().then(setStats);
}, []);

// Then use:
<div className="text-3xl font-bold text-teal-700 mt-2">{stats.views}</div>
```

### Example 4: Connect Charts to Real Data

**Current**: Mock data
```jsx
const activityData = [
  { month: 'Jan', views: 400, purchases: 240, favorites: 320 },
  // ... more mock data
];
```

**Change To Real API**:
```jsx
const [activityData, setActivityData] = useState([]);

useEffect(() => {
  fetch('/api/activity')
    .then(res => res.json())
    .then(data => setActivityData(data));
}, []);
```

### Example 5: Add Form Validation

**Current**: No validation
```jsx
<input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleInputChange}
  className="w-full px-5 py-3 border border-gray-300 rounded-lg"
/>
```

**Add Validation**:
```jsx
const [errors, setErrors] = useState({});

const validateForm = () => {
  const newErrors = {};
  if (!formData.firstName) newErrors.firstName = 'First name is required';
  if (!formData.email || !formData.email.includes('@')) {
    newErrors.email = 'Valid email is required';
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

// In form submission:
const handleSave = (e) => {
  e.preventDefault();
  if (validateForm()) {
    // Save data
  }
};

// In input:
<input
  type="text"
  name="firstName"
  value={formData.firstName}
  onChange={handleInputChange}
  className={`w-full px-5 py-3 border rounded-lg ${
    errors.firstName ? 'border-red-500' : 'border-gray-300'
  }`}
/>
{errors.firstName && (
  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
)}
```

### Example 6: Add Dark Mode

**Add State**:
```jsx
const [isDarkMode, setIsDarkMode] = useState(false);
```

**Add Toggle Button** (in sidebar):
```jsx
<button
  onClick={() => setIsDarkMode(!isDarkMode)}
  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg"
>
  {isDarkMode ? '☀️' : '🌙'} Theme
</button>
```

**Apply to Content**:
```jsx
<div className={isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}>
  {/* Content */}
</div>
```

## 🔌 API Integration Examples

### Example 1: Fetch User Data on Mount

```jsx
useEffect(() => {
  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user/profile');
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  fetchUserData();
}, []);
```

### Example 2: Save Form Data

```jsx
const handleSavePersonalInfo = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('/api/user/personal', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      alert('Saved successfully!');
    }
  } catch (error) {
    console.error('Error saving:', error);
  }
};
```

### Example 3: Fetch Activity Data

```jsx
useEffect(() => {
  const fetchActivityData = async () => {
    const response = await fetch('/api/user/activity?months=6');
    const data = await response.json();
    setActivityData(data);
  };
  
  fetchActivityData();
}, []);
```

## 📦 Component Props (if converted to reusable)

```jsx
<MyInformationDashboard
  userId={123}
  userName="Arsh Deep"
  userEmail="arsh@example.com"
  onSave={(data) => console.log('Saved:', data)}
  apiBaseUrl="https://api.example.com"
/>
```

## 🧩 Extracting Sub-components

You can split this large component into smaller ones:

```jsx
// Sidebar.jsx
export function Sidebar({ activeSection, onSectionChange, menuItems }) {
  return (
    // Sidebar JSX
  );
}

// Dashboard.jsx
export function Dashboard() {
  return (
    // Dashboard JSX
  );
}

// Then use:
<MyInformationDashboard>
  <Sidebar onSectionChange={setActiveSection} />
  {activeSection === 'dashboard' && <Dashboard />}
</MyInformationDashboard>
```

## 🎯 Common Modifications

### Change sidebar width
Find: `w-64`  
Change to: `w-72` (wider) or `w-56` (narrower)

### Change chart height
Find: `height={300}`  
Change to: `height={400}` or any value

### Add more menu items
Add to `menuItems` array and create corresponding section

### Change default section
Find: `activeSection = 'dashboard'`  
Change to: `activeSection = 'personal'`

### Disable section
Comment out from menuItems and rendering

### Add loading states
```jsx
const [isLoading, setIsLoading] = useState(false);

// When fetching:
setIsLoading(true);
// ... fetch data
setIsLoading(false);

// In render:
{isLoading ? <LoadingSpinner /> : <Content />}
```

## 📊 Data Format for Graphs

### Activity Data Format
```javascript
{
  month: 'Jan',      // Month name
  views: 400,        // Number value
  purchases: 240,    // Number value
  favorites: 320     // Number value
}
```

### Distribution Data Format
```javascript
{
  name: 'Local Artists',  // Category name
  value: 35,              // Percentage value
  color: '#F59E0B'        // Hex color
}
```

### Category Data Format
```javascript
{
  category: 'Paintings',  // Category name
  count: 12               // Number value
}
```

## 🔐 Security Considerations

When connecting to API:
- Always use HTTPS
- Sanitize user input
- Don't store sensitive data in state
- Use authentication tokens
- Validate data on backend

```jsx
// Secure form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Validate
  if (!validateForm()) return;
  
  // Sanitize (prevent XSS)
  const sanitized = DOMPurify.sanitize(formData);
  
  // Send with auth
  const token = localStorage.getItem('auth_token');
  const response = await fetch('/api/save', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(sanitized)
  });
};
```

## 🚀 Performance Tips

1. **Lazy load images**
   ```jsx
   <img src={birds} alt="Background" loading="lazy" />
   ```

2. **Memoize expensive calculations**
   ```jsx
   const stats = useMemo(() => calculateStats(data), [data]);
   ```

3. **Use React.memo for sub-components**
   ```jsx
   export const StatCard = React.memo(({ title, value }) => {
     return <div>{value}</div>;
   });
   ```

4. **Debounce API calls**
   ```jsx
   const debouncedSearch = debounce((value) => {
     fetch(`/api/search?q=${value}`);
   }, 300);
   ```

---

**Remember**: Test all changes thoroughly before deploying!
