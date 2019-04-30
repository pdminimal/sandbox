import { main } from '../main';

jest.useFakeTimers();

describe('test main', () => {
  document.body.innerHTML = `
  <textarea id="src"></textarea>
  <span id="score"><span class="good"></span> / <span class="total"></span></span>
  <div id="question"></div>
  `;

  function _event(eventName: string) {
    const evt = document.createEvent('HTMLEvents');
    evt.initEvent(eventName, false, true);
    return evt;
  }

  function _keypress(key: string) {
    document.body.dispatchEvent(
      new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        key,
        shiftKey: false,
      })
    );
    document.body.dispatchEvent(
      new KeyboardEvent('keyup', {
        bubbles: true,
        cancelable: true,
        key,
        shiftKey: false,
      })
    );
  }

  function _change(value: string) {
    const srcDom = document.getElementById('src')! as HTMLTextAreaElement;
    srcDom.value = value;
    srcDom.dispatchEvent(_event('change'));
  }

  it('should show dom when textarea changed', () => {
    main();
    _change('test string');
    const questionDom = document.getElementById('question')!;
    expect(questionDom.textContent).toBe('test string');

    _change('test string2');
    expect(questionDom.textContent).toBe('test string2');

    jest.runOnlyPendingTimers();
    expect(setTimeout).toHaveBeenCalled();
  });

  it('should goto next when key press', () => {
    main();
    _change('test string');
    const questionDom = document.getElementById('question')!;
    expect(
      (questionDom.firstChild! as HTMLSpanElement).classList.contains('cursor')
    ).toBeTruthy();

    _keypress('s');
    expect(
      (questionDom.firstChild! as HTMLSpanElement).classList.contains('cursor')
    ).toBeFalsy();
    expect(
      (questionDom.firstChild!.nextSibling!
        .nextSibling as HTMLSpanElement).classList.contains('cursor')
    ).toBeTruthy();

    _keypress('s');
    expect(document.querySelector('#score .good')!.textContent).toBe('1');

  });
});
