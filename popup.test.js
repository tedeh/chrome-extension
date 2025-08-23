const path = './popup.js';

describe('popup', () => {
  test('loads and saves refresh interval', () => {
    document.body.innerHTML = '<form id="settings"><input id="refresh-interval" type="number"></form>';
    const get = jest.fn((defaults, cb) => cb({ refreshIntervalMinutes: 5 }));
    const set = jest.fn();
    global.chrome = { storage: { sync: { get, set } } };
    require(path);
    const input = document.getElementById('refresh-interval');
    expect(get).toHaveBeenCalled();
    expect(input.value).toBe('5');
    input.value = '10';
    input.dispatchEvent(new Event('change'));
    expect(set).toHaveBeenCalledWith({ refreshIntervalMinutes: 10 });
    delete global.chrome;
  });
});
