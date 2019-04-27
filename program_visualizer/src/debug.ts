import {Interpreter} from './interpreter';

const srcDom = document.getElementById('src')! as HTMLTextAreaElement;
let interpreter = new Interpreter(srcDom.value || '');
srcDom.addEventListener('change', () => {
  interpreter = new Interpreter(srcDom.value || '');
  showState();
})
const nextDom = document.getElementById('next')!;
nextDom.addEventListener('click', () => {
  interpreter.step();
  showState();
});

function showState() {
  document.getElementById('last-token')!.textContent = interpreter.lastToken || '';
  document.getElementById('precedence-tokens')!.textContent = JSON.stringify(interpreter.precedenceTokens);
  document.getElementById('indentations')!.textContent = interpreter.indentations.join(', ');
  document.getElementById('symbol')!.textContent = interpreter.lexer.symbol;
  const charAtCursor = interpreter.src[interpreter.cursor] || 'EOS'
  document.getElementById('cursor')!.textContent = interpreter.src.slice(0, interpreter.cursor) + '[' + charAtCursor + ']' + interpreter.src.slice(interpreter.cursor + 1) 

  document.getElementById('callstack-path')!.textContent = JSON.stringify(interpreter.callStackPath);
}