export function initializeAllTabs() {
  const selector = '[data-tabs]';
  const allTabInstances = document.querySelectorAll(selector);

  if (!allTabInstances.length) return;

  allTabInstances.forEach(instance => createTabs(instance));
}

function createTabs(instance) {
  // Queries
  const tabList    = instance.querySelector('[role="tablist"]');
  const tabButtons = [...tabList.querySelectorAll('[role="tab"]')];
  const tabPanels  = [...instance.querySelectorAll('[role="tabpanel"]')];

  function getButtonForPanel(panelId) {
    return tabButtons.find(button => button.getAttribute('aria-controls') === panelId);
  }

  function getPanelIdForButton(button) {
    return button.getAttribute('aria-controls');
  }

  // State
  const initiallyActive = tabButtons.find(button => button.getAttribute('aria-selected') === 'true');
  const initiallyActivePanelId = initiallyActive ? getPanelIdForButton(initiallyActive) : null;
  
  const currentHash = window.location.hash.slice(1);
  let hashMatchedPanel = null;
  
  if (currentHash) {
    hashMatchedPanel = tabPanels.find(panel => panel.id.toLowerCase() === currentHash.toLowerCase());
  }

  let activePanelId = hashMatchedPanel?.id || initiallyActivePanelId || tabPanels[0]?.id;

  // Update UI
  function updateTabs() {
    const activeButton = getButtonForPanel(activePanelId);
    
    tabButtons.forEach(button => {
      const isActive = button === activeButton;
      button.setAttribute('aria-selected', isActive);
      button.tabIndex = isActive ? 0 : -1;
    });

    tabPanels.forEach(panel => {
      const isActive = panel.id === activePanelId;
      panel.setAttribute('aria-hidden', !isActive);
    });
  }

  // Event Handler
  function onClickUpdateState(event) {
    const clickedButton = event.target.closest('[role="tab"]');
    if (!clickedButton) return;

    const panelId = getPanelIdForButton(clickedButton);
    if (!panelId) return;

    activePanelId = panelId;
    updateTabs();
    
    // Update URL without triggering browser scroll
    history.pushState(null, '', `#${panelId}`);
  }

  // Handle hash changes
  function onHashChange() {
    const currentHash = window.location.hash.slice(1);
    if (!currentHash) return;
    
    const hashMatchedPanel = tabPanels.find(panel => panel.id.toLowerCase() === currentHash.toLowerCase());
    
    if (hashMatchedPanel && hashMatchedPanel.id !== activePanelId) {
      activePanelId = hashMatchedPanel.id;
      updateTabs();
    }
  }

  // Init
  function init() {
    updateTabs();
    tabList.addEventListener('click', onClickUpdateState);
    window.addEventListener('hashchange', onHashChange);
  }

  init();
}
