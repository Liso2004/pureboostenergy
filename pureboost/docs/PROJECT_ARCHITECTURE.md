# PureBoost Energy — Project Architecture

> **Status:** Draft / Reviewable Architecture  
> **Project:** PureBoost Energy  
> **Purpose:** Living technical reference for the PureBoost full-stack commerce application.
>
> This document reflects the **current repository structure supplied for the project**. It intentionally distinguishes between what currently exists and what is recommended for future implementation.

---

# 1. Project Overview

PureBoost Energy is a full-stack e-commerce application consisting of:

```text
React Frontend
      │
      │ HTTP / JSON
      │ Bearer JWT
      ▼
Express Backend
      │
      │ Parameterized SQL
      ▼
MySQL Database
```

The application currently contains:

- React/Create React App frontend
- Express/Node.js backend
- MySQL database
- JWT authentication
- bcrypt password hashing
- Product management
- Cart management
- Checkout
- Orders
- Profile management
- Wishlist
- Product imagery and promotional media
- Protected frontend routes
- Backend authorization middleware
- SQL migration support

The primary architectural goal is:

> **The frontend provides the customer experience; the backend and database provide the authoritative business rules and data integrity.**

---

# 2. Actual Repository Structure

The current project structure is:

```text
pureboost/
│
├── backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   ├── checkoutController.js
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   ├── profileController.js
│   │   └── wishlistController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── authorizeCartItem.js
│   │   └── authorizeUser.js
│   │
│   ├── migrations/
│   │   └── 002_add_catalog_items.sql
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── checkoutRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   ├── profileRoutes.js
│   │   └── wishlistRoutes.js
│   │
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   └── VortexXcel.sql
│
├── docs/
│   ├── AGENTS.md
│   ├── design.md
│   ├── IMPLEMENTATION_PLAN.md
│   └── PROJECT_ARCHITECTURE.md
│
├── frontend/
│   │
│   ├── public/
│   │   ├── images/
│   │   │   ├── product images
│   │   │   ├── promotional banners
│   │   │   ├── product-placeholder.svg
│   │   │   └── video assets
│   │   ├── index.html
│   │   └── y2mate--So-Win-Nike_1080.mp4
│   │
│   ├── src/
│   │   │
│   │   ├── components/
│   │   │   ├── checkout/
│   │   │   │   ├── GuestCheckout.jsx
│   │   │   │   └── OrderConfirmation.jsx
│   │   │   │
│   │   │   ├── layout/
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Header.jsx
│   │   │   │   └── Navigation.jsx
│   │   │   │
│   │   │   ├── products/
│   │   │   │   └── ProductCard.jsx
│   │   │   │
│   │   │   ├── sections/
│   │   │   │   ├── Features.jsx
│   │   │   │   ├── HeroVideo.jsx
│   │   │   │   └── ProductGrid.jsx
│   │   │   │
│   │   │   ├── ui/
│   │   │   │   ├── button.jsx
│   │   │   │   ├── Icons.jsx
│   │   │   │   ├── input.jsx
│   │   │   │   ├── label.jsx
│   │   │   │   └── ProductImage.jsx
│   │   │   │
│   │   │   ├── cartSummary.jsx
│   │   │   └── ProtectedRoutes.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── WishlistContext.js
│   │   │
│   │   ├── pages/
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── Loginpage.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── profilepage.jsx
│   │   │   └── WishlistPage.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── authService.js
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── pureboostfrontend.jsx
│   │   └── reportWebVitals.js
│   │
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── tailwind.config.js
│
├── .env
├── .env.example
└── .gitignore
```

> `node_modules/` directories exist locally but are intentionally excluded from the documented source architecture.

---

# 3. Architecture Layers

The application can be viewed as five logical layers:

