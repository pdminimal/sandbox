import {Interpreter} from '../src/interpreter';

describe('test funcdef', () => {
  test('funcname', () => {
    const interpreter = new Interpreter('def bin(');
    while (interpreter.src[interpreter.cursor] !== '(') {
      interpreter.step();
    }
    interpreter.step();
    expect(interpreter.curFuncDef!.name).toBe('bin');
  });

  test('empty funcname', () => {
    const interpreter = new Interpreter('def (');
    expect(() => {
      while (interpreter.lastToken !== 'EOS') {
        interpreter.step();
      }
    }).toThrow(/name/);
  });

  test('read many spaces between def and funcname', () => {
    const interpreter = new Interpreter('def  bin(');
    while (interpreter.src[interpreter.cursor] !== '(') {
      interpreter.step();
    }
    interpreter.step();
    expect(interpreter.curFuncDef!.name).toBe('bin');
  });

  test('parameters', () => {
    const readUntilEnd = (src: string) => {
      const interpreter = new Interpreter(src);
      while (interpreter.src[interpreter.cursor] !== ':') {
        interpreter.step();
      }
      interpreter.step();
      return interpreter;
    };
    let interpreter = readUntilEnd('def bin(a):');
    expect(interpreter.curFuncDef!.parameters).toEqual(['a']);

    interpreter = readUntilEnd('def bin( b):');
    expect(interpreter.curFuncDef!.parameters).toEqual(['b']);

    interpreter = readUntilEnd('def bin(ab, bcd ):');
    interpreter.step();
    expect(interpreter.curFuncDef!.parameters).toEqual(['ab', 'bcd']);
  });

  test('body', () => {
    let interpreter = new Interpreter('def bin(a):\n  1');
    while (interpreter.lastToken !== 'EOS') {
      interpreter.step();
    }
    expect(interpreter.curFuncDef!.body).toBe('1');

    interpreter = new Interpreter('def bin(a):\n  2\n  3\n');
    while (interpreter.lastToken !== 'EOS') {
      interpreter.step();
    }
    expect(interpreter.curFuncDef!.body).toBe('2\n3\n');
  });

  test('end first definition and go to next definition', () => {
    let interpreter = new Interpreter('def bin(a):\n  1\ndef f2(b):');
    while (interpreter.lastToken !== 'EOS') {
      interpreter.step();
    }
    expect(interpreter.curFuncDef!.body).toBe('1');

    interpreter = new Interpreter('def bin(a):\n  2\n  3\n');
    while (interpreter.lastToken !== 'EOS') {
      interpreter.step();
    }
    expect(interpreter.curFuncDef!.body).toBe('2\n3\n');
  });

});
