export function initializeActiveLinks() {
  const headerLinks = document.querySelectorAll('.header__link');
  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;

  // Remove active class from all links first
  headerLinks.forEach(link => {
    link.classList.remove('header__link--active');
  });

  // Don't activate home when there's a hash on root path (/#faqs)
  if (currentHash && currentPath === '/') {
    return;
  }

  // If pathname is "/" (no hash), activate home link
  if (currentPath === '/') {
    const homeLink = document.querySelector('.header__link[href="/"]');
    if (homeLink) {
      homeLink.classList.add('header__link--active');
    }
    return;
  }

  // Match pathname (handles both /parents#tab and /parents cases)
  headerLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    
    // Skip anchor links and match pathname
    if (linkHref && !linkHref.startsWith('#') && linkHref === currentPath) {
      link.classList.add('header__link--active');
    }
  });
}

// Set up click handlers for immediate feedback
export function setupLinkClickHandlers() {
  const headerNav = document.querySelector('.header__nav');
  
  if (!headerNav) return;

  headerNav.addEventListener('click', (event) => {
    const clickedLink = event.target.closest('.header__link');
    
    if (!clickedLink) return;

    const linkHref = clickedLink.getAttribute('href');
    
    // Handle all navigation links (path-based or anchor links)
    if (linkHref) {
      // Small delay to allow hash/path to update, then refresh active state
      setTimeout(() => {
        initializeActiveLinks();
      }, 10);
    }
  });
}

