

import {Funcdef} from './funcdef';
import {Lex} from './lex';

export type Rule = [string | RegExp, (nextInput: string) => Rule[] | null];

export class Interpreter {
  src: string;
  cursor = 0;
  rules: Rule[];
  precedenceTokens: string[] = [];
  callStack: Rule[][];
  funcdefs: Funcdef[] = [];
  currFuncdef: Funcdef|null = null;
  lastToken: string|undefined;
  tokenizer: Lex;
  indentations: string[] = [];

  constructor(src: string) {
    this.src = src;

    const tokenizer = new Lex(this);
    this.tokenizer = tokenizer;

    this.rules = [
      [
        'def',
        () => {
          const funcdef = new Funcdef(this);
          this.currFuncdef = funcdef;
          return funcdef.readDefinition();
        }
      ],
      [
        'EOS',
        () => null
      ],
      [
        'spaces',
        () => {
          if (tokenizer.name) {
            tokenizer.pushName();
          } else {
            throw new Error('Unexpected indent.');
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
      return 'EOS';
    }
    return this.src[this.cursor++];
  }

  getCurrentIndent() {
    if (!this.indentations.length) {
      return '';
    }
    return this.indentations[this.indentations.length - 1];
  }

  pushIndent() {
    if (!this.indentations.length) {
      this.indentations.push(this.tokenizer.spaces);
    } else {
      let curLength = this.getCurrentIndent().length;
      const nextLength = this.tokenizer.spaces.length;
      if (curLength < nextLength) {
        this.indentations.push(this.tokenizer.spaces);
      }
      while (curLength > nextLength) {
        this.indentations.pop();
        curLength = this.getCurrentIndent().length;
      }
      if (curLength < nextLength) {
        throw new Error('Unindent does not match any outer indentation level.');
      }
    }
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
      throw new Error(`Unexpected token: ${nextToken}`);
    }
    this.lastToken = nextToken;
  }

  toString() {
    return JSON.stringify({
      cursor: this.cursor,
      precedenceTokens: this.precedenceTokens,
    });
  }
}
