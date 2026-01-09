# CSS Architecture

Documentation for the CSS structure, organization, and conventions.

## 📁 File Structure

```
ui/static/css/
├── styles.css              # Main stylesheet (imports all)
├── foundations/            # Base styles
│   ├── normalize.css
│   ├── accessibility.css
│   ├── colors.css
│   ├── typography.css
│   ├── buttons.css
│   ├── tokens.css          # CSS custom properties
│   └── icons.css
├── layout/                 # Layout utilities
│   ├── base.css
│   └── utilities.css
├── pages/                  # Page-specific styles
│   ├── home/
│   ├── parents/
│   └── careers/
└── shared/                 # Reusable components
    ├── accordion.css
    ├── tabs.css
    ├── card.css
    ├── shapes.css
    ├── base/               # Header, footer
    ├── hero/               # Hero components
    └── headings/           # Heading components
```

### Key Files

- **`ui/templates/base.html`** - Base template extended by all pages
- **`ui/static/css/styles.css`** - Main stylesheet (imports all CSS)
- **`ui/static/js/script.js`** - Main JavaScript entry point
- **`ui/static/css/foundations/tokens.css`** - CSS custom properties (tokens)

## 🎯 CSS Import Order

**File:** `ui/static/css/styles.css`

Import order matters:

```css
/* 1. Foundations - Base styles */
@import 'foundations/normalize.css';
@import 'foundations/accessibility.css';
@import 'foundations/colors.css';
@import 'foundations/typography.css';
@import 'foundations/buttons.css';
@import 'foundations/tokens.css';
@import 'foundations/icons.css';

/* 2. Layout - Structure */
@import 'layout/base.css';
@import 'layout/utilities.css';

/* 3. Shared Components */
@import 'shared/accordion.css';
@import 'shared/tabs.css';
@import 'shared/card.css';
@import 'shared/shapes.css';

/* 4. Shared Hero */
@import 'shared/hero/hero.css';
@import 'shared/hero/hero-title-shimmer.css';

/* 5. Shared Header and Footer */
@import 'shared/base/header.css';
@import 'shared/base/footer.css';
@import 'shared/base/submenus.css';
@import 'shared/base/hamburger.css';
@import 'shared/base/mobile-menu.css';

/* 6. Shared Headings */
@import 'shared/headings/underlined.css';
@import 'shared/headings/tagline.css';

/* 7. Page-specific (imported in page stylesheets) */
```

## 🎨 CSS Architecture Principles

### 1. BEM Naming Convention

Block Element Modifier (BEM) naming:

```css
.block {}
.block__element {}
.block__element--modifier {}
```

**Example:**
```css
.card {}
.card__title {}
.card__title--large {}
.card--featured {}
```

### 2. CSS Custom Properties (Tokens)

All design tokens are defined in `ui/static/css/foundations/tokens.css`. Use CSS custom properties for consistent styling:

```css
.my-component {
  padding: var(--container-padding);
  border-radius: var(--border-radius-medium);
  transition: var(--transition-all-normal);
}
```

**Location:** `ui/static/css/foundations/tokens.css`  
**Full list:** See `ui/static/css/foundations/tokens.css`

### 3. Utility Classes

Utility classes are defined in `ui/static/css/layout/utilities.css` for common patterns.

#### Container & Spacing

```html
<!-- Centered container with max-width -->
<div class="u-container">Content</div>

<!-- Padding utilities -->
<section class="u-padding-md">  <!-- 4rem vertical padding -->
<section class="u-padding-xl">  <!-- 8rem vertical padding -->
<section class="u-padding-xxl"> <!-- 12rem vertical padding -->
```

#### Background

```html
<!-- White background section -->
<section class="u-background-white">Content</section>
```

#### Flexbox

```html
<!-- Centered flex container -->
<div class="u-flex-center">Content</div>

<!-- Space between items -->
<div class="u-flex-between">Items</div>
```

#### Typography

```html
<p class="u-font-weight-medium">Medium weight text</p>
```

#### Responsive Visibility

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

#### Mobile Padding Reduction

When two adjacent sections share the same padding class and background, the top padding is automatically removed on mobile:

```html
<!-- Second section's padding-top is removed on mobile -->
<section class="u-background-white u-padding-xl">Section 1</section>
<section class="u-background-white u-padding-xl">Section 2</section>
```

**Location:** `ui/static/css/layout/utilities.css`  
**Full list:** See `ui/static/css/layout/utilities.css`

## 📐 CSS Organization

### Foundations

Base styles that apply globally:

