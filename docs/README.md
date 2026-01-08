# Aladdin UI Documentation

Welcome to the Aladdin UI documentation. This guide will help you understand the codebase structure, add new components, and create new pages.

## 📚 Table of Contents

### Getting Started
- [File Structure](#file-structure)
- [CSS Tokens & Variables](#css-tokens--variables)
- [Media Queries & Breakpoints](#media-queries--breakpoints)
- [Utility Classes](#utility-classes)

### Component Guides
- [How to Add an Accordion](./guides/adding-accordions.md)
- [How to Add Tabs](./guides/adding-tabs.md)
- [How to Add a Product/Add-on](./guides/adding-product-addon.md)
- [Component Library](./component-library.md)

### Page Creation
- [Creating a New Page](./guides/creating-new-pages.md)

### Reference
- [JavaScript Structure](./reference/javascript.md)
- [CSS Architecture](./reference/css-architecture.md)

---

## File Structure

```
aladdin/
├── ui/
│   ├── static/
│   │   ├── css/
│   │   │   ├── foundations/      # Base styles, tokens, typography
│   │   │   ├── layout/           # Layout utilities and base styles
│   │   │   ├── pages/            # Page-specific styles
│   │   │   └── shared/           # Reusable component styles
│   │   └── js/
│   │       ├── components/       # JavaScript components
│   │       └── script.js         # Main entry point
│   └── templates/
│       ├── base.html             # Base template
│       ├── components/
│       │   ├── base/             # Header, footer
│       │   ├── shared/           # Reusable components
│       │   ├── home/             # Homepage components
│       │   ├── parents/          # Parents page components
│       │   └── careers/          # Careers page components
│       └── [page].html           # Page templates
└── docs/                         # This documentation
```

### Key Files

- **`ui/templates/base.html`** - Base template extended by all pages
- **`ui/static/css/styles.css`** - Main stylesheet (imports all CSS)
- **`ui/static/js/script.js`** - Main JavaScript entry point
- **`ui/static/css/foundations/tokens.css`** - CSS custom properties (tokens)

---

## CSS Tokens & Variables

All design tokens are defined in `ui/static/css/foundations/tokens.css`.

### Using Tokens

```css
.my-component {
  padding: var(--container-padding);
  border-radius: var(--border-radius-medium);
  transition: var(--transition-all-normal);
}
```

**Full list:** See `ui/static/css/foundations/tokens.css`

---

## Media Queries & Breakpoints

Breakpoints are documented in `ui/static/css/foundations/tokens.css`.

### Standard Breakpoints

| Breakpoint | Value | Usage |
|------------|-------|-------|
| `small-mobile-only` | `width < 375px` | Very small devices |
| `mobile-only` | `width < 768px` | Mobile devices |
| `tablet-up` | `width >= 768px` | Tablets and above |
| `mobile-tablet-only` | `width < 1024px` | Mobile and tablets |
| `desktop-up` | `width >= 1024px` | Desktop and above |
| `ultra-wide-up` | `width >= 1750px` | Large screens |

### Special Breakpoints

- `768px <= width <= 1302px` - Hero title specific range

### Media Query Syntax

```css
/* Mobile first (recommended) */
.my-element {
  /* Mobile styles */
}

@media (width >= 768px) {
  .my-element {
    /* Tablet and above */
  }
}

/* Desktop specific */
@media (width >= 1024px) {
  .my-element {
    /* Desktop only */
  }
}
```

**Note:** CSS custom properties cannot be used in media query conditions. Use the literal values shown above.

---

## Utility Classes

Utility classes are defined in `ui/static/css/layout/utilities.css`.

### Container & Spacing

```html
<!-- Centered container with max-width -->
<div class="u-container">Content</div>

<!-- Padding utilities -->
<section class="u-padding-md">  <!-- 4rem vertical padding -->
<section class="u-padding-xl">  <!-- 8rem vertical padding -->
<section class="u-padding-xxl"> <!-- 12rem vertical padding -->
```

### Background

```html
<!-- White background section -->
<section class="u-background-white">Content</section>
```

### Flexbox

```html
<!-- Centered flex container -->
<div class="u-flex-center">Content</div>

<!-- Space between items -->
<div class="u-flex-between">Items</div>
```

### Typography

```html
<p class="u-font-weight-medium">Medium weight text</p>
```

### Responsive Visibility

```html
<!-- Show only on mobile/tablet -->
<div class="u-mobile-tablet-only">Visible < 1024px</div>

<!-- Show only on desktop -->
<div class="u-desktop-only">Visible >= 1024px</div>

<!-- Show only on mobile -->
<div class="u-mobile-only">Visible < 768px</div>

<!-- Hide on mobile -->
<div class="u-tablet-desktop-only">Visible >= 768px</div>
```

### Mobile Padding Reduction

When two adjacent sections share the same padding class and background, the top padding is automatically removed on mobile:

```html
<!-- Second section's padding-top is removed on mobile -->
<section class="u-background-white u-padding-xl">Section 1</section>
<section class="u-background-white u-padding-xl">Section 2</section>
```

**Full list:** See `ui/static/css/layout/utilities.css`

---

## Next Steps

- 📖 [Read the Component Library](./component-library.md) to see available components
- 🎯 [Learn how to add Accordions](./guides/adding-accordions.md)
- 📑 [Learn how to add Tabs](./guides/adding-tabs.md)
- 🆕 [Create a new page](./guides/creating-new-pages.md)

