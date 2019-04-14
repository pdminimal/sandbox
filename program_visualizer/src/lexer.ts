import {Interpreter, Rule} from './interpreter';

export class Lex {
  interpreter: Interpreter;
  symbol = '';
  spaces = '';

  constructor(interpreter: Interpreter) {
    this.interpreter = interpreter;
  }

  pushSymbol() {
    this.interpreter.precedenceTokens.unshift(this.symbol);
    this.symbol = '';
  }

  popSymbol() {
    const ret = this.symbol;
    this.symbol = '';
    return ret;
  }

  readNameRule: Rule = [
    /^.$/,
    nextInput => {
      this.symbol += nextInput;
      return [];
    },
  ];


  readSpacesRule: Rule = [
    /^\s$/,
    nextToken => {
      this.spaces = nextToken;
      return [
        [
          /^[^\s]$/,
          nextInput => {
            this.interpreter.precedenceTokens.unshift(nextInput);
            this.interpreter.precedenceTokens.unshift('spaces');
            return null;
          }
        ],
        [
          /^\s$/,
          nextToken => {
            this.spaces += nextToken;
            return [];
          }
        ],
      ];
    }
  ];
}