- **normalize.css** - CSS reset/normalize
- **accessibility.css** - Accessibility utilities (skip links, etc.)
- **colors.css** - Color palette
- **typography.css** - Font families, sizes, weights
- **buttons.css** - Button styles (CTAs, header buttons)
- **tokens.css** - CSS custom properties
- **icons.css** - Icon styles

### Layout

Layout and structure:

- **base.css** - Base layout (html, body, scroll behavior)
- **utilities.css** - Utility classes

### Shared Components

Reusable component styles:

- **accordion.css** - Accordion component
- **tabs.css** - Tabs component
- **card.css** - Card component
- **shapes.css** - Decorative shapes
- **base/** - Header, footer, submenus, mobile menu
- **hero/** - Hero section styles
- **headings/** - Heading component styles

### Pages

Page-specific styles. Each page has its own folder:

```
pages/
├── home/
│   ├── styles.css         # Imports all home page styles
│   ├── hero.css
│   ├── packages.css
│   └── ...
├── parents/
│   └── styles.css
└── careers/
    └── styles.css
```

## 🎯 Writing Page-Specific CSS

### Create Page Stylesheet

**File:** `ui/static/css/pages/[page]/styles.css`

```css
/* Import component styles */
@import 'hero.css';
@import 'overview.css';
@import 'details.css';
```

### Link directly in page template:

{% raw %}
```django
{% block pageStyles %}
  <link rel="stylesheet" href="{% static 'css/pages/[page]/styles.css' %}">
{% endblock %}
```
{% endraw %}

## 🎨 Media Query Syntax

### Modern Range Syntax

```css
/* Mobile only */
@media (width < 768px) { }

/* Tablet and above */
@media (width >= 768px) { }

/* Desktop only */
@media (width >= 1024px) { }

/* Range */
@media (768px <= width <= 1024px) { }
```

### Standard Breakpoints

Breakpoints are documented in `ui/static/css/foundations/tokens.css`:

| Breakpoint | Value | Usage |
|------------|-------|-------|
| `small-mobile-only` | `width < 375px` | Very small devices |
| `mobile-only` | `width < 768px` | Mobile devices |
| `tablet-up` | `width >= 768px` | Tablets and above |
| `mobile-tablet-only` | `width < 1024px` | Mobile and tablets |
| `desktop-up` | `width >= 1024px` | Desktop and above |
| `ultra-wide-up` | `width >= 1750px` | Large screens |

**Note:** CSS custom properties cannot be used in media query conditions. Use the literal values shown above.

## 🔧 CSS Best Practices

### 1. Use Tokens

Always use CSS custom properties from `tokens.css`:

```css
/* Good */
.my-element {
  padding: var(--container-padding);
  border-radius: var(--border-radius-medium);
}

/* Avoid */
.my-element {
  padding: 4rem;
  border-radius: 10px;
}
```

### 2. BEM Naming

Use BEM consistently (excluding utility classes):

```css
/* Good */
.card {}
.card__title {}
.card__title--large {}

/* Avoid */
.card-title {}
.cardTitle {}
```

### 3. Component Isolation

Keep component styles scoped:

```css
/* Component-specific */
.card {
  /* Only styles that affect .card */
}

/* Page-specific overrides */
.my-page .card {
  /* Overrides only for this page */
}
```

### 4. Utility Classes

Use utilities for common patterns:

```css
/* Use utility */
<section class="u-container u-padding-xl">

/* Avoid duplicating */
<section class="my-section">
```

### 5. Mobile-First

Write mobile styles first, then enhance:

```css
.element {
  font-size: 1rem; /* Mobile */
}

@media (width >= 768px) {
  .element {
    font-size: 1.25rem; /* Tablet+ */
  }
}
```

## 📱 Responsive Design

### Common Patterns

#### Container Width

```css
.my-section {
  max-width: var(--container-width);
  margin: 0 auto;
  padding-inline: 2rem;
}
```

Or use utility:

```html
<div class="u-container">Content</div>
```

#### Responsive Padding

```css
.section {
  padding-block: 4rem; /* Mobile */
}

@media (width >= 768px) {
  .section {
    padding-block: 8rem; /* Desktop */
  }
}
```

Or use utility:

```html
<section class="u-padding-xl">Content</section>
```

## 🎯 Common Patterns

### Section with Shapes

```css
.section {
  position: relative;
  overflow: hidden;
}

.section__wrapper {
  position: relative;
  z-index: 2;
}
```

### White Background Section

```html
<section class="u-background-white u-padding-xl">
  <div class="u-container">
    Content
  </div>
</section>
```

### Centered Content

```html
<div class="u-container u-flex-center">
  Centered content
</div>
```

