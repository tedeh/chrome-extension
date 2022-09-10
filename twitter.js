const url = new URL(window.location);
if (url.host.includes('twitter.com')) {
  url.host = 'nitter.privacydev.net';
  window.location.replace(url.toString());
}