```text
┌────────────────────────────────────────────┐
│                Presentation                │
│ React pages + components + styling         │
└──────────────────────┬─────────────────────┘
                       │
┌──────────────────────▼─────────────────────┐
│               Client State                 │
│ AuthContext + WishlistContext + cart state │
└──────────────────────┬─────────────────────┘
                       │
┌──────────────────────▼─────────────────────┐
│              API Integration               │
│ api.js + authService.js                    │
└──────────────────────┬─────────────────────┘
                       │ HTTP
┌──────────────────────▼─────────────────────┐
│               Application API              │
│ Express routes → middleware → controllers  │
└──────────────────────┬─────────────────────┘
                       │ SQL
┌──────────────────────▼─────────────────────┐
│                 Persistence                │
│ MySQL + schema + migrations                │
└────────────────────────────────────────────┘
```

---

# 4. Backend Architecture

## 4.1 Backend Responsibilities

The backend is responsible for:

- Authentication
- Authorization
- User identity
- Product data
- Cart ownership
- Wishlist ownership
- Order ownership
- Checkout validation
- Product pricing
- Inventory
- Order totals
- Database transactions
- Security controls
- API validation
- Business rules

The backend must not rely on the browser for authoritative business values.

---

# 5. Backend Configuration

Current file:

```text
backend/config/db.js
```

Purpose:

- Establish MySQL connection/pool
- Centralize database connectivity
- Provide database access to controllers

Expected architectural direction:

```text
Controllers
     ↓
db.js
     ↓
MySQL
```

Database credentials must come from environment variables.

---

# 6. Backend Controllers

Current controllers:

```text
backend/controllers/
├── authController.js
├── cartController.js
├── checkoutController.js
├── orderController.js
├── productController.js
├── profileController.js
└── wishlistController.js
```

## Responsibility Map

| Controller              | Responsibility               |
| ----------------------- | ---------------------------- |
| `authController.js`     | Registration and login       |
| `cartController.js`     | Cart operations              |
| `checkoutController.js` | Checkout workflow            |
| `orderController.js`    | Order retrieval/management   |
| `productController.js`  | Product retrieval/management |
| `profileController.js`  | User profile operations      |
| `wishlistController.js` | Wishlist operations          |

Controllers should:

1. Receive validated HTTP input.
2. Identify the authenticated user from `req.user`.
3. Execute the relevant business operation.
4. Query/update the database.
5. Return a safe API response.

Controllers should not trust:

```js
req.body.user_id;
```

as the authenticated identity.

For authenticated operations:

```js
const userId = req.user.user_id;
```

should be the authoritative identity.

---

# 7. Authentication Architecture

Current authentication middleware:

```text
backend/middleware/authMiddleware.js
```

JWT flow:

```text
Login
  ↓
authController
  ↓
bcrypt.compare()
  ↓
jwt.sign()
  ↓
JWT returned to frontend
  ↓
Frontend sends:
Authorization: Bearer <token>
  ↓
authMiddleware
  ↓
jwt.verify()
  ↓
req.user
```

Current JWT payload design:

```js
{
  user_id: user.user_id,
  email: user.email,
  role: user.role
}
```

JWT signing must use:

```js
process.env.JWT_SECRET;
```

The secret must be:

- Long
- Random
- Unpredictable
- Stored only in environment configuration
- Never committed to Git
- Never returned in an API response

---

# 8. Authorization Architecture

Current authorization middleware:

```text
backend/middleware/authorizeUser.js
backend/middleware/authorizeCartItem.js
```

These exist to prevent users from accessing resources belonging to other users.

General model:

```text
Request
  ↓
authenticateToken
  ↓
req.user.user_id
  ↓
ownership check
  ↓
controller
```

Authorization should be enforced on the backend even if the frontend has protected routes.

Frontend route protection is a user-experience mechanism.

Backend authorization is the actual security boundary.

---

# 9. Cart Item Authorization

Current middleware:

```text
authorizeCartItem.js
```

This should ensure that a cart item being accessed, modified, or deleted belongs to the authenticated user's cart.

Required rule:

```text
Authenticated User
       ↓
User's Cart
       ↓
Cart Item
```

Never allow:

```text
User A
  ↓
Cart Item belonging to User B
  ↓
Modification / deletion
```

---

# 10. Routes

Current backend routes:

```text
backend/routes/
├── authRoutes.js
├── cartRoutes.js
├── checkoutRoutes.js
├── orderRoutes.js
├── productRoutes.js
├── profileRoutes.js
└── wishlistRoutes.js
```

Routes should remain thin.

Recommended structure:

```text
HTTP Request
     ↓
Route
     ↓
Middleware
     ↓
Controller
     ↓
Database / Business Logic
     ↓
Response
```

Routes should not contain large blocks of SQL or business logic.

---

# 11. Route Responsibility

| Route               | Purpose         | Authentication            |
| ------------------- | --------------- | ------------------------- |
| `authRoutes.js`     | Register/login  | Public                    |
| `productRoutes.js`  | Browse products | Usually public            |
| `cartRoutes.js`     | Cart operations | Required                  |
| `checkoutRoutes.js` | Checkout        | Required                  |
| `orderRoutes.js`    | User orders     | Required                  |
| `profileRoutes.js`  | User profile    | Required                  |
| `wishlistRoutes.js` | Wishlist        | Required if server-backed |

Exact endpoint paths should remain consistent with the existing frontend API contract unless intentionally changed.

---

# 12. Database Architecture

Current database files:

```text
backend/VortexXcel.sql
backend/migrations/
└── 002_add_catalog_items.sql
```

The database is the authoritative source for persistent commerce data.

Core conceptual entities:

```text
Users
Products
Carts
Cart Items
Orders
Order Items
Refunds (only if implemented)
```

Relationship:

```text
Users
 │
 ├───────────────┐
 │               │
 ▼               ▼
Carts          Orders
 │               │
 ▼               ▼
Cart Items    Order Items
 │               │
 └───────┐       │
         ▼       ▼
       Products
```

---

# 13. Schema Contract

The database schema must match every active controller query.

Important fields identified by the implementation plan include:

```text
Products.stock_quantity
Products.image_url
Orders.order_date
```

The final schema must be verified against:

- Controllers
- Routes
- Checkout logic
- Frontend API mapping
- Migration files

No controller should query a table or column that does not exist.

---

# 14. Migration Strategy

Current migration directory:

```text
backend/migrations/
```

Current migration:

```text
002_add_catalog_items.sql
```

Future schema changes should preferably use explicit migrations.

Recommended conceptual sequence:

```text
001_initial_schema.sql
002_add_catalog_items.sql
003_add_inventory.sql
004_add_order_items.sql
...
```

Migrations should be:

- Ordered
- Documented
- Repeatable where practical
- Safe to apply to a known database state
- Reviewed before production use

Avoid repeatedly editing the original schema in ways that make a fresh installation behave differently from an existing installation.

---

# 15. Checkout Architecture

Checkout is the most security-sensitive commerce workflow.

Current controller:

```text
backend/controllers/checkoutController.js
```

Current route:

```text
backend/routes/checkoutRoutes.js
```

Required flow:

```text
POST /checkout
       ↓
authenticateToken
       ↓
validate request
       ↓
user ID from req.user.user_id
       ↓
BEGIN TRANSACTION
       ↓
load products from database
       ↓
validate quantities
       ↓
validate stock
       ↓
read current prices
       ↓
calculate totals
       ↓
update stock atomically
       ↓
create order
       ↓
create order items
       ↓
clear cart
       ↓
COMMIT
       ↓
return confirmation
```

If any critical step fails:

```text
ROLLBACK
```

---

# 16. Checkout Security Rules

The frontend may send:

```json
{
  "items": [
    {
      "product_id": 1,
      "quantity": 2
    }
  ]
}
```

The frontend should NOT be trusted for:

```json
{
  "price": 100,
  "total": 200
}
```

The backend must calculate:

```text
Current database price
×
Validated quantity
=
Server subtotal
```

Then:

```text
Server subtotals
+
Server-defined charges
=
Server total
```

---

# 17. Inventory Integrity

Inventory must be protected from overselling.

Conceptual operation:

```sql
UPDATE Products
SET stock_quantity = stock_quantity - ?
WHERE product_id = ?
  AND stock_quantity >= ?;
```

The backend must verify that the update succeeded.

For multi-product checkout, stock changes and order creation must occur within the same transaction.

---

# 18. Order Architecture

Current files:

```text
backend/controllers/orderController.js
backend/routes/orderRoutes.js
```

Orders belong to authenticated users.

Conceptual request:

```text
GET /orders/:order_id
       ↓
authenticateToken
       ↓
Get req.user.user_id
       ↓
Find order
       ↓
Verify order.user_id
       ↓
Return order
```

A user must never be able to retrieve another user's order by changing an order ID in the URL.

Order history should preserve the historical purchase price through order items.

---

# 19. Product Architecture

Current files:

```text
backend/controllers/productController.js
backend/routes/productRoutes.js
```

Product data should include, where supported by the database:

```text
product_id
name
description
category
price
stock_quantity
image_url
```

The frontend displays product information.

The backend/database determines:

- Current price
- Current stock
- Product existence
- Checkout availability

---

# 20. Wishlist Architecture

Current files:

```text
backend/controllers/wishlistController.js
backend/routes/wishlistRoutes.js
frontend/src/context/WishlistContext.js
frontend/src/pages/WishlistPage.jsx
```

This indicates that wishlist functionality currently exists on both sides of the application.

Architecture should eventually define one clear source of truth.

Preferred authenticated model:

```text
Frontend WishlistContext
        ↓
Wishlist API
        ↓
Backend
        ↓
Database
```

If wishlist is intentionally local-only, backend wishlist code should eventually be removed or isolated.

---

# 21. Profile Architecture

Current files:

```text
backend/controllers/profileController.js
backend/routes/profileRoutes.js
frontend/src/pages/profilepage.jsx
```

Profile operations must identify the user from:

```js
req.user.user_id;
```

rather than accepting an arbitrary authenticated user ID from the browser.

A user should only be able to:

- Read their profile
- Update their profile
- Change allowed personal information

They should not be able to modify another user's profile.

---

# 22. Frontend Architecture

Current frontend structure:

```text
frontend/src/
├── components/
├── context/
├── pages/
├── services/
├── App.jsx
├── index.css
├── index.js
└── pureboostfrontend.jsx
```

The frontend is organized primarily by:

```text
Pages
Components
Context
Services
```

---

# 23. Frontend Pages

Current pages:

```text
CheckoutPage.jsx
HomePage.jsx
Loginpage.jsx
ProductDetails.jsx
profilepage.jsx
WishlistPage.jsx
```

Responsibilities:

### HomePage

- Brand presentation
- Hero content
- Product discovery
- Promotional sections

### ProductDetails

- Product information
- Product imagery
- Price
- Availability
- Cart interaction

### Loginpage

- Authentication form
- Login errors
- Authentication state update

### CheckoutPage

- Checkout UI
- Customer/order information
- Validation
- Checkout request
- Success/failure states

### profilepage

- Authenticated customer information
- Profile operations

### WishlistPage

- Wishlist presentation
- Wishlist interactions

---

# 24. Checkout Components

Current files:

```text
frontend/src/components/checkout/
├── GuestCheckout.jsx
└── OrderConfirmation.jsx
```

The presence of `GuestCheckout.jsx` means the guest-checkout architecture should be explicitly reviewed.

Two possible models:

### Model A — Guest checkout

```text
Guest
 ↓
Checkout
 ↓
Server creates guest order
```

### Model B — Authentication required

```text
Guest
 ↓
Checkout
 ↓
Login/Register
 ↓
Authenticated checkout
```

If guest checkout remains supported, the backend must have a deliberate guest-order data model and must not weaken authenticated ownership rules.

---

# 25. Frontend Authentication

Current files:

```text
frontend/src/context/AuthContext.js
frontend/src/services/authService.js
frontend/src/components/ProtectedRoutes.jsx
```

Authentication flow:

```text
Loginpage
   ↓
authService
   ↓
API
   ↓
JWT
   ↓
AuthContext
   ↓
ProtectedRoutes
```

Authentication state should be centralized.

Avoid having multiple independent token keys or competing authentication implementations.

---

# 26. Protected Routes

Current component:

```text
frontend/src/components/ProtectedRoutes.jsx
```

Protected routes should cover pages that require authentication.

Typical examples:

```text
Profile
Orders
Authenticated Checkout
Server-backed Wishlist
```

Important:

> `ProtectedRoutes.jsx` protects the frontend experience. It does not replace backend authorization.

---

# 27. API Services

Current files:

```text
frontend/src/services/
├── api.js
└── authService.js
```

The project should maintain one consistent API integration strategy.

Recommended flow:

```text
React component
      ↓
service / API client
      ↓
HTTP request
      ↓
Express API
```

The API client should centralize:

- API base URL
- JSON headers
- JWT authorization
- Error handling
- Response parsing

Environment-based frontend API configuration should be used.

---

# 28. Product Images

Current asset directory:

```text
frontend/public/images/
```

It contains:

- Drink product imagery
- Fitness equipment
- Clothing
- Promotional banners
- Video assets
- Product placeholder

Fallback:

```text
/images/product-placeholder.svg
```

Product image rendering should use:

```text
Valid image
   ↓
Display
```

or:

```text
Missing / failed image
   ↓
/images/product-placeholder.svg
```

Images should use stable aspect-ratio containers to prevent layout shifts.

---

# 29. Frontend Design System

PureBoost visual direction:

```text
Near-black surfaces
Warm-white content areas
Citrus-lime accent
High contrast
Restrained borders
Limited shadows
Maximum ~8px card radius
```

Typography:

```text
Plus Jakarta Sans
system fallbacks
```

The storefront should feel:

```text
Energetic
Confident
Performance-focused
Useful
Commercial
```

It should not feel like a generic wellness dashboard.

---

# 30. Responsive Rules

Product grids:

```text
Small:   1 column
Medium:  2 columns
Large:   3–4 columns
```

Controls should target approximately:

```text
44px touch targets
```

Mobile navigation may:

- Collapse
- Hide secondary controls
- Preserve essential account/cart actions

No content should overlap product images or neighboring controls.

---

# 31. Accessibility

Requirements:

```text
✓ Meaningful product image alt text
✓ Labels for form fields
✓ aria-label for icon-only controls
✓ Visible keyboard focus
✓ Error states visible in the interface
✓ Loading states visible in the interface
✓ Empty states visible in the interface
✓ Success states visible in the interface
✓ Do not communicate critical state through color alone
```

---

# 32. Environment Configuration

Current environment files exist at:

```text
pureboost/.env
pureboost/.env.example
frontend/.env.example
```

Sensitive values should remain in `.env` or the deployment environment.

Never commit:

```text
JWT secrets
Database passwords
API private keys
Payment secrets
Production credentials
```

Example backend environment:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=pureboost
DB_USER=your_user
DB_PASSWORD=your_password
JWT_SECRET=your_random_secret
CLIENT_URL=http://localhost:3000
```

Example frontend environment:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Actual variable names should match the existing application implementation.

---

# 33. Security Architecture

Minimum security baseline:

```text
JWT authentication
        +
bcrypt password hashing
        +
Authorization / ownership checks
        +
Input validation
        +
Parameterized SQL
        +
Transactional checkout
        +
Inventory protection
        +
CORS configuration
        +
Helmet
        +
Authentication rate limiting
        +
Safe error responses
```

---

# 34. Sensitive Data Rules

Never:

```text
Return password hashes
Trust client-supplied roles
Trust client-supplied user IDs
Trust client-supplied prices
Trust client-supplied totals
Store raw card details
Log passwords
Log JWT secrets
Log raw payment information
```

---

# 35. Recommended Backend Evolution

The current backend is controller-focused.

As checkout and business rules become more complex, a service layer may be introduced:

```text
routes
  ↓
middleware
  ↓
controllers
  ↓
services
  ↓
database
```

Potential future services:

```text
checkoutService.js
inventoryService.js
authService.js
orderService.js
```

This should be introduced only where it provides a clear benefit. Do not add abstractions simply for the sake of creating more folders.

---

# 36. Recommended Validation Layer

Validation should occur before controllers execute business logic.

Potential structure:

```text
backend/
└── validators/
    ├── authValidators.js
    ├── cartValidators.js
    └── checkoutValidators.js
