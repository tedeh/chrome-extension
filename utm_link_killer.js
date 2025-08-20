(() => {
  const anchors = Array.from(document.querySelectorAll('a[href]'));
  anchors.forEach(anchor => {
    try {
      const url = new URL(anchor.href);
      const params = url.searchParams;
      let changed = false;
      Array.from(params.keys()).forEach(key => {
        if (key.toLowerCase().startsWith('utm_')) {
          params.delete(key);
          changed = true;
        }
      });
      if (changed) {
        anchor.href = url.toString();
      }
    } catch (_) {
      // ignore invalid URLs
    }
  });
})();
