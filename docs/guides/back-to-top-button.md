# Back-to-Top Button

The back-to-top button is a floating button that appears on all pages, allowing users to quickly navigate back to the top of the page or to the main content area.

## How It Works

The button is automatically included on all pages via `ui/website/base.html`. It has two modes:

1. **Down mode** (at the very top): Smooth-scrolls the user to just below the initial viewport
2. **Up mode** (after the user scrolls): Links to `#back-to-top` at the top of the page

### Automatic Behavior

- **At the top (scrollY = 0)**: Button is in **down mode** (points down) and scrolls to content
- **After scrolling (scrollY > 0)**: Button switches to **up mode** (points up) and links to `#back-to-top`

## Basic Setup (Already Included)

The button is already set up in `ui/website/base.html`:

```html
<!-- At the top of the page -->
<div id="back-to-top" class="u-anchor-link" tabindex="-1"></div>

<!-- At the bottom of the page (footer area) -->
<a class="back-to-top u-flex-center" href="#back-to-top">  
  <svg class="icon icon--medium" aria-hidden="true">
    <use href="#chevron-down-solid"></use>
  </svg>
  <span class="visually-hidden">Go back to top</span>
</a>
```

**No action needed** - this works on all pages automatically.

## Button States

The button automatically updates based on scroll position:

| State | Icon Direction | Behavior | When Shown |
|-------|---------------|------|------------|
| **Up mode** | Points up (rotated 180°) | Links to `#back-to-top` | When `scrollY > 0` |
| **Down mode** | Points down | Smooth-scrolls to just below the initial viewport | When `scrollY = 0` |

## Styling

The button styles are in `ui/website/css/layout/base.css`:
- Fixed position (bottom right)
- Circular button with border
- Icon rotates 180° in "up" mode
- Responsive positioning

## JavaScript

The `initializeBackToTop()` function in `ui/website/js/components/back-to-top.js`:
- Measures the initial viewport height and scrolls just below it in **down mode**
- Switches to **up mode** after the user scrolls
- Updates the accessible text ("Go back to top" vs "Go to content")

## See Also

- Template: `ui/website/base.html` (button included here)
- CSS: `ui/website/css/layout/base.css`
- JavaScript: `ui/website/js/components/back-to-top.js`

