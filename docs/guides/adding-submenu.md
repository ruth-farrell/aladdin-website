# How to Add a Submenu to an Existing Navigation Item

This guide shows how to convert an existing header navigation item into a dropdown submenu.

## Quick Start

1. Find the existing navigation item in `components/base/header.html`
2. Convert the `<a>` link to a `<button>` with submenu structure
3. Add `data-submenu` attribute to the `<li>`
4. Add the submenu container with links
5. The JavaScript will automatically initialize it

## Step-by-Step

### 1. Convert Existing Navigation Item

Find your existing navigation item. For example, if you have:

{% raw %}
```html
<li><a href="/#about" class="header__link">About</a></li>
```
{% endraw %}

Convert it to a submenu structure:

{% raw %}
```html
<li data-submenu>
  <button class="header__link header__link--toggle" aria-expanded="false" aria-controls="about-submenu">
    <span>About</span>
    <span class="visually-hidden">Toggle About Menu open/closed</span> 
    <svg class="icon icon--small icon--chevron-down" aria-hidden="true">
      <use href="#chevron-down"></use>     
    </svg>
  </button>
  <div class="header__submenu" aria-hidden="true" id="about-submenu">
    <ul class="header__submenu-list">
      <li class="header__submenu-list-item">
        <a href="/#about" class="header__link">Overview</a>
      </li>
      <li class="header__submenu-list-item">
        <a href="/#team" class="header__link">Our Team</a>
      </li>
      <li class="header__submenu-list-item">
        <a href="/#history" class="header__link">History</a>
      </li>
    </ul>
  </div>
</li>
```
{% endraw %}

### 2. Required Attributes

| Element | Attribute | Value | Notes |
|---------|-----------|-------|-------|
| `<li>` | `data-submenu` | (none) | Required for JavaScript initialization |
| Button | `class` | `header__link header__link--toggle` | Required classes |
| Button | `aria-expanded` | `"false"` | Set to `"true"` when open |
| Button | `aria-controls` | submenu-id | Must match submenu `id` |
| Submenu | `id` | unique | Must match button's `aria-controls` |
| Submenu | `aria-hidden` | `"true"` | Set to `"false"` when open |
| Submenu | `class` | `header__submenu` | Required class |

### 2. Key Changes

**Before (simple link):**
- `<a href="/#about" class="header__link">About</a>`

**After (submenu):**
- Add `data-submenu` to `<li>`
- Replace `<a>` with `<button>` that has `header__link header__link--toggle` classes
- Add chevron icon SVG
- Add submenu `<div>` with `header__submenu` class
- Add `id` to submenu that matches button's `aria-controls`

### 3. Real Example: Products Submenu

The "Products" item in the header is already a submenu:

{% raw %}
```html
<li data-submenu>
  <button class="header__link header__link--toggle" aria-expanded="false" aria-controls="products-submenu">
    <span>Products</span>
    <span class="visually-hidden">Toggle Products Menu open/closed</span> 
    <svg class="icon icon--small icon--chevron-down" aria-hidden="true">
      <use href="#chevron-down"></use>     
    </svg>
  </button>
  <div class="header__submenu" aria-hidden="true" id="products-submenu">
    <ul class="header__submenu-list">
      <li class="header__submenu-list-item">
        <a href="/#packages" class="header__link">Packages</a>
      </li>
      <li class="header__submenu-list-item">
        <a href="/#add-ons" class="header__link">Add-ons</a>
      </li>
    </ul>
  </div>
</li>
```
{% endraw %}

## How It Works

**Mobile (< 1024px):**
- Click the button to toggle the submenu open/closed
- Clicking outside closes the submenu
- Clicking an anchor link (`#`) closes the submenu

**Desktop (>= 1024px):**
- Hover over the menu item to open the submenu
- Moving the mouse away closes it after a short delay
- Keyboard navigation with focus/blur
- Press `Escape` to close

## Behavior

- **JavaScript:** The `initializeSubmenus()` function automatically finds all `[data-submenu]` elements and handles interactions
- **Accessibility:** Full keyboard navigation and ARIA attributes for screen readers
- **Styling:** Submenu styles are in `css/shared/base/submenus.css`

## See Also

- Component template: `components/base/header.html`
- CSS: `css/shared/base/submenus.css`
- JavaScript: `js/components/header/submenus.js`

