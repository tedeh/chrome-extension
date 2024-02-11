(() => {

  const settingsFormEl = document.getElementById('settings');
  settingsFormEl.addEventListener('change', function (ev) {
    console.log(ev.target.name, ev.target.checked);
  });

  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    // tabs[0] is the active tab in the current window
    // let url = tabs[0].url;
  });

})();
