(() => {
  const input = document.getElementById('refresh-interval');
  const disableBtn = document.getElementById('disable');
  const countdownEl = document.getElementById('countdown');

  chrome.storage.sync.get({ refreshIntervalMinutes: 0 }, (data) => {
    if (data.refreshIntervalMinutes) {
      input.value = data.refreshIntervalMinutes;
    }
  });

  const save = () => {
    const minutes = parseInt(input.value, 10);
    chrome.storage.sync.set({
      refreshIntervalMinutes: isNaN(minutes) ? 0 : Math.max(1, minutes),
    });
  };

  input.addEventListener('change', save);

  disableBtn.addEventListener('click', () => {
    input.value = '';
    chrome.storage.sync.set({ refreshIntervalMinutes: 0 });
  });

  if (chrome.tabs && chrome.tabs.query && chrome.tabs.sendMessage) {
    const updateCountdown = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (!tab) {
          countdownEl.textContent = '';
          return;
        }
        chrome.tabs.sendMessage(tab.id, { type: 'getRemaining' }, (resp) => {
          if (resp && resp.refreshIntervalMinutes > 0 && resp.remainingMs > 0) {
            const totalSeconds = Math.ceil(resp.remainingMs / 1000);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            countdownEl.textContent = `Refreshing in ${minutes}:${seconds.toString().padStart(2, '0')}`;
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
