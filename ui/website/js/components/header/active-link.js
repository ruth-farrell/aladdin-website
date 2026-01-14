export function initializeActiveLinks() {
  const headerLinks = document.querySelectorAll('.header__link');
  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;

  // Update home link href based on current page
  const homeLink = document.querySelector('.header__link[href="/"], .header__link[href="/#back-to-top"], .header__link[href="#back-to-top"]');
  if (homeLink) {
    if (currentPath === '/') {
      homeLink.setAttribute('href', '/#back-to-top');
    } else {
      homeLink.setAttribute('href', '/');
    }
  }

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

  if (currentHash && currentPath === '/') {
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

  if (currentPath === '/') {
    if (homeLink) {
      homeLink.classList.add('header__link--active');
    }
    return;
  }

  headerLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    
    // Skip anchor links and match pathname
    if (linkHref && !linkHref.startsWith('#') && linkHref === currentPath) {
      link.classList.add('header__link--active');
    }
  });
}

export function setupLinkClickHandlers() {
  const headerNav = document.querySelector('.header__nav');
  
  if (!headerNav) return;

  headerNav.addEventListener('click', (event) => {
    const clickedLink = event.target.closest('.header__link');
    
    if (!clickedLink) return;

    const linkHref = clickedLink.getAttribute('href');
    
    if (linkHref) {
      // Wait for scroll to complete before updating active state
      // Use requestAnimationFrame to ensure scroll has settled
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          initializeActiveLinks();
        });
      });
    }
  });
}

