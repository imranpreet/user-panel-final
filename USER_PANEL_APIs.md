# 👤 USER DASHBOARD/USER PANEL - APIs Required

## Overview
Complete list of all APIs needed for the **User Dashboard/User Panel** with proper organization.

---

## 📋 APIs ORGANIZED BY FEATURE

---

## 1️⃣ USER PROFILE MANAGEMENT

### Get User Profile
```
GET /api/user/profile
```
**Authentication:** Required (Bearer Token)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "USER001",
    "firstName": "Raj",
    "lastName": "Kumar",
    "email": "raj@example.com",
    "phone": "+91-9876543210",
    "profileImage": "https://...",
    "dateOfBirth": "1995-03-15",
    "gender": "Male",
    "country": "India",
    "language": "English",
    "currency": "INR",
    "timezone": "IST",
    "dateFormat": "DD/MM/YYYY",
    "measurementUnit": "cm",
    "createdAt": "2023-01-15"
  }
}
```

### Update User Profile
```
PUT /api/user/profile/update
```
**Authentication:** Required

**Request Body:**
```json
{
  "firstName": "Raj",
  "lastName": "Kumar",
  "phone": "+91-9876543210",
  "dateOfBirth": "1995-03-15",
  "country": "India",
  "language": "English",
  "currency": "INR",
  "timezone": "IST"
}
```

**Response:** Updated user object (same as GET)

### Upload Profile Picture
```
POST /api/user/profile/picture
```
**Authentication:** Required

**Request:** multipart/form-data (image file)

**Response:**
```json
{
  "success": true,
  "data": {
    "profileImage": "https://example.com/profile/USER001.jpg",
    "uploadedAt": "2024-04-16T10:30:00Z"
  }
}
```

---

## 2️⃣ ADDRESS MANAGEMENT

### Get All User Addresses
```
GET /api/user/addresses
```
**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "data": {
    "addresses": [
      {
        "id": "ADDR001",
        "type": "delivery",
        "street1": "123 Main Street",
        "street2": "Apt 4B",
        "city": "Mumbai",
        "state": "Maharashtra",
        "zipCode": "400001",
        "country": "India",
        "phone": "+91-9876543210",
        "isDefault": true,
        "createdAt": "2023-06-15"
      }
    ]
  }
}
```

### Add New Address
```
POST /api/user/addresses/add
```
**Authentication:** Required

**Request Body:**
```json
{
  "type": "delivery",
  "street1": "456 Park Avenue",
  "street2": "Suite 10",
  "city": "Delhi",
  "state": "Delhi",
  "zipCode": "110001",
  "country": "India",
  "phone": "+91-9876543210"
}
```

**Response:** Created address object

### Update Address
```
PUT /api/user/addresses/:id
```
**Authentication:** Required

**Request Body:** Same as Add

**Response:** Updated address object

