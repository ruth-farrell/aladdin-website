# How to Add Tabs

Tabs allow users to switch between different content panels. Each tab panel should have a unique ID for anchor linking.

## Quick Start

1. Create a container with `data-tabs` attribute
2. Add a `role="tablist"` with tab buttons
3. Add tab panels with matching `aria-labelledby` attributes
4. The JavaScript will automatically initialize it

## Basic Structure

```html
<div class="tabs" data-tabs>
  <!-- Tab List (Buttons) -->
  <div class="tabs__list" role="tablist">
    <button 
      class="tabs__tab" 
      id="tab-1" 
      role="tab" 
      aria-selected="true" 
      aria-controls="panel-1"
      tabindex="0">
      Tab 1
    </button>
    <button 
      class="tabs__tab" 
      id="tab-2" 
      role="tab" 
      aria-selected="false" 
      aria-controls="panel-2"
      tabindex="-1">
      Tab 2
    </button>
  </div>
  
  <!-- Tab Panels (Content) -->
  <div class="tabs__panels">
    <div 
      class="tabs__panel" 
      id="panel-1" 
      role="tabpanel" 
      aria-labelledby="tab-1"
      aria-hidden="false">
      Content for Tab 1
    </div>
    <div 
      class="tabs__panel" 
      id="panel-2" 
      role="tabpanel" 
      aria-labelledby="tab-2"
      aria-hidden="true">
      Content for Tab 2
    </div>
  </div>
</div>
```

## Full Example

```html
<section class="my-section u-background-white u-padding-xl">
  <div class="u-container">
    <div class="tabs" data-tabs>
      <div class="tabs__list" role="tablist">
        <button 
          class="tabs__tab" 
          id="button-features" 
          role="tab" 
          aria-selected="true" 
          aria-controls="features"
          tabindex="0">
          Features
        </button>
        <button 
          class="tabs__tab" 
          id="button-pricing" 
          role="tab" 
          aria-selected="false" 
          aria-controls="pricing"
          tabindex="-1">
          Pricing
        </button>
      </div>
      
      <div class="tabs__panels">
        <div 
          class="tabs__panel" 
          id="features" 
          role="tabpanel" 
          aria-labelledby="button-features"
          aria-hidden="false">
          <h3>Features</h3>
          <p>Content about features...</p>
        </div>
        <div 
          class="tabs__panel" 
          id="pricing" 
          role="tabpanel" 
          aria-labelledby="button-pricing"
          aria-hidden="true">
          <h3>Pricing</h3>
          <p>Content about pricing...</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

## Important Attributes

### Required Attributes

| Element | Attribute | Value | Notes |
|---------|-----------|-------|-------|
| Container | `data-tabs` | (none) | Required for JavaScript initialization |
| Tab Button | `role="tab"` | (none) | ARIA role |
| Tab Button | `id` | unique | e.g., `"button-features"` |
| Tab Button | `aria-controls` | panel-id | Matches panel `id` |
| Tab Button | `aria-selected` | `"true"` or `"false"` | `"true"` for active tab |
| Tab Button | `tabindex` | `"0"` or `"-1"` | `"0"` for active, `"-1"` for inactive |
| Tab Panel | `role="tabpanel"` | (none) | ARIA role |
| Tab Panel | `id` | unique | Must match button's `aria-controls` |
| Tab Panel | `aria-labelledby` | button-id | Matches button's `id` |
| Tab Panel | `aria-hidden` | `"true"` or `"false"` | `"false"` for active panel |

### Optional Attributes

| Element | Attribute | Value | Notes |
|---------|-----------|-------|-------|
| Container | `data-tabs-autoplay` | (none) | Opt-in autoplay that cycles through tabs automatically |
| Container | `data-tabs-autoplay-interval` | number (ms) | Optional. Defaults to `4000`. Values under `1500` are ignored |

## Autoplay

Autoplay is **opt-in** and only runs when there are **2+ tab panels**.

### Enable Autoplay

Add `data-tabs-autoplay` to the tabs container:

```html
<div class="tabs" data-tabs data-tabs-autoplay>
  <!-- tablist + panels -->
</div>
```

### Change the Autoplay Duration

Add `data-tabs-autoplay-interval` in milliseconds:

```html
<div class="tabs" data-tabs data-tabs-autoplay data-tabs-autoplay-interval="6000">
  <!-- tablist + panels -->
</div>
```

Notes:
- **Default**: `4000`ms
- **Minimum**: `1500`ms (lower values are ignored and the default is used)
- **Stops permanently on user intent**: any pointer interaction inside the tabs, or keyboard focus within the tabs, disables autoplay for that tabs instance

### ID Naming Convention

- **Button ID:** Use descriptive name like `"button-features"` or `"button-pricing"`
- **Panel ID:** Use the same name without `"button-"` prefix: `"features"` or `"pricing"`
- The panel ID is used for URL anchors (e.g., `/#features`)

## Anchor Links

Tabs support URL anchors. When a user visits `/#features`, the corresponding tab will automatically be activated.

The JavaScript:
1. Checks the URL hash on page load
2. Finds the matching panel by ID
3. Activates the corresponding tab

**Example URLs:**
- `/#features` → Activates tab with `aria-controls="features"`
- `/#pricing` → Activates tab with `aria-controls="pricing"`

## Real-World Example

See `ui/website/components/home/packages.html` for a full example:

## Multiple Tab Sets on Same Page

You can have multiple tab sets on the same page. Each needs its own `data-tabs` container:

```html
<!-- First tab set -->
<div data-tabs>
  <!-- tabs -->
</div>

<!-- Second tab set -->
<div data-tabs>
  <!-- tabs -->
</div>
```

## JavaScript Behavior

- **Click handling:** Automatically managed
- **Keyboard navigation:** Arrow keys supported
- **URL updates:** Hash is updated on tab click (no page reload)
- **Hash change:** Tab updates when URL hash changes
- **Autoplay (optional):** When `data-tabs-autoplay` is present, tabs cycle automatically until the user interacts (pointer/tap/click anywhere in the tabs instance, or keyboard focus), then autoplay stops.

## Styling

The tabs component comes with **minimal built-in styling** in `ui/website/css/shared/tabs.css`. This is intentional because tabs are used in different contexts with very different visual designs:

- **Packages page:** Gradient backgrounds, pill-shaped buttons, positioned tabs
- **Parents page:** Different color scheme and layout

You'll need to add **custom CSS** for your specific use case. The base styles provide:
- Basic structure and layout
- ARIA state management
- Accessibility features

**Example:** See `ui/website/css/pages/home/packages.css` and `ui/website/css/pages/parents/tabs.css` for how tabs are styled differently on each page.

## See Also

- CSS: `ui/website/css/shared/tabs.css`
- JavaScript: `ui/website/js/components/tabs.js`
- Example: `ui/website/components/home/packages.html`

