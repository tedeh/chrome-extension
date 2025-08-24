const path = './popup.js';

describe('popup', () => {
  test('handles refresh interval and disable button', () => {
    document.body.innerHTML =
      '<form id="settings">' +
      '<input id="refresh-interval" type="number" placeholder="Not active"/>' +
      '<button id="disable" type="button"></button>' +
      '</form><p id="countdown"></p>';
    const get = jest.fn((defaults, cb) => cb({ refreshIntervalMinutes: 5 }));
    const set = jest.fn();
    global.chrome = { storage: { sync: { get, set } } };
    require(path);
    const input = document.getElementById('refresh-interval');
    const disable = document.getElementById('disable');
    expect(get).toHaveBeenCalled();
    expect(input.value).toBe('5');
    expect(input.placeholder).toBe('Not active');
    input.value = '10';
    window.dispatchEvent(new Event('unload'));
    expect(set).toHaveBeenCalledWith({ refreshIntervalMinutes: 10 });
    disable.click();
    expect(set).toHaveBeenCalledWith({ refreshIntervalMinutes: 0 });
    delete global.chrome;
  });
});
