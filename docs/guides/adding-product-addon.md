# How to Add a New Product/Add-on

This guide shows you how to add a new product (like Start, Connect, Frame) or add-on (like ePayments, Library, Staff Absences) to the site. This includes adding colors, button styles, tabs (for products), and cards (for add-ons).

## Quick Start

1. Add color variables to `css/foundations/colors.css`
2. Add button styles to `css/foundations/buttons.css`
3. For products: Add a tab to `components/home/packages.html` and styles to `css/pages/home/packages.css`
4. For add-ons: Add a card to `components/home/add-ons.html` and styles to `css/pages/home/add-ons.css`

## Step 1: Add Colors to `colors.css`

Open `css/foundations/colors.css` and add your product/add-on color variables.

### For a New Product (e.g., "Analyze")

Products typically need:
- Base color (`--color-[name]`)
- Light variant (`--color-[name]-light`)
- Two-tone gradient (`--color-[name]-gradient-two-tone`)
- Four-tone gradient (`--color-[name]-gradient-four-tone`)

```css
/* Product: Analyze */
--color-analyze: var(--color-purple); /* or a specific hex value */
--color-analyze-light: #E8D5FF;
--color-analyze-gradient-two-tone: linear-gradient(93.69deg, var(--color-purple) -6.48%, #A855F7 100%);
--color-analyze-gradient-four-tone: linear-gradient(235.42deg, var(--color-purple) 12.64%, #9333EA 47.09%, #7E22CE 47.09%, #6B21A8 58.58%);
```

### For a New Add-on (e.g., "Reports")

Add-ons typically need:
- Base color (`--color-[name]`)
- Two-tone gradient (`--color-[name]-gradient-two-tone`)

```css
/* Add-on: Reports */
--color-reports: var(--color-orange);
--color-reports-gradient-two-tone: var(--color-gradient-orange-yellow);
```

**Note:** Use existing base colors or gradients when possible for consistency. See `colors.css` for available base colors and gradients.

## Step 2: Add Button Styles to `buttons.css`

Open `css/foundations/buttons.css` and add button styles for your new product/add-on.

### For Products (Dark Variant)

Products use dark variant buttons (with border effect). Add these styles:

```css
.cta--analyze-dark {
  background: var(--color-packages-gradient-two-tone);
}

.cta--analyze-dark .cta__inner {
  background: var(--color-packages-gradient-two-tone);
}

.cta--analyze-dark .cta__inner::before {
  content: "";
  position: absolute;
  inset: var(--spacing-border-thick);
  border-radius: inherit;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  padding: calc(var(--spacing-border-thick) + 0.5px);
}

.cta--analyze-dark .cta__inner {
  color: var(--color-analyze);
}

.cta--analyze-dark .cta__inner::before {
  background: var(--color-analyze-gradient-two-tone);
}

.cta--analyze-dark:hover .cta__inner {
  background: var(--color-analyze-gradient-two-tone);
  color: var(--color-font-secondary);
}
```

### For Add-ons (Regular Variant)

Add-ons use regular variant buttons (solid gradient backgrounds). Add these styles:

```css
.cta--reports,
.cta--reports .cta__inner {
  background: var(--color-reports-gradient-two-tone);
}

.cta--reports:hover .cta__inner {
  color: var(--color-reports);
}
```

## Step 3: Add a Tab to Packages (For Products Only)

### 3a. Add Tab Button and Panel to HTML

Open `components/home/packages.html` and add your new tab button and panel:

**Add button to the tab list:**
```html
<div class="tabs__list tabs__list--packages" role="tablist">
  <button class="tabs__tab tabs__tab--start" id="button-start" tabindex="0" role="tab" aria-selected="true" aria-controls="start">Start</button>
  <button class="tabs__tab tabs__tab--connect" id="button-connect" tabindex="-1" role="tab" aria-selected="false" aria-controls="connect">Connect</button>
  <button class="tabs__tab tabs__tab--frame" id="button-frame" tabindex="-1" role="tab" aria-selected="false" aria-controls="frame">Frame</button>
  
  <!-- Add your new tab button -->
  <button class="tabs__tab tabs__tab--analyze" id="button-analyze" tabindex="-1" role="tab" aria-selected="false" aria-controls="analyze">Analyze</button>
</div>
```

