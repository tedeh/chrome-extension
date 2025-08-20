/** @jest-environment node */
const path = './twitter.js';

describe('twitter', () => {
  test('redirects to nitter', () => {
    const replace = jest.fn();
    global.window = { location: { host: 'twitter.com', toString: () => 'https://twitter.com/user', replace } };
    require(path);
    expect(replace).toHaveBeenCalledWith('https://nitter.privacydev.net/user');
  });
});
