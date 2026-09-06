# PureBoost Implementation Plan

## Goal

Turn PureBoost into a reliable full-stack commerce application by first stabilizing the database and API contracts, then connecting the frontend to authoritative backend workflows, and finally adding security and regression coverage.

## Current Baseline

- Frontend: React/Create React App storefront with local cart, wishlist, authentication, and mock checkout behavior.
- Backend: Express API with MySQL, JWT authentication, bcrypt password hashing, product, cart, order, and profile controllers.
- Database: `backend/VortexXcel.sql` defines users, products, carts, and orders, but it does not currently match all controller queries.
- Tests: Backend test command is a placeholder and meaningful automated coverage is not yet present.

## Phase 1: Establish A Consistent Data Contract

1. Reconcile `backend/VortexXcel.sql` with the controllers.
   - Decide whether inventory is required and add `Products.stock_quantity` if it is.
   - Add the fields required for guest checkout and payment records, or remove those concepts from the API.
   - Standardize product image naming around `image_url`.
   - Standardize order timestamps around `order_date`.
   - Add a real refunds table only if refunds are in scope.
2. Make schema setup rerunnable.
   - Remove the duplicate `role` column definition/alteration.
   - Prefer explicit migrations or guarded `ALTER TABLE` statements for future changes.
3. Seed products without duplicating rows on every setup.

**Exit criteria:** A clean database can be created from scratch, every active SQL query references an existing column/table, and the schema can be applied repeatedly without avoidable errors.

## Phase 2: Secure And Complete The Backend

1. Add request validation for registration, login, cart operations, and checkout.
2. Remove password hashes from all API responses.
3. Derive the authenticated user from `req.user.user_id`; do not trust a client-supplied user ID for authenticated operations.
4. Enforce ownership for user orders, order details, carts, refunds, and cart items.
5. Make checkout server-authoritative.
   - Accept product IDs and quantities, not client prices.
   - Reload current prices from the database.
   - Validate positive integer quantities and available stock.
   - Calculate totals on the server.
   - Use a database transaction.
   - Decrement stock atomically and prevent overselling.
   - Create order items and clear the cart within the same transaction.
6. Mount only the routes that are implemented and remove or isolate cookie test endpoints before production.
7. Add production basics: environment-based configuration, secure JWT validation, Helmet, rate limiting on authentication, and consistent error responses.

**Exit criteria:** Malformed and unauthorized requests are rejected, order totals cannot be manipulated by the client, and a failed checkout leaves stock, cart, and order data consistent.

## Phase 3: Consolidate Frontend Integration

1. Create one API client with an environment-based base URL and shared authorization handling.
2. Choose one authentication flow.
   - Mount `AuthProvider`.
   - Use one token key consistently.
   - Implement or remove the missing `authService` dependency.
   - Wrap account and wishlist routes with the protected-route component.
3. Connect the cart UI to the backend for authenticated users and use a securely managed guest-cart strategy for guests.
4. Replace mock checkout with the backend checkout flow.
5. Use a payment provider tokenization flow; never store or send raw card details to this application.
6. Mount and connect wishlist routes, or explicitly keep wishlist local-only and remove unused backend code.
7. Normalize product and order response mapping.
   - Use `image_url` consistently.
   - Use `order_date` consistently.
   - Fetch order items when order history needs them.
8. Remove duplicate storefront implementations and stale branding.

**Exit criteria:** Login state survives reload, protected routes reject unauthenticated users, products/cart/orders use the API, and checkout creates a real order with a clear success or failure state.

## Phase 4: Test The Critical Workflows

### Backend

- Registration validation and duplicate email/username handling.
- Login success, invalid credentials, missing JWT secret, and response redaction.
- User and admin authorization boundaries.
- Cart ownership and invalid quantities.
- Order ownership and order-detail authorization.
- Checkout totals, stock limits, transaction rollback, and concurrent stock updates.
- Profile updates and refund authorization.

### Frontend

- Product loading, empty state, and API failure state.
- Login and logout state.
- Protected-route redirects.
- Cart quantity and removal behavior.
- Checkout validation, API failure handling, and order confirmation.

**Exit criteria:** Backend integration tests run in CI, frontend tests cover the main customer workflows, and the production build completes.

## Phase 5: Release Readiness

- Add `.env.example` files without real secrets.
- Configure CORS from environment values.
- Add structured server logging and health checks.
- Verify database indexes and foreign-key behavior.
- Run dependency and secret scans.
- Document local setup, database initialization, test commands, and deployment assumptions.

## Recommended First Slice

Start with Phase 1 and the backend checkout contract. Do not add more storefront features until the schema, authentication identity, order ownership, totals, and stock behavior are tested and consistent.

## Working Validation Commands

```text
cd backend
npm test

cd ../frontend
npm test -- --watchAll=false
npm run build
```

These commands are expected to become reliable gates as the corresponding tests and fixes are implemented.
