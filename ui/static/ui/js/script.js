import { initializeAllTabs } from './components/tabs.js';
import { initializeAllAccordions } from './components/accordions.js';
import { createSubmenus } from './components/header/submenus.js';
import { initializeHamburger } from './components/header/hamburger.js';
import { initializeInbox } from './components/inbox.js';
import { initializeActiveLinks, setupLinkClickHandlers } from './components/active-link.js';
import { initializeBackToTop } from './components/back-to-top.js';

document.addEventListener('DOMContentLoaded', () => {
  initializeAllTabs();
  initializeAllAccordions();

  //Header Navigation
  initializeHamburger();
  createSubmenus();
  initializeActiveLinks();
  setupLinkClickHandlers();

  initializeInbox();

  initializeBackToTop();
});

// Update active links when hash changes (anchor link clicks)
window.addEventListener('hashchange', () => {
  initializeActiveLinks();
});