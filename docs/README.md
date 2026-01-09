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
- [How to Add a Submenu](./guides/adding-submenu.md)
- [Back-to-Top Button](./guides/back-to-top-button.md)
- [How to Add an Icon](./guides/adding-icons.md)

### Content Creation Guides
- [Creating a New Page](./guides/creating-new-pages.md)
- [Adding a New Product/Add-on](./guides/adding-product-addon.md)

### Reference
- [JavaScript Structure](./reference/javascript.md)
- [CSS Architecture](./reference/css-architecture.md)
- [Best Practices Checklist](./best-practices-checklist.md)

---

## File Structure

```
aladdin/
├── ui/
│   ├── static/
│   │   ├── css/
│   │   │   ├── foundations/      # Base styles, tokens, typography
│   │   │   ├── layout/           # Layout utilities and base styles
│   │   │   ├── pages/            # Page-specific styles
│   │   │   └── shared/           # Reusable component styles
│   │   └── js/
│   │       ├── components/       # JavaScript components
│   │       └── script.js         # Main entry point
│   └── templates/
│       ├── base.html             # Base template
│       ├── components/
│       │   ├── base/             # Header, footer
│       │   ├── shared/           # Reusable components
│       │   ├── home/             # Homepage components
│       │   ├── parents/          # Parents page components
│       │   └── careers/          # Careers page components
│       └── [page].html           # Page templates
└── docs/                         # This documentation
```