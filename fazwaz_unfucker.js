(() => {
  const selector = 'header,main';

  setInterval(() => {
    const els = Array.from(document.querySelectorAll(selector));
    els.forEach(el => {
      kill(el);
    });
  }, 50);

  function kill (target) {
    target.style.cssText = 'filter: none';
    console.log('killed', target);
  }

})();
