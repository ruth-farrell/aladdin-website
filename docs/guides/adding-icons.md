# How to Add and Use Icons

This guide shows how to use existing icons and how to add new SVG icons (e.g., from Font Awesome) into the shared sprite.

## Using Existing Icons

All icons are stored in the sprite at `components/base/sprite.svg` and are automatically included on every page via `base.html`.

### Basic Usage

To use an existing icon, reference it by its ID:

```html
<svg class="icon">
  <use href="#chevron-down"></use>
</svg>
```

### With Sizing Classes

Use utility classes to control icon size:

```html
<svg class="icon icon--small">
  <use href="#chevron-down"></use>
</svg>
```

### Accessibility

For decorative icons (icons that don't convey meaning), add `aria-hidden="true"`:

```html
<svg class="icon icon--small" aria-hidden="true">
  <use href="#chevron-down"></use>
</svg>
```

### Examples

**Icon in a button:**
```html
<button type="button">
  <span>Toggle Menu</span>
  <svg class="icon icon--small icon--chevron-down" aria-hidden="true">
    <use href="#chevron-down"></use>
  </svg>
</button>
```


**Icon color:** Icons inherit the primary text color by default. Override with CSS:
```css
.icon {
  fill: var(--color-font-secondary);
}
```

### Available Icons

Check `components/base/sprite.svg` for all available icon IDs. Common icons include:
- `chevron-down` - Dropdown/accordion indicator
- `arrow-up-right-from-square` - External link
- `file-pdf` - PDF file
- `chart-up` - Chart/graph
- `chats` - Chat/messaging
- `email` - Email
- `phone` - Phone
- `facebook`, `x`, `instagram` - Social media icons

---

## Adding a New Icon

## Quick Start
1. Copy the raw SVG for the icon.
2. Add it to the sprite at `components/base/sprite.svg`.
3. Reference it in HTML with `<use href="#your-icon-id"></use>`.

## Step-by-Step

### 1) Get the SVG
- From Font Awesome: click the icon → copy the **SVG** source.

### 2) Add to `sprite.svg`
- Open `sprite.svg` and append the symbol inside the `<svg>` root.

- Replace `svg` tags with `symbol` tags.
- Ensure the SVG has a `viewBox` (keep it). Remove fixed `width`/`height` if present.
- Remove inline `fill`/`stroke` attributes so CSS can control color. Keep `fill="currentColor"` if already present.
- Add a lowercase, hyphenated `id` (e.g., `calendar-star`, `chevron-down`). Use the same naming style as existing icons:

```html
<symbol id="bell" viewBox="0 0 448 512">
  <path d="M224 512a64 64 0 0 0 64-64H160a64 64 0 0 0 64 64Zm215.4-149.9-40.6-40.6V224c0-77.7-54.5-142.2-127.9-156.8V32a46.1 46.1 0 0 0-92.2 0v34.2C105.3 81.8 50.8 146.3 50.8 224v97.5l-40.6 40.6A31.9 31.9 0 0 0 0 386.7C0 403 13 416 29.3 416h389.4C435 416 448 403 448 386.7a31.9 31.9 0 0 0-8.6-24.6Z"/>
</symbol>
```

### 3) Use the icon in the HTML

```html
<svg class="icon icon--small">
  <use href="#bell"></use>
</svg>
```

You can reuse existing utility classes (`icon`, `icon--small`, etc.) for sizing. The icon color will follow the primary font color unless overridden. Override using CSS, eg. `fill: var(--color-font-secondary);`

### 4) Test
- Load your page (the sprite is already included in `base.html`).
- Verify the icon renders.

