import { initializeHamburger } from './components/header/hamburger.js';
import { initializeSubmenus } from './components/header/submenus.js';
import { initializeActiveLinks, setupLinkClickHandlers } from './components/header/active-link.js';
import { initializeBackToTop } from './components/back-to-top.js';
import { initializeTabs } from './components/tabs.js';
import { initializeAccordions } from './components/accordions.js';
import { initializeInbox } from './components/inbox.js';

document.addEventListener('DOMContentLoaded', () => {
  // Header Navigation and Back to Top
  initializeHamburger();
  initializeSubmenus();
  initializeActiveLinks();
  setupLinkClickHandlers();
  initializeBackToTop();

  // Page-specific components - only initialize if elements exist
  if (document.querySelector('[data-tabs]')) {
    initializeTabs();
  }

  if (document.querySelector('[data-accordions]')) {
    initializeAccordions();
  }

  if (document.querySelector('[data-inbox]')) {
    initializeInbox();
  }
});

// Update active links when hash changes
window.addEventListener('hashchange', () => {
  initializeActiveLinks();
});