### Delete Address
```
DELETE /api/user/addresses/:id
```
**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "message": "Address deleted successfully"
}
```

---

## 3️⃣ ORDER MANAGEMENT

### Get All User Orders
```
GET /api/user/orders
```
**Authentication:** Required

**Query Parameters:**
```
status    - pending, processing, in-transit, delivered, cancelled
sortBy    - date, price, status
page      - page number (default: 1)
limit     - items per page (default: 10)
```

**Example:**
```
GET /api/user/orders?status=delivered&sortBy=date&page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "ORD001",
        "orderNumber": "ORD-2024-001",
        "items": [
          {
            "artworkId": "A01",
            "title": "Sunset Dreams",
            "artist": "John Smith",
            "image": "https://...",
            "price": 450000,
            "quantity": 1
          }
        ],
        "subtotal": 450000,
        "shippingCost": 5000,
        "tax": 54000,
        "total": 509000,
        "status": "delivered",
        "paymentMethod": "Credit Card",
        "paymentStatus": "completed",
        "shippingAddress": {
          "street1": "123 Main Street",
          "city": "Mumbai",
          "state": "Maharashtra",
          "country": "India"
        },
        "deliveryDate": "2024-04-15",
        "createdAt": "2024-04-10",
        "updatedAt": "2024-04-15"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalItems": 28
    }
  }
}
```

### Get Order Details
```
GET /api/user/orders/:id
```
**Authentication:** Required

**Response:** Single order object (expanded with full details)

### Cancel Order
```
POST /api/user/orders/:id/cancel
```
**Authentication:** Required

**Request Body:**
```json
{
  "reason": "Changed my mind",
  "comments": "Optional comments"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "ORD001",
    "status": "cancelled",
    "refundStatus": "processing",
    "refundAmount": 509000
  }
}
```

### Track Order
```
GET /api/user/orders/:id/track
```
**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "data": {
    "orderId": "ORD001",
    "status": "in-transit",
    "trackingNumber": "TRK123456789",
    "carrier": "FedEx",
    "timeline": [
      {
        "status": "order-placed",
        "timestamp": "2024-04-10T09:00:00Z",
        "location": "Mumbai Warehouse"
      },
      {
        "status": "shipped",
        "timestamp": "2024-04-11T14:30:00Z",
        "location": "Mumbai Distribution Center"
      },
      {
        "status": "in-transit",
        "timestamp": "2024-04-13T08:00:00Z",
        "location": "Delhi Hub"
      }
    ],
    "estimatedDelivery": "2024-04-16"
  }
}
```

### Get Order Invoice
```
GET /api/user/orders/:id/invoice
```
**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "data": {
    "invoiceNumber": "INV-2024-001",
    "invoiceDate": "2024-04-10",
    "orderId": "ORD001",
    "items": [...],
    "subtotal": 450000,
    "tax": 54000,
    "shippingCost": 5000,
    "total": 509000,
    "downloadUrl": "https://example.com/invoices/INV-2024-001.pdf"
  }
}
```

---

## 4️⃣ PAYMENT METHODS

### Get All Payment Methods
```
GET /api/user/payments/methods
```
**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "data": {
    "methods": [
      {
        "id": "CARD001",
        "type": "credit_card",
        "cardNumber": "•••• •••• •••• 4242",
        "cardHolder": "Raj Kumar",
        "expiryMonth": 12,
        "expiryYear": 2025,
        "cvv": "•••",
        "isDefault": true,
        "createdAt": "2023-06-15"
      }
    ]
  }
}
```

### Add Payment Method
```
POST /api/user/payments/methods/add
```
**Authentication:** Required

**Request Body:**
```json
{
  "type": "credit_card",
  "cardNumber": "4242424242424242",
  "cardHolder": "Raj Kumar",
  "expiryMonth": 12,
  "expiryYear": 2025,
  "cvv": "123",
  "billingAddress": {
    "street1": "123 Main Street",
    "city": "Mumbai",
    "state": "Maharashtra",
    "country": "India",
    "zipCode": "400001"
  }
}
```

**Response:** Created payment method object

### Update Payment Method
```
PUT /api/user/payments/methods/:id
```
**Authentication:** Required

**Request Body:** Same as Add (with partial fields)

**Response:** Updated payment method object

### Delete Payment Method
```
DELETE /api/user/payments/methods/:id
```
**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "message": "Payment method deleted successfully"
}
```

### Set Default Payment Method
```
POST /api/user/payments/methods/:id/default
```
**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "CARD001",
    "isDefault": true
  }
}
```

---

## 5️⃣ NOTIFICATIONS & PREFERENCES

### Get Notification Preferences
```
GET /api/user/notifications/preferences
```
**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "data": {
    "emailNotifications": {
      "followingArtist": {
        "enabled": true,
        "frequency": "instant"
      },
      "savedSearch": {
        "enabled": true,
        "frequency": "daily"
      },
      "newsletter": {
        "enabled": true,
        "frequency": "weekly"
      },
      "favoriteItems": {
        "enabled": true,
        "frequency": "instant"
      },
      "recommendations": {
        "enabled": true,
        "frequency": "weekly"
      }
    },
    "pushNotifications": {
      "enabled": true,
      "frequency": "instant"
    },
    "smsNotifications": {
      "enabled": false,
      "frequency": "weekly"
    }
  }
}
```

### Update Notification Preferences
```
PUT /api/user/notifications/preferences
```
**Authentication:** Required

**Request Body:**
```json
{
  "emailNotifications": {
    "followingArtist": {
      "enabled": true,
      "frequency": "daily"
    },
    "newsletter": {
      "enabled": false
    }
  },
  "pushNotifications": {
    "enabled": true
  }
}
```

**Response:** Updated preferences object

### Get User Notifications
```
GET /api/user/notifications
```
**Authentication:** Required

**Query Parameters:**
```
type    - all, following, saved, newsletter, favorites, recommendations
page    - page number
limit   - items per page
```

**Response:**
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "NOTIF001",
        "type": "following_artist",
        "title": "John Smith has new artwork",
        "message": "John Smith posted a new painting",
        "artistName": "John Smith",
        "artworkId": "A123",
        "read": false,
        "createdAt": "2024-04-16T10:30:00Z"
      }
    ],
    "unreadCount": 5,
    "pagination": {...}
  }
}
```

---

## 6️⃣ BUDGET MANAGEMENT

### Get User Budget
```
GET /api/user/budget
```
**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "data": {
    "selectedRange": "200000-500000",
    "spent": 450000,
    "remaining": 50000,
    "percentage": 90,
    "period": "monthly",
    "budgetRanges": [
      {
        "range": "under-50000",
        "label": "Under ₹50,000",
        "min": 0,
        "max": 50000
      },
      {
        "range": "50000-200000",
        "label": "₹50,000 - ₹2,00,000",
        "min": 50000,
        "max": 200000
      },
      {
        "range": "200000-500000",
        "label": "₹2,00,000 - ₹5,00,000",
        "min": 200000,
        "max": 500000,
        "selected": true
      }
    ]
  }
}
```

### Update Budget
```
PUT /api/user/budget
```
**Authentication:** Required

**Request Body:**
```json
{
  "selectedRange": "500000-above",
  "period": "monthly"
}
```

**Response:** Updated budget object

### Get Budget Analytics
```
GET /api/user/budget/analytics
```
**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "data": {
    "monthlySpending": [
      {
        "month": "January",
        "amount": 150000
      },
      {
        "month": "February",
        "amount": 200000
      },
      {
        "month": "March",
        "amount": 100000
      }
    ],
    "spendingByCategory": [
      {
        "category": "Painting",
        "amount": 300000,
        "percentage": 60
      },
      {
        "category": "Sculpture",
        "amount": 150000,
        "percentage": 30
      }
    ],
    "topSpendingArtists": [
      {
        "artistName": "John Smith",
        "amount": 200000
      }
    ]
  }
}
```

---

## 7️⃣ PASSWORD & SECURITY

### Change Password
```
POST /api/user/change-password
```
**Authentication:** Required

**Request Body:**
```json
{
  "currentPassword": "old_password_123",
  "newPassword": "new_password_456",
  "confirmPassword": "new_password_456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

### Delete Account
```
POST /api/user/delete-account
```
**Authentication:** Required

**Request Body:**
```json
{
  "email": "raj@example.com",
  "password": "password_123",
  "reason": "No longer need this account",
  "confirm": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Account deleted successfully. Your data will be removed within 30 days."
}
```

---

## 8️⃣ SETTINGS

### Get User Settings
```
GET /api/user/settings
```
**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "data": {
    "country": "India",
    "language": "English",
    "timezone": "IST",
    "currency": "INR",
    "dateFormat": "DD/MM/YYYY",
    "measurementUnit": "cm",
    "privacySettings": {
      "profileVisibility": "public",
      "showPurchaseHistory": false,
      "allowMessages": true
    },
    "displayPreferences": {
      "theme": "light",
      "gridLayout": 3,
      "sortBy": "newest"
    }
  }
}
```

### Update Settings
```
PUT /api/user/settings
```
**Authentication:** Required

**Request Body:**
```json
{
  "country": "USA",
  "language": "English",
  "currency": "USD",
  "timezone": "EST",
  "privacySettings": {
    "profileVisibility": "private"
  }
}
```

**Response:** Updated settings object

---

## 9️⃣ NEWSLETTER

### Subscribe to Newsletter
```
POST /api/newsletter/subscribe
```
**Authentication:** Optional

**Request Body:**
```json
{
  "email": "raj@example.com",
  "categories": ["paintings", "sculptures", "digital-art"],
  "frequency": "weekly"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Subscribed to newsletter successfully"
}
```

### Unsubscribe from Newsletter
```
POST /api/newsletter/unsubscribe
```
**Authentication:** Optional

**Request Body:**
```json
{
  "email": "raj@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Unsubscribed from newsletter"
}
```

---

## 🔟 DASHBOARD & ANALYTICS

### Get Dashboard Analytics
```
GET /api/user/dashboard/analytics
```
**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "data": {
    "totalOrders": 12,
    "totalSpent": 450000,
    "savedItems": 35,
    "followingArtists": 28,
    "activityChart": [
      {
        "month": "Jan",
        "orders": 2,
        "spent": 100000
      }
    ],
    "paintingsByArtist": [
      {
        "artist": "John Smith",
        "count": 3
      }
    ],
    "monthlySpending": [...],
    "collectionStats": {
      "paintings": 5,
      "sculptures": 2,
      "digital": 3
    }
  }
}
```

### Get Activity History
```
GET /api/user/activity/history
```
**Authentication:** Required

**Query Parameters:**
```
type    - all, purchases, views, searches, follows
page    - page number
limit   - items per page
```

**Response:**
```json
{
  "success": true,
  "data": {
    "activities": [
      {
        "id": "ACT001",
        "type": "purchase",
        "description": "Purchased artwork 'Sunset Dreams'",
        "artwork": {
          "id": "A01",
          "title": "Sunset Dreams",
          "image": "https://..."
        },
        "timestamp": "2024-04-10T10:30:00Z"
      }
    ],
    "pagination": {...}
  }
}
```

### Get Collection Stats
```
GET /api/user/collection/stats
```
**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "data": {
    "totalArtworks": 10,
    "totalInvestment": 450000,
    "byCategory": {
      "Painting": 5,
      "Sculpture": 2,
      "Digital": 3
    },
    "byArtist": {
      "John Smith": 3,
      "Sarah Lee": 2
    },
    "estimatedValue": 520000,
    "appreciation": "15.5%"
  }
}
```

---

## 1️⃣1️⃣ OFFERS & PROMOTIONS

### Get User Offers
```
GET /api/user/offers
```
**Authentication:** Required

**Query Parameters:**
```
status  - active, used, expired
type    - discount, free-shipping, buy-one-get-one
page    - page number
```

**Response:**
```json
{
  "success": true,
  "data": {
    "offers": [
      {
        "id": "OFFER001",
        "code": "WELCOME10",
        "title": "10% off on first purchase",
        "description": "Get 10% discount on your first order",
        "discountType": "percentage",
        "discountValue": 10,
        "expiryDate": "2024-05-31",
        "status": "active",
        "used": false
      }
    ]
  }
}
```

