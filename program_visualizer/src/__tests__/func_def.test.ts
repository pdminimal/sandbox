import { Interpreter } from '../interpreter';

describe('test funcdef', () => {
  it('should read funcname', () => {
    const interpreter = new Interpreter('def bin(');
    while (interpreter.src[interpreter.cursor] !== '(') {
      interpreter.step();
    }
    interpreter.step();
    expect(interpreter.curFuncDef!.name).toBe('bin');
  });

  it('should throw if funcname is empty', () => {
    const interpreter = new Interpreter('def (');
    expect(() => {
      while (interpreter.lastToken !== 'EOS') {
        interpreter.step();
      }
    }).toThrow(/name/);
  });

  it('should read many spaces between def and funcname', () => {
    const interpreter = new Interpreter('def  bin(');
    while (interpreter.src[interpreter.cursor] !== '(') {
      interpreter.step();
    }
    interpreter.step();
    expect(interpreter.curFuncDef!.name).toBe('bin');
  });

  it('should read parameters', () => {
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

  it('should read body', () => {
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

  it('should end first definition and read next definition', () => {
    const interpreter = new Interpreter('def bin(a):\n  1\ndef f2(b):\n1');
    while (interpreter.lastToken !== 'EOS') {
      interpreter.step();
    }
    expect(interpreter.curFuncDef!.body).toBe('1');
  });

  // it('should end first definition when empty new line', () => {
  //   const interpreter = new Interpreter('def bin(a):\n  1\n\n');
  //   while (interpreter.lastToken !== 'EOS') {
  //     interpreter.step();
  //   }
  //   expect(interpreter.curFuncDef!.body).toBe('1\n');
  //   console.log(interpreter.callStack);

  // });
});
