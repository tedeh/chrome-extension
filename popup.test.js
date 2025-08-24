const path = './popup.js';

describe('popup', () => {
  test('handles refresh interval and disable button', () => {
    jest.useFakeTimers();
    document.body.innerHTML =
      '<form id="settings">' +
      '<input id="refresh-interval" type="number" placeholder="Not active"/>' +
      '<button id="disable" type="button"></button>' +
      '</form><p id="countdown"></p>';
    const query = jest.fn((opts, cb) => cb([{ id: 1 }]));
    const sendMessage = jest.fn((id, msg, cb) => {
      if (msg.type === 'getInterval') {
        cb && cb({ refreshIntervalMinutes: 5 });
      } else {
        cb && cb({});
      }
    });
    global.chrome = { tabs: { query, sendMessage } };
    require(path);
    const input = document.getElementById('refresh-interval');
    const disable = document.getElementById('disable');
    expect(input.value).toBe('5');
    sendMessage.mockClear();
    input.value = '10';
    input.dispatchEvent(new Event('change'));
    expect(sendMessage).toHaveBeenCalledWith(1, {
      type: 'setInterval',
      minutes: 10,
    });
    sendMessage.mockClear();
    disable.click();
    expect(sendMessage).toHaveBeenCalledWith(1, {
      type: 'setInterval',
      minutes: 0,
    });
    delete global.chrome;
  });
});
