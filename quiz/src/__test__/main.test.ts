import { main } from '../main';

jest.useFakeTimers();

describe('test main', () => {
  document.body.innerHTML = `
  <textarea id="src"></textarea>
  <div id="question"></div>
  `;

  function _change(value: string) {
    const srcDom = document.getElementById('src')! as HTMLTextAreaElement;
    srcDom.value = value;
    const evt = document.createEvent('HTMLEvents');
    evt.initEvent('change', false, true);
    srcDom.dispatchEvent(evt);
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
});
