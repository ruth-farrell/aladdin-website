import { initializeHamburger } from './components/header/hamburger.js';
import { initializeSubmenus } from './components/header/submenus.js';
import { initializeActiveLinks, setupLinkClickHandlers } from './components/header/active-link.js';
import { initializeBackToTop } from './components/back-to-top.js';
import { initializeTabs } from './components/tabs.js';
import { initializeAccordions } from './components/accordions.js';
import { initializeInbox } from './components/inbox.js';

// Prevent browser scroll restoration to avoid jumps on page load
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', () => {
  // If no hash in URL, explicitly scroll to top to prevent any scroll jumps
  if (!window.location.hash) {
    // Use requestAnimationFrame to ensure this happens after any layout calculations
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }

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