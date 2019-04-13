import {Interpreter} from '../src/interpreter';

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
    while (interpreter.src[interpreter.cursor] !== '(') {
      interpreter.step();
    }
    interpreter.step();
    expect(interpreter.currFuncdef!.name).toBe('bin');
  });

  test('read many spaces between def and funcname', () => {
    const source = 'def  bin(';
    const interpreter = new Interpreter(source);
    while (interpreter.src[interpreter.cursor] !== '(') {
      interpreter.step();
    }
    interpreter.step();
    expect(interpreter.currFuncdef!.name).toBe('bin');
  });

  test('parameters', () => {
    const readUntilEndDef = (src: string) => {
      const interpreter = new Interpreter(src);
      while (interpreter.src[interpreter.cursor] !== ':') {
        interpreter.step();
      }
      interpreter.step();
      return interpreter;
    };
    const interpreter = readUntilEndDef('def bin(a):');
    expect(interpreter.currFuncdef!.parameters).toEqual(['a']);

    // interpreter = readUntilEndDef('def bin( b):');
    // expect(interpreter.currFuncdef!.parameters).toEqual(['b']);

    // interpreter = readUntilEndDef('def bin(a, b):');
    // expect(interpreter.currFuncdef!.parameters).toEqual(['a', 'b']);
  });
});