```

Potential responsibilities:

```text
Registration
Login
Cart quantity
Product IDs
Checkout items
Profile updates
```

The exact validation library should be decided before implementation.

---

# 37. Error Handling

The API should return consistent errors.

Examples:

```json
{
  "message": "Invalid credentials"
}
```

or:

```json
{
  "message": "Validation failed",
  "errors": {
    "email": "Invalid email address"
  }
}
```

Recommended status codes:

```text
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Unprocessable Entity
429 Too Many Requests
500 Internal Server Error
```

Production responses should not expose internal implementation details.

---

# 38. Commerce Data Flow

Full customer journey:

```text
Customer
   ↓
Frontend
   ↓
Products API
   ↓
Product display
   ↓
Cart
   ↓
Authentication if required
   ↓
Checkout
   ↓
JWT identity
   ↓
Backend validation
   ↓
Database prices
   ↓
Database stock
   ↓
Transaction
   ↓
Order
   ↓
Order items
   ↓
Stock update
   ↓
Cart clear
   ↓
Confirmation
   ↓
Frontend success state
```

---

# 39. Current Architectural Gaps To Review

Based on the supplied structure and implementation plan, these are the most important items to inspect in the actual code:

## Critical

- [ ] Confirm `JWT_SECRET` exists in runtime environment.
- [ ] Confirm JWT payload contains `user_id`.
- [ ] Confirm `authMiddleware.js` verifies JWT correctly.
- [ ] Confirm authenticated controllers use `req.user.user_id`.
- [ ] Confirm `authorizeUser.js` cannot be bypassed.
- [ ] Confirm cart ownership checks are correct.
- [ ] Confirm order ownership checks are correct.
- [ ] Confirm checkout recalculates prices server-side.
- [ ] Confirm checkout cannot accept client totals.
- [ ] Confirm stock is checked server-side.
- [ ] Confirm checkout uses a transaction.
- [ ] Confirm stock cannot be oversold.
- [ ] Confirm password hashes are never returned.

## Database

- [ ] Compare `VortexXcel.sql` with every controller query.
- [ ] Confirm `stock_quantity`.
- [ ] Confirm `image_url`.
- [ ] Confirm `order_date`.
- [ ] Confirm order-items structure.
- [ ] Confirm foreign keys.
- [ ] Confirm indexes.
- [ ] Review migration strategy.
- [ ] Remove duplicate schema definitions.

## Frontend

- [ ] Confirm `AuthContext` is mounted once.
- [ ] Confirm `authService.js` and `api.js` do not duplicate responsibilities.
- [ ] Confirm one token storage strategy.
- [ ] Confirm protected routes are actually mounted.
- [ ] Confirm cart uses the intended backend/local strategy.
- [ ] Confirm guest checkout has a deliberate backend contract.
- [ ] Confirm wishlist has one clear source of truth.
- [ ] Confirm product image fallback works.
- [ ] Confirm loading/error/empty/success states are visible.

## Production

- [ ] Add Helmet.
- [ ] Add authentication rate limiting.
- [ ] Configure CORS from environment.
- [ ] Add health check.
- [ ] Add structured logging.
- [ ] Add dependency scanning.
- [ ] Add secret scanning.
- [ ] Add CI tests.
- [ ] Add production environment configuration.

---

# 40. Testing Architecture

## Backend

Tests should eventually cover:

```text
AUTH
 ├── Registration
 ├── Duplicate email
 ├── Login
 ├── Invalid password
 ├── Invalid/missing JWT
 ├── Expired JWT
 └── Password redaction

AUTHORIZATION
 ├── User ownership
 ├── Cart ownership
 ├── Order ownership
 ├── Profile ownership
 └── Admin boundaries

CART
 ├── Add
 ├── Update
 ├── Remove
 ├── Invalid quantities
 └── Ownership

CHECKOUT
 ├── Correct totals
 ├── Current prices
 ├── Stock validation
 ├── Stock decrement
 ├── Transaction rollback
 └── Concurrent requests

ORDERS
 ├── Creation
 ├── Retrieval
 ├── Ownership
 └── Order details
