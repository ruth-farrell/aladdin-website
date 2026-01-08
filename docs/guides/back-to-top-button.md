# Back-to-Top Button

The back-to-top button is a floating button that appears on all pages, allowing users to quickly navigate back to the top of the page or to the main content area.

## How It Works

The button is automatically included on all pages via `base.html`. It has two modes:

1. **Back to Top** (default): Always available, links to `#back-to-top` at the top of the page
2. **Back to Content** (optional): Links to `#back-to-content` when that element exists on the page

### Automatic Behavior

- **Without `#back-to-content`**: Button always shows "back to top" (points up)
- **With `#back-to-content`**: Button automatically switches based on scroll position:
  - When at the top: Button points **down** to content (`#back-to-content`)
  - When at content: Button points **up** to top (`#back-to-top`)

## Basic Setup (Already Included)

The button is already set up in `base.html`:

```html
<!-- At the top of the page -->
<div id="back-to-top" tabindex="-1"></div>

<!-- At the bottom of the page (footer area) -->
<a class="back-to-top u-flex-center" href="#back-to-top">  
  <svg class="icon icon--medium" aria-hidden="true">
    <use href="#chevron-down-solid"></use>
  </svg>
  <span class="visually-hidden">Go back to top</span>
</a>
```

**No action needed** - this works on all pages automatically.

## Adding a "Back to Content" Link

If you want the button to also link to a main content area (like on the homepage), add a `#back-to-content` element where you want users to jump to.

### Example: Homepage

On the homepage, the "back to content" element is placed above the About section:

{% raw %}
```html
<section class="about u-background-white u-padding-xl">
  <div id="back-to-content" aria-hidden="true"></div>
  <div class="about__wrapper u-container">
    <!-- About section content -->
  </div>
</section>
```
{% endraw %}

### Where to Place It

Place `#back-to-content` at the start of your main content section, typically:
- Above the first major section after the hero
- Before the primary content you want users to jump to
- On the homepage: above the "About" section
- On other pages: above the main content area (if desired)

### Complete Example

**Homepage** (`components/home/about.html`):
- Has `#back-to-content` above About section
- Button switches between top and content

**Parents/Careers pages**:
- No `#back-to-content` element
- Button always shows "back to top"

## Button States

The button automatically updates based on scroll position:

| State | Icon Direction | Link | When Shown |
|-------|---------------|------|------------|
| **Up mode** | Points up (rotated 180°) | `#back-to-top` | When `#back-to-content` is in viewport, or if no `#back-to-content` exists |
| **Down mode** | Points down | `#back-to-content` | When `#back-to-top` is in viewport and `#back-to-content` exists |

## Styling

The button styles are in `css/layout/base.css`:
- Fixed position (bottom right)
- Circular button with border
- Icon rotates 180° in "up" mode
- Responsive positioning

## JavaScript

The `initializeBackToTop()` function in `js/components/back-to-top.js`:
- Detects if `#back-to-content` exists
- Uses IntersectionObserver to track viewport visibility
- Automatically switches button mode and icon direction
- Updates accessible text ("Go back to top" vs "Go to content")

## See Also

- Component: `components/base.html` (button included here)
- CSS: `css/layout/base.css`
- JavaScript: `js/components/back-to-top.js`
- Example: Homepage has `#back-to-content` in `components/home/about.html`

