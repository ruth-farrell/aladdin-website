export function initializeInbox() {
  const emailsContainer = document.querySelector('.emails__list');
  if (!emailsContainer) return;

  const allEmailItems = Array.from(emailsContainer.querySelectorAll('.email__item'));
  if (allEmailItems.length === 0) return;

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

    const lastItem = allEmailItems[allEmailItems.length - 1];
    const itemsToShift = allEmailItems;
    
    const clonedItem = lastItem.cloneNode(true);

    const itemHeight = lastItem.offsetHeight;
    clonedItem.style.setProperty('--item-height', `${itemHeight}px`);
    
    clonedItem.classList.add('email__item--entering');
    emailsContainer.insertBefore(clonedItem, emailsContainer.firstChild);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        clonedItem.classList.add('email__item--slide-in');
      });
    });

    setTimeout(() => {
      lastItem.remove();
      
      clonedItem.classList.remove('email__item--entering', 'email__item--slide-in');
      clonedItem.style.removeProperty('--item-height');
      
      allEmailItems.pop();
      allEmailItems.unshift(clonedItem);
      
      isRotating = false;
    }, 700);
  }

  const rotationInterval = setInterval(rotateEmails, 8000);

  return () => {
    clearInterval(rotationInterval);
  };
}
