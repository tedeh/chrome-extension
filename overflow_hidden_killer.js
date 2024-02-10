(() => {
  const selector = 'html,body';
  const observeEls = Array.from(document.querySelectorAll(selector));

  const observer = new MutationObserver(mutationList => {
    for (const mutation of mutationList) {
      const { target } = mutation;
      const styleMap = target.computedStyleMap();
      const overflowValue = styleMap.get('overflow')?.toString();
      if (overflowValue === 'hidden') {
        target.style.setProperty('overflow', 'auto', 'important');
      }
    }
  });

  observeEls.forEach(el => {
    observer.observe(el, {
      attributes: true,
      attributeFilter: ['style', 'class'],
    });
  });

})();
