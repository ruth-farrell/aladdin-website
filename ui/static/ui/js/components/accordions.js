export function initializeAllAccordions() {
  const selector = '[data-accordions]';
  const instances = document.querySelectorAll(selector);

  if (!instances.length) return;

  instances.forEach(instance => createAccordion(instance));
}

function createAccordion(instance) {
  // ----- Queries -----
  const buttons = [...instance.querySelectorAll('[aria-expanded]')];
  const panels  = instance.querySelectorAll('[role="region"]');

  // ----- State -----
  const initiallyOpen = buttons.find(button =>
    button.getAttribute('aria-expanded') === "true"
  );

  let openAccordionId = initiallyOpen?.id || null;

  // ----- Update UI -----
  function update() {
    buttons.forEach(button => {
      const isOpen = openAccordionId === button.id;
      button.setAttribute('aria-expanded', isOpen);
    });

    panels.forEach(panel => {
      const isOpen = openAccordionId === panel.getAttribute('aria-labelledby');
      panel.setAttribute('aria-hidden', !isOpen);
    });
  }

  // ----- Event Handler -----
  function onClickUpdateState(event) {
    const id = event.target.closest('.accordion__button')?.id;
    if (!id) return;

    if (openAccordionId === id) {
      openAccordionId = null;
    } else {
      openAccordionId = id;    
    }

    update();
  }

  // ----- Init -----
  function init() {
    update();
    instance.addEventListener('click', onClickUpdateState);
  }

  init();
}