# 🎨 ARTWORKS & PRODUCTS PAGE - API QUICK REFERENCE

## What's Inside

Complete API specification for the Artworks Gallery, Products, and Artists sections with 20 endpoints covering:

✅ **Artworks Gallery** (3 endpoints)  
✅ **Cart Management** (4 endpoints)  
✅ **Products** (5 endpoints)  
✅ **Artists** (3 endpoints)  
✅ **Projects** (3 endpoints)  
✅ **Categories** (2 endpoints)  

---

## 📋 Quick API List

### Artworks (Gallery & Filters)
```
GET    /api/v1/artworks                    - Get all artworks with filters
GET    /api/v1/artworks/:id                - Get single artwork details
GET    /api/v1/artworks/filters            - Get available filter options
```

### Cart Management (Requires Auth)
```
GET    /api/v1/cart                        - Get user's cart
POST   /api/v1/cart/add                    - Add item to cart
PUT    /api/v1/cart/update                 - Update cart item quantity
DELETE /api/v1/cart/remove/:artworkId      - Remove item from cart
```

### Products
```
GET    /api/products                       - Get all products
GET    /api/products/:id                   - Get product details
POST   /api/products                       - Create product (Admin)
PUT    /api/products/:id                   - Update product (Admin)
DELETE /api/products/:id                   - Delete product (Admin)
```

### Artists
```
GET    /api/artists                        - Get all artists
GET    /api/artists/:id                    - Get artist details
GET    /api/artists/featured               - Get featured artists
```

### Projects
```
GET    /api/projects                       - Get all projects
GET    /api/projects/:id                   - Get project details
GET    /api/projects/:id/artwork/:index    - Get artwork in project
```

### Categories
```
GET    /api/categories                     - Get all categories
GET    /api/categories/:id                 - Get category details
```

---

## 🎯 Implementation Priority

**Week 1 (Essential)** - 5 endpoints
- GET /api/v1/artworks (with filters)
- GET /api/v1/artworks/:id
- GET /api/v1/artworks/filters
- GET /api/artists
- GET /api/categories

**Week 2 (Important)** - 6 endpoints
- GET /api/v1/cart
- POST /api/v1/cart/add
- DELETE /api/v1/cart/remove/:artworkId
- GET /api/artists/:id
- GET /api/projects
- GET /api/projects/:id

**Week 3 (Enhancement)** - 5 endpoints
- PUT /api/v1/cart/update
- GET /api/projects/:id/artwork/:index
- GET /api/categories/:id
- GET /api/artists/featured
- GET /api/products

**Week 4 (Admin)** - 4 endpoints
- POST /api/products
- PUT /api/products/:id
- DELETE /api/products/:id
- GET /api/products/:id

---

## 💡 Key Query Parameters

### For GET /api/v1/artworks
```
?category=Painting              - Filter by category
&orientation=Portrait           - Filter by orientation
&maxPrice=1000000              - Filter by max price
&minPrice=50000                - Filter by min price
&sortBy=price                  - Sort: price, popularity, newest
&page=1                        - Page number
&limit=12                      - Items per page
&search=sunset                 - Search term
```

### For GET /api/products
```
?category=Electronics          - Filter by category
&sortBy=price                  - Sort option
&page=1                        - Page number
&limit=20                      - Items per page
&search=laptop                 - Search term
```

---

## 🔐 Authentication

### Required for (4 endpoints):
- GET /api/v1/cart
- POST /api/v1/cart/add
- PUT /api/v1/cart/update
- DELETE /api/v1/cart/remove/:artworkId

### Header Format:
```
Authorization: Bearer {jwt_token}
```

### Token Contents:
- User ID
- Email
- Expiration (24 hours recommended)
- User role

---

## 📊 Response Structure

### Success (200 OK)
```json
{
  "success": true,
  "data": { /* actual data */ },
  "message": "Success message"
}
```

### Error (4xx/5xx)
```json
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Error message"
}
```

---

## ⚠️ Common Error Codes

| Code | Status | Meaning |
|------|--------|---------|
| UNAUTHORIZED | 401 | Auth required |
| NOT_FOUND | 404 | Resource not found |
| INVALID_REQUEST | 400 | Bad parameters |
| OUT_OF_STOCK | 409 | Item unavailable |
| SERVER_ERROR | 500 | Server error |

---

## 🎯 Most Important Endpoints

### For Artworks Page
1. **GET /api/v1/artworks** - Main gallery data
2. **GET /api/v1/artworks/:id** - Detail page
3. **GET /api/v1/artworks/filters** - Filter options
4. **GET /api/categories** - Category carousel

### For Cart
1. **GET /api/v1/cart** - Cart counter (nav)
2. **POST /api/v1/cart/add** - "Acquire" button
3. **DELETE /api/v1/cart/remove/:artworkId** - Remove button

### For Artists Section
1. **GET /api/artists** - Featured artists
2. **GET /api/artists/:id** - Artist detail page

### For Projects
1. **GET /api/projects** - Project list
2. **GET /api/projects/:id** - Project detail
3. **GET /api/projects/:id/artwork/:index** - Artwork detail in project

---

## 📝 Example Requests

### Get All Artworks (with filters)
```
GET /api/v1/artworks?category=Painting&orientation=Portrait&maxPrice=1000000&sortBy=price&page=1&limit=12
```

### Add Item to Cart
```
POST /api/v1/cart/add
Authorization: Bearer {token}

{
  "artworkId": "A01",
  "quantity": 1
}
```

### Get Artist Details
```
GET /api/artists/AR001
```

### Get Project Artwork
```
GET /api/projects/1/artwork/0
```

---

## 🚀 Integration Steps

### Step 1: Implement Phase 1 (Week 1)
- Set up database schema
- Implement 5 essential endpoints
- Test with sample data

### Step 2: Implement Phase 2 (Week 2)
- Add cart functionality
- Implement authentication
- Add 6 more endpoints

### Step 3: Implement Phase 3 (Week 3)
- Complete advanced features
- Add 5 more endpoints
- Performance optimization

### Step 4: Implement Phase 4 (Week 4)
- Admin functionality
- 4 admin endpoints
- Testing & deployment

---

## ✅ Database Entities

You'll need to create tables for:
- **Artworks** - title, price, artist, image, category, etc.
- **Products** - name, price, description, stock, etc.
- **Artists** - name, bio, image, followers, etc.
- **Projects** - title, description, artist, artworks array
- **Categories** - name, image, description
- **Cart** - userId, items array, timestamps
- **Users** - for authentication

---

## 🎉 You're Ready!

All 20 endpoints are documented with:
✅ Request/response examples  
✅ Query parameters explained  
✅ Error codes defined  
✅ Validation rules included  
✅ Authentication requirements  
✅ Implementation priority  

**Full details:** See `ARTWORKS_PRODUCTS_API.md`

---

**Created:** April 16, 2026  
**Total Endpoints:** 20  
**Public Endpoints:** 16  
**Authenticated Endpoints:** 4  
**Admin Endpoints:** 3
