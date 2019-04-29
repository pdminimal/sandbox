import { Quiz } from './quiz';

export function main() {
  const INTERVAL = 2000;
  const srcDom = document.getElementById('src')! as HTMLTextAreaElement;
  const qDom = document.getElementById('question')!;
  let timer: number;
  let quiz: Quiz;
  function step(key = '') {
    let span = quiz.getSegmentDom();
    span.style.color = '#456';
    if (key && quiz.judge(key)) {
      span.style.backgroundColor = 'transparent';
    } else {
      span.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
    }
    quiz.next();
    span = quiz.getSegmentDom();
    if (span) {
      span.style.color = 'transparent';
      span.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
      timer = setTimeout(step, INTERVAL);
    } else {
      timer = 0;
    }
  }
  document.body.addEventListener('keydown', e => {
    if (timer) {
      clearTimeout(timer);
      timer = 0;
      step(e.key);
    }
  });
  srcDom.addEventListener('change', () => {
    quiz = new Quiz(srcDom.value);
    while (qDom.firstChild) {
      qDom.firstChild.remove();
    }
    for (const span of quiz.doms) {
      if (span.firstChild && span.firstChild instanceof HTMLSpanElement) {
        span.style.color = 'transparent';
      }
      qDom.appendChild(span);
    }
    quiz.getSegmentDom().style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
    timer = setTimeout(step, INTERVAL);
  });
}

declare global {
  interface Window {
    main: () => void;
  }
}
window.main = main;
