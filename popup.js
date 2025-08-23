(() => {
  const input = document.getElementById('refresh-interval');

  chrome.storage.sync.get({ refreshIntervalMinutes: 0 }, (data) => {
    if (data.refreshIntervalMinutes) {
      input.value = data.refreshIntervalMinutes;
    }
  });

  input.addEventListener('change', () => {
    const minutes = parseInt(input.value, 10);
    chrome.storage.sync.set({
      refreshIntervalMinutes: isNaN(minutes) ? 0 : minutes,
    });
  });
})();
