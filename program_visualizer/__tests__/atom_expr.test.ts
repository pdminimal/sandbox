import {Interpreter} from '../src/interpreter';


describe('test atom', () => {
  test('func call', () => {
    const interpreter = new Interpreter('test()');
    expect(() => {
      while (interpreter.lastToken !== 'EOS') {
        interpreter.step();
      }
    }).toThrow(/'test' is not defined/);
  });
});
