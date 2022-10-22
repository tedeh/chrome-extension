(() => {
  const sel = 'a[href*="google.com/amp/s/"]';
  const anchors = Array.from(document.querySelectorAll(sel));
  anchors.forEach(function (anchor) {
    const realTargetUrl = anchor.href.split('google.com/amp/s/')[1];
    anchor.href = realTargetUrl;
  });
})();
