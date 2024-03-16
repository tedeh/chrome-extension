(() => {

  function listener (ev) {
    ev.stopPropagation();
    // simple as that.
  }

  document.body.addEventListener('copy', listener, {
    capture: true,
  });

})();

