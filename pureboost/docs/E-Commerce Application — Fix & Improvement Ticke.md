# E-Commerce Application — Fix & Improvement Ticket

**Ticket Type:** Bug Fixes + UI/UX Improvements + New Features
**Priority:** High
**Status:** To Do
**Date:** 2026-09-09

---

## 1. Wishlist Button Toggle Is Broken

### Issue

The wishlist button on product cards does not toggle correctly.

Once a user clicks the wishlist/favourite button, they cannot click it again to remove the item.

### Expected Behaviour

- Clicking the wishlist button adds the product to the wishlist.
- Clicking it again removes the product.
- The button should visually reflect its current state.
- The state should remain consistent across product cards, product pages, wishlist page, and navigation.

### Acceptance Criteria

- [ ] Wishlist button can be clicked on/off.
- [ ] Add → Remove works without refreshing.
- [ ] Visual state changes when selected.
- [ ] Wishlist state is synchronized across the application.
- [ ] No duplicate wishlist entries are created.

---

## 2. Search Bar Dropdown Has Unwanted Scroll Wheel

### Issue

When searching for a letter/product and multiple products are returned, the search dropdown displays an unnecessary/awkward scroll wheel.

### Expected Behaviour

The search results dropdown should have a clean, controlled layout.

### Acceptance Criteria

- [ ] Search results display correctly.
- [ ] Dropdown has a sensible maximum height.
- [ ] Scrolling only occurs when genuinely necessary.
- [ ] No visual scrollbar/scroll wheel overlaps the search UI.
- [ ] Search results remain accessible on desktop and mobile.
- [ ] Clicking a result navigates to the correct product.

---

## 3. Profile Page Navigation Is Broken

### Issue

Once the user enters the Profile page, they cannot properly navigate to the other pages.

### Expected Behaviour

The main navigation should remain functional regardless of which page the user is currently viewing.

### Acceptance Criteria

- [ ] Home navigation works.
- [ ] Product/category navigation works.
- [ ] Cart navigation works.
- [ ] Wishlist navigation works.
- [ ] Profile navigation works.
- [ ] All navbar links remain clickable from Profile.
- [ ] Mobile navigation also works.
- [ ] No page-specific layout blocks the navbar.

---

## 4. Cart & Wishlist Data Does Not Persist

### Issue

Products added to the cart or wishlist disappear when the user changes pages or refreshes the browser.

### Expected Behaviour

Cart and wishlist state should persist between page navigation and browser refreshes.

### Required Implementation

Use persistent client-side storage for the current application stage.

Possible implementation:

- `localStorage`
- Persistent state management
- Backend/database persistence if authentication is already implemented

### Acceptance Criteria

- [ ] Add product to cart.
- [ ] Navigate to another page.
- [ ] Product remains in cart.
- [ ] Refresh browser.
- [ ] Product remains in cart.
- [ ] Add product to wishlist.
- [ ] Navigate to another page.
- [ ] Product remains in wishlist.
- [ ] Refresh browser.
- [ ] Product remains in wishlist.
- [ ] Cart quantity persists.
- [ ] Wishlist state remains synchronized.

### Important

Do not create separate cart/wishlist states for individual pages. There should be **one shared application state**.

---

## 5. Add-to-Cart Button Needs Interactive State

### Issue

The Add to Cart button currently provides little/no visual feedback after clicking.

### Expected Behaviour

The button should clearly communicate the item's cart state.

### Suggested Interaction

Initial:

`Add to Cart`

After adding:

`−   1   +`

or:

`−   1   +`

Clicking:

`+` → increases quantity

`−` → decreases quantity

When quantity reaches zero:

`Add to Cart`

### Acceptance Criteria

- [ ] Button has a click animation.
- [ ] Button provides immediate visual feedback.
- [ ] Added product changes to quantity controls.
- [ ] `+` increases quantity.
- [ ] `−` decreases quantity.
- [ ] Quantity reaching zero removes the item.
- [ ] Cart badge updates immediately.
- [ ] State remains synchronized across pages.
- [ ] Interaction works on mobile/touch devices.

---

# 6. Product Pages Are Not Properly Centered

### Issue

Product pages and their content are not consistently centered.

Some content appears:

- Cut off
- Squashed
- Too wide
- Too narrow
- Misaligned
- Incorrectly positioned at different screen sizes

### Expected Behaviour

All product pages should use a consistent responsive content container.

### Required Layout Principles

Use:

- Responsive max-width container
- Consistent horizontal padding
- Proper grid/flex layouts
- Responsive product image sizing
- No fixed widths that cause overflow
- No content extending outside the viewport

### Acceptance Criteria

- [ ] Product pages are centered.
- [ ] Product cards maintain consistent dimensions.
- [ ] Images do not become distorted.
- [ ] Text does not overflow.
- [ ] No horizontal page scrolling.
- [ ] Desktop layout works.
- [ ] Tablet layout works.
- [ ] Mobile layout works.
- [ ] Product content remains readable at narrow widths.

### Responsive Breakpoints To Test

`320px`

`375px`

