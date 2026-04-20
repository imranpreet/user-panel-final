# 👤 USER PANEL APIs - QUICK REFERENCE

## What You Need for User Dashboard

**34 APIs** organized by feature with proper request/response examples.

---

## 📋 APIS BY SECTION

### 1. USER PROFILE (3 APIs)
```
GET    /api/user/profile              Get user profile
PUT    /api/user/profile/update       Update profile
POST   /api/user/profile/picture      Upload profile pic
```

### 2. ADDRESSES (4 APIs)
```
GET    /api/user/addresses            Get all addresses
POST   /api/user/addresses/add        Add new address
PUT    /api/user/addresses/:id        Update address
DELETE /api/user/addresses/:id        Delete address
```

### 3. ORDERS (5 APIs)
```
GET    /api/user/orders               Get all orders (with filters)
GET    /api/user/orders/:id           Get order details
POST   /api/user/orders/:id/cancel    Cancel order
GET    /api/user/orders/:id/track     Track order
GET    /api/user/orders/:id/invoice   Get invoice
```

### 4. PAYMENTS (5 APIs)
```
GET    /api/user/payments/methods              Get all cards
POST   /api/user/payments/methods/add          Add card
PUT    /api/user/payments/methods/:id          Update card
DELETE /api/user/payments/methods/:id          Delete card
POST   /api/user/payments/methods/:id/default  Set default
```

### 5. NOTIFICATIONS (3 APIs)
```
GET /api/user/notifications/preferences      Get notification settings
PUT /api/user/notifications/preferences      Update notification settings
GET /api/user/notifications                  Get notifications list
```

### 6. BUDGET (3 APIs)
```
GET /api/user/budget              Get budget info
PUT /api/user/budget              Update budget
GET /api/user/budget/analytics    Get budget analytics
```

### 7. SECURITY (2 APIs)
```
POST /api/user/change-password    Change password
POST /api/user/delete-account     Delete account
```

### 8. SETTINGS (2 APIs)
```
GET /api/user/settings            Get settings
PUT /api/user/settings            Update settings
```

### 9. NEWSLETTER (2 APIs)
```
POST /api/newsletter/subscribe      Subscribe (no auth needed)
POST /api/newsletter/unsubscribe    Unsubscribe (no auth needed)
```

### 10. ANALYTICS (3 APIs)
```
GET /api/user/dashboard/analytics   Dashboard analytics
GET /api/user/activity/history      Activity history
GET /api/user/collection/stats      Collection statistics
```

### 11. OFFERS (2 APIs)
```
GET  /api/user/offers         Get available offers
POST /api/user/offers/:id/claim  Claim offer
```

---

## 🎯 CRITICAL APIs (Week 1)

| # | API | Purpose | Notes |
|---|-----|---------|-------|
| 1 | GET /api/user/profile | Load user data on page load | Show name, email, avatar |
| 2 | PUT /api/user/profile/update | Save edited profile | For form submission |
| 3 | POST /api/user/profile/picture | Upload profile photo | Image file upload |
| 4 | GET /api/user/addresses | Show saved addresses | Display in Personal Info |
| 5 | POST /api/user/addresses/add | Add new address | Form submission |

---

## 📊 COMPLETE ENDPOINT LIST

```
PROFILE MANAGEMENT (3)
├─ GET /api/user/profile
├─ PUT /api/user/profile/update
└─ POST /api/user/profile/picture

ADDRESS MANAGEMENT (4)
├─ GET /api/user/addresses
├─ POST /api/user/addresses/add
├─ PUT /api/user/addresses/:id
└─ DELETE /api/user/addresses/:id

ORDER MANAGEMENT (5)
├─ GET /api/user/orders
├─ GET /api/user/orders/:id
├─ POST /api/user/orders/:id/cancel
├─ GET /api/user/orders/:id/track
└─ GET /api/user/orders/:id/invoice

PAYMENT MANAGEMENT (5)
├─ GET /api/user/payments/methods
├─ POST /api/user/payments/methods/add
├─ PUT /api/user/payments/methods/:id
├─ DELETE /api/user/payments/methods/:id
└─ POST /api/user/payments/methods/:id/default

NOTIFICATIONS (3)
├─ GET /api/user/notifications/preferences
├─ PUT /api/user/notifications/preferences
└─ GET /api/user/notifications

BUDGET (3)
├─ GET /api/user/budget
├─ PUT /api/user/budget
└─ GET /api/user/budget/analytics

SECURITY (2)
├─ POST /api/user/change-password
└─ POST /api/user/delete-account

SETTINGS (2)
├─ GET /api/user/settings
└─ PUT /api/user/settings

NEWSLETTER (2)
├─ POST /api/newsletter/subscribe
└─ POST /api/newsletter/unsubscribe

ANALYTICS (3)
├─ GET /api/user/dashboard/analytics
├─ GET /api/user/activity/history
└─ GET /api/user/collection/stats

OFFERS (2)
├─ GET /api/user/offers
└─ POST /api/user/offers/:id/claim
```

---

## 🔐 AUTHENTICATION

**All except 2 APIs require JWT Token:**
```
Authorization: Bearer {token}
```

**Without Auth (Public):**
- POST /api/newsletter/subscribe
- POST /api/newsletter/unsubscribe

