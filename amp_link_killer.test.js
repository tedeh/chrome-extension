const path = './amp_link_killer.js';

describe('amp_link_killer', () => {
  test('rewrites amp links', () => {
    document.body.innerHTML = '<a href="https://www.google.com/amp/s/https://example.com/page">link</a>';
    require(path);
    const anchor = document.querySelector('a');
    expect(anchor.href).toBe('https://example.com/page');
  });
});
