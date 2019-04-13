

import {Funcdef} from './funcdef';
import {Tokenizer} from './tokenizer';

export type Rule = [string | RegExp, (nextInput: string) => null | Rule[]];

export class Interpreter {
  src: string;
  cursor = 0;
  rules: Rule[];
  curName = '';
  precedenceTokens: string[] = [];
  callStack: Rule[][];
  funcdefs: Funcdef[] = [];
  currFuncdef: null|Funcdef = null;

  constructor(src: string) {
    this.src = src;

    const readNameRule: Rule = [
      /^.$/,
      nextInput => {
        this.curName += nextInput;
        return [];
      },
    ];

    const tokenizer = new Tokenizer(this);

    const funcdefAction: () => Rule[] = () => {
      const funcdef = new Funcdef();
      this.currFuncdef = funcdef;
      return [
        [
          '(',
          () => {
            funcdef.name = this.curName;
            this.curName = '';
            return [
              [
                ')',
                () => {
                  funcdef.parameters = [this.curName];
                  this.curName = '';
                  return [
                    [
                      ':',
                      () => {
                        return null;
                      }
                    ],
                  ];
                }
              ],
              tokenizer.readSpacesRule,
              readNameRule,
            ];
          }
        ],
        ['spaces', () => []], tokenizer.readSpacesRule, readNameRule
      ];
    };

    this.rules = [
      ['def', funcdefAction],
      [
        'spaces',
        () => {
          if (this.curName) {
            this.precedenceTokens.unshift(this.curName);
            this.curName = '';
          }
          return [];
        }
      ],
      tokenizer.readSpacesRule,
      readNameRule,
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
      curName: this.curName
    });
  }
}
