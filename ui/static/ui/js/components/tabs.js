export function initializeAllTabs() {
  const selector = '[data-tabs]';
  const allTabInstances = document.querySelectorAll(selector);

  if (!allTabInstances.length) return;

  allTabInstances.forEach(instance => createTabs(instance));
}

function createTabs(instance) {
  // ----- Query -----
  const tabList    = instance.querySelector('[role="tablist"]');
  const tabButtons = [...tabList.querySelectorAll('[role="tab"]')];
  const tabPanels  = [...instance.querySelectorAll('[role="tabpanel"]')];

  // ----- Helper: Get button for a panel ID -----
  function getButtonForPanel(panelId) {
    return tabButtons.find(button => button.getAttribute('aria-controls') === panelId);
  }

  // ----- Helper: Get panel ID for a button -----
  function getPanelIdForButton(button) {
    return button.getAttribute('aria-controls');
  }

  // ----- State -----
  const initiallyActive = tabButtons.find(button => button.getAttribute('aria-selected') === 'true');
  const initiallyActivePanelId = initiallyActive ? getPanelIdForButton(initiallyActive) : null;
  
  // Check if URL hash matches a panel ID
  const currentHash = window.location.hash.slice(1);
  let hashMatchedPanel = null;
  
  if (currentHash) {
    // Find panel whose ID exactly matches the hash
    hashMatchedPanel = tabPanels.find(panel => panel.id.toLowerCase() === currentHash.toLowerCase());
  }

  let activePanelId = hashMatchedPanel?.id || initiallyActivePanelId || tabPanels[0]?.id;

  // ----- UI Update -----
  function updateTabs() {
    const activeButton = getButtonForPanel(activePanelId);
    
    // Update tab buttons
    tabButtons.forEach(button => {
      const isActive = button === activeButton;
      button.setAttribute('aria-selected', isActive);
      button.tabIndex = isActive ? 0 : -1;
    });

    // Update tab panels
    tabPanels.forEach(panel => {
      const isActive = panel.id === activePanelId;
      panel.setAttribute('aria-hidden', !isActive);
    });
  }

  // ----- Event Handler -----
  function onClickUpdateState(event) {
    const clickedButton = event.target.closest('[role="tab"]');
    if (!clickedButton) return;

    const panelId = getPanelIdForButton(clickedButton);
    if (!panelId) return;

    activePanelId = panelId;
    updateTabs();
    
    // Update URL hash to match the panel ID (anchor target)
    window.location.hash = panelId;
    
    // Scroll panel into view
    const panel = document.getElementById(panelId);
    if (panel) {
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Handle hash changes (e.g., browser back/forward)
  function onHashChange() {
    const currentHash = window.location.hash.slice(1);
    if (!currentHash) return;
    
    const hashMatchedPanel = tabPanels.find(panel => panel.id.toLowerCase() === currentHash.toLowerCase());
    
    if (hashMatchedPanel && hashMatchedPanel.id !== activePanelId) {
      activePanelId = hashMatchedPanel.id;
      updateTabs();
    }
  }

  // ----- Init -----
  function init() {
    updateTabs();
    tabList.addEventListener('click', onClickUpdateState);
    window.addEventListener('hashchange', onHashChange);
  }

  init();
}
