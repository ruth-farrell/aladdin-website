export function initializeBackToTop() {
  const backToTopButton = document.querySelector('.back-to-top');
  const backToTopElement = document.getElementById('back-to-top');

  if (!backToTopButton || !backToTopElement) return;

  // Store initial viewport height (measured when page loads)
  let initialViewportHeight = window.innerHeight;

  function switchToUpMode() {
    backToTopButton.setAttribute('href', '#back-to-top');
    backToTopButton.classList.add('back-to-top--up');
    
    const text = backToTopButton.querySelector('.visually-hidden');
    if (text) {
      text.textContent = 'Go back to top';
    }
  }

  function switchToDownMode() {
    // Link to just below the initial viewport (use smooth scroll via JS)
    backToTopButton.setAttribute('href', '#');
    backToTopButton.classList.remove('back-to-top--up');
    
    const text = backToTopButton.querySelector('.visually-hidden');
    if (text) {
      text.textContent = 'Go to content';
    }
  }

  function updateButtonState() {
    const scrollY = window.scrollY || window.pageYOffset;
    
    // If scrolled out of initial viewport, show "up" button
    // Otherwise (within initial viewport), show "down" button
    if (scrollY > 0) {
      switchToUpMode();
    } else {
      switchToDownMode();
    }
  }

  // Handle click for "down" button - scroll to just below viewport
  function handleClick(event) {
    if (!backToTopButton.classList.contains('back-to-top--up')) {
      // It's in "down" mode, scroll to just below initial viewport
      event.preventDefault();
      window.scrollTo({
        top: initialViewportHeight + 1,
        behavior: 'smooth'
      });
    }
    // If it's in "up" mode, let the default anchor link behavior handle it
  }

  // Initialize after page is fully loaded to get accurate viewport height
  function initialize() {
    // Re-measure viewport in case it changed (e.g., address bar on mobile)
    initialViewportHeight = window.innerHeight;

    // Handle initial scroll position
    updateButtonState();

    // Update on scroll (throttled with requestAnimationFrame)
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateButtonState();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Handle resize (viewport height might change on mobile when address bar hides/shows)
    window.addEventListener('resize', () => {
      initialViewportHeight = window.innerHeight;
      updateButtonState();
    });

    // Handle click for custom scroll target
    backToTopButton.addEventListener('click', handleClick);
  }

  // Wait for page to fully load
  if (document.readyState === 'complete') {
    initialize();
  } else {
    window.addEventListener('load', initialize);
  }
}
