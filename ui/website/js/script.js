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
      initializeComponents();
});

function initializeComponents() {
  // Header Navigation and Back to Top
  initializeHamburger();
  initializeSubmenus();
  initializeActiveLinks();
  setupLinkClickHandlers();

  // Back to Top, Sign In Keyboard Shortcut
  initializeBackToTop();
  initializeSignInShortcut();

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

  if (document.querySelector('[data-reveals]')) {
    initializeReveals();
  }

  if (document.querySelector('.hero__star')) {
    initializeHeroStar();
  }
}

// Update active links when hash changes (e.g., browser back/forward or anchor clicks)
// CSS scroll-margin-top will handle the scroll positioning automatically
// Use requestAnimationFrame to wait for scroll to complete before updating
window.addEventListener('hashchange', () => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      initializeActiveLinks();
    });
  });
});