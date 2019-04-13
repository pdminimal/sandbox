
type Rule = [string | RegExp, (nextInput: string) => null | Rule[]];

class Funcdef {
  name = '';
  parameters: string[] = [];
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
  currFuncdef: null|Funcdef = null;

  constructor(src: string) {
    this.src = src;

    const readTokenRule: Rule = [
      /^.$/,
      nextInput => {
        this.curName += nextInput;
        return [];
      },
    ];

    const readSpacesRule: Rule = [
      /^\s$/,
      () => [
          [
            /^[^\s]$/,
            nextInput => {
              this.precedenceTokens.unshift(nextInput);
              this.precedenceTokens.unshift('spaces');
              return null;
            }
          ],
          [/^\s$/, () => []],
    ]
    ];

    const funcdefRule: () => Rule = () => {
      const funcdef = new Funcdef();
      this.currFuncdef = funcdef;
      return [
        'def',
        () => {
          return [
            [
              '(',
              () => {
                funcdef.name = this.curName;
                this.curName = '';
                return [];
              }
            ],
            readTokenRule
          ];
        }
      ];
    };

    this.rules = [
      readSpacesRule,
      [
        'spaces',
        () => {
          this.precedenceTokens.unshift(this.curName);
          this.curName = '';
          return [funcdefRule()];
        }
      ],
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
      const match = typeof rule[0] === 'string' ? rule[0] === nextToken :
                                                  rule[0].test(nextToken);
      if (match) {
        const childRules = rule[1](nextToken);
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
