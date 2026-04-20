# USER PANEL - API REQUIREMENTS DOCUMENT

## Backend API Specification for User Panel Integration

This document outlines all API endpoints required for the User Panel frontend to function properly.

---

## Table of Contents
1. [Authentication](#authentication)
2. [User Profile APIs](#user-profile-apis)
3. [Address APIs](#address-apis)
4. [Password & Security APIs](#password--security-apis)
5. [Notification APIs](#notification-apis)
6. [Order APIs](#order-apis)
7. [Payment APIs](#payment-apis)
8. [Budget APIs](#budget-apis)
9. [Offers APIs](#offers-apis)
10. [Settings APIs](#settings-apis)
11. [Newsletter APIs](#newsletter-apis)
12. [Dashboard Analytics APIs](#dashboard-analytics-apis)
13. [Support APIs](#support-apis)

---

## Authentication

### Token Management
- JWT tokens should be provided after login
- Token should be stored in browser localStorage as `authToken`
- All authenticated endpoints require `Authorization: Bearer {token}` header
- Token should expire after 24 hours (configurable)
- Refresh token mechanism for extended sessions (optional)

### Headers Required
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

---

## User Profile APIs

### 1. Get User Profile
**Endpoint:** `GET /api/user/profile`

**Authentication:** Required (Bearer Token)

**Request Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "userId": "user123",
    "firstName": "Arsh",
    "lastName": "Kaur",
    "email": "arshdeepkaur24@navgurukul.org",
    "phone": "+91-9876543210",
    "country": "India",
    "language": "English",
    "currency": "INR",
    "measurement": "cm",
    "timezone": "IST",
    "dateFormat": "MM/DD/YYYY",
    "birthDate": "1995-05-15",
    "profileImage": "https://example.com/profile.jpg",
    "createdDate": "2023-01-15T10:30:00Z",
    "updatedDate": "2024-04-16T15:45:00Z"
  },
  "message": "Profile fetched successfully"
}
```

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "error": "UNAUTHORIZED",
  "message": "Invalid or expired token"
}
```

---

### 2. Update User Profile
**Endpoint:** `PUT /api/user/profile/update`

**Authentication:** Required

**Request Body:**
```json
{
  "firstName": "Arsh",
  "lastName": "Kaur",
  "phone": "+91-9876543210",
  "country": "India",
  "language": "English",
  "currency": "INR",
  "measurement": "cm",
  "timezone": "IST",
  "dateFormat": "MM/DD/YYYY",
  "birthDate": "1995-05-15"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "userId": "user123",
    "firstName": "Arsh",
    "lastName": "Kaur",
    "updatedDate": "2024-04-16T15:50:00Z"
  },
  "message": "Profile updated successfully"
}
```

**Validation Rules:**
- firstName: Required, max 50 characters
- lastName: Required, max 50 characters
- phone: Valid format, max 20 characters
- country: Must be valid country code
- language: Must be supported language
- currency: Must be supported currency code

---

### 3. Upload Profile Picture
**Endpoint:** `POST /api/user/profile/picture`

**Authentication:** Required

**Request:** Multipart Form Data
```
Content-Type: multipart/form-data

Field: profileImage (File)
Max Size: 5MB
Allowed Types: image/jpeg, image/png, image/webp
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "profileImage": "https://example.com/uploads/profile/user123_1234567890.jpg",
    "uploadedDate": "2024-04-16T15:55:00Z"
  },
  "message": "Profile picture uploaded successfully"
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "INVALID_FILE",
  "message": "File size exceeds 5MB limit"
}
```

---

## Address APIs

### 1. Get All Addresses
**Endpoint:** `GET /api/user/addresses`

**Authentication:** Required

**Query Parameters:**
- `type`: Optional (delivery | billing | all) - Default: all

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "addressId": "addr001",
      "fullName": "Arsh Kaur",
      "addressLine1": "123 Main Street",
      "addressLine2": "Apartment 4B",
      "apartment": "4B",
      "zipCode": "110001",
      "city": "Delhi",
      "state": "Delhi",
      "country": "India",
      "isDefault": true,
      "isBillingAddress": true,
      "createdDate": "2023-02-10T10:00:00Z",
      "updatedDate": "2024-04-16T14:00:00Z"
    }
  ],
  "message": "Addresses retrieved successfully"
}
```

---

### 2. Add New Address
**Endpoint:** `POST /api/user/addresses/add`

**Authentication:** Required

**Request Body:**
```json
{
  "fullName": "Arsh Kaur",
  "addressLine1": "123 Main Street",
  "addressLine2": "Apartment 4B",
  "apartment": "4B",
  "zipCode": "110001",
  "city": "Delhi",
  "state": "Delhi",
  "country": "India",
  "isDefault": true,
  "isBillingAddress": false
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "addressId": "addr002",
    "fullName": "Arsh Kaur",
    "addressLine1": "123 Main Street",
    "city": "Delhi",
    "createdDate": "2024-04-16T16:00:00Z"
  },
  "message": "Address added successfully"
}
```

**Validation Rules:**
- fullName: Required, max 100 characters
- addressLine1: Required, max 100 characters
- zipCode: Required, valid format for country
- city: Required, max 50 characters
- state: Required, max 50 characters
- country: Required, must be valid country code

---

### 3. Update Address
**Endpoint:** `PUT /api/user/addresses/{addressId}`

**Authentication:** Required

**Request Body:** (Same as Add Address)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "addressId": "addr001",
    "updatedDate": "2024-04-16T16:10:00Z"
  },
  "message": "Address updated successfully"
}
```

---

### 4. Delete Address
**Endpoint:** `DELETE /api/user/addresses/{addressId}`

**Authentication:** Required

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Address deleted successfully"
}
```

---

## Password & Security APIs

### 1. Change Password
**Endpoint:** `POST /api/user/change-password`

**Authentication:** Required

**Request Body:**
```json
{
  "currentPassword": "oldPassword123!",
  "newPassword": "newPassword456!"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Validation Rules:**
- currentPassword: Must match existing password
- newPassword: Min 8 characters, must contain uppercase, lowercase, number, special char
- newPassword: Must not be same as current password

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "INVALID_PASSWORD",
  "message": "Current password is incorrect"
}
```

---

### 2. Delete Account
**Endpoint:** `DELETE /api/user/delete-account`

**Authentication:** Required

**Request Body:**
```json
{
  "password": "userPassword123!",
  "reason": "Switching to competitor" // Optional
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Account deleted successfully. All data will be removed within 30 days."
}
```

**Important Notes:**
- Require password confirmation for security
- Delete all user data including orders, addresses, payments
- Keep records for 30 days before permanent deletion (GDPR compliance)
- Invalidate all tokens immediately

---

## Notification APIs

### 1. Get Notification Preferences
**Endpoint:** `GET /api/user/notifications/preferences`

**Authentication:** Required

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "followingArtists": {
      "enabled": true,
      "frequency": "daily"
    },
    "savedSearches": {
      "enabled": true,
      "frequency": "daily"
    },
    "newsletter": false,
    "favorites": true,
    "recommendations": true,
    "pushNotifications": true,
    "updatedDate": "2024-04-10T10:00:00Z"
  }
}
```

---

### 2. Update Notification Preferences
**Endpoint:** `PUT /api/user/notifications/preferences`

**Authentication:** Required

**Request Body:**
```json
{
  "followingArtists": {
    "enabled": true,
    "frequency": "instant"
  },
  "savedSearches": {
    "enabled": true,
    "frequency": "weekly"
  },
  "newsletter": true,
  "favorites": true,
  "recommendations": false,
  "pushNotifications": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Notification preferences updated successfully"
}
```

**Valid Frequency Values:**
- `instant` - Immediate notification
- `daily` - Once per day digest
- `weekly` - Once per week digest

---

### 3. Get Notifications List
**Endpoint:** `GET /api/user/notifications`

**Authentication:** Required

**Query Parameters:**
- `limit`: Number of notifications (default: 20, max: 100)
- `offset`: Pagination offset (default: 0)
- `type`: Filter by type (optional)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "total": 45,
    "limit": 20,
    "offset": 0,
    "notifications": [
      {
        "notificationId": "notif001",
        "title": "New artwork from your favorite artist",
        "message": "Emma Wilson just uploaded a new piece",
        "type": "artist_activity",
        "read": false,
        "createdDate": "2024-04-16T15:30:00Z",
        "link": "/artwork/12345"
      }
    ]
  }
}
```

---

## Order APIs

### 1. Get All Orders
**Endpoint:** `GET /api/user/orders`

**Authentication:** Required

**Query Parameters:**
- `status`: Filter by status (all | pending | processing | in-transit | delivered | cancelled)
- `limit`: Number of orders (default: 10)
- `offset`: Pagination offset (default: 0)
- `sort`: Sort by (latest | oldest | price-high | price-low)
- `startDate`: Filter from date (YYYY-MM-DD)
- `endDate`: Filter to date (YYYY-MM-DD)

**Example Request:**
```
GET /api/user/orders?status=delivered&limit=10&offset=0&sort=latest
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "total": 12,
    "limit": 10,
    "offset": 0,
    "orders": [
      {
        "orderId": "ORD-001",
        "artworkTitle": "Krishna Leela",
        "artistName": "Sekhar Roy",
        "artworkImage": "https://example.com/artwork1.jpg",
        "totalPrice": 15000,
        "artworkSize": "116 x 89 cm",
        "artworkType": "Oil on Canvas",
        "quantity": 1,
        "orderStatus": "delivered",
        "paymentStatus": "completed",
        "orderDate": "2024-03-15T10:00:00Z",
        "estimatedDeliveryDate": "2024-04-15T00:00:00Z",
        "actualDeliveryDate": "2024-04-14T14:30:00Z",
        "shippingAddress": {
          "fullName": "Arsh Kaur",
          "addressLine1": "123 Main St",
          "city": "Delhi"
        }
      }
    ]
  }
}
```

---

### 2. Get Order Details
**Endpoint:** `GET /api/user/orders/{orderId}`

**Authentication:** Required

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "orderId": "ORD-001",
    "artworkTitle": "Krishna Leela",
    "artistName": "Sekhar Roy",
    "artistId": "artist123",
    "artworkId": "artwork001",
    "artworkImage": "https://example.com/artwork1.jpg",
    "totalPrice": 15000,
    "artworkSize": "116 x 89 cm",
    "artworkType": "Oil on Canvas",
    "quantity": 1,
    "orderStatus": "delivered",
    "paymentStatus": "completed",
    "orderDate": "2024-03-15T10:00:00Z",
    "estimatedDeliveryDate": "2024-04-15T00:00:00Z",
    "actualDeliveryDate": "2024-04-14T14:30:00Z",
    "trackingNumber": "TRACK123456789",
    "shippingAddress": {...},
    "billingAddress": {...},
    "paymentMethod": "credit_card",
    "invoice": "https://example.com/invoices/INV-001.pdf"
  }
}
```

---

### 3. Cancel Order
**Endpoint:** `POST /api/user/orders/{orderId}/cancel`

**Authentication:** Required

**Request Body:**
```json
{
  "reason": "Changed my mind"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "orderId": "ORD-001",
    "orderStatus": "cancelled",
    "refundStatus": "initiated",
    "refundAmount": 15000,
    "estimatedRefundDate": "2024-04-20T00:00:00Z"
  },
  "message": "Order cancelled successfully. Refund will be processed within 5-7 business days."
}
```

---

### 4. Track Order
**Endpoint:** `GET /api/user/orders/{orderId}/track`

**Authentication:** Required

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "orderId": "ORD-001",
    "trackingNumber": "TRACK123456789",
    "carrier": "FedEx",
    "currentStatus": "in-transit",
    "estimatedDeliveryDate": "2024-04-18T00:00:00Z",
    "trackingEvents": [
      {
        "status": "picked_up",
        "location": "Delhi Distribution Center",
        "timestamp": "2024-04-16T10:00:00Z",
        "description": "Package picked up from warehouse"
      },
      {
        "status": "in_transit",
        "location": "Mumbai Sorting Hub",
        "timestamp": "2024-04-17T05:30:00Z",
        "description": "Package in transit to destination"
      }
    ]
  }
}
```

---

### 5. Get Order Invoice
**Endpoint:** `GET /api/user/orders/{orderId}/invoice`

**Authentication:** Required

**Response:** PDF File (application/pdf)

**Headers:**
```
Content-Type: application/pdf
Content-Disposition: attachment; filename="INV-001.pdf"
```

---

## Payment APIs

### 1. Get Payment Methods
**Endpoint:** `GET /api/user/payments/methods`

**Authentication:** Required

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "paymentId": "pay001",
      "cardholderName": "Arsh Kaur",
      "cardNumber": "•••• •••• •••• 4242",
      "cardType": "visa",
      "expiryDate": "12/26",
      "isDefault": true,
      "billingAddress": {...},
      "createdDate": "2023-05-10T10:00:00Z"
    }
  ]
}
```

