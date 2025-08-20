/** @jest-environment node */
const path = './reddit.js';

describe('reddit', () => {
  test('redirects to old reddit', () => {
    const replace = jest.fn();
    global.window = { location: { host: 'www.reddit.com', toString: () => 'https://www.reddit.com/r/test', replace } };
    require(path);
    expect(replace).toHaveBeenCalledWith('https://old.reddit.com/r/test');
  });
});
