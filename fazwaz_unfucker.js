(() => {
  const selector = 'header,main';

  const cb = () => {
    const els = Array.from(document.querySelectorAll(selector));
    els.forEach(el => {
      kill(el);
    });
    setTimeout(cb, 1000);
  };

  setTimeout(cb, 1000);

  function kill (target) {
    target.style.cssText = 'filter: none';
  }

})();