---

### 2. Add Payment Method
**Endpoint:** `POST /api/user/payments/methods/add`

**Authentication:** Required

**Request Body:**
```json
{
  "cardholderName": "Arsh Kaur",
  "cardNumber": "4242424242424242",
  "expiryDate": "12/26",
  "cvv": "123",
  "billingAddress": {
    "street": "123 Main St",
    "city": "Delhi",
    "state": "Delhi",
    "postalCode": "110001"
  },
  "isDefault": false
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "paymentId": "pay002",
    "cardNumber": "•••• •••• •••• 4242",
    "createdDate": "2024-04-16T16:20:00Z"
  }
}
```

**Validation Rules:**
- cardNumber: Must pass Luhn check
- expiryDate: Must be future date
- cvv: 3-4 digits, not stored in database
- billingAddress: Must be valid

---

### 3. Update Payment Method
**Endpoint:** `PUT /api/user/payments/methods/{paymentId}`

**Authentication:** Required

**Request Body:** (Same as Add Payment Method)

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Payment method updated successfully"
}
```

---

### 4. Delete Payment Method
**Endpoint:** `DELETE /api/user/payments/methods/{paymentId}`

**Authentication:** Required

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Payment method deleted successfully"
}
```

---

### 5. Set Default Payment Method
**Endpoint:** `POST /api/user/payments/methods/{paymentId}/default`

