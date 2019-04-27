import {Interpreter} from '../src/interpreter';

test('initialize interpreter', () => {
  const interpreter = new Interpreter('test');
  expect(interpreter.src).toBe('test');
});

test('unexpedted end', () => {
  const interpreter = new Interpreter('def a():');

  expect(() => {
    while (interpreter.lastToken !== 'EOS') {
      interpreter.step();
    }
  }).toThrow(/end/);
});

test('unexpedted indent', () => {
  const interpreter = new Interpreter(' 1');
  interpreter.step();
  interpreter.step();
  expect(() => interpreter.step()).toThrow(/indent/);
});

test('uindent error', () => {
  const interpreter = new Interpreter('def f(a):\n  1\n 2');
  expect(() => {
    while (interpreter.lastToken !== 'EOS') {
      interpreter.step();
    }
  }).toThrow(/level/);
});

test('unexpedted token', () => {
  const interpreter = new Interpreter('def f():2');
  expect(() => {
    while (interpreter.lastToken !== 'EOS') {
      interpreter.step();
    }
  }).toThrow(/Unexpected token/);
});
