export function initializeBackToTop() {
  const backToTopButton = document.querySelector('.back-to-top');
  const backToTopElement = document.getElementById('back-to-top');
  const backToContentElement = document.getElementById('back-to-content');

  if (!backToTopButton || !backToTopElement) return;

  function switchToUpMode() {
    backToTopButton.setAttribute('href', '#back-to-top');
    backToTopButton.classList.add('back-to-top--up');
    
    const text = backToTopButton.querySelector('.visually-hidden');
    if (text) {
      text.textContent = 'Go back to top';
    }
  }

  function switchToDownMode() {
    backToTopButton.setAttribute('href', '#back-to-content');
    backToTopButton.classList.remove('back-to-top--up');
    
    const text = backToTopButton.querySelector('.visually-hidden');
    if (text) {
      text.textContent = 'Go to content';
    }
  }

  // If no back-to-content element exists, always show up button
  if (!backToContentElement) {
    switchToUpMode();
    return;
  }

  function updateButtonState() {
    const hash = window.location.hash;
    
    // Rule 1: If navigating to any hash URL (except #back-to-top), always point up
    if (hash && hash !== '#back-to-top') {
      switchToUpMode();
      return;
    }

    // Rule 2: Check scroll position to determine button state
    const scrollY = window.scrollY || window.pageYOffset;
    const backToContentRect = backToContentElement.getBoundingClientRect();
    const backToContentTop = backToContentRect.top + scrollY;
    
    // If we're scrolled past the back-to-content element, show up button
    // Otherwise (at or before back-to-content), show down button
    if (scrollY >= backToContentTop - 200) {
      switchToUpMode();
    } else {
      switchToDownMode();
    }
  }

  // Update state on scroll (using IntersectionObserver for efficiency)
  const observer = new IntersectionObserver(() => {
    updateButtonState();
  }, {
    threshold: 0,
    rootMargin: '-200px 0px'
  });

  observer.observe(backToContentElement);

  // Update state when hash changes
  window.addEventListener('hashchange', () => {
    updateButtonState();
  });

  // Initial state - delay if hash present to allow scroll to complete
  if (window.location.hash) {
    setTimeout(updateButtonState, 300);
  } else {
    updateButtonState();
  }
}

