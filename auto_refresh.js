(() => {
  const KEY = 'autoRefreshMinutes';
  let refreshIntervalMinutes = 0;
  let timeoutId;
  let nextRefreshTime = 0;

  const save = () => {
    if (refreshIntervalMinutes > 0) {
      try {
        sessionStorage.setItem(KEY, String(refreshIntervalMinutes));
      } catch (e) {
        // ignore
      }
    } else {
      try {
        sessionStorage.removeItem(KEY);
      } catch (e) {
        // ignore
      }
    }
  };

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

  const load = () => {
    try {
      const stored = sessionStorage.getItem(KEY);
      refreshIntervalMinutes = stored ? parseInt(stored, 10) || 0 : 0;
    } catch (e) {
      refreshIntervalMinutes = 0;
    }
    resetTimer();
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
      } else if (request.type === 'setInterval') {
        refreshIntervalMinutes = request.minutes || 0;
        save();
        resetTimer();
        sendResponse({ success: true });
      } else if (request.type === 'getInterval') {
        sendResponse({ refreshIntervalMinutes });
      }
    });
  }

  load();
})();