**Authentication:** Required

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Default payment method updated"
}
```

---

## Budget APIs

### 1. Get User Budget
**Endpoint:** `GET /api/user/budget`

**Authentication:** Required

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "budgetRange": "₹100,000 - ₹500,000",
    "monthlySpent": 125000,
    "monthlyLimit": 250000,
    "remainingBudget": 125000,
    "percentageUsed": 50,
    "updatedDate": "2024-04-16T00:00:00Z"
  }
}
```

---

### 2. Update Budget
**Endpoint:** `PUT /api/user/budget`

**Authentication:** Required

**Request Body:**
```json
{
  "budgetRange": "₹100,000 - ₹500,000"
}
```

**Valid Budget Ranges:**
- No budget
- ₹50,000 - ₹100,000
- ₹100,000 - ₹500,000
- ₹500,000 - ₹1,000,000
- ₹1,000,000 - ₹5,000,000
- Above ₹5,000,000

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Budget updated successfully"
}
```

---

### 3. Get Budget Analytics
**Endpoint:** `GET /api/user/budget/analytics`

**Authentication:** Required

**Query Parameters:**
- `period`: monthly | quarterly | yearly (default: monthly)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "period": "monthly",
    "spent": 125000,
    "limit": 250000,
    "remaining": 125000,
    "percentageUsed": 50,
    "monthlyBreakdown": [
      {
        "month": "January",
        "spent": 150000,
        "limit": 250000
      }
    ]
  }
}
```

