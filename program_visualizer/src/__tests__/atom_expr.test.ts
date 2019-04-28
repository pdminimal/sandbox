import { Interpreter } from '../interpreter';

describe('test atom', () => {
  it('should throw when attempting to call undefined function', () => {
    const interpreter = new Interpreter('test()');
    expect(() => {
      while (interpreter.lastToken !== 'EOS') {
        interpreter.step();
      }
    }).toThrow(/'test' is not defined/);
  });
});
