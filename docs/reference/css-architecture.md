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

All design values use custom properties:

```css
.my-component {
  padding: var(--container-padding);
  border-radius: var(--border-radius-medium);
  transition: var(--transition-all-normal);
}
```

**Location:** `ui/static/css/foundations/tokens.css`

### 3. Mobile-First Approach

Write mobile styles first, then add breakpoints:

```css
.element {
  /* Mobile styles (default) */
}

@media (width >= 768px) {
  .element {
    /* Tablet and above */
  }
}

@media (width >= 1024px) {
  .element {
    /* Desktop */
  }
}
```

### 4. Utility Classes

Common patterns use utility classes:

```css
.u-container      /* Centered container */
.u-padding-xl     /* Large vertical padding */
.u-background-white /* White background */
.u-flex-center    /* Centered flex */
```

**Location:** `ui/static/css/layout/utilities.css`

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

### Import in Main Stylesheet

Add to `ui/static/css/styles.css`:

```css
/* Pages */
@import 'pages/[page]/styles.css';
```

Or link directly in page template:

```django
{% block pageStyles %}
  <link rel="stylesheet" href="{% static 'css/pages/[page]/styles.css' %}">
{% endblock %}
```

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

### Available Breakpoints

See `ui/static/css/foundations/tokens.css` for full list:

- `width < 375px` - Small mobile
- `width < 768px` - Mobile
- `width >= 768px` - Tablet up
- `width < 1024px` - Mobile/tablet
- `width >= 1024px` - Desktop up
- `width >= 1750px` - Ultra-wide

**Note:** CSS custom properties cannot be used in media queries. Use literal values.

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

Use BEM consistently:

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

## 🔍 Debugging

### Check Specificity

Use browser DevTools to inspect:
1. Computed styles
2. Active selectors
3. Media query breakpoints

### Common Issues

1. **Styles not applying:** Check selector specificity
2. **Media queries not working:** Verify breakpoint values
3. **Tokens not working:** Ensure tokens.css is imported

## 📚 See Also

- [Main README](../README.md#css-tokens--variables)
- [Media Queries](../README.md#media-queries--breakpoints)
- [Utility Classes](../README.md#utility-classes)

