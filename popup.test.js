const path = './popup.js';

describe('popup', () => {
  test('logs changes and queries tabs', () => {
    document.body.innerHTML = '<form id="settings"><input name="foo" type="checkbox"></form>';
    const query = jest.fn();
    global.chrome = { tabs: { query } };
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    require(path);
    const input = document.querySelector('input');
    input.checked = true;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    expect(logSpy).toHaveBeenCalledWith('foo', true);
    expect(query).toHaveBeenCalledWith({active: true, currentWindow: true}, expect.any(Function));
    logSpy.mockRestore();
    delete global.chrome;
  });
});
