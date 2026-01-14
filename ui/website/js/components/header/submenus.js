export function initializeSubmenus() {
  const headerNav = document.querySelector('.header__nav');
  const buttons = headerNav.querySelectorAll('[data-submenu] button');
  const menus = headerNav.querySelectorAll('[data-submenu] .header__submenu');
  const submenuContainers = headerNav.querySelectorAll('[data-submenu]');

  let submenuOpenId = false; 
  let closeTimeout = null;

  function isDesktop() {
    return window.matchMedia('(min-width: 1024px)').matches;
  }

  function updateSubmenus() {
    menus.forEach(menu => {
      const isOpen = submenuOpenId === menu.id;
      const isHidden = !isOpen;
      menu.setAttribute('aria-hidden', isHidden);
      
      // Make all focusable elements non-focusable when menu is hidden (WCAG requirement)
      const focusableElements = menu.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
      focusableElements.forEach(element => {
        if (isHidden) {
          // Store original tabindex if it exists, otherwise it's naturally focusable
          if (element.hasAttribute('tabindex')) {
            element.setAttribute('data-original-tabindex', element.getAttribute('tabindex'));
          }
          element.setAttribute('tabindex', '-1');
        } else {
          // Restore original tabindex or remove it to restore natural focusability
          if (element.hasAttribute('data-original-tabindex')) {
            const originalTabindex = element.getAttribute('data-original-tabindex');
            element.setAttribute('tabindex', originalTabindex);
            element.removeAttribute('data-original-tabindex');
          } else {
            element.removeAttribute('tabindex');
          }
        }
      });
    });

    buttons.forEach(button => {
      const isOpen = submenuOpenId === button.getAttribute('aria-controls');
      button.setAttribute('aria-expanded', isOpen);
    });
  }

  function onClickUpdateState(event) {
    if (isDesktop()) return;

    const clickedId = event.target.closest('[data-submenu] button')?.getAttribute('aria-controls');
    if (!clickedId) return;

    submenuOpenId = submenuOpenId === clickedId ? null : clickedId;
    updateSubmenus();
  }

  function onClickOutside(event) {
    if (isDesktop()) return;
    if (headerNav.contains(event.target)) return;
    if (!submenuOpenId) return;

    submenuOpenId = null;
    updateSubmenus();
  }

  function onSubmenuLinkClick(event) {
    const link = event.target.closest('.header__submenu a');
    if (!link) return;

    const href = link.getAttribute('href');
    // Close submenu if link contains a hash (e.g., #about or /#about)
    if (href && href.includes('#')) {
      submenuOpenId = null;
      updateSubmenus();
    }
  }

  function onHoverOpen(event) {
    if (!isDesktop()) return;

    if (closeTimeout) {
      clearTimeout(closeTimeout);
      closeTimeout = null;
    }

    const hoveredContainer = event.target.closest('[data-submenu]');
    if (!hoveredContainer) return;

    const menuId = hoveredContainer.querySelector('button')?.getAttribute('aria-controls');
    if (!menuId) return;

    submenuOpenId = menuId;
    updateSubmenus();
  }

  function onHoverClose(event) {
    if (!isDesktop()) return;

    if (closeTimeout) {
      clearTimeout(closeTimeout);
    }

    const relatedTarget = event.relatedTarget;
    const hoveredContainer = relatedTarget?.closest('[data-submenu]');
    
    if (!hoveredContainer) {
      closeTimeout = setTimeout(() => {
        submenuOpenId = null;
        updateSubmenus();
        closeTimeout = null;
      }, 300);
    }
  }

  function onButtonFocus(event) {
    if (!isDesktop()) return;

    const button = event.target.closest('[data-submenu] button');
    if (!button) return;

    const menuId = button.getAttribute('aria-controls');
    if (!menuId) return;

    if (submenuOpenId !== menuId) {
      submenuOpenId = menuId;
      updateSubmenus();
    }
  }

  function onButtonBlur(event) {
    if (!isDesktop()) return;

    const button = event.target.closest('[data-submenu] button');
    if (!button) return;

    const menuId = button.getAttribute('aria-controls');
    if (!menuId || submenuOpenId !== menuId) return;

    const menu = document.getElementById(menuId);
    const relatedTarget = event.relatedTarget;
    
    // Close if focus is not moving to the submenu
    if (menu && !menu.contains(relatedTarget)) {
      setTimeout(() => {
        if (submenuOpenId === menuId && !menu.contains(document.activeElement)) {
          submenuOpenId = null;
          updateSubmenus();
        }
      }, 100);
    }
  }

  function onKeyDown(event) {
    if (!isDesktop()) return;
    if (event.key !== 'Escape' || !submenuOpenId) return;

    const button = document.querySelector(`[aria-controls="${submenuOpenId}"]`);
    submenuOpenId = null;
    updateSubmenus();
    if (button) button.focus();
  }

  function init() {
    // Initialize submenus state on page load (set tabindex for hidden menus)
    updateSubmenus();

    // Mobile handlers
    headerNav.addEventListener('click', onClickUpdateState);
    document.addEventListener('click', onClickOutside);
    headerNav.addEventListener('click', onSubmenuLinkClick);

    // Desktop handlers
    submenuContainers.forEach(container => {
      container.addEventListener('mouseenter', onHoverOpen);
      container.addEventListener('mouseleave', onHoverClose);
    });

    buttons.forEach(button => {
      button.addEventListener('focus', onButtonFocus);
      button.addEventListener('blur', onButtonBlur);
    });

    document.addEventListener('keydown', onKeyDown);
  }

  init();
}
