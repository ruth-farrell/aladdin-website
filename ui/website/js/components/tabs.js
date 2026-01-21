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

  // Optional: autoplay (opt-in via data attribute, e.g. data-tabs-autoplay)
  const autoplayEnabled = instance.hasAttribute('data-tabs-autoplay');
  const autoplayIntervalMs = (() => {
    const raw = instance.getAttribute('data-tabs-autoplay-interval');
    const parsed = raw ? Number(raw) : NaN;
    // Default: 4s. Guard against invalid / too-fast intervals.
    if (Number.isFinite(parsed) && parsed >= 1500) return parsed;
    return 4000;
  })();

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

  let autoplayControls = null;

  function onClickUpdateState(event) {
    const clickedButton = event.target.closest('[role="tab"]');
    if (!clickedButton) return;

    const panelId = getPanelIdForButton(clickedButton);
    if (!panelId) return;

    // If the user intentionally interacts with the tabs stop autoplay
    autoplayControls?.stopPermanently?.();

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

  function getActiveIndex() {
    return Math.max(0, tabPanels.findIndex(panel => panel.id === activePanelId));
  }

  function advanceToNextTab() {
    if (!tabPanels.length) return;
    const currentIndex = getActiveIndex();
    const nextIndex = (currentIndex + 1) % tabPanels.length;
    activePanelId = tabPanels[nextIndex].id;
    updateTabs();
  }

  function setupAutoplay() {
    if (!autoplayEnabled) return;
    if (tabPanels.length < 2) return;

    let intervalId = null;
    let permanentlyStopped = false;

    const start = () => {
      if (intervalId || permanentlyStopped) return;
      intervalId = window.setInterval(() => {
        if (permanentlyStopped) return;
        advanceToNextTab();
      }, autoplayIntervalMs);
    };

    const stop = () => {
      if (!intervalId) return;
      window.clearInterval(intervalId);
      intervalId = null;
    };

    const stopPermanently = () => {
      permanentlyStopped = true;
      stop();
    };

    instance.addEventListener('focusin', stopPermanently);

    instance.addEventListener('pointerdown', stopPermanently, { passive: true });

    // If user navigates away / back to the tab, avoid running in background.
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stop();
        return;
      }
      start();
    });

    start();

    return { stopPermanently };
  }

  function init() {
    updateTabs();
    tabList.addEventListener('click', onClickUpdateState);
    window.addEventListener('hashchange', onHashChange);
    autoplayControls = setupAutoplay() || null;
  }

  init();
}
