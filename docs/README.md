# Aladdin UI Documentation

Welcome to the Aladdin UI documentation. This guide will help you understand the codebase structure, add new components, and create new pages.

## 📚 Table of Contents

### Getting Started
- [File Structure](#file-structure)
- [CSS Architecture](./reference/css-architecture.md) - CSS tokens, media queries, utility classes, and more

### Component Guides
- [Component Library](./component-library.md)
- [How to Add an Accordion](./guides/adding-accordions.md)
- [How to Add Tabs](./guides/adding-tabs.md)
- [How to Add Reveal Cards](./guides/adding-reveal-cards.md)
- [How to Add a Submenu](./guides/adding-submenu.md)
- [Back-to-Top Button](./guides/back-to-top-button.md)
- [How to Add an Icon](./guides/adding-icons.md)

### Content Creation Guides
- [Creating a New Page](./guides/creating-new-pages.md)
- [Adding a New Product/Add-on](./guides/adding-product-addon.md)

### Reference
- [JavaScript Structure](./reference/javascript.md)
- [CSS Architecture](./reference/css-architecture.md)

---

## File Structure

```
aladdin/
├── ui/
│   ├── index.html                # Page template (extends website/base.html)
│   ├── careers.html              # Page template
│   ├── parents.html              # Page template
│   ├── ordernow.html             # Page template
│   ├── misc.html                 # Page template (starter for new pages)
│   └── website/
│       ├── base.html             # Base template extended by all pages
│       ├── components/           # Template partials (included via {% include %})
│       │   ├── base/             # Header, footer, sprite
│       │   ├── shared/           # Reusable components
│       │   ├── home/             # Homepage components
│       │   ├── parents/          # Parents page components
│       │   └── careers/          # Careers page components
│       ├── css/                  # Stylesheets (served via {% static 'website/css/...' %})
│       │   ├── foundations/
│       │   ├── layout/
│       │   ├── pages/
│       │   └── shared/
│       └── js/                   # JavaScript (served via {% static 'website/js/...' %})
│           ├── components/
│           └── script.js
└── docs/                         # This documentation
```

### Template + Static Path Conventions

- **Templates (repo path)**: `ui/website/...`
- **Templates (Django include path)**: `website/...` (e.g. `{% include "website/components/shared/hero.html" %}`)
- **Static (repo path)**: `ui/website/{css,js}/...`
- **Static (Django static path)**: `website/{css,js}/...` (e.g. `{% static 'website/css/styles.css' %}`)