**Add panel to the panels container:**
{% raw %}
```html
<div class="tabs__panels">
  <!-- Existing panels -->
  
  <!-- Add your new panel -->
  <div class="tabs__panel tabs__panel--analyze" id="analyze" aria-hidden="true" role="tabpanel" aria-labelledby="button-analyze">
    {% include "components/home/packages-tab-content.html" with 
      title="Your product title" 
      cta_theme="analyze-dark" 
      description="Product description here" 
      feature1="Feature 1" 
      feature2="Feature 2" 
      feature3="Feature 3" 
      feature4="Feature 4" 
      feature5="Feature 5" 
      cta_link="#contact" 
      image_alt="Product image alt text" 
      image="https://example.com/product-image.webp" %}
  </div>
</div>
```
{% endraw %}

**Important:** 
- Use lowercase, hyphenated names for IDs (e.g., `analyze`, not `Analyze`)
- Button ID should be `button-[name]`
- Panel ID should match the button's `aria-controls` (just `[name]`)
- Set `aria-selected="false"` and `aria-hidden="true"` for inactive tabs
- Set `tabindex="-1"` for inactive tab buttons

### 3b. Add Tab Styles to `packages.css`

Open `css/pages/home/packages.css` and add styles for your new tab:

```css
.tabs__tab--analyze[aria-selected="true"] {
  background: var(--color-analyze-gradient-two-tone);
}

.tabs__panel--analyze {
  --color-accent: var(--color-analyze-light);
  background: var(--color-analyze-gradient-four-tone);
}
```

## Step 4: Add a Card to Add-ons (For Add-ons Only)

### 4a. Add Card to HTML

Open `components/home/add-ons.html` and add your new card:

{% raw %}
```html
<div class="card__wrapper">
  <!-- Existing cards -->
  
  <!-- Add your new card -->
  {% include "components/shared/card.html" with 
    image="https://example.com/reports-logo.webp" 
    title="Reports" 
    description="Generate comprehensive reports and analytics for your school." 
    cta_text="Learn more" 
    theme="reports" 
    cta_theme="reports" 
    cta_link="#contact" %}
</div>
```
{% endraw %}

**Parameters:**
- `image` - URL to product/add-on logo
- `title` - Product/add-on name
- `description` - Brief description
- `cta_text` - Button text
- `theme` - Should match the add-on name (used for title color)
- `cta_theme` - Should match the add-on name (used for button styling)
- `cta_link` - Link destination (usually `#contact`)

### 4b. Add Card Styles to `add-ons.css`

Open `css/pages/home/add-ons.css` and add styles for your new card:

```css
.add-ons {
  .card--reports .card__title {
    color: var(--color-reports);
  }
}
```

## File Locations Summary

- **Colors:** `css/foundations/colors.css`
- **Button Styles:** `css/foundations/buttons.css`
- **Packages HTML:** `components/home/packages.html`
- **Packages CSS:** `css/pages/home/packages.css`
- **Add-ons HTML:** `components/home/add-ons.html`
- **Add-ons CSS:** `css/pages/home/add-ons.css`

## Testing

After adding your product/add-on:

1. **Colors:** Verify the colors appear correctly in buttons and tabs/cards
2. **Buttons:** Test hover states and active states
3. **Tabs (Products):** Test tab switching, anchor links (e.g., `/#analyze`), and keyboard navigation
4. **Cards (Add-ons):** Verify card title color matches the product color
5. **Responsive:** Test on mobile, tablet, and desktop
6. **Accessibility:** Test with keyboard navigation and screen reader

## See Also

- [Component Library](../component-library.md) - For card and CTA component documentation
- [Adding Tabs Guide](./adding-tabs.md) - For detailed tab implementation
- [CSS Tokens & Variables](../README.md#css-tokens--variables) - For understanding color variables

