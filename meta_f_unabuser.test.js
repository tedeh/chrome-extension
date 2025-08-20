const path = './meta_f_unabuser.js';

describe('meta_f_unabuser', () => {
  test('stops meta+f propagation', () => {
    const handler = jest.fn();
    document.addEventListener('keydown', handler);
    require(path);
    const event = new KeyboardEvent('keydown', { bubbles: true, code: 'KeyF', metaKey: true });
    document.body.dispatchEvent(event);
    expect(handler).not.toHaveBeenCalled();
  });
});
