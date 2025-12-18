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

    emailsContainer.insertBefore(lastItem, emailsContainer.firstChild);

    allEmailItems.unshift(allEmailItems.pop());

    lastItem.classList.add('email__item--bounce-in');

    setTimeout(() => {
      lastItem.classList.remove('email__item--bounce-in');
      isRotating = false;
    }, 600); // Match bounce-in animation duration (600ms)
  }

  const rotationInterval = setInterval(rotateEmails, 8000);

  return () => {
    clearInterval(rotationInterval);
  };
}
