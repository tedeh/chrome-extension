const path = './utm_link_killer.js';

describe('utm_link_killer', () => {
  test('removes utm parameters', () => {
    document.body.innerHTML = '<a href="https://example.com/?utm_source=test&utm_medium=foo&ok=1">link</a>';
    require(path);
    const anchor = document.querySelector('a');
    expect(anchor.href).toBe('https://example.com/?ok=1');
  });
});
