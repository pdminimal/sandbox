import {Interpreter} from '../interpreter';

test('initialize interpreter', () => {
  const interpreter = new Interpreter('test');
  expect(interpreter.src).toBe('test');
});

test('def: funcname', () => {
  const source = 'def bin(';
  const interpreter = new Interpreter(source);
  expect(interpreter.src).toBe(source);
  for (let index = 0; index < 4; index++) {
    interpreter.step();
  }
  expect(interpreter.cursor).toBe(4);
  interpreter.step();
  interpreter.step();
  expect(interpreter.precedenceTokens).toEqual(['def', 'b']);

  interpreter.step();
  for (let index = 4; index < 8; index++) {
    interpreter.step();
  }
  expect(interpreter.cursor).toBe(8);
  expect(interpreter.precedenceTokens).toEqual([]);
  expect(interpreter.funcdefs.length).toEqual(1);
  expect(interpreter.funcdefs[0].name).toEqual('bin');
});

test('def:read many spaces between def and funcname', () => {
  const source = 'def  bin(';
  const interpreter = new Interpreter(source);
  expect(interpreter.src).toBe(source);
  for (let index = 0; index < 6; index++) {
    interpreter.step();
  }
  expect(interpreter.cursor).toBe(6);
  expect(interpreter.precedenceTokens).toEqual(['spaces', 'b']);
  interpreter.step();
  expect(interpreter.precedenceTokens).toEqual(['def', 'b']);

  interpreter.step();
  for (let index = 5; index < 9; index++) {
    interpreter.step();
  }
  expect(interpreter.cursor).toBe(9);
  expect(interpreter.precedenceTokens).toEqual([]);
  expect(interpreter.funcdefs.length).toEqual(1);
  expect(interpreter.funcdefs[0].name).toEqual('bin');
});

test('unexpedted end', () => {
  const interpreter = new Interpreter('a');
  interpreter.step();

  expect(() => interpreter.step()).toThrow(/end/);
});