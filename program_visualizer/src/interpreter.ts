

import {Funcdef} from './funcdef';
import {Tokenizer} from './tokenizer';

export type Rule = [string | RegExp, (nextInput: string) => null | Rule[]];

export class Interpreter {
  src: string;
  cursor = 0;
  rules: Rule[];
  precedenceTokens: string[] = [];
  callStack: Rule[][];
  funcdefs: Funcdef[] = [];
  currFuncdef: null|Funcdef = null;

  constructor(src: string) {
    this.src = src;

    const tokenizer = new Tokenizer(this);

    this.rules = [
      [
        'def',
        () => {
          const funcdef = new Funcdef(tokenizer);
          this.currFuncdef = funcdef;
          return funcdef.action();
        }
      ],
      [
        'spaces',
        () => {
          if (tokenizer.curName) {
            tokenizer.pushName();
          }
          return [];
        }
      ],
      tokenizer.readSpacesRule,
      tokenizer.readNameRule,
    ];
    this.callStack = [this.rules];
  }

  private popNextToken() {
    if (this.precedenceTokens.length) {
      return this.precedenceTokens.shift()!;
    }
    if (this.cursor >= this.src.length) {
      throw Error('Unexpected end.');
    }
    return this.src[this.cursor++];
  }

  step() {
    const nextToken = this.popNextToken();
    let matched = false;
    for (const rule of this.callStack[this.callStack.length - 1]) {
      const match = typeof rule[0] === 'string' ? rule[0] === nextToken :
                                                  rule[0].test(nextToken);
      if (match) {
        const childRules = rule[1](nextToken);
        if (childRules === null) {
          this.callStack.pop();
        } else if (childRules.length) {
          this.callStack.push(childRules);
        }
        matched = true;
        break;
      }
    }
    if (!matched) {
      throw Error(`Unexpected token: ${nextToken}`);
    }
  }

  toString() {
    return JSON.stringify({
      cursor: this.cursor,
      precedenceTokens: this.precedenceTokens,
    });
  }
}
