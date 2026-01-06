export function initializeInbox() {
  const emailsContainer = document.querySelector('.emails ul');
  if (!emailsContainer) return;

  const allEmailItems = Array.from(emailsContainer.querySelectorAll('.email__item'));
  if (allEmailItems.length === 0) return;

  let isRotating = false;

  // Rotate carousel: move last item to top
  function rotateEmails() {
    // Prevent overlapping rotations
    if (isRotating) return;
    isRotating = true;

    const lastItem = allEmailItems[allEmailItems.length - 1];
    const itemsToShift = allEmailItems; // All items (including last, since we're cloning)
    
    // Clone the last item
    const clonedItem = lastItem.cloneNode(true);
    
    // Get the height before inserting and set as CSS variable
    const itemHeight = lastItem.offsetHeight;
    clonedItem.style.setProperty('--item-height', `${itemHeight}px`);
    
    // Insert clone at the top with entering class
    clonedItem.classList.add('email__item--entering');
    emailsContainer.insertBefore(clonedItem, emailsContainer.firstChild);

    // Trigger smooth animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Add slide-in class to trigger CSS animation
        clonedItem.classList.add('email__item--slide-in');
      });
    });

    setTimeout(() => {
      // Remove the original last item after animation
      lastItem.remove();
      
      // Clean up classes and CSS variable
      clonedItem.classList.remove('email__item--entering', 'email__item--slide-in');
      clonedItem.style.removeProperty('--item-height');
      
      // Update array - remove last item and add clone at the beginning
      allEmailItems.pop();
      allEmailItems.unshift(clonedItem);
      
      isRotating = false;
    }, 700); // Match animation duration
  }

  const rotationInterval = setInterval(rotateEmails, 8000);

  return () => {
    clearInterval(rotationInterval);
  };
}