### Claim Offer
```
POST /api/user/offers/:id/claim
```
**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "OFFER001",
    "claimedAt": "2024-04-16T10:30:00Z",
    "discountApplied": 10000
  }
}
```

---

## 📊 COMPLETE API SUMMARY TABLE

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/user/profile` | GET | Yes | Get user profile |
| `/api/user/profile/update` | PUT | Yes | Update profile |
| `/api/user/profile/picture` | POST | Yes | Upload profile pic |
| `/api/user/addresses` | GET | Yes | Get all addresses |
| `/api/user/addresses/add` | POST | Yes | Add address |
| `/api/user/addresses/:id` | PUT | Yes | Update address |
| `/api/user/addresses/:id` | DELETE | Yes | Delete address |
| `/api/user/orders` | GET | Yes | Get all orders |
| `/api/user/orders/:id` | GET | Yes | Get order details |
| `/api/user/orders/:id/cancel` | POST | Yes | Cancel order |
| `/api/user/orders/:id/track` | GET | Yes | Track order |
| `/api/user/orders/:id/invoice` | GET | Yes | Get invoice |
| `/api/user/payments/methods` | GET | Yes | Get payment methods |
| `/api/user/payments/methods/add` | POST | Yes | Add payment method |
| `/api/user/payments/methods/:id` | PUT | Yes | Update payment |
| `/api/user/payments/methods/:id` | DELETE | Yes | Delete payment |
| `/api/user/payments/methods/:id/default` | POST | Yes | Set default payment |
| `/api/user/notifications/preferences` | GET | Yes | Get notification prefs |
| `/api/user/notifications/preferences` | PUT | Yes | Update notification prefs |
| `/api/user/notifications` | GET | Yes | Get notifications |
| `/api/user/budget` | GET | Yes | Get budget |
| `/api/user/budget` | PUT | Yes | Update budget |
| `/api/user/budget/analytics` | GET | Yes | Get budget analytics |
| `/api/user/change-password` | POST | Yes | Change password |
| `/api/user/delete-account` | POST | Yes | Delete account |
| `/api/user/settings` | GET | Yes | Get settings |
| `/api/user/settings` | PUT | Yes | Update settings |
| `/api/newsletter/subscribe` | POST | No | Subscribe newsletter |
| `/api/newsletter/unsubscribe` | POST | No | Unsubscribe |
| `/api/user/dashboard/analytics` | GET | Yes | Dashboard analytics |
| `/api/user/activity/history` | GET | Yes | Activity history |
| `/api/user/collection/stats` | GET | Yes | Collection stats |
| `/api/user/offers` | GET | Yes | Get offers |
| `/api/user/offers/:id/claim` | POST | Yes | Claim offer |

---

## 🎯 IMPLEMENTATION PRIORITY

### Phase 1 (Week 1) - Essential
- GET /api/user/profile
- PUT /api/user/profile/update
- POST /api/user/profile/picture
- GET /api/user/addresses
- POST /api/user/addresses/add

### Phase 2 (Week 2) - Important
- GET /api/user/orders
- GET /api/user/orders/:id
- GET /api/user/payments/methods
- POST /api/user/payments/methods/add
- GET /api/user/notifications/preferences

### Phase 3 (Week 3) - Enhancement
- PUT /api/user/addresses/:id
- DELETE /api/user/addresses/:id
- POST /api/user/orders/:id/cancel
- GET /api/user/orders/:id/track
- PUT /api/user/payments/methods/:id

### Phase 4 (Week 4) - Complete
- DELETE /api/user/payments/methods/:id
- POST /api/user/payments/methods/:id/default
- PUT /api/user/notifications/preferences
- GET /api/user/budget
- PUT /api/user/budget
- POST /api/user/change-password
- POST /api/user/delete-account
- GET /api/user/settings
- PUT /api/user/settings
- All remaining endpoints

---

## 🔐 AUTHENTICATION

**Required for:** All 34 endpoints (except /api/newsletter endpoints)

**Format:**
```
Authorization: Bearer {jwt_token}
```

**Token includes:**
- User ID
- Email
- Expiration (24 hours)

---

## 📍 RESPONSE FORMAT (Standard)

**Success (200 OK):**
```json
{
  "success": true,
  "data": { /* actual data */ },
  "message": "Success message"
}
```

**Error:**
```json
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Error message"
}
```

---

## ⚠️ ERROR CODES

| Code | Status | Meaning |
|------|--------|---------|
| UNAUTHORIZED | 401 | Auth required |
| FORBIDDEN | 403 | Permission denied |
| NOT_FOUND | 404 | Resource not found |
| VALIDATION_ERROR | 400 | Invalid input |
| DUPLICATE_ENTRY | 409 | Already exists |
| SERVER_ERROR | 500 | Server error |

---

**Total Endpoints:** 34  
**Authentication Required:** 32  
**Public Endpoints:** 2 (newsletter)  
**Status:** Ready for Implementation
