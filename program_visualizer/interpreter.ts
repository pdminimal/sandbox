
class Rule {
  pattern: string|RegExp;
  action: (nextInput: string) => null | Rule[];

  constructor(
      pattern: string|RegExp, action: (nextInput: string) => null | Rule[]) {
    this.pattern = pattern;
    this.action = action;
  }
}

class Funcdef {
  name = '';
  args: string[] = [];
  body = '';
  constructor() {}
}

export class Interpreter {
  src: string;
  cursor = 0;
  rules: Rule[];
  curName = '';
  precedenceTokens: string[] = [];
  callStack: Rule[][];
  funcdefs: Funcdef[] = [];

  constructor(src: string) {
    this.src = src;

    const readTokenRule = new Rule(
        /^.$/,
        nextInput => {
          this.curName += nextInput;
          return [];
        },
    );

    const readSpacesRule = new Rule(
        /^\s$/,
        () =>
            [new Rule(
                 /^[^\s]$/,
                 nextInput => {
                   this.precedenceTokens.unshift(nextInput);
                   this.precedenceTokens.unshift('spaces');
                   return null;
                 }),
             new Rule(/^\s$/, () => []),
    ]);

    const funcdefRule = () => {
      const funcdef = new Funcdef();
      return new Rule('def', () => {
        return [
          new Rule(
              '(',
              () => {
                funcdef.name = this.curName;
                this.curName = '';
                return [];
              }),
          readTokenRule
        ];
      });
    };

    this.rules = [
      readSpacesRule,
      new Rule(
          'spaces',
          () => {
            this.precedenceTokens.unshift(this.curName);
            this.curName = '';
            return [funcdefRule()];
          }),
      readTokenRule,
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
    for (const rule of this.callStack[this.callStack.length - 1]) {
      const match = typeof rule.pattern === 'string' ?
          rule.pattern === nextToken :
          rule.pattern.test(nextToken);
      if (match) {
        const childRules = rule.action(nextToken);
        if (childRules === null) {
          this.callStack.pop();
        } else if (childRules.length) {
          this.callStack.push(childRules);
        }
        break;
      }
    }
  }

  toString() {
    return JSON.stringify({
      cursor: this.cursor,
      precedenceTokens: this.precedenceTokens,
    });
  }
}
