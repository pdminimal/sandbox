import { Quiz } from './quiz';

export function main() {
  const INTERVAL = 2000;
  const srcDom = document.getElementById('src')! as HTMLTextAreaElement;
  const qDom = document.getElementById('question')!;
  const scoreGoodDom = document.querySelector('#score .good')!;
  const scoreTotalDom = document.querySelector('#score .total')!;
  const scorePercentageDom = document.querySelector('#score .percentage')!;
  const statusDom = document.getElementById('status')!;
  const cheatDom = document.getElementById('cheat')! as HTMLInputElement;

  let good = 0;
  let total = 0;
  let timer: number;
  let quiz: Quiz;
  function step(key = '') {
    statusDom.textContent = 'Playing...';
    let span = quiz.getSegmentDom();
    span.classList.remove('cursor');
    span.classList.remove('waiting');
    total += 1;
    if (!key || !quiz.judge(key)) {
      span.classList.add('wrong');
    } else if (key) {
      good += 1;
    }
    scoreGoodDom.textContent = `${good}`;
    scoreTotalDom.textContent = `${total}`;
    scorePercentageDom.textContent = `${Math.floor((good / total) * 100)}`;
    quiz.next();
    span = quiz.getSegmentDom();
    if (span) {
      span.classList.add('cursor');
      timer = setTimeout(step, INTERVAL);
    } else {
      pause();
    }
  }

  function pause() {
    clearTimeout(timer);
    timer = 0;
    statusDom.textContent = 'Pausing';
  }

  cheatDom.addEventListener('change', () => {
    console.log('change event');
    [].forEach.call(
      document.querySelectorAll('.waiting'),
      (e: HTMLSpanElement) => {
        if (cheatDom.checked) {
          e.classList.add('cheat');
        } else {
          e.classList.remove('cheat');
        }
      }
    );
  });
  document.body.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      if (timer) {
        pause();
      } else {
        step();
      }
    } else if (timer && quiz.judge(e.key)) {
      clearTimeout(timer);
      timer = 0;
      step(e.key);
    }
  });
  srcDom.addEventListener('change', () => {
    quiz = new Quiz(srcDom.value);
    good = 0;
    total = 0;
    while (qDom.firstChild) {
      qDom.firstChild.remove();
    }
    for (const span of quiz.doms) {
      qDom.appendChild(span);
    }
    for (const span of quiz.segmentDoms) {
      span.classList.add('waiting');
      if (cheatDom.checked) {
        span.classList.add('cheat');
      }
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
