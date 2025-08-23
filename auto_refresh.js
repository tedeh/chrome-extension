(() => {
  let refreshIntervalMinutes = 0;
  let timeoutId;

  const resetTimer = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    if (refreshIntervalMinutes > 0) {
      timeoutId = setTimeout(() => {
        location.reload();
      }, refreshIntervalMinutes * 60 * 1000);
    }
  };

  const loadInterval = () => {
    chrome.storage.sync.get({ refreshIntervalMinutes: 0 }, (data) => {
      refreshIntervalMinutes = data.refreshIntervalMinutes || 0;
      resetTimer();
    });
  };

  ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'].forEach((event) => {
    window.addEventListener(event, resetTimer, true);
  });

  if (chrome.storage && chrome.storage.onChanged) {
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'sync' && changes.refreshIntervalMinutes) {
        refreshIntervalMinutes = changes.refreshIntervalMinutes.newValue || 0;
        resetTimer();
      }
    });
  }

  loadInterval();
})();
