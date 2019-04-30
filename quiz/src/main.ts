import { Quiz } from './quiz';

export function main() {
  const INTERVAL = 3000;
  const srcDom = document.getElementById('src')! as HTMLTextAreaElement;
  const qDom = document.getElementById('question')!;
  let timer: number;
  let quiz: Quiz;
  function step(key = '') {
    let span = quiz.getSegmentDom();
    span.classList.remove('cursor');
    span.classList.remove('waiting');
    if (!key || !quiz.judge(key)) {
      span.classList.add('wrong');
    }
    quiz.next();
    span = quiz.getSegmentDom();
    if (span) {
      span.classList.add('cursor');
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
      qDom.appendChild(span);
    }
    for (const span of quiz.segmentDoms) {
      span.classList.add('waiting');
    }

    quiz.getSegmentDom().classList.add('cursor');
    timer = setTimeout(step, INTERVAL);
  });
}

declare global {
  interface Window {
    main: () => void;
  }
}
window.main = main;
