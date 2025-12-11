export function initializeHamburger() {
  // Queries 
  const hamburgerButton = document.querySelector('.hamburger');
  const body = document.querySelector('[data-mobile-menu-open]');
  const headerNav = document.querySelector('.header__nav');

  //State
  let menuOpen = false;

  //Update UI
  function toggleMobileMenu(){
    hamburgerButton.setAttribute('aria-expanded', menuOpen);
    body.setAttribute('data-mobile-menu-open', menuOpen);
  }

  //Event Handler
  function updateMenuState (event) {
    event.stopPropagation(); 

    menuOpen = !menuOpen;

    toggleMobileMenu();
  }

  function onClickOutside(event) {
    if (!menuOpen) return;

    if (headerNav.contains(event.target) || hamburgerButton.contains(event.target)) {
      return;
    }

    menuOpen = false;
    toggleMobileMenu();
  }

  function onAnchorLinkClick(event) {
    if (!menuOpen) return;

    const link = event.target.closest('a');
    if (!link) return;

    // Close menu when anchor link (starting with #) is clicked
    if (link.getAttribute('href')?.startsWith('#')) {
      menuOpen = false;
      toggleMobileMenu();
    }
  }

  //Init
  function init () {
    hamburgerButton.addEventListener('click', updateMenuState);
    document.addEventListener('click', onClickOutside);
    headerNav.addEventListener('click', onAnchorLinkClick);
  }

  init();
};