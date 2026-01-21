# How to Add an Accordion

Accordions are collapsible content sections. They can be used individually or grouped together.

## Quick Start

1. Include the accordion component in your template
2. Wrap multiple accordions in a container with `data-accordions`
3. The JavaScript will automatically initialize it

## Basic Usage

### Single Accordion

{% raw %}
```html
{% include "website/components/shared/accordion.html" with 
  id="1"
  title="Your Question Here"
  description="Your answer content here"
  open=False %}
```
{% endraw %}

### Multiple Accordions (FAQ Style)

{% raw %}
```html
<div data-accordions>
  {% include "website/components/shared/accordion.html" with 
    id="1"
    title="First Question"
    description="First answer"
    open=False %}
    
  {% include "website/components/shared/accordion.html" with 
    id="2"
    title="Second Question"
    description="Second answer"
    open=False %}
</div>
```
{% endraw %}

## Mobile-Only Accordions

For accordions that should only collapse on mobile (but not appear as an accordion on desktop):

{% raw %}
```html
<div data-accordions data-accordions-mobile-only>
  {% include "website/components/shared/accordion.html" with 
    id="1"
    title="Section Title"
    description="Content that stays open on desktop"
    open=False %}
</div>
```
{% endraw %}

**Features:**
- Accordion behavior on mobile (< 768px)
- Always open on desktop (>= 768px)
- Chevron icon hidden on desktop
- No click handlers on desktop

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Unique ID for the accordion (used for ARIA attributes) |
| `title` | string | Yes | The heading/button text |
| `description` | string | Yes | The content shown when expanded |
| `open` | boolean | No | Whether accordion starts open (default: `False`) |

## Example: FAQ Section

For a working example see the FAQs on the homepage.

## How It Works

1. **HTML Structure:** The accordion component uses proper ARIA attributes for accessibility
2. **JavaScript:** The `initializeAccordions()` function finds all `[data-accordions]` containers
3. **Styling:** CSS in `ui/website/css/shared/accordion.css` handles the animations

## Styling

The accordion component comes with **comprehensive built-in styling** in `ui/website/css/shared/accordion.css`. This includes:
- Button styles and hover states
- Panel animations (slide open/close)
- Chevron icon rotation
- Spacing and typography
- Responsive behavior

You typically won't need to add custom CSS unless you want to override specific styles. The accordion will look consistent across all pages.

### How the Open/Close Animation Works

The accordion uses a **CSS Grid-based animation technique** for smooth open/close transitions. The panel uses `display: grid` with `grid-template-rows: 1fr` when open and `0fr` when closed. CSS transitions animate between these states, and `overflow: hidden` ensures clean clipping. This approach works with any content height without needing to calculate dimensions.

## See Also

- Template (repo): `ui/website/components/shared/accordion.html` (included as `website/components/shared/accordion.html`)
- CSS: `ui/website/css/shared/accordion.css`
- JavaScript: `ui/website/js/components/accordions.js`

