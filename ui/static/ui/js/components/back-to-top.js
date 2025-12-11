export function initializeBackToTop() {
  const backToTopButton = document.querySelector('.back-to-top');
  const backToTopElement = document.getElementById('back-to-top');
  const backToContentElement = document.getElementById('back-to-content');

  if (!backToTopButton || !backToTopElement || !backToContentElement) return;

  // Switch button to "up" mode
  function switchToUpMode() {
    backToTopButton.setAttribute('href', '#back-to-top');
    backToTopButton.classList.add('back-to-top--up');
    
    const text = backToTopButton.querySelector('.visually-hidden');
    if (text) {
      text.textContent = 'Go back to top';
    }
  }

  // Switch button to "down" mode
  function switchToDownMode() {
    backToTopButton.setAttribute('href', '#back-to-content');
    backToTopButton.classList.remove('back-to-top--up');
    
    const text = backToTopButton.querySelector('.visually-hidden');
    if (text) {
      text.textContent = 'Go to content';
    }
  }

  // Check which elements are in viewport and update button accordingly
  function updateButtonState() {
    const backToTopRect = backToTopElement.getBoundingClientRect();
    const backToContentRect = backToContentElement.getBoundingClientRect();
    
    const isBackToTopInViewport = backToTopRect.top >= 0 && backToTopRect.top <= window.innerHeight;
    const isBackToContentInViewport = backToContentRect.top >= 0 && backToContentRect.top <= window.innerHeight;
    
    // If both are in viewport, back-to-top takes precedence (show down)
    if (isBackToTopInViewport) {
      switchToDownMode();
    } else if (isBackToContentInViewport) {
      switchToUpMode();
    }
    // If neither is in viewport, don't change the current state
  }

  // Set up Intersection Observer - only switch when elements ENTER viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Only react when element enters viewport (isIntersecting becomes true)
      if (entry.isIntersecting) {
        updateButtonState();
      }
    });
  }, {
    threshold: 0.1
  });

  // Observe both elements
  observer.observe(backToTopElement);
  observer.observe(backToContentElement);

  // Initialize button state on page load
  updateButtonState();
}