```

---

# 41. Frontend Testing

Important workflows:

```text
Products
 ├── Loading
 ├── Empty
 └── API failure

Authentication
 ├── Login
 ├── Logout
 └── Reload/session state

Protected Routes
 └── Unauthenticated redirect

Cart
 ├── Quantity
 ├── Remove
 └── Empty

Checkout
 ├── Validation
 ├── API failure
 └── Confirmation

Wishlist
 ├── Add
 ├── Remove
 └── Persistence strategy
```

---

# 42. Validation Commands

Backend:

```text
cd backend
npm test
```

Frontend:

```text
cd frontend
npm test -- --watchAll=false
npm run build
```

These should eventually become reliable development/CI gates.

---

# 43. Development Priority

The recommended priority for the current repository is:

```text
1. Database contract
        ↓
2. JWT authentication
        ↓
3. Authorization / ownership
        ↓
4. Product contract
        ↓
5. Cart contract
        ↓
6. Checkout transaction
        ↓
7. Inventory integrity
        ↓
8. Order ownership
        ↓
9. Frontend API integration
        ↓
10. Automated tests
        ↓
11. Production security
        ↓
12. Visual polish
```

---

# 44. Architecture Decision Log

Use this section to document decisions rather than allowing important architectural choices to remain implicit.

## Decision 1

**Topic:**

```text
[Enter topic]
```

**Current implementation:**

```text
[Enter current implementation]
```

**Decision:**

```text
[Enter final decision]
```

**Reason:**

```text
[Enter reason]
```

---

## Decision 2

**Topic:**

```text
[Enter topic]
```

**Current implementation:**

```text
[Enter current implementation]
```

**Decision:**

```text
[Enter final decision]
```

**Reason:**

```text
[Enter reason]
```

---

# 45. Open Architecture Questions

These should be answered before the corresponding feature is finalized:

1. Is checkout available to guests?
2. Is wishlist server-backed or local-only?
3. Where is the frontend JWT stored?
4. Is a refresh-token mechanism required?
5. What roles exist?
6. What is the admin workflow?
7. What payment provider will be used?
8. Are refunds in scope?
9. What is the final order schema?
10. What is the final order-item schema?
11. Is `stock_quantity` mandatory for every product?
12. What is the database migration runner/strategy?
13. Which validation library will be used?
14. Which test framework will be used?
15. What is the production hosting architecture?
16. What is the production MySQL provider?
17. What logging/monitoring solution will be used?
18. What CORS origins are allowed in production?

---

# 46. Definition of Done

A PureBoost feature should not be considered complete simply because it works visually.

A feature is complete when:

```text
✓ Database contract is correct
✓ API contract is correct
✓ Authentication is enforced
✓ Authorization is enforced
✓ Input is validated
✓ Ownership is verified
✓ Sensitive data is protected
✓ Business rules are server-authoritative
✓ Failure states are handled
✓ Tests cover the important workflow
✓ Frontend handles loading/error/success states
✓ Production build succeeds
✓ Documentation is updated where necessary
```

---

# 47. Final Architecture Principle

PureBoost should be treated as:

```text
A commerce system first
A storefront second
```

The visual storefront should be energetic, clear, responsive, and easy to use.

The backend must remain responsible for the things that determine whether a transaction is actually valid:

```text
WHO
 ↓
Authentication

WHAT THEY CAN DO
 ↓
Authorization

WHAT THEY ARE BUYING
 ↓
Product database

HOW MUCH IT COSTS
 ↓
Database price

HOW MUCH IS AVAILABLE
 ↓
Database inventory

HOW MUCH THEY PAY
 ↓
Server calculation

WHETHER THE ORDER IS VALID
 ↓
Transactional checkout

WHO OWNS THE ORDER
 ↓
Authenticated user identity
```

That separation is the foundation of a reliable PureBoost Energy application.

---

# 48. Change Log

| Date       | Change                                                      | Reason                                   |
| ---------- | ----------------------------------------------------------- | ---------------------------------------- |
| 2026-09-09 | Updated architecture to reflect actual repository structure | Align documentation with current project |
|            |                                                             |                                          |
|            |                                                             |                                          |
