const sel = 'a[href*="twitter.com"]';
const anchors = Array.from(document.querySelectorAll(sel));
anchors.forEach(function (anchor) {
  const url = new URL(anchor.href);
  url.host = 'nitter.privacydev.net';
  anchor.href = url.toString();
});

