# Creating a New Page

This guide shows you how to create a new page using the `misc.html` template as a starting point. This is a frontend-focused guide for working with templates and components.

## Quick Start

1. Copy `misc.html` as your starting template
2. Update the page title and content
3. Use shared components for common elements
4. Add IDs for navigation links
5. (Optional) Add page-specific CSS

## Step-by-Step Guide

### 1. Start with the Misc Template

Copy `misc.html` as your new page. Here's what it contains:

```html
{% extends "base.html" %}
{% load static %}
{% block title %}Your Page Title | Aladdin Schools{% endblock %}
{% block pageStyles %}
  {# Optional: Link to page-specific stylesheet #}
{% endblock %}

{% block content %}
  {% include "components/misc/hero.html" %}
  {% include "components/misc/content.html" %}
{% endblock %}
```

### 2. Update the Page Title

Change the title block:

```html
{% block title %}Your Page Title | Aladdin Schools{% endblock %}
```

### 3. Create Your Page Components

You can either:
- **Use the misc components** as-is and modify them
- **Create new components** in `components/[your-page]/`
- **Use shared components** directly

#### Option A: Use Shared Components Directly

```html
{% block content %}
  {% include "components/shared/hero.html" with 
    theme="rainbow-shimmer" 
    title="Your Page Title" %}
    
  <section class="my-section u-background-white u-padding-xl" id="my-section">
    <div class="u-container">
      {% include "components/shared/headings/underlined.html" with 
        title="Section Title"
        align="center"
        description="Section description" %}
      
      <!-- Your content here -->
    </div>
  </section>
{% endblock %}
```

#### Option B: Create Page-Specific Components

Create `components/[your-page]/hero.html`:

```html
{% include "components/shared/hero.html" with 
  theme="rainbow-shimmer" 
  title="Your Page Title" %}
```

Then use it in your page:

```html
{% block content %}
  {% include "components/[your-page]/hero.html" %}
  {% include "components/[your-page]/content.html" %}
{% endblock %}
```

### 4. Add IDs for Navigation

Add IDs to sections so they can be linked from navigation:

```html
<section class="services u-padding-xl" id="services">
  <div class="u-container">
    <!-- Content -->
  </div>
</section>
```

Then link from navigation:

```html
<a href="/#services">Services</a>
```

Or from another page:

```html
<a href="/services#services">Services</a>
```

### 5. Use Utility Classes

Apply utility classes for consistent styling. See [Utility Classes](../README.md#utility-classes) for the complete list.

```html
<section class="my-section u-background-white u-padding-xl">
  <div class="u-container">
    <!-- Content -->
  </div>
</section>
```

## Complete Example: Services Page

```html
{% extends "base.html" %}
{% load static %}
{% block title %}Our Services | Aladdin Schools{% endblock %}

{% block content %}
  <!-- Hero Section -->
  {% include "components/shared/hero.html" with 
    theme="rainbow-shimmer" 
    title="Our Services" %}
  
  <!-- Overview Section -->
  <section class="services-overview u-background-white u-padding-xl" id="overview">
    <div class="u-container">
      {% include "components/shared/headings/underlined.html" with 
        title="What We Offer" 
        align="center" 
        description="Comprehensive solutions for Irish primary schools." %}
    </div>
  </section>
  
  <!-- Services List Section -->
  <section class="services-list u-padding-xl" id="services">
    <div class="u-container">
      {% include "components/shared/headings/underlined.html" with 
        title="Our Services"
        align="center" %}
      
      <div class="services__grid">
        {% include "components/shared/card.html" with 
          title="Service 1"
          description="Service description"
          icon="chart-up"
          cta_theme="epayments"
          cta_link="#contact"
          cta_text="Learn More" %}
        
        {% include "components/shared/card.html" with 
          title="Service 2"
          description="Service description"
          icon="chats"
          cta_theme="connect"
          cta_link="#contact"
          cta_text="Get Started" %}
      </div>
    </div>
  </section>
{% endblock %}
```

## Page Structure Best Practices

### 1. Use Shared Components

Leverage existing components instead of creating new ones. See [Component Library](../component-library.md) for full component documentation and all available parameters.

### 2. Standard Section Structure

Use this pattern for consistent sections:

```html
<section class="section-name u-background-white u-padding-xl" id="section-name">
  {% include "components/shared/shapes/yellow-shapes.html" %}
  <div class="u-container">
    {% include "components/shared/headings/underlined.html" with 
      title="Section Title"
      align="center" %}
    
    <!-- Your content here -->
  </div>
</section>
```

### 3. Add IDs for Navigation

Always add IDs to major sections:

```html
<section id="services" class="services u-padding-xl">
  <!-- Content -->
</section>

<section id="pricing" class="pricing u-padding-xl">
  <!-- Content -->
</section>
```

Then link from navigation:

```html
<a href="/#services">Services</a>
<a href="/#pricing">Pricing</a>
```

### 4. Use Utility Classes for Layout

See [Utility Classes](../README.md#utility-classes) for all available utility classes and examples.

### 5. Responsive Considerations

- Use utility classes that handle responsive automatically
- Test on mobile, tablet, and desktop
- Use responsive visibility classes when needed:
  - `u-mobile-only` - Show only on mobile
  - `u-desktop-only` - Show only on desktop
  - `u-mobile-tablet-only` - Show on mobile/tablet only

## Available Shared Components

For complete component documentation, parameters, and examples, see the [Component Library](../component-library.md).

**Quick reference:**
- **Hero** - Page headers with shimmer effects
- **Headings** - Underlined and tagline heading styles
- **Cards** - Content cards with icons, images, and CTAs
- **CTAs** - Call-to-action buttons with multiple themes
- **Shapes** - Decorative shape elements
- **Accordions** - Collapsible content sections (see [Adding Accordions](./adding-accordions.md))
- **Tabs** - Tabbed interfaces (see [Adding Tabs](./adding-tabs.md))


## Testing Your Page

1. Test on mobile, tablet, and desktop screen sizes
2. Check browser console for JavaScript errors
3. Verify all navigation links work (including anchor links)
4. Test accessibility with keyboard navigation
5. Verify IDs are unique and navigation links work

## Next Steps

- 📖 Review [Component Library](../component-library.md) for all available components
- 🎨 Check [Utility Classes](../README.md#utility-classes) for styling options
- 📑 Learn [How to Add Accordions](./adding-accordions.md)
- 📋 Learn [How to Add Tabs](./adding-tabs.md)
