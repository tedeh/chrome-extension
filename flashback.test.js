const path = './flashback.js';

describe('flashback', () => {
  test('rewrites leave.php links', () => {
    document.body.innerHTML = '<a href="https://site.tld/leave.php?u=https%3A%2F%2Ffoo.com%2Fbar">link</a>';
    require(path);
    const anchor = document.querySelector('a');
    expect(anchor.href).toBe('https://foo.com/bar');
  });
});
