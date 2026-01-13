export function initializeReveals() {
  const selector = '[data-reveals]';
  const instances = document.querySelectorAll(selector);

  if (!instances.length) return;

  instances.forEach(instance => createReveal(instance));
}

function createReveal(instance) {
  const buttons = instance.querySelectorAll('.reveal__button');

  function updateState(button, panel) {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    
    if (isExpanded) {
      button.setAttribute('aria-expanded', 'true');
      panel.setAttribute('aria-hidden', 'false');
    }
  }

  function onClickReveal(event) {
    const button = event.target.closest('.reveal__button');
    if (!button) return;

    event.preventDefault();
    event.stopPropagation();
    
    const panelId = button.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);
    if (!panel) return;

    const reveal = button.closest('.reveal');
    if (!reveal) return;

    // Store scroll position to prevent jump
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    // Only blur on mouse clicks, not keyboard activation (to preserve focus visibility)
    if (event.pointerType === 'mouse' || event.type === 'click') {
      button.blur();
    }

    // One-way reveal: show content and hide button
    button.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');
    reveal.setAttribute('data-button-hidden', 'true');
    
    // Restore scroll position to prevent jump
    requestAnimationFrame(() => {
      window.scrollTo(scrollX, scrollY);
    });
  }

  function init() {
    buttons.forEach(button => {
      button.addEventListener('click', onClickReveal);
    });
  }

  init();
}

