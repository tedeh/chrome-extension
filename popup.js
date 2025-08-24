(() => {
  const input = document.getElementById('refresh-interval');
  const disableBtn = document.getElementById('disable');
  const countdownEl = document.getElementById('countdown');

  const withActiveTab = (cb) => {
    if (chrome.tabs && chrome.tabs.query) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (tab) {
          cb(tab);
        }
      });
    }
  };

  withActiveTab((tab) => {
    chrome.tabs.sendMessage(tab.id, { type: 'getInterval' }, (resp) => {
      if (resp && resp.refreshIntervalMinutes) {
        input.value = resp.refreshIntervalMinutes;
      }
    });
  });

  const save = () => {
    const minutes = parseInt(input.value, 10);
    const value = isNaN(minutes) ? 0 : Math.max(1, minutes);
    withActiveTab((tab) => {
      chrome.tabs.sendMessage(tab.id, { type: 'setInterval', minutes: value });
    });
  };

  input.addEventListener('change', save);
  window.addEventListener('unload', save);

  disableBtn.addEventListener('click', () => {
    input.value = '';
    withActiveTab((tab) => {
      chrome.tabs.sendMessage(tab.id, { type: 'setInterval', minutes: 0 });
    });
  });

  if (chrome.tabs && chrome.tabs.query && chrome.tabs.sendMessage) {
    const updateCountdown = () => {
      withActiveTab((tab) => {
        chrome.tabs.sendMessage(tab.id, { type: 'getRemaining' }, (resp) => {
          if (resp && resp.refreshIntervalMinutes > 0 && resp.remainingMs > 0) {
            const totalSeconds = Math.ceil(resp.remainingMs / 1000);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            countdownEl.textContent = `Refreshing in ${minutes}:${seconds
              .toString()
              .padStart(2, '0')}`;
          } else {
            countdownEl.textContent = '';
          }
        });
      });
    };

    setInterval(updateCountdown, 1000);
    updateCountdown();
  }
})();
