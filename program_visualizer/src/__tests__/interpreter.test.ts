import { Interpreter } from '../interpreter';

it('should initialize interpreter', () => {
  const interpreter = new Interpreter('test');
  expect(interpreter.src).toBe('test');
});

it('should throw on unexpedted end', () => {
  const interpreter = new Interpreter('def a():');

  expect(() => {
    while (interpreter.lastToken !== 'EOS') {
      interpreter.step();
    }
  }).toThrow(/end/);
});

it('should throw on unexpected indentations', () => {
  const interpreter = new Interpreter(' 1');
  interpreter.step();
  interpreter.step();
  expect(() => interpreter.step()).toThrow(/indent/);
});

it('should throw on inconsistent indentations', () => {
  const interpreter = new Interpreter('def f(a):\n  1\n 2');
  expect(() => {
    while (interpreter.lastToken !== 'EOS') {
      interpreter.step();
    }
  }).toThrow(/level/);
});

it('should throw on unexpedted tokens', () => {
  const interpreter = new Interpreter('def f():2');
  expect(() => {
    while (interpreter.lastToken !== 'EOS') {
      interpreter.step();
    }
  }).toThrow(/Unexpected token/);
});
