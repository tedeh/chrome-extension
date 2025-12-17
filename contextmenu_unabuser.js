(() => {

  function listener (ev) {
    ev.stopPropagation();
  }

  // Prevent sites from blocking right-click
  document.addEventListener('contextmenu', listener, {
    capture: true,
  });

  // Also handle mousedown events that might be used to block right-click
  document.addEventListener('mousedown', listener, {
    capture: true,
  });

  // Remove any oncontextmenu attributes that return false
  const observer = new MutationObserver(() => {
    document.body?.removeAttribute('oncontextmenu');
    document.documentElement?.removeAttribute('oncontextmenu');
  });

  if (document.body) {
    document.body.removeAttribute('oncontextmenu');
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['oncontextmenu'],
    });
  }

  if (document.documentElement) {
    document.documentElement.removeAttribute('oncontextmenu');
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['oncontextmenu'],
    });
  }

  // Override common functions used to disable right-click
  window.addEventListener('load', () => {
    document.body?.removeAttribute('oncontextmenu');
    document.documentElement?.removeAttribute('oncontextmenu');
  }, { once: true });

})();
