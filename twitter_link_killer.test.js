const path = './twitter_link_killer.js';

describe('twitter_link_killer', () => {
  test('rewrites twitter links', () => {
    document.body.innerHTML = '<a href="https://twitter.com/user/status/1">link</a>';
    require(path);
    const anchor = document.querySelector('a');
    expect(anchor.href).toBe('https://nitter.privacydev.net/user/status/1');
  });
});
