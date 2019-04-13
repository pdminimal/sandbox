import {Interpreter} from '../interpreter';

test('initialize interpreter', () => {
  const interpreter = new Interpreter('test');
  expect(interpreter.src).toBe('test');
});

test('unexpedted end', () => {
  const interpreter = new Interpreter('a');
  interpreter.step();
  expect(() => interpreter.step()).toThrow(/end/);
});

describe('test funcdef', () => {
  test('funcname', () => {
    const source = 'def bin(';
    const interpreter = new Interpreter(source);
    expect(interpreter.src).toBe(source);
    for (let cursor = 0; cursor < 4; cursor++) {
      interpreter.step();
    }
    expect(interpreter.cursor).toBe(4);
    interpreter.step();
    interpreter.step();
    expect(interpreter.precedenceTokens).toEqual(['def', 'b']);

    interpreter.step();
    for (let cursor = 4; cursor < 8; cursor++) {
      interpreter.step();
    }
    expect(interpreter.cursor).toBe(8);
    expect(interpreter.precedenceTokens).toEqual([]);
  });

  test('read many spaces between def and funcname', () => {
    const source = 'def  bin(';
    const interpreter = new Interpreter(source);
    expect(interpreter.src).toBe(source);
    for (let cursor = 0; cursor < 6; cursor++) {
      interpreter.step();
    }
    expect(interpreter.cursor).toBe(6);
    expect(interpreter.precedenceTokens).toEqual(['spaces', 'b']);
    interpreter.step();
    expect(interpreter.precedenceTokens).toEqual(['def', 'b']);

    interpreter.step();
    for (let cursor = 5; cursor < 9; cursor++) {
      interpreter.step();
    }
    expect(interpreter.cursor).toBe(9);
    expect(interpreter.precedenceTokens).toEqual([]);
  });

  // test('parameters', () => {
  //   const source = 'def bin(a, b):';
  //   const interpreter = new Interpreter(source);
  //   while (interpreter.src[interpreter.cursor] !== ':') {
  //     interpreter.step();
  //   }
  //   interpreter.step();
  //   expect(interpreter.currFuncdef!.parameters.length).toBe(2);
  // });
});
