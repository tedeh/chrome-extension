(() => {
  const url = new URL(window.location);
  if (url.host.startsWith('www.reddit.com')) {
    url.host = 'old.reddit.com';
    window.location.replace(url.toString());
  }
})();
