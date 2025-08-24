(() => {
  const KEY_INTERVAL = 'autoRefreshMinutes';
  const KEY_NEXT = 'autoRefreshNextTime';
  let refreshIntervalMinutes = 0;
  let timeoutId;
  let nextRefreshTime = 0;

  const save = () => {
    if (refreshIntervalMinutes > 0) {
      try {
        sessionStorage.setItem(KEY_INTERVAL, String(refreshIntervalMinutes));
        sessionStorage.setItem(KEY_NEXT, String(nextRefreshTime));
      } catch (e) {
        // ignore
      }
    } else {
      try {
        sessionStorage.removeItem(KEY_INTERVAL);
        sessionStorage.removeItem(KEY_NEXT);
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
    save();
  };

  const load = () => {
    try {
      const storedInterval = sessionStorage.getItem(KEY_INTERVAL);
      refreshIntervalMinutes = storedInterval ? parseInt(storedInterval, 10) || 0 : 0;
      const storedNext = sessionStorage.getItem(KEY_NEXT);
      nextRefreshTime = storedNext ? parseInt(storedNext, 10) || 0 : 0;
    } catch (e) {
      refreshIntervalMinutes = 0;
      nextRefreshTime = 0;
    }
    if (refreshIntervalMinutes > 0) {
      const remaining = nextRefreshTime - Date.now();
      if (remaining > 0) {
        timeoutId = setTimeout(() => {
          location.reload();
        }, remaining);
      } else {
        resetTimer();
      }
    }
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
        resetTimer();
        sendResponse({ success: true });
      } else if (request.type === 'getInterval') {
        sendResponse({ refreshIntervalMinutes });
      }
    });
  }

  load();
})();
