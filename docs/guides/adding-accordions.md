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
{% include "components/shared/accordion.html" with 
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
  {% include "components/shared/accordion.html" with 
    id="1"
    title="First Question"
    description="First answer"
    open=False %}
    
  {% include "components/shared/accordion.html" with 
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
  {% include "components/shared/accordion.html" with 
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
3. **Styling:** CSS in `ui/static/css/shared/accordion.css` handles the animations

## Accessibility

- Uses proper ARIA attributes (`aria-expanded`, `aria-hidden`, `role="region"`)
- Keyboard navigation supported
- Screen reader friendly
- Focus management handled automatically

## See Also

- Component template: `ui/templates/components/shared/accordion.html`
- CSS: `ui/static/css/shared/accordion.css`
- JavaScript: `ui/static/js/components/accordions.js`