`768px`

`1024px`

`1440px`

---

# 7. Footer Links Are Broken

### Issue

Several footer links currently lead to blank pages or pages where the navbar/footer become visually squashed together.

### Expected Behaviour

Every footer link should lead to a properly implemented page.

### Required Work

Audit every footer link.

For each link:

1. Confirm destination.
2. Confirm route exists.
3. Confirm page contains actual content.
4. Confirm navbar loads correctly.
5. Confirm footer loads correctly.
6. Confirm responsive layout.
7. Confirm browser navigation works.

### Acceptance Criteria

- [ ] No dead footer links.
- [ ] No blank pages.
- [ ] No broken routes.
- [ ] No squashed navbar/footer.
- [ ] Every linked page has meaningful content.
- [ ] Footer remains responsive.
- [ ] Footer links work on desktop and mobile.

---

# 8. Create a Proper 404 Page

### Requirement

Create a dedicated 404 / Not Found page.

### Suggested Content

**404**

**Page Not Found**

The page you're looking for doesn't exist or may have been moved.

Buttons:

`Back Home`

`Continue Shopping`

### Acceptance Criteria

- [ ] Invalid routes display the 404 page.
- [ ] 404 page uses the application's design system.
- [ ] Navbar works.
- [ ] Footer works.
- [ ] Home button works.
- [ ] Continue Shopping button works.
- [ ] Page is responsive.

---

# 9. Create a New Navbar

### Requirement

Replace/rework the existing navbar with a clean, consistent application-wide navigation system.

### Required Navigation

At minimum:

- Home
- Products / Shop
- Search
- Wishlist
- Cart
- Profile / Account

### Navbar Requirements

- Responsive desktop layout
- Responsive mobile layout
- Active page indicator
- Cart item count
- Wishlist indicator
- Search access
- Profile access
- Consistent appearance across every page

### Acceptance Criteria

- [ ] Navbar appears consistently throughout application.
- [ ] All links work.
- [ ] Active route is visually identifiable.
- [ ] Cart count updates dynamically.
- [ ] Wishlist state updates dynamically.
- [ ] Mobile menu works.
- [ ] Navbar does not overlap content.
- [ ] Navbar does not cause horizontal overflow.

---

# 10. Create a New Home Page

### Requirement

Build a new homepage that acts as the primary entry point to the application.

### Suggested Structure

## Hero Section

- Strong headline
- Supporting text
- Primary CTA
- Secondary CTA
- Featured product imagery

Example:

**Discover products worth adding to your everyday.**

`Shop Now`

`Explore Collection`

---

## Featured Products

Display selected products with:

- Product image
- Product name
- Price
- Wishlist button
- Add to Cart button

---

## Categories

Display major product categories.

---

## Promotional Section

Highlight:

- New arrivals
- Special offers
- Featured products
- Popular products

---

## Call To Action

Encourage users to browse/shop.

### Acceptance Criteria

- [ ] Homepage is responsive.
- [ ] Homepage is visually consistent with the application.
- [ ] Product cards use the shared product-card component.
- [ ] Wishlist works.
- [ ] Cart functionality works.
- [ ] Navigation works.
- [ ] No layout overflow.
- [ ] Images are responsive.

---

# 11. Add Payment / Simulated Payment Flow

### Requirement

Add a payment step to the checkout process.

For the current development/testing stage, a **simulated payment system** is acceptable.

### Suggested Flow

```text
Product
   ↓
Add to Cart
   ↓
Cart
   ↓
Checkout
   ↓
Customer Details
   ↓
Payment
   ↓
Simulated Payment
   ↓
Payment Successful
   ↓
Order Confirmation
```

### Payment Screen

Include:

- Order summary
- Subtotal
- Delivery fee
- Total
- Payment method
- Simulated card/payment fields
- Pay Now button

### Development Behaviour

The system should simulate:

**Payment Processing**

↓

**Payment Successful**

↓

**Order Created**

↓

**Order Confirmation**

### Important

Clearly label the payment system as **Demo / Simulated Payment** if real payment processing is not connected.

Do not collect or store real card information in the simulated implementation.

### Acceptance Criteria

- [ ] Checkout has payment step.
- [ ] Order total is calculated correctly.
- [ ] Simulated payment can succeed.
- [ ] Failed payment state can be displayed.
- [ ] Successful payment creates an order state.
- [ ] Confirmation page is displayed.
- [ ] Cart is cleared after successful checkout.
- [ ] No real payment credentials are stored.

---

# 12. Login & Signup Input Text Is White

### Issue

On the login and signup pages, entered text appears white regardless of the input state, making it difficult to see what the user is typing.

### Expected Behaviour

Input text must have sufficient contrast against the input background.

### Required Fix

Review:

- `color`
- `background-color`
- `placeholder-color`
- `:focus`
- `:active`
- `:autofill`
- browser-specific input styling

### Acceptance Criteria

- [ ] Typed text is clearly visible.
- [ ] Placeholder text is distinguishable from entered text.
- [ ] Focus state is visually obvious.
- [ ] Password fields are readable.
- [ ] Autofill does not create unreadable text.
- [ ] Login works.
- [ ] Signup works.
- [ ] Styling is consistent across browsers.

