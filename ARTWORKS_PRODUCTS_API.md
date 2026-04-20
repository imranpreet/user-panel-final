# 🎨 ARTWORKS & PRODUCTS PAGE - API REQUIREMENTS

## Overview
Complete API specification for the Artworks Gallery, Products, Artists, and Featured sections of the application.

---

## 📋 API ENDPOINTS REQUIRED

### 1️⃣ ARTWORKS DATA (Gallery & Filters)

#### Get All Artworks with Filters
```
GET /api/v1/artworks
```

**Query Parameters:**
```
category     (string)  - Filter by category (Painting, Sculpture, Digital, etc.)
orientation  (string)  - Portrait, Landscape, Square
minPrice     (number)  - Minimum price filter
maxPrice     (number)  - Maximum price filter
artist       (string)  - Filter by artist name/ID
sortBy       (string)  - price, popularity, newest, featured
page         (number)  - Page number (default: 1)
limit        (number)  - Items per page (default: 12)
search       (string)  - Search by title or description
```

**Example Request:**
```
GET /api/v1/artworks?category=Painting&orientation=Portrait&maxPrice=1000000&sortBy=price&page=1&limit=12
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "artworks": [
      {
        "id": "A01",
        "title": "Sunset Dreams",
        "artist": {
          "id": "AR001",
          "name": "John Smith",
          "image": "https://..."
        },
        "image": "https://...",
        "thumbnail": "https://...",
        "price": 450000,
        "currency": "INR",
        "category": "Painting",
        "orientation": "Portrait",
        "dimensions": {
          "width": 48,
          "height": 72,
          "unit": "inches"
        },
        "description": "A beautiful sunset painting...",
        "medium": "Oil on Canvas",
        "yearCreated": 2023,
        "inStock": true,
        "stockCount": 1,
        "rating": 4.5,
        "reviews": 12,
        "isFeatured": true,
        "tags": ["landscape", "colorful", "modern"]
      },
      // More artworks...
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "itemsPerPage": 12
    }
  },
  "message": "Artworks retrieved successfully"
}
```

**Error Responses:**
```json
// 400 Bad Request
{
  "success": false,
  "error": "INVALID_FILTER",
  "message": "Invalid filter parameters"
}

// 500 Server Error
{
  "success": false,
  "error": "SERVER_ERROR",
  "message": "Failed to fetch artworks"
}
```

---

#### Get Single Artwork Details
```
GET /api/v1/artworks/:id
```

**Path Parameters:**
```
id (string) - Artwork ID (e.g., "A01")
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "A01",
    "title": "Sunset Dreams",
    "artist": {
      "id": "AR001",
      "name": "John Smith",
      "bio": "Award-winning artist...",
      "image": "https://...",
      "followers": 5000,
      "isFollowing": false
    },
    "image": "https://...",
    "gallery": [
      "https://image1...",
      "https://image2...",
      "https://image3..."
    ],
    "price": 450000,
    "currency": "INR",
    "category": "Painting",
    "orientation": "Portrait",
    "dimensions": {
      "width": 48,
      "height": 72,
      "unit": "inches"
    },
    "description": "A beautiful sunset painting...",
    "medium": "Oil on Canvas",
    "yearCreated": 2023,
    "inStock": true,
    "stockCount": 1,
    "deliveryTime": "7-10 business days",
    "shippingCost": 5000,
    "freeShippingAbove": 100000,
    "rating": 4.5,
    "reviews": [
      {
        "id": "REV001",
        "user": "Priya M",
        "rating": 5,
        "comment": "Absolutely beautiful!",
        "date": "2024-02-15"
      }
    ],
    "relatedArtworks": [
      // Same structure as artwork object, max 4 items
    ],
    "tags": ["landscape", "colorful", "modern"],
    "createdAt": "2023-06-15",
    "updatedAt": "2024-04-16"
  },
  "message": "Artwork details retrieved"
}
```

**Error Responses:**
```json
// 404 Not Found
{
  "success": false,
  "error": "NOT_FOUND",
  "message": "Artwork not found"
}

// 500 Server Error
{
  "success": false,
  "error": "SERVER_ERROR",
  "message": "Failed to fetch artwork details"
}
```

