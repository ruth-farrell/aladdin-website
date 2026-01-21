# JavaScript Reference

Documentation for the JavaScript structure and components.

## 📁 File Structure

```
ui/website/js/
├── script.js              # Main entry point
└── components/
    ├── accordions.js      # Accordion functionality
    ├── tabs.js            # Tab functionality
    ├── inbox.js           # Email inbox animation
    ├── back-to-top.js     # Back to top button
    ├── reveal.js          # Click-to-reveal hidden content (one-way reveal)
    ├── hero-star.js       # Homepage hero star animation
    └── header/
        ├── hamburger.js   # Mobile menu toggle
        ├── submenus.js    # Dropdown submenus
        └── active-link.js # Active link highlighting
```

## 🎯 Main Entry Point

**File:** `ui/website/js/script.js`

The main script initializes all components on page load:

```javascript
import { initializeHamburger } from './components/header/hamburger.js';
import { initializeSubmenus } from './components/header/submenus.js';
import { initializeActiveLinks, setupLinkClickHandlers } from './components/header/active-link.js';
import { initializeBackToTop } from './components/back-to-top.js';
import { initializeTabs } from './components/tabs.js';
import { initializeAccordions } from './components/accordions.js';
import { initializeInbox } from './components/inbox.js';
import { initializeReveals } from './components/reveal.js';
import { initializeSignInShortcut } from './components/signin-shortcut.js';
import { initializeHeroStar } from './components/hero-star.js';

document.addEventListener('DOMContentLoaded', () => {
  initializeHamburger();
  initializeSubmenus();
  initializeActiveLinks();
  setupLinkClickHandlers();
  initializeBackToTop();
  initializeSignInShortcut();

  // Conditionally initialized (only if elements exist)
  if (document.querySelector('[data-tabs]')) initializeTabs();
  if (document.querySelector('[data-accordions]')) initializeAccordions();
  if (document.querySelector('[data-inbox]')) initializeInbox();
  if (document.querySelector('[data-reveals]')) initializeReveals();
  if (document.querySelector('.hero__star')) initializeHeroStar();
});
```

## 🔧 Component Pattern

All components follow a consistent pattern:

```javascript
export function initialize[Component]() {
  const selector = '[data-component]';
  const instances = document.querySelectorAll(selector);

  if (!instances.length) return;

  instances.forEach(instance => create[Component](instance));
}

function create[Component](instance) {
  // Component-specific logic
}
```

## 📦 Components

### Accordions

**File:** `ui/website/js/components/accordions.js`  
**Selector:** `[data-accordions]`  
**Function:** `initializeAccordions()`

Features:
- Single or multiple accordion support
- Mobile-only accordion mode (`data-accordions-mobile-only`)
- Responsive behavior
- ARIA attributes management

**Usage:**
```html
<div data-accordions>
  <!-- Accordion items -->
</div>
```

### Tabs

**File:** `ui/website/js/components/tabs.js`  
**Selector:** `[data-tabs]`  
**Function:** `initializeTabs()`

Features:
- Multiple tab sets on same page
- URL hash navigation (e.g., `/#tab-id`)
- ARIA attributes management
- Keyboard navigation

**Usage:**
```html
<div data-tabs>
  <div role="tablist">
    <!-- Tab buttons -->
  </div>
  <div class="tabs__panels">
    <!-- Tab panels -->
  </div>
</div>
```

### Inbox

**File:** `ui/website/js/components/inbox.js`  
**Selector:** `[data-inbox]`  
**Function:** `initializeInbox()`

Features:
- Email rotation animation
- Respects `prefers-reduced-motion`
- Smooth slide-in animations

**Usage:**
```html
<div data-inbox>
  <ul class="emails__list">
    <!-- Email items -->
  </ul>
</div>
```

### Back to Top

**File:** `ui/website/js/components/back-to-top.js`  
**Function:** `initializeBackToTop()`

Features:
- Switches between "up" and "down" modes based on scroll position
- Smooth scrolling

**Usage:**
```html
<a class="back-to-top" href="#back-to-top">...</a>
<div id="back-to-top" tabindex="-1"></div>
```

### Reveal (Click-to-Reveal)

**File:** `ui/website/js/components/reveal.js`  
**Selector:** `[data-reveals]`  
**Function:** `initializeReveals()`

Features:
- One-way reveal: clicking the reveal button shows the hidden panel and hides the button
- ARIA attributes managed (`aria-expanded`, `aria-hidden`)
- Supports multiple reveal instances within a container

**Usage (common pattern):**

```html
<div data-reveals>
  <!-- One or more .reveal instances inside -->
</div>
```

Real-world example: Add-ons cards use reveal inside `ui/website/components/shared/card.html` (see `ui/website/components/home/add-ons.html`).

### Header Components

#### Hamburger Menu

**File:** `ui/website/js/components/header/hamburger.js`  
**Function:** `initializeHamburger()`

Manages mobile menu toggle.

#### Submenus

**File:** `ui/website/js/components/header/submenus.js`  
**Function:** `initializeSubmenus()`

Manages dropdown submenus in navigation.

#### Active Links

**File:** `ui/website/js/components/header/active-link.js`  
**Functions:** `initializeActiveLinks()`, `setupLinkClickHandlers()`

Manages active link highlighting based on current page/hash.

## 🎨 Adding a New Component

### Step 1: Create Component File

Create `ui/website/js/components/[name].js`:

```javascript
export function initialize[Component]() {
  const selector = '[data-component]';
  const instances = document.querySelectorAll(selector);

  if (!instances.length) return;

  instances.forEach(instance => create[Component](instance));
}

function create[Component](instance) {
  // Your component logic here
}
```

### Step 2: Import in script.js

```javascript
import { initialize[Component] } from './components/[name].js';
```

### Step 3: Initialize Conditionally

```javascript
if (document.querySelector('[data-component]')) {
  initialize[Component]();
}
```

## 🔍 Best Practices

### 1. Use Data Attributes

Always use `data-*` attributes for selectors:

```javascript
const selector = '[data-my-component]';
```

### 2. Support Multiple Instances

Use `querySelectorAll` and loop through instances:

```javascript
const instances = document.querySelectorAll(selector);
instances.forEach(instance => createComponent(instance));
```

### 3. Early Returns

Return early if no elements found:

```javascript
if (!instances.length) return;
```

### 4. Consistent Naming

- Function: `initialize[Component]()`
- Helper: `create[Component](instance)`
- Selector: `[data-component]`

### 5. Accessibility

- Use proper ARIA attributes
- Support keyboard navigation
- Manage focus states

## 🐛 Debugging

### Check if Component Initialized

Open browser console and check:

```javascript
// Check if tabs are initialized
document.querySelector('[data-tabs]')

// Check if accordions are initialized
document.querySelector('[data-accordions]')
```

### Common Issues

1. **Component not working:** Check if selector exists on page
2. **Multiple instances:** Ensure all instances are being initialized
3. **Event listeners:** Check for conflicting event handlers

## 📚 See Also

- [Adding Accordions Guide](../guides/adding-accordions.md)
- [Adding Tabs Guide](../guides/adding-tabs.md)
- [Component Library](../component-library.md)

