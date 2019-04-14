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
  const interpreter = new Interpreter(' a');
  interpreter.step();
  interpreter.step();
  expect(() => interpreter.step()).toThrow(/indent/);
});
