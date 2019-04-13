import {Interpreter, Rule} from './interpreter';

export class Tokenizer {
  interpreter: Interpreter;
  curName = '';

  constructor(interpreter: Interpreter) {
    this.interpreter = interpreter;
  }

  pushName() {
    this.interpreter.precedenceTokens.unshift(this.curName);
    this.curName = '';
  }

  popName() {
    const ret = this.curName;
    this.curName = '';
    return ret;
  }

  readNameRule: Rule = [
    /^.$/,
    nextInput => {
      this.curName += nextInput;
      return [];
    },
  ];


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