---

# 13. Favicon & Application Name

### Requirement

Add proper branding metadata to the application.

### Favicon

Add a proper favicon using the application's logo/brand mark.

Required checks:

- Browser tab icon
- Mobile shortcut icon where applicable
- Manifest icon where applicable

### Application Name

Update the browser/application title.

Replace generic names such as:

`Vite App`

`React App`

`Next App`

with the actual application/brand name.

### Required Metadata

Update:

- Page title
- Favicon
- Apple/mobile icon where applicable
- Web app manifest
- Theme metadata where applicable
- Open Graph title/image where applicable

### Acceptance Criteria

- [ ] Correct favicon appears in browser tab.
- [ ] Application has correct name.
- [ ] No default framework branding remains.
- [ ] Manifest uses correct application name.
- [ ] Mobile/PWA metadata is configured where applicable.

---

# 14. Global UI/UX & Responsive Audit

All fixes above should be followed by a complete responsive audit.

### Test Resolutions

| Device       |  Width |
| ------------ | -----: |
| Small Mobile |  320px |
| Mobile       |  375px |
| Tablet       |  768px |
| Laptop       | 1024px |
| Desktop      | 1440px |

### Check For

- Horizontal scrolling
- Squashed components
- Broken navigation
- Overflowing text
- Incorrect image dimensions
- Buttons extending outside containers
- Footer positioning
- Navbar positioning
- Modal/dropdown overflow
- Product grid behaviour
- Cart/wishlist state
- Search behaviour

---

# 15. Shared State Architecture

The cart and wishlist fixes should be implemented using a **single shared state layer** rather than isolated component state.

### Required Shared State

```text
Application State
│
├── Cart
│   ├── Items
│   └── Quantities
│
├── Wishlist
│   └── Items
│
├── User
│   └── Authentication
│
└── UI
    ├── Search
    └── Navigation
```

### Persistence

For the current version:

```text
Application State
        ↓
localStorage
        ↓
Browser Refresh
        ↓
Restore State
```

If a backend/database already exists, the architecture should be prepared for authenticated server-side persistence later.

---

# 16. Regression Testing

After implementing all fixes, test the complete user journey.

### Test 1 — Wishlist

```text
Open Product
↓
Add to Wishlist
↓
Navigate Home
↓
Open Wishlist
↓
Product Exists
↓
Remove Product
↓
Product Removed
↓
Refresh
↓
State Correct
```

### Test 2 — Cart

```text
Open Product
↓
Add to Cart
↓
Quantity Controls Appear
↓
Increase Quantity
↓
Navigate Away
↓
Return to Cart
↓
Quantity Correct
↓
Refresh
↓
Cart Still Exists
```

### Test 3 — Navigation

```text
Home
↓
Products
↓
Product
↓
Wishlist
↓
Cart
↓
Profile
↓
Home
```

Every transition must work.

### Test 4 — Invalid Route

```text
Invalid URL
↓
404 Page
↓
Home
↓
Homepage
```

### Test 5 — Checkout

```text
Product
↓
Cart
↓
Checkout
↓
Payment
↓
Simulated Payment
↓
Success
↓
Order Confirmation
↓
Cart Cleared
```

---

# Definition of Done

This ticket is complete when:

- [ ] Wishlist can be added/removed.
- [ ] Wishlist persists across navigation and refresh.
- [ ] Cart persists across navigation and refresh.
- [ ] Cart quantity controls work.
- [ ] Add-to-cart interaction has clear animation/feedback.
- [ ] Search dropdown is fixed.
- [ ] Profile navigation works.
- [ ] Product pages are centered and responsive.
- [ ] Footer links are audited and fixed.
- [ ] All footer pages contain proper content.
- [ ] 404 page exists and works.
- [ ] New navbar is implemented.
- [ ] New homepage is implemented.
- [ ] Checkout/payment flow exists.
- [ ] Simulated payment works safely.
- [ ] Login inputs have readable text.
- [ ] Signup inputs have readable text.
- [ ] Favicon is configured.
- [ ] Application name is configured.
- [ ] No default framework branding remains.
- [ ] Responsive testing passes at 320px, 375px, 768px, 1024px and 1440px.
- [ ] No major console errors remain.
- [ ] No broken routes remain.
- [ ] No horizontal overflow remains.
- [ ] Production build succeeds.
- [ ] Final regression test passes.

# Priority Order

### P0 — Critical Functionality

1. Cart persistence
2. Wishlist persistence
3. Wishlist toggle
4. Cart quantity controls
5. Profile/navigation bug
6. Broken routes/footer links
7. 404 page

### P1 — Core UX

8. New navbar
9. New homepage
10. Product page responsive/layout fixes
11. Search dropdown
12. Login/signup input visibility
13. Payment/simulated checkout

### P2 — Branding & Polish

14. Favicon
15. Application name
16. Animations/interactions
17. Final responsive audit
18. Regression testing