---

## Offers APIs

### 1. Get User Offers
**Endpoint:** `GET /api/user/offers`

**Authentication:** Required

**Query Parameters:**
- `status`: active | used | expired
- `limit`: default 10
- `offset`: default 0

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "total": 5,
    "offers": [
      {
        "offerId": "off001",
        "title": "10% discount on all contemporary art",
        "description": "Valid until April 30, 2024",
        "discountPercentage": 10,
        "expiryDate": "2024-04-30T23:59:59Z",
        "status": "active",
        "claimed": false,
        "createdDate": "2024-04-01T10:00:00Z"
      }
    ]
  }
}
```

---

### 2. Claim Offer
**Endpoint:** `POST /api/user/offers/{offerId}/claim`

**Authentication:** Required

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "offerId": "off001",
    "promoCode": "PROMO10",
    "claimedDate": "2024-04-16T16:30:00Z"
  },
  "message": "Offer claimed successfully. Use promo code PROMO10"
}
```

---

## Settings APIs

### 1. Get User Settings
**Endpoint:** `GET /api/user/settings`

**Authentication:** Required

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "country": "India",
    "language": "English",
    "timezone": "IST",
    "currency": "INR",
    "measurement": "cm",
    "dateFormat": "MM/DD/YYYY",
    "theme": "light",
    "privacySettings": {
      "profileVisibility": "public",
      "showEmail": false,
      "allowMessagesFromArtists": true
    },
    "displayPreferences": {
      "itemsPerPage": 12,
      "fontSize": "medium"
    }
  }
}
```

---

### 2. Update Settings
**Endpoint:** `PUT /api/user/settings`

**Authentication:** Required

**Request Body:**
```json
{
  "country": "USA",
  "language": "English",
  "timezone": "EST",
  "currency": "USD",
  "measurement": "inch",
  "dateFormat": "MM/DD/YYYY",
  "theme": "dark",
  "privacySettings": {...},
  "displayPreferences": {...}
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Settings updated successfully"
}
```

---

## Newsletter APIs

### 1. Subscribe to Newsletter
**Endpoint:** `POST /api/newsletter/subscribe`

**Authentication:** NOT Required

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter"
}
```

