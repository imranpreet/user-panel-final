# 🎨 ARTWORKS & PRODUCTS API - TESTING GUIDE

## cURL Examples for Testing All Endpoints

---

## 1️⃣ ARTWORKS ENDPOINTS

### Get All Artworks (with filters)
```bash
# Simple request
curl -X GET "http://localhost:5000/api/v1/artworks" \
  -H "Content-Type: application/json"

# With filters
curl -X GET "http://localhost:5000/api/v1/artworks?category=Painting&orientation=Portrait&maxPrice=1000000&sortBy=price&page=1&limit=12" \
  -H "Content-Type: application/json"

# Search term
curl -X GET "http://localhost:5000/api/v1/artworks?search=sunset&sortBy=newest" \
  -H "Content-Type: application/json"
```

### Get Single Artwork Details
```bash
curl -X GET "http://localhost:5000/api/v1/artworks/A01" \
  -H "Content-Type: application/json"
```

### Get Available Filter Options
```bash
curl -X GET "http://localhost:5000/api/v1/artworks/filters" \
  -H "Content-Type: application/json"
```

---

## 2️⃣ CART ENDPOINTS (Require Authentication)

### Get User's Cart
```bash
curl -X GET "http://localhost:5000/api/v1/cart" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json"
```

### Add Item to Cart
```bash
curl -X POST "http://localhost:5000/api/v1/cart/add" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "artworkId": "A01",
    "quantity": 1
  }'
```

### Update Cart Item Quantity
```bash
curl -X PUT "http://localhost:5000/api/v1/cart/update" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "cartItemId": "CI001",
    "quantity": 2
  }'
```

### Remove Item from Cart
```bash
curl -X DELETE "http://localhost:5000/api/v1/cart/remove/A01" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json"
```

---

## 3️⃣ PRODUCTS ENDPOINTS

### Get All Products
```bash
# Simple request
curl -X GET "http://localhost:5000/api/products" \
  -H "Content-Type: application/json"

# With filters and pagination
curl -X GET "http://localhost:5000/api/products?category=Electronics&sortBy=price&page=1&limit=20" \
  -H "Content-Type: application/json"

# Search
curl -X GET "http://localhost:5000/api/products?search=laptop" \
  -H "Content-Type: application/json"
```

### Get Single Product
```bash
curl -X GET "http://localhost:5000/api/products/P001" \
  -H "Content-Type: application/json"
```

### Create Product (Admin Only)
```bash
curl -X POST "http://localhost:5000/api/products" \
  -H "Authorization: Bearer {adminToken}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Product",
    "description": "Product description",
    "price": 29999,
    "category": "Electronics",
    "image": "https://example.com/image.jpg",
    "specifications": {
      "color": "Black",
      "size": "Large"
    }
  }'
```

### Update Product (Admin Only)
```bash
curl -X PUT "http://localhost:5000/api/products/P001" \
  -H "Authorization: Bearer {adminToken}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Product Name",
    "price": 39999,
    "description": "Updated description"
  }'
```

### Delete Product (Admin Only)
```bash
curl -X DELETE "http://localhost:5000/api/products/P001" \
  -H "Authorization: Bearer {adminToken}" \
  -H "Content-Type: application/json"
```

---

## 4️⃣ ARTISTS ENDPOINTS

### Get All Artists
```bash
# Simple request
curl -X GET "http://localhost:5000/api/artists" \
  -H "Content-Type: application/json"

# With pagination
curl -X GET "http://localhost:5000/api/artists?page=1&limit=10&sortBy=followers" \
  -H "Content-Type: application/json"

# Search
curl -X GET "http://localhost:5000/api/artists?search=John" \
  -H "Content-Type: application/json"
```

### Get Artist Details
```bash
curl -X GET "http://localhost:5000/api/artists/AR001" \
  -H "Content-Type: application/json"
```

### Get Featured Artists
```bash
curl -X GET "http://localhost:5000/api/artists/featured" \
  -H "Content-Type: application/json"
```

---

## 5️⃣ PROJECTS ENDPOINTS

### Get All Projects
```bash
curl -X GET "http://localhost:5000/api/projects" \
  -H "Content-Type: application/json"
```

### Get Project Details
```bash
curl -X GET "http://localhost:5000/api/projects/1" \
  -H "Content-Type: application/json"
```

### Get Artwork in Project
```bash
curl -X GET "http://localhost:5000/api/projects/1/artwork/0" \
  -H "Content-Type: application/json"
```

---

## 6️⃣ CATEGORIES ENDPOINTS

### Get All Categories
```bash
curl -X GET "http://localhost:5000/api/categories" \
  -H "Content-Type: application/json"
```

### Get Category Details
```bash
curl -X GET "http://localhost:5000/api/categories/CAT001" \
  -H "Content-Type: application/json"
```

---

## 🧪 Testing Workflow

