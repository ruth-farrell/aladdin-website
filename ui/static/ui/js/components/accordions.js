export function initializeAllAccordions() {
  const selector = '[data-accordions]';
  const instances = document.querySelectorAll(selector);

  if (!instances.length) return;

  instances.forEach(instance => createAccordion(instance));
}

function isMobile() {
  return window.innerWidth < 768;
}

function createAccordion(instance) {
  // Queries 
  const buttons = [...instance.querySelectorAll('[aria-expanded]')];
  const panels  = instance.querySelectorAll('[role="region"]');
  const isMobileOnly = instance.hasAttribute('data-accordions-mobile-only');

  // State 
  const initiallyOpen = buttons.find(button =>
    button.getAttribute('aria-expanded') === "true"
  );

  let openAccordionId = initiallyOpen?.id || null;

  // Update UI 
  function update() {
    // For mobile-only accordions on desktop, always show panels
    if (isMobileOnly && !isMobile()) {
      buttons.forEach(button => {
        button.setAttribute('aria-expanded', 'true');
      });
      panels.forEach(panel => {
        panel.setAttribute('aria-hidden', 'false');
      });
      return;
    }

    // Normal accordion behavior
    buttons.forEach(button => {
      const isOpen = openAccordionId === button.id;
      button.setAttribute('aria-expanded', isOpen);
    });

    panels.forEach(panel => {
      const isOpen = openAccordionId === panel.getAttribute('aria-labelledby');
      panel.setAttribute('aria-hidden', !isOpen);
    });
  }

  //  Event Handler 
  function onClickUpdateState(event) {
    if (isMobileOnly && !isMobile()) return;
    
    const id = event.target.closest('.accordion__button')?.id || 
               event.target.closest('button')?.id;
    if (!id) return;

    if (openAccordionId === id) {
      openAccordionId = null;
    } else {
      openAccordionId = id;    
    }

    update();
  }

  // Handle Resize (for mobile-only accordions) 
  function onResize() {
    if (isMobileOnly) {
      openAccordionId = null; // Reset state on breakpoint change
      update();
    }
  }

  // Init
  function init() {
    update();
    instance.addEventListener('click', onClickUpdateState);
    if (isMobileOnly) {
      window.addEventListener('resize', onResize);
    }
  }

  init();
}