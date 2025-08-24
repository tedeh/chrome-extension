(() => {
  let refreshIntervalMinutes = 0;
  let timeoutId;
  let nextRefreshTime = 0;

  const resetTimer = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    if (refreshIntervalMinutes > 0) {
      nextRefreshTime = Date.now() + refreshIntervalMinutes * 60 * 1000;
      timeoutId = setTimeout(() => {
        location.reload();
      }, nextRefreshTime - Date.now());
    } else {
      nextRefreshTime = 0;
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

  if (chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
      if (request.type === 'getRemaining') {
        sendResponse({
          remainingMs: nextRefreshTime ? nextRefreshTime - Date.now() : 0,
          refreshIntervalMinutes,
        });
      }
    });
  }

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