### 1. Test Public Endpoints First
```bash
# Test artworks endpoint
curl -X GET "http://localhost:5000/api/v1/artworks?limit=5"

# Test filters
curl -X GET "http://localhost:5000/api/v1/artworks/filters"

# Test artists
curl -X GET "http://localhost:5000/api/artists?limit=5"

# Test categories
curl -X GET "http://localhost:5000/api/categories"
```

### 2. Test Authenticated Endpoints
```bash
# First get a valid token from login endpoint
# Then test cart endpoints with the token
curl -X GET "http://localhost:5000/api/v1/cart" \
  -H "Authorization: Bearer {your_token_here}"
```

### 3. Test Add to Cart Flow
```bash
# Get artworks
curl -X GET "http://localhost:5000/api/v1/artworks?limit=1"

# Add first artwork to cart (replace A01 with actual ID)
curl -X POST "http://localhost:5000/api/v1/cart/add" \
  -H "Authorization: Bearer {your_token}" \
  -H "Content-Type: application/json" \
  -d '{"artworkId": "A01", "quantity": 1}'

# Check cart
curl -X GET "http://localhost:5000/api/v1/cart" \
  -H "Authorization: Bearer {your_token}"
```

### 4. Test Filters
```bash
# Test category filter
curl "http://localhost:5000/api/v1/artworks?category=Painting"

# Test price filter
curl "http://localhost:5000/api/v1/artworks?minPrice=50000&maxPrice=500000"

# Test orientation filter
curl "http://localhost:5000/api/v1/artworks?orientation=Portrait"

# Test sorting
curl "http://localhost:5000/api/v1/artworks?sortBy=price"

# Test pagination
curl "http://localhost:5000/api/v1/artworks?page=2&limit=12"
```

---

## 🔑 Sample JWT Token for Testing

Use this format for Authorization header (replace with real token):
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVU0VSMDAxIiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNzEzMjc0NDAwLCJleHAiOjE3MTMzNjA4MDB9.signature
```

Decoded payload:
```json
{
  "userId": "USER001",
  "email": "user@example.com",
  "iat": 1713274400,
  "exp": 1713360800
}
```

---

## 📊 Expected Responses

### Success Response Example
```json
{
  "success": true,
  "data": {
    "artworks": [
      {
        "id": "A01",
        "title": "Sunset Dreams",
        "artist": "John Smith",
        "price": 450000,
        "image": "https://example.com/artwork.jpg",
        "category": "Painting",
        "rating": 4.5
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50
    }
  },
  "message": "Artworks retrieved successfully"
}
```

### Error Response Example
```json
{
  "success": false,
  "error": "UNAUTHORIZED",
  "message": "Authentication required for this endpoint"
}
```

---

## ✅ Testing Checklist

- [ ] GET /api/v1/artworks (returns list with pagination)
- [ ] GET /api/v1/artworks/:id (returns single artwork)
- [ ] GET /api/v1/artworks/filters (returns filter options)
- [ ] GET /api/v1/cart (requires auth, returns cart)
- [ ] POST /api/v1/cart/add (requires auth, adds item)
- [ ] DELETE /api/v1/cart/remove/:id (requires auth, removes item)
- [ ] GET /api/artists (returns artist list)
- [ ] GET /api/artists/:id (returns artist details)
- [ ] GET /api/categories (returns categories)
- [ ] GET /api/products (returns products)
- [ ] GET /api/projects (returns projects)
- [ ] All endpoints with filters work correctly
- [ ] All authentication checks work
- [ ] All error responses are formatted correctly
- [ ] Pagination works properly

---

## 🛠️ Debugging Tips

### Check Response Headers
```bash
curl -i -X GET "http://localhost:5000/api/v1/artworks"
```

### Check Response Status
```bash
curl -w "\n%{http_code}\n" -X GET "http://localhost:5000/api/v1/artworks"
```

### Pretty Print JSON
```bash
curl -s -X GET "http://localhost:5000/api/v1/artworks" | jq
```

### Save Response to File
```bash
curl -X GET "http://localhost:5000/api/v1/artworks" > response.json
```

### Test with Custom Headers
```bash
curl -X GET "http://localhost:5000/api/v1/artworks" \
  -H "Authorization: Bearer {token}" \
  -H "X-Custom-Header: value"
```

---

## 📱 Testing with Postman

1. Import the collection (create from these endpoints)
2. Set `{{baseUrl}}` variable to `http://localhost:5000`
3. Set `{{token}}` variable to your JWT token
4. Create folders for each endpoint group
5. Run tests sequentially
6. Check response times and status codes

---

## 🚀 Performance Testing

### Load Test Artworks Endpoint
```bash
# Test with 100 concurrent requests
ab -n 100 -c 10 "http://localhost:5000/api/v1/artworks?limit=12"
```

### Test with Different Page Sizes
```bash
# Small page size
curl "http://localhost:5000/api/v1/artworks?limit=5"

# Medium page size
curl "http://localhost:5000/api/v1/artworks?limit=20"

# Large page size
curl "http://localhost:5000/api/v1/artworks?limit=100"
```

---

**Created:** April 16, 2026  
**Status:** Ready for Testing  
**Total Examples:** 30+ cURL commands included