---

## 📝 QUERY PARAMETERS

### GET /api/user/orders
```
?status=delivered       Filter by status
&sortBy=date           Sort by: date, price, status
&page=1                Page number
&limit=10              Items per page
```

### GET /api/user/notifications
```
?type=following        Filter: all, following, saved, newsletter, favorites
&page=1                Page number
&limit=10              Items per page
```

### GET /api/user/offers
```
?status=active         Filter: active, used, expired
&type=discount         Filter: discount, free-shipping, buy-one-get-one
&page=1                Page number
```

---

## 🧪 QUICK TESTS

```bash
# Get profile
curl -H "Authorization: Bearer {token}" \
  "http://localhost:5000/api/user/profile"

# Update profile
curl -X PUT -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Raj","phone":"+91-9876543210"}' \
  "http://localhost:5000/api/user/profile/update"

# Get orders with filter
curl -H "Authorization: Bearer {token}" \
  "http://localhost:5000/api/user/orders?status=delivered&sortBy=date"

# Get addresses
curl -H "Authorization: Bearer {token}" \
  "http://localhost:5000/api/user/addresses"

# Subscribe to newsletter (no auth)
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","frequency":"weekly"}' \
  "http://localhost:5000/api/newsletter/subscribe"
```

---

## 💡 KEY FEATURES

### Orders Page
- Filter by status (pending, processing, in-transit, delivered, cancelled)
- Sort by date, price, or status
- View detailed order info
- Cancel orders
- Track orders
- Download invoices

### Profile Page
- Edit personal info
- Upload profile picture
- View/edit addresses
- Add multiple addresses

### Payment Settings
- Add multiple payment methods
- View saved cards (masked)
- Update card details
- Delete cards
- Set default payment method

### Notifications
- Toggle email notifications
- Set notification frequency
- View notification history
- Customize by type

### Dashboard
- View analytics
- Activity history
- Collection statistics
- Budget tracking

---

## 📋 IMPLEMENTATION PHASES

### Week 1 (Essential - 5 APIs)
```
1. GET /api/user/profile
2. PUT /api/user/profile/update
3. POST /api/user/profile/picture
4. GET /api/user/addresses
5. POST /api/user/addresses/add
```

### Week 2 (Important - 5 APIs)
```
6. GET /api/user/orders
7. GET /api/user/orders/:id
8. GET /api/user/payments/methods
9. POST /api/user/payments/methods/add
10. GET /api/user/notifications/preferences
```

### Week 3 (Enhancement - 5 APIs)
```
11. PUT /api/user/addresses/:id
12. DELETE /api/user/addresses/:id
13. POST /api/user/orders/:id/cancel
14. GET /api/user/orders/:id/track
15. PUT /api/user/payments/methods/:id
```

### Week 4 (Complete - 4 APIs)
```
16. DELETE /api/user/payments/methods/:id
17. POST /api/user/payments/methods/:id/default
18. PUT /api/user/notifications/preferences
19. GET /api/user/budget
20. PUT /api/user/budget
... and all remaining endpoints
```

---

## ⚠️ ERROR CODES

```
UNAUTHORIZED (401)       - Token missing or invalid
FORBIDDEN (403)          - Permission denied
NOT_FOUND (404)          - User/resource not found
VALIDATION_ERROR (400)   - Invalid input data
DUPLICATE_ENTRY (409)    - Address/payment already exists
SERVER_ERROR (500)       - Server error
```

---

## 🎯 EACH PAGE NEEDS

### Personal Information
- GET /api/user/profile
- PUT /api/user/profile/update
- POST /api/user/profile/picture
- GET /api/user/addresses
- POST /api/user/addresses/add
- PUT /api/user/addresses/:id
- DELETE /api/user/addresses/:id

### My Orders
- GET /api/user/orders (with filters)
- GET /api/user/orders/:id
- POST /api/user/orders/:id/cancel
- GET /api/user/orders/:id/track
- GET /api/user/orders/:id/invoice

### Payment Settings
- GET /api/user/payments/methods
- POST /api/user/payments/methods/add
- PUT /api/user/payments/methods/:id
- DELETE /api/user/payments/methods/:id
- POST /api/user/payments/methods/:id/default

### Notifications
- GET /api/user/notifications/preferences
- PUT /api/user/notifications/preferences
- GET /api/user/notifications

### Password & Security
- POST /api/user/change-password
- POST /api/user/delete-account

### Budget
- GET /api/user/budget
- PUT /api/user/budget
- GET /api/user/budget/analytics

### Settings
- GET /api/user/settings
- PUT /api/user/settings

### Dashboard
- GET /api/user/dashboard/analytics
- GET /api/user/activity/history
- GET /api/user/collection/stats

### Offers
- GET /api/user/offers
- POST /api/user/offers/:id/claim

---

## 📄 FULL SPECIFICATION

See **USER_PANEL_APIs.md** for:
- Complete request/response examples
- All query parameters
- Detailed implementation guide
- Phase-by-phase timeline
- Error handling details

---

**Total Endpoints:** 34  
**Authentication Required:** 32  
**Public Endpoints:** 2  
**Implementation Time:** 4 weeks (5 endpoints/week)