---

### 2️⃣ DYNAMIC FILTER OPTIONS

#### Get Available Filter Categories
```
GET /api/v1/artworks/filters
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "id": "CAT001",
        "name": "Painting",
        "count": 150
      },
      {
        "id": "CAT002",
        "name": "Sculpture",
        "count": 85
      },
      {
        "id": "CAT003",
        "name": "Digital Art",
        "count": 200
      },
      {
        "id": "CAT004",
        "name": "Photography",
        "count": 120
      }
    ],
    "orientations": [
      {
        "id": "ORI001",
        "name": "Portrait",
        "count": 180
      },
      {
        "id": "ORI002",
        "name": "Landscape",
        "count": 220
      },
      {
        "id": "ORI003",
        "name": "Square",
        "count": 155
      }
    ],
    "priceRanges": [
      {
        "id": "PR001",
        "min": 0,
        "max": 50000,
        "label": "Under ₹50K",
        "count": 120
      },
      {
        "id": "PR002",
        "min": 50001,
        "max": 200000,
        "label": "₹50K - ₹2L",
        "count": 180
      },
      {
        "id": "PR003",
        "min": 200001,
        "max": 500000,
        "label": "₹2L - ₹5L",
        "count": 150
      },
      {
        "id": "PR004",
        "min": 500001,
        "max": null,
        "label": "Above ₹5L",
        "count": 105
      }
    ],
    "minPrice": 5000,
    "maxPrice": 5000000
  },
  "message": "Filters retrieved successfully"
}
```

---

### 3️⃣ CART MANAGEMENT

#### Get User's Cart
```
GET /api/v1/cart
```

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "CART123",
    "userId": "USER001",
    "items": [
      {
        "id": "CI001",
        "artworkId": "A01",
        "title": "Sunset Dreams",
        "artist": "John Smith",
        "image": "https://...",
        "price": 450000,
        "quantity": 1,
        "subtotal": 450000
      },
      {
        "id": "CI002",
        "artworkId": "A05",
        "title": "Ocean Waves",
        "artist": "Sarah Lee",
        "image": "https://...",
        "price": 320000,
        "quantity": 1,
        "subtotal": 320000
      }
    ],
    "subtotal": 770000,
    "shippingCost": 5000,
    "tax": 92400,
    "total": 867400,
    "itemCount": 2,
    "appliedCoupon": null,
    "discount": 0,
    "updatedAt": "2024-04-16T10:30:00Z"
  },
  "message": "Cart retrieved successfully"
}
```

**Error Responses:**
```json
// 401 Unauthorized
{
  "success": false,
  "error": "UNAUTHORIZED",
  "message": "Authentication required"
}
```

---

#### Add Item to Cart
```
POST /api/v1/cart/add
```

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "artworkId": "A01",
  "quantity": 1
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "CART123",
    "items": [
      {
        "id": "CI001",
        "artworkId": "A01",
        "title": "Sunset Dreams",
        "price": 450000,
        "quantity": 1,
        "subtotal": 450000
      }
    ],
    "itemCount": 1,
    "total": 450000
  },
  "message": "Item added to cart successfully"
}
```

**Error Responses:**
```json
// 400 Bad Request
{
  "success": false,
  "error": "INVALID_REQUEST",
  "message": "Invalid artwork ID or quantity"
}

// 404 Not Found
{
  "success": false,
  "error": "NOT_FOUND",
  "message": "Artwork not found"
}

// 409 Conflict
{
  "success": false,
  "error": "OUT_OF_STOCK",
  "message": "Artwork is out of stock"
}
```

---

