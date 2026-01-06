export function initializeActiveLinks() {
  const headerLinks = document.querySelectorAll('.header__link');
  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;

  // Update home link href based on current page
  const homeLink = document.querySelector('.header__link[href="/"], .header__link[href="#back-to-top"]');
  if (homeLink) {
    if (currentPath === '/') {
      homeLink.setAttribute('href', '#back-to-top');
    } else {
      homeLink.setAttribute('href', '/');
    }
  }

  // Remove active class from all links first
  headerLinks.forEach(link => {
    link.classList.remove('header__link--active');
  });

  // Special case: back-to-top and back-to-content should keep home active
  if (currentHash && (currentHash === '#back-to-top' || currentHash === '#back-to-content')) {
    if (currentPath === '/') {
      if (homeLink) {
        homeLink.classList.add('header__link--active');
      }
    }
    return;
  }

  // If there's a hash on root path (/#faqs), activate the matching anchor link
  if (currentHash && currentPath === '/') {
    // Try both formats: /#about and #about
    const matchingLink = document.querySelector(`.header__link[href="/${currentHash}"], .header__link[href="${currentHash}"]`);
    if (matchingLink) {
      matchingLink.classList.add('header__link--active');
    } else {
      // Hash doesn't exist in header, keep home active
      if (homeLink) {
        homeLink.classList.add('header__link--active');
      }
    }
    return;
  }

  // If pathname is "/" (no hash), activate home link
  if (currentPath === '/') {
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

