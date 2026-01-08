export function initializeTabs() {
  const selector = '[data-tabs]';
  const instances = document.querySelectorAll(selector);

  if (!instances.length) return;

  instances.forEach(instance => createTabs(instance));
}

function createTabs(instance) {
  const tabList    = instance.querySelector('[role="tablist"]');
  const tabButtons = [...tabList.querySelectorAll('[role="tab"]')];
  const tabPanels  = [...instance.querySelectorAll('[role="tabpanel"]')];

  function getButtonForPanel(panelId) {
    return tabButtons.find(button => button.getAttribute('aria-controls') === panelId);
  }

  function getPanelIdForButton(button) {
    return button.getAttribute('aria-controls');
  }

  const initiallyActive = tabButtons.find(button => button.getAttribute('aria-selected') === 'true');
  const initiallyActivePanelId = initiallyActive ? getPanelIdForButton(initiallyActive) : null;
  
  const currentHash = window.location.hash.slice(1);
  let hashMatchedPanel = null;
  
  if (currentHash) {
    hashMatchedPanel = tabPanels.find(panel => panel.id.toLowerCase() === currentHash.toLowerCase());
  }

  let activePanelId = hashMatchedPanel?.id || initiallyActivePanelId || tabPanels[0]?.id;

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

  function onClickUpdateState(event) {
    const clickedButton = event.target.closest('[role="tab"]');
    if (!clickedButton) return;

    const panelId = getPanelIdForButton(clickedButton);
    if (!panelId) return;

    activePanelId = panelId;
    updateTabs();
    
    history.pushState(null, '', `#${panelId}`);
  }

  function onHashChange() {
    const currentHash = window.location.hash.slice(1);
    if (!currentHash) return;
    
    const hashMatchedPanel = tabPanels.find(panel => panel.id.toLowerCase() === currentHash.toLowerCase());
    
    if (hashMatchedPanel && hashMatchedPanel.id !== activePanelId) {
      activePanelId = hashMatchedPanel.id;
      updateTabs();
    }
  }

  function init() {
    updateTabs();
    tabList.addEventListener('click', onClickUpdateState);
    window.addEventListener('hashchange', onHashChange);
  }

  init();
}