---

### 2. Unsubscribe from Newsletter
**Endpoint:** `POST /api/newsletter/unsubscribe`

**Authentication:** NOT Required

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Successfully unsubscribed from newsletter"
}
```

---

## Dashboard Analytics APIs

### 1. Get Dashboard Analytics
**Endpoint:** `GET /api/user/dashboard/analytics`

**Authentication:** Required

**Query Parameters:**
- `startDate`: YYYY-MM-DD
- `endDate`: YYYY-MM-DD

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "monthlyActivity": [
      {
        "month": "January",
        "views": 150,
        "purchases": 3,
        "favorites": 25
      }
    ],
    "topArtists": [
      {
        "artistId": "art001",
        "artistName": "Emma Wilson",
        "artworkCount": 5
      }
    ],
    "monthlySpending": [
      {
        "month": "January",
        "amount": 45000
      }
    ],
    "collectionBreakdown": [
      {
        "category": "Modern",
        "percentage": 30
      }
    ],
    "purchasesByCategory": [
      {
        "category": "Oil on Canvas",
        "count": 5
      }
    ]
  }
}
```

---

### 2. Get Activity History
**Endpoint:** `GET /api/user/activity/history`

**Authentication:** Required

**Query Parameters:**
- `limit`: default 20
- `offset`: default 0
- `type`: filter by activity type

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "total": 45,
    "activities": [
      {
        "activityId": "act001",
        "type": "purchase",
        "description": "Purchased 'Krishna Leela' by Sekhar Roy",
        "timestamp": "2024-04-15T10:30:00Z",
        "metadata": {
          "orderId": "ORD-001",
          "artworkId": "art001"
        }
      }
    ]
  }
}
```

---

### 3. Get Collection Statistics
**Endpoint:** `GET /api/user/collection/stats`

**Authentication:** Required

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "totalArtworks": 12,
    "totalSpent": 450000,
    "favoriteArtists": 8,
    "topCategory": "Modern",
    "byCategory": [
      {
        "category": "Modern",
        "count": 5,
        "percentage": 42
      }
    ],
    "byArtist": [
      {
        "artistName": "Emma Wilson",
        "artworkCount": 3
      }
    ]
  }
}
```

