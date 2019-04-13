import {Interpreter, Rule} from './interpreter';

export class Tokenizer {
  interpreter: Interpreter;

  constructor(interpreter: Interpreter) {
    this.interpreter = interpreter;
  }

  readSpacesRule: Rule = [
      /^\s$/,
      () => [
          [
            /^[^\s]$/,
            nextInput => {
              this.interpreter.precedenceTokens.unshift(nextInput);
              this.interpreter.precedenceTokens.unshift('spaces');
              return null;
            }
          ],
          [/^\s$/, () => []],
    ]
    ];
}