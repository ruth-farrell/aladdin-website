export function initializeInbox() {
  const emailsContainer = document.querySelector('.emails ul');
  if (!emailsContainer) return;

  const allEmailItems = Array.from(emailsContainer.querySelectorAll('.email__item'));
  if (allEmailItems.length === 0) return;

  let isRotating = false; // Prevent overlapping rotations

  // Rotate carousel: move last item to top
  function rotateEmails() {
    // Prevent overlapping rotations
    if (isRotating) return;
    isRotating = true;

    // Get the last item (bottom of the list)
    const lastItem = allEmailItems[allEmailItems.length - 1];

    // Move last item to the top of the DOM
    // This naturally pushes all other items down
    emailsContainer.insertBefore(lastItem, emailsContainer.firstChild);

    // Update the array to match the new DOM order
    allEmailItems.unshift(allEmailItems.pop());

    // Add bounce-in animation to the new top item
    lastItem.classList.add('email__item--bounce-in');

    // After animation completes, remove the animation class
    setTimeout(() => {
      lastItem.classList.remove('email__item--bounce-in');
      isRotating = false;
    }, 600); // Match bounce-in animation duration (600ms)
  }

  // Set up rotation timer (rotate every 4 seconds)
  const rotationInterval = setInterval(rotateEmails, 8000);

  // Cleanup function (optional - for if you need to stop the carousel)
  return () => {
    clearInterval(rotationInterval);
  };
}
