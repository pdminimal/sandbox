import {Interpreter, Rule} from './interpreter';

export class Lex {
  interpreter: Interpreter;
  name = '';
  spaces = '';

  constructor(interpreter: Interpreter) {
    this.interpreter = interpreter;
  }

  pushName() {
    this.interpreter.precedenceTokens.unshift(this.name);
    this.name = '';
  }

  popName() {
    const ret = this.name;
    this.name = '';
    return ret;
  }

  readNameRule: Rule = [
    /^.$/,
    nextInput => {
      this.name += nextInput;
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