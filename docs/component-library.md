# Component Library

A reference guide for all reusable UI components available in the codebase.

## 📦 Available Components

### Hero
### Card
### Buttons & CTAs
### Headings
### Accordion
### Tabs
### Shapes

---

## Hero

Display a hero section with a title and optional shimmer effect.

### Basic Usage

```django
{% include "components/shared/hero.html" with 
  theme="rainbow-shimmer" 
  title="Your Page Title" %}
```

### Available Font Shimmer Themes

- `rainbow-shimmer` - Rainbow gradient with shimmer animation
- `pink-red-shimmer` - Pink to red gradient shimmer
- `green-blue-shimmer` - Green to blue gradient shimmer

### Example

```django
{% include "components/shared/hero.html" with 
  theme="rainbow-shimmer" 
  title="The software supporting great schools" %}
```

**Output:**
```html
<section class="hero">
  <div class="hero__content u-container">
    <h1 class="hero__title hero__title--rainbow-shimmer">Your Title</h1>
  </div>
</section>
```

### Custom Hero

For more control, create a custom hero:

```django
<section class="hero">
  <div class="hero__content u-container u-flex-center">
    <h1 class="hero__title hero__title--rainbow-shimmer">Custom Hero</h1>
    <p>Optional subtitle or content</p>
  </div>
</section>
```

**Location:** `components/shared/hero.html`  
**CSS:** `css/shared/hero/hero.css`, `hero-title-shimmer.css`

---

## Card

Display content in a card layout with optional icon, image, heading, description, and CTA.

### Basic Usage

```django
{% include "components/shared/card.html" with 
  title="Card Title"
  description="Card description text"
  icon="chart-up"
  cta_theme="epayments"
  cta_link="#contact"
  cta_text="Learn More" %}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | string | Yes | Card heading |
| `description` | string | Yes | Card description text |
| `icon` | string | No | Icon name (from sprite) |
| `image` | string | No | Image URL |
| `email` | string | No | Email address to display |
| `phone` | string | No | Phone number to display |
| `theme` | string | No | Card theme variant |
| `cta_theme` | string | No | CTA button theme (see CTA themes) |
| `cta_link` | string | No | CTA button link |
| `cta_text` | string | No | CTA button text |

### Example with Icon

```django
{% include "components/shared/card.html" with 
  title="Feature Name"
  description="Feature description goes here."
  icon="chart-up"
  cta_theme="epayments"
  cta_link="#contact"
  cta_text="Get Started" %}
```

### Example with Image

```django
{% include "components/shared/card.html" with 
  title="Contact Us"
  description="Get in touch with our team."
  image="https://example.com/image.webp"
  email="info@example.com"
  phone="(01) 123-4567"
  cta_theme="connect"
  cta_link="#contact"
  cta_text="Contact" %}
```

**Location:** `components/shared/card.html`  
**CSS:** `css/shared/card.css`

---

## Buttons & CTAs

### CTA Component

Call-to-action buttons with multiple theme options.

```django
{% include "components/shared/cta.html" with 
  theme="epayments"
  link="#contact"
  text="Get Started" %}
```

### Available CTA Themes

#### Regular Variants (Solid Gradient)
- `epayments` - ePayments gradient
- `library` - Library gradient
- `staff-absences` - Staff absences gradient
- `connect` - Connect gradient

#### Dark Variants (Border Effect)
- `start-dark` - Start theme with border
- `connect-dark` - Connect theme with border
- `frame-dark` - Frame theme with border

### Examples

```django
{# Regular gradient #}
{% include "components/shared/cta.html" with 
  theme="epayments"
  link="#contact"
  text="Learn More" %}

{# Dark variant with border effect #}
{% include "components/shared/cta.html" with 
  theme="start-dark"
  link="#packages"
  text="View Packages" %}
```

### Header CTA Buttons

For header navigation buttons:

```html
<a class="header__cta header__cta--primary" href="/signin">Sign In</a>
<a class="header__cta header__cta--secondary" href="/contact">Contact</a>
```

**Location:** `components/shared/cta.html`  
**CSS:** `css/foundations/buttons.css`

---

## Headings

### Underlined Heading

Headings with an underline decoration, optional icon, description, and bullet points.

```django
{% include "components/shared/headings/underlined.html" with 
  title="Section Title"
  align="center"
  description="Optional description text"
  icon="chart-up"
  bullet1="First bullet point"
  bullet2="Second bullet point" %}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | string | Yes | Heading text |
| `align` | string | No | Alignment: `"center"` or `"left"` (default) |
| `description` | string | No | Description paragraph |
| `icon` | string | No | Icon name (from sprite) |
| `bullet1` to `bullet7` | string | No | Bullet point items |

### Example

```django
{% include "components/shared/headings/underlined.html" with 
  title="Our Features"
  align="center"
  description="Everything you need to manage your school."
  bullet1="Feature one"
  bullet2="Feature two"
  bullet3="Feature three" %}
```

**Location:** `components/shared/headings/underlined.html`  
**CSS:** `css/shared/headings/underlined.css`

### Tagline Heading

Simple heading with optional tagline and description.

```django
{% include "components/shared/headings/tagline.html" with 
  title="Join Aladdin"
  tagline="A passionate, people-first team"
  description="Longer description text here." %}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | string | Yes | Main heading |
| `tagline` | string | No | Tagline/subtitle |
| `description` | string | No | Description paragraph |

### Example

```django
{% include "components/shared/headings/tagline.html" with 
  title="Join Our Team"
  tagline="Supporting Irish primary schools"
  description="At Aladdin, everything we do is built around helping schools run smoothly." %}
```

**Location:** `components/shared/headings/tagline.html`  
**CSS:** `css/shared/headings/tagline.css`

---

## Accordion

Collapsible content sections. See [Adding Accordions Guide](./guides/adding-accordions.md) for detailed documentation.

### Basic Usage

```django
<div data-accordions>
  {% include "components/shared/accordion.html" with 
    id="1"
    title="Question"
    description="Answer content"
    open=False %}
</div>
```

**Location:** `components/shared/accordion.html`  
**CSS:** `css/shared/accordion.css`  
**JS:** `js/components/accordions.js`

---

## Tabs

Tabbed interface for switching between content panels. See [Adding Tabs Guide](./guides/adding-tabs.md) for detailed documentation.

### Basic Structure

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

**Location:** See [Adding Tabs Guide](./guides/adding-tabs.md)  
**CSS:** `css/shared/tabs.css`  
**JS:** `js/components/tabs.js`

---

## Shapes

Decorative shape elements for sections.

### Yellow Shapes

Yellow-green and yellow-red oblong shapes.

```django
{% include "components/shared/shapes/yellow-shapes.html" %}
```

### Pink-Blue Shapes

Pink-red and green-blue oblong shapes.

```django
{% include "components/shared/shapes/pink-blue-shapes.html" %}
```

### Usage in Sections

```django
<section class="about u-padding-xl">
  {% include "components/shared/shapes/yellow-shapes.html" %}
  <div class="u-container">
    <!-- Content -->
  </div>
</section>
```

**Location:** `components/shared/shapes/`  
**CSS:** `css/shared/shapes.css`

---

## Using Components Together

### Complete Section Example

```django
<section class="features u-background-white u-padding-xl">
  {% include "components/shared/shapes/yellow-shapes.html" %}
  <div class="u-container">
    
    {% include "components/shared/headings/underlined.html" with 
      title="Our Features"
      align="center"
      description="Everything you need for your school." %}
    
    <div class="features__grid">
      {% include "components/shared/card.html" with 
        title="Feature 1"
        description="Description"
        icon="chart-up"
        cta_theme="epayments"
        cta_link="#contact"
        cta_text="Learn More" %}
      
      {% include "components/shared/card.html" with 
        title="Feature 2"
        description="Description"
        icon="chats"
        cta_theme="connect"
        cta_link="#contact"
        cta_text="Get Started" %}
    </div>
  </div>
</section>
```

---

## Component File Locations

All shared components are located in:
- **Templates:** `components/shared/`
- **CSS:** `css/shared/`
- **JS:** `js/components/`

For page-specific components:
- **Templates:** `components/[page-name]/`
- **CSS:** `css/pages/[page-name]/`