#### Update Item in Cart
```
PUT /api/v1/cart/update
```

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "cartItemId": "CI001",
  "quantity": 2
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "CART123",
    "items": [
      {
        "id": "CI001",
        "artworkId": "A01",
        "quantity": 2,
        "subtotal": 900000
      }
    ],
    "itemCount": 1,
    "total": 900000
  },
  "message": "Cart updated successfully"
}
```

---

#### Remove Item from Cart
```
DELETE /api/v1/cart/remove/:artworkId
```

**Headers:**
```
Authorization: Bearer {token}
```

**Path Parameters:**
```
artworkId (string) - ID of artwork to remove
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "CART123",
    "items": [],
    "itemCount": 0,
    "total": 0
  },
  "message": "Item removed from cart successfully"
}
```

---

### 4️⃣ PRODUCTS (Blur Slider - Laxman)

#### Get All Products
```
GET /api/products
```

**Query Parameters:**
```
category  (string) - Filter by category
sortBy    (string) - price, popularity, newest
page      (number) - Page number
limit     (number) - Items per page
search    (string) - Search term
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "P001",
        "name": "Product Name",
        "description": "Product description",
        "image": "https://...",
        "price": 29999,
        "category": "Electronics",
        "rating": 4.5,
        "inStock": true,
        "createdAt": "2024-01-15"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalItems": 100
    }
  },
  "message": "Products retrieved successfully"
}
```

---

#### Get Single Product
```
GET /api/products/:id
```

**Path Parameters:**
```
id (string) - Product ID
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "P001",
    "name": "Product Name",
    "description": "Detailed description",
    "images": ["https://...", "https://..."],
    "price": 29999,
    "originalPrice": 39999,
    "discount": 25,
    "category": "Electronics",
    "specifications": {
      "color": "Black",
      "size": "Large",
      "material": "Plastic"
    },
    "rating": 4.5,
    "reviews": 45,
    "inStock": true,
    "stockCount": 15,
    "deliveryTime": "2-3 days",
    "shippingCost": 0,
    "returnPolicy": "7 days",
    "relatedProducts": []
  },
  "message": "Product details retrieved"
}
```

---

#### Create Product (Admin)
```
POST /api/products
```

**Headers:**
```
Authorization: Bearer {adminToken}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 29999,
  "category": "Electronics",
  "image": "https://...",
  "specifications": {
    "color": "Black",
    "size": "Large"
  }
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "P001",
    "name": "New Product",
    "price": 29999,
    "createdAt": "2024-04-16"
  },
  "message": "Product created successfully"
}
```

---

#### Update Product (Admin)
```
PUT /api/products/:id
```

**Headers:**
```
Authorization: Bearer {adminToken}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Updated Product Name",
  "price": 39999,
  "description": "Updated description"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "P001",
    "name": "Updated Product Name",
    "price": 39999
  },
  "message": "Product updated successfully"
}
```

---

#### Delete Product (Admin)
```
DELETE /api/products/:id
```

**Headers:**
```
Authorization: Bearer {adminToken}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": { "id": "P001" },
  "message": "Product deleted successfully"
}
```

---

### 5️⃣ ARTISTS

#### Get All Artists
```
GET /api/artists
```

**Query Parameters:**
```
sortBy  (string) - followers, newest, popularity
page    (number) - Page number
limit   (number) - Items per page
search  (string) - Search artist name
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "artists": [
      {
        "id": "AR001",
        "name": "John Smith",
        "bio": "Award-winning artist",
        "image": "https://...",
        "coverImage": "https://...",
        "followers": 5000,
        "artworksCount": 45,
        "rating": 4.8,
        "isVerified": true,
        "socialLinks": {
          "instagram": "https://instagram.com/johnsmith",
          "website": "https://johnsmith.com"
        }
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50
    }
  },
  "message": "Artists retrieved successfully"
}
```

---

#### Get Artist Details
```
GET /api/artists/:id
```

**Path Parameters:**
```
id (string) - Artist ID
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "AR001",
    "name": "John Smith",
    "bio": "Detailed bio of the artist",
    "image": "https://...",
    "coverImage": "https://...",
    "followers": 5000,
    "following": 150,
    "isFollowing": false,
    "artworksCount": 45,
    "rating": 4.8,
    "isVerified": true,
    "joinedDate": "2020-05-15",
    "awards": [
      {
        "name": "Best Contemporary Artist",
        "year": 2023,
        "organization": "Art Council"
      }
    ],
    "socialLinks": {
      "instagram": "https://instagram.com/johnsmith",
      "website": "https://johnsmith.com",
      "twitter": "https://twitter.com/johnsmith"
    },
    "artworks": [
      // Same structure as artwork object, first 10 artworks
    ],
    "exhibitions": [
      {
        "name": "Modern Art Expo 2024",
        "location": "New York",
        "date": "2024-06-15"
      }
    ]
  },
  "message": "Artist details retrieved"
}
```

---

### 6️⃣ FEATURED ARTISTS

#### Get Featured Artists
```
GET /api/artists/featured
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "featuredArtists": [
      {
        "id": "AR001",
        "name": "John Smith",
        "bio": "Bio",
        "image": "https://...",
        "followers": 5000,
        "artworksCount": 45,
        "isVerified": true,
        "featuredSince": "2024-01-01"
      }
    ]
  },
  "message": "Featured artists retrieved"
}
```

---

### 7️⃣ PROJECTS

#### Get All Projects
```
GET /api/projects
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "projects": [
      {
        "id": "1",
        "title": "Project Title",
        "description": "Project description",
        "image": "https://...",
        "artist": {
          "id": "AR001",
          "name": "John Smith"
        },
        "artworksCount": 10,
        "createdAt": "2024-01-15"
      }
    ]
  },
  "message": "Projects retrieved"
}
```

---

#### Get Project Details
```
GET /api/projects/:id
```

**Path Parameters:**
```
id (number) - Project ID (e.g., 1)
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "title": "Project Title",
    "description": "Detailed project description",
    "image": "https://...",
    "artist": {
      "id": "AR001",
      "name": "John Smith",
      "bio": "Artist bio",
      "image": "https://..."
    },
    "artworks": [
      {
        "index": 0,
        "id": "A01",
        "title": "Artwork 1",
        "image": "https://..."
      },
      {
        "index": 1,
        "id": "A02",
        "title": "Artwork 2",
        "image": "https://..."
      }
    ],
    "createdAt": "2024-01-15"
  },
  "message": "Project details retrieved"
}
```

---

#### Get Project Artwork Details
```
GET /api/projects/:id/artwork/:index
```

**Path Parameters:**
```
id    (number) - Project ID (e.g., 1)
index (number) - Artwork index in project (e.g., 0)
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "index": 0,
    "artwork": {
      "id": "A01",
      "title": "Artwork Title",
      "description": "Detailed description",
      "image": "https://...",
      "gallery": ["https://...", "https://..."],
      "price": 450000,
      "artist": "John Smith",
      "medium": "Oil on Canvas",
      "dimensions": {
        "width": 48,
        "height": 72,
        "unit": "inches"
      },
      "rating": 4.5,
      "reviews": 12
    },
    "nextArtwork": {
      "index": 1,
      "id": "A02"
    },
    "previousArtwork": null
  },
  "message": "Artwork details retrieved"
}
```

---

### 8️⃣ CATEGORIES (For Design Carousel)

#### Get All Categories
```
GET /api/categories
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "id": "CAT001",
        "name": "Painting",
        "image": "https://...",
        "artworksCount": 150,
        "description": "Category description"
      },
      {
        "id": "CAT002",
        "name": "Sculpture",
        "image": "https://...",
        "artworksCount": 85,
        "description": "Category description"
      },
      {
        "id": "CAT003",
        "name": "Digital Art",
        "image": "https://...",
        "artworksCount": 200,
        "description": "Category description"
      }
    ]
  },
  "message": "Categories retrieved successfully"
}
```

---

#### Get Category Details
```
GET /api/categories/:id
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "CAT001",
    "name": "Painting",
    "image": "https://...",
    "coverImage": "https://...",
    "description": "Detailed category description",
    "artworksCount": 150,
    "artworks": [
      // First 12 artworks in category
    ]
  },
  "message": "Category details retrieved"
}
```

---

## 📊 COMPLETE API SUMMARY TABLE

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/v1/artworks` | GET | No | Get all artworks with filters |
| `/api/v1/artworks/:id` | GET | No | Get single artwork details |
| `/api/v1/artworks/filters` | GET | No | Get available filter options |
| `/api/v1/cart` | GET | Yes | Get user's cart |
| `/api/v1/cart/add` | POST | Yes | Add item to cart |
| `/api/v1/cart/update` | PUT | Yes | Update cart item |
| `/api/v1/cart/remove/:artworkId` | DELETE | Yes | Remove item from cart |
| `/api/products` | GET | No | Get all products |
| `/api/products/:id` | GET | No | Get product details |
| `/api/products` | POST | Yes (Admin) | Create product |
| `/api/products/:id` | PUT | Yes (Admin) | Update product |
| `/api/products/:id` | DELETE | Yes (Admin) | Delete product |
| `/api/artists` | GET | No | Get all artists |
| `/api/artists/:id` | GET | No | Get artist details |
| `/api/artists/featured` | GET | No | Get featured artists |
| `/api/projects` | GET | No | Get all projects |
| `/api/projects/:id` | GET | No | Get project details |
| `/api/projects/:id/artwork/:index` | GET | No | Get artwork in project |
| `/api/categories` | GET | No | Get all categories |
| `/api/categories/:id` | GET | No | Get category details |

---

## 🔐 AUTHENTICATION

### For Protected Endpoints (Cart operations)
Use JWT Bearer Token in Authorization header:
```
Authorization: Bearer {jwt_token}
```

**Token should include:**
- User ID
- Email
- Expiration time (recommend 24 hours)
- User role/permissions

---

## ⚠️ ERROR CODES

| Code | Status | Meaning |
|------|--------|---------|
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Permission denied |
| `NOT_FOUND` | 404 | Resource not found |
| `INVALID_REQUEST` | 400 | Invalid parameters |
| `OUT_OF_STOCK` | 409 | Item out of stock |
| `VALIDATION_ERROR` | 400 | Validation failed |
| `SERVER_ERROR` | 500 | Server error |
| `DUPLICATE_ENTRY` | 409 | Duplicate resource |

---

## 📍 RESPONSE FORMAT (Standard for all endpoints)

**Success Response:**
```json
{
  "success": true,
  "data": { /* Response data */ },
  "message": "Success message"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Error message"
}
```

---

## 🚀 IMPLEMENTATION PRIORITY

### Phase 1 (Essential - Week 1)
- ✅ GET /api/v1/artworks
- ✅ GET /api/v1/artworks/:id
- ✅ GET /api/v1/artworks/filters
- ✅ GET /api/artists
- ✅ GET /api/categories

### Phase 2 (Important - Week 2)
- ✅ GET /api/v1/cart
- ✅ POST /api/v1/cart/add
- ✅ DELETE /api/v1/cart/remove/:artworkId
- ✅ GET /api/artists/:id
- ✅ GET /api/projects
- ✅ GET /api/projects/:id

### Phase 3 (Enhancement - Week 3)
- ✅ PUT /api/v1/cart/update
- ✅ GET /api/projects/:id/artwork/:index
- ✅ GET /api/categories/:id
- ✅ GET /api/artists/featured
- ✅ GET /api/products

### Phase 4 (Admin - Week 4)
- ✅ POST /api/products
- ✅ PUT /api/products/:id
- ✅ DELETE /api/products/:id

---

## ✅ VALIDATION RULES

### Artwork Filters
- `maxPrice` must be >= `minPrice`
- `page` must be > 0
- `limit` must be between 1-100
- Valid categories: Painting, Sculpture, Digital, Photography, Mixed Media
- Valid orientations: Portrait, Landscape, Square

### Cart Operations
- `artworkId` must be valid and exist
- `quantity` must be > 0
- Max quantity per item: 1 (artworks are unique)
- Cannot add out-of-stock items

### Product Operations
- `name` required, max 255 chars
- `price` must be > 0
- `description` required
- `category` must be valid

---

**Total Endpoints:** 20  
**Authentication Required:** 4 endpoints (cart operations)  
**Admin Only:** 3 endpoints (product CRUD)  
**Public Endpoints:** 13 endpoints

---

**Created:** April 16, 2026  
**Status:** ✅ Ready for Backend Implementation  
**Version:** 1.0
