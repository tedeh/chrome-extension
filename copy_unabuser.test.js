const path = './copy_unabuser.js';

describe('copy_unabuser', () => {
  test('stops copy propagation', () => {
    const handler = jest.fn();
    document.addEventListener('copy', handler);
    require(path);
    document.body.dispatchEvent(new Event('copy', { bubbles: true }));
    expect(handler).not.toHaveBeenCalled();
  });
});