---

## Support APIs

### 1. Contact Support
**Endpoint:** `POST /api/support/contact`

**Authentication:** Required

**Request Body:**
```json
{
  "subject": "Issue with my order",
  "category": "orders", // orders | payments | account | general
  "message": "I haven't received my order yet",
  "orderId": "ORD-001", // Optional, if related to order
  "attachments": [] // Optional, file URLs
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "ticketId": "TICKET-001",
    "status": "open",
    "createdDate": "2024-04-16T16:40:00Z",
    "expectedResponseTime": "24 hours"
  },
  "message": "Support ticket created successfully"
}
```

---

## Error Response Format

All error responses follow this format:

```json
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Human readable error message",
  "details": {
    "field": "fieldName",
    "issue": "Specific issue details"
  }
}
```

### Common Error Codes

| Code | Status | Meaning |
|------|--------|---------|
| UNAUTHORIZED | 401 | Invalid or expired token |
| FORBIDDEN | 403 | User doesn't have permission |
| NOT_FOUND | 404 | Resource not found |
| VALIDATION_ERROR | 400 | Invalid input data |
| INTERNAL_ERROR | 500 | Server error |
| DUPLICATE_ENTRY | 409 | Resource already exists |
| RATE_LIMIT | 429 | Too many requests |

---

## Rate Limiting

- API requests limited to 100 per minute per user
- Burst limit: 10 requests per second
- Rate limit headers included in response:
  - `X-RateLimit-Limit: 100`
  - `X-RateLimit-Remaining: 85`
  - `X-RateLimit-Reset: 1713275400`

---

## Response Pagination

For list endpoints, use this pagination format:

```json
{
  "data": [...],
  "pagination": {
    "total": 100,
    "limit": 10,
    "offset": 0,
    "pages": 10,
    "currentPage": 1
  }
}
```

---

## Data Validation Rules

### Email
- Format: valid email address
- Max length: 255 characters

### Password
- Min length: 8 characters
- Must contain: uppercase, lowercase, number, special character
- Max length: 128 characters

### Phone Number
- Must be valid format for country
- Max length: 20 characters

### Credit Card
- Must pass Luhn validation
- Max length: 19 digits

### Dates
- Format: ISO 8601 (YYYY-MM-DDTHH:mm:ssZ)

---

## Security Requirements

1. **HTTPS Only** - All endpoints must use HTTPS in production
2. **CORS** - Configure CORS for frontend domain
3. **Rate Limiting** - Implement to prevent abuse
4. **Token Expiration** - Tokens expire after 24 hours
5. **Data Encryption** - Sensitive data (CC, passwords) must be encrypted
6. **Input Validation** - Validate all user inputs
7. **SQL Injection Prevention** - Use parameterized queries
8. **XSS Prevention** - Sanitize all user data

---

## Testing Checklist

Before deployment, test:

- [ ] All endpoints return correct response format
- [ ] Authentication works properly
- [ ] Rate limiting is enforced
- [ ] Error responses are consistent
- [ ] Data validation works as expected
- [ ] Pagination works correctly
- [ ] CORS headers are set properly
- [ ] Token refresh works (if implemented)
- [ ] All sensitive data is encrypted
- [ ] API responds within SLA (< 2 seconds)

---

## Contact

For API-related questions or clarifications, contact the backend team.

Last Updated: April 16, 2024
