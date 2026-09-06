# PureBoost Energy Design System

## Product Character

PureBoost Energy should feel energetic, confident, and useful. The interface is a performance-focused storefront, not a generic wellness dashboard: products, categories, price, availability, and checkout actions should remain easy to scan.

## Visual Direction

- Use near-black surfaces, warm white content areas, and a sharp citrus-lime accent.
- Keep contrast high and use color to signal action, stock, success, and error.
- Prefer restrained borders and shadows over decorative gradients or floating shapes.
- Use square or softly rounded controls. Keep repeated cards at a maximum 8px radius.
- Use local fallback imagery whenever a product has no usable image or a remote image fails.

## Typography

- Use a purposeful sans-serif stack with `Plus Jakarta Sans` first and system fallbacks.
- Use compact, strong headings for product and operational UI.
- Keep body copy readable with comfortable line height.
- Do not use oversized hero typography inside cards or dense controls.

## Layout

- Header actions must be unique: one visible login/account action, one wishlist action, and one cart action.
- Product grids should support one column on small screens, two on medium screens, and three or four on large screens.
- Keep product images in stable aspect-ratio containers so loading or fallback images do not shift layout.
- Use full-width page sections with a constrained inner container. Cards are reserved for repeated products and focused tools.

## Interaction

- Product cards must make image, name, price, category, and add-to-cart action clear.
- Icon-only actions require accessible labels or tooltips.
- Authentication state must be reflected consistently in the navigation.
- Failed or missing images must fall back to `/images/product-placeholder.svg`.
- Loading, empty, error, and success states should be visible without relying on console output.

## Responsive Rules

- Navigation may collapse or hide secondary search controls on narrow screens.
- Buttons and inputs must remain usable with touch targets of roughly 44px.
- Never allow text, badges, or controls to overlap product imagery or neighboring content.

## Accessibility

- Every product image has meaningful alternative text.
- Form fields have labels.
- Interactive icons have `aria-label` text.
- Focus states remain visible against dark and light surfaces.
