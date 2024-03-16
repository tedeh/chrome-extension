(() => {

  // these are the els where we prevent cmd-f from being prevented!
  const els = [
    document.body,
  ];

  const listener = function (ev) {
    if (ev.code === 'KeyF' && ev.metaKey) {
      ev.stopPropagation();
    }
  };

  els.forEach(function (el) {
    el.addEventListener('keydown', listener);
  });

})();
