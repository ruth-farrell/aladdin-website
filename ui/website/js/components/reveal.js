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

    // One-way reveal: show content and hide button
    button.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');
    reveal.setAttribute('data-button-hidden', 'true');
  }

  function init() {
    buttons.forEach(button => {
      button.addEventListener('click', onClickReveal);
    });
  }

  init();
}

