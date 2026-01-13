export function initializeInbox() {
  const selector = '[data-inbox]';
  const instances = document.querySelectorAll(selector);

  if (!instances.length) return;

  instances.forEach(instance => createInbox(instance));
}

function createInbox(instance) {
  const emailsList = instance.querySelector('.emails__list');
  if (!emailsList) return;

  const emailItems = Array.from(emailsList.querySelectorAll('.email__item'));
  if (emailItems.length === 0) return;

  let isRotating = false;

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function rotateEmails() {
    if (isRotating) return;
    
    if (prefersReducedMotion()) {
      return;
    }
    
    isRotating = true;

    const lastItem = emailItems[emailItems.length - 1];
    const clonedItem = lastItem.cloneNode(true);

    const itemHeight = lastItem.offsetHeight;
    clonedItem.style.setProperty('--item-height', `${itemHeight}px`);
    
    clonedItem.classList.add('email__item--entering');
    emailsList.insertBefore(clonedItem, emailsList.firstChild);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        clonedItem.classList.add('email__item--slide-in');
      });
    });

    setTimeout(() => {
      lastItem.remove();
      
      clonedItem.classList.remove('email__item--entering', 'email__item--slide-in');
      clonedItem.style.removeProperty('--item-height');
      
      emailItems.pop();
      emailItems.unshift(clonedItem);
      
      isRotating = false;
    }, 700);
  }

  const rotationInterval = setInterval(rotateEmails, 8000);

  return () => {
    clearInterval(rotationInterval);
  };
}
