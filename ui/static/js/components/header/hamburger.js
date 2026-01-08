export function initializeHamburger() { 
  const hamburgerButton = document.querySelector('.hamburger');
  const body = document.querySelector('[data-mobile-menu-open]');
  const headerNav = document.querySelector('.header__nav');

  let menuOpen = false;

  function toggleMobileMenu(){
    hamburgerButton.setAttribute('aria-expanded', menuOpen);
    body.setAttribute('data-mobile-menu-open', menuOpen);
  }

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

    const href = link.getAttribute('href');
    if (!href) return;

    // Close menu when anchor link (contains #) is clicked
    if (href.includes('#')) {
      menuOpen = false;
      toggleMobileMenu();
    }
  }

  function init () {
    hamburgerButton.addEventListener('click', updateMenuState);
    document.addEventListener('click', onClickOutside);
    headerNav.addEventListener('click', onAnchorLinkClick);
  }

  init();
};