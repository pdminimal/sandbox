

import {AtomExpr} from './atom_expr';
import {FuncDef} from './func_def';
import {Lex} from './lexer';

export type Rule = [string | RegExp, (nextInput: string) => Rule[] | null];

export class Interpreter {
  src: string;
  cursor = 0;
  rules: Rule[];
  precedenceTokens: string[] = [];
  callStack: Rule[][];
  callStackPath: string[];
  funcDefs: FuncDef[] = [];
  curFuncDef: FuncDef|null = null;
  lastToken: string|undefined;
  lexer: Lex;
  indentations: string[] = [];

  constructor(src: string) {
    this.src = src;

    const lexer = new Lex(this);
    this.lexer = lexer;

    this.rules = new AtomExpr(this).readAtomRule();
    this.callStack = [this.rules];
    this.callStackPath = [];
  }

  private popNextToken() {
    if (this.precedenceTokens.length) {
      return this.precedenceTokens.pop()!;
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
      this.indentations.push(this.lexer.spaces);
    } else {
      let curLength = this.getCurrentIndent().length;
      const nextLength = this.lexer.spaces.length;
      if (curLength < nextLength) {
        this.indentations.push(this.lexer.spaces);
      }
      while (curLength > nextLength) {
        this.indentations.pop();
        curLength = this.getCurrentIndent().length;
        this.precedenceTokens.push('unindent');
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
          this.callStackPath.pop();
        } else if (childRules.length) {
          this.callStack.push(childRules);
          this.callStackPath.push(nextToken);
        }
        matched = true;
        break;
      }
    }
    if (!matched) {
      this.throwError(`Unexpected token: ${nextToken}`);
    }
    this.lastToken = nextToken;
  }

  throwError(errorText: string) {
    console.log(this.callStack);
    console.log(this.callStackPath);
    throw new Error(errorText);
  }

  toString() {
    return JSON.stringify({
      cursor: this.cursor,
      precedenceTokens: this.precedenceTokens,
    });
  }
}
