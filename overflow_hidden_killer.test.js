const path = './overflow_hidden_killer.js';

describe('overflow_hidden_killer', () => {
  test('resets overflow hidden to auto', async () => {
    HTMLElement.prototype.computedStyleMap = function() {
      return new Map([['overflow', { toString: () => this.style.overflow }]]);
    };
    require(path);
    document.body.style.overflow = 'hidden';
    await new Promise(res => setTimeout(res, 0));
    expect(document.body.style.overflow).toBe('auto');
  });
});
