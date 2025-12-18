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

  if (!backToContentElement) {
    switchToUpMode();
    return;
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

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateButtonState();
      }
    });
  }, {
    threshold: 0.1
  });

  observer.observe(backToTopElement);
  observer.observe(backToContentElement);

  updateButtonState();
}

