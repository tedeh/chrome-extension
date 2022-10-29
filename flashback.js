(() => {
  const leaveAnchors = Array.from(document.querySelectorAll('a[href*="leave.php"]'));
  leaveAnchors.forEach(function (anchor) {
    const url = new URL(anchor.href);
    const realTargetUrl = (url.searchParams.get('u') || '').replace(/&amp;/g, '&');
    anchor.href = realTargetUrl;
  });
})();
