
class Rule {
  pattern: RegExp;
  action: ((nextInput: string) => void)|null;
  childRules: null|Rule[];

  constructor(
      pattern: RegExp, action: ((nextInput: string) => void)|null = null,
      childRules: null|Rule[] = null) {
    this.pattern = pattern;
    this.action = action;
    this.childRules = childRules;
  }
}
class FuncDef {
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
  funcDefs: FuncDef[] = [];

  constructor(src: string) {
    this.src = src;

    const readTokenRule = new Rule(
        /^.$/,
        nextInput => {
          this.curName += nextInput;
        },
        [],
    );

    const readSpacesRule = new Rule(/^\s$/, () => {}, [
      new Rule(
          /^[^\s]$/,
          nextInput => {
            this.precedenceTokens.unshift(nextInput);
            this.precedenceTokens.unshift('spaces');
          }),
      new Rule(/^\s$/, () => {}, []),
    ]);

    const defRule = () =>
        new Rule(/^def$/, () => this.funcDefs.unshift(new FuncDef()), [
          new Rule(
              /^\($/,
              () => {
                this.funcDefs[0].name = this.curName;
                this.curName = '';
              },
              []),
          readTokenRule
        ]);

    this.rules = [
      readSpacesRule,
      new Rule(
          /^spaces$/,
          () => {
            this.precedenceTokens.unshift(this.curName);
            this.curName = '';
          },
          [defRule()]),
      readTokenRule,
    ];
    this.callStack = [this.rules];
  }

  popNextToken() {
    if (this.precedenceTokens.length) {
      return this.precedenceTokens.shift()!;
    }
    if (this.cursor > this.src.length) {
      throw Error('Unexpected End');
    }
    return this.src[this.cursor++];
  }


  step() {
    const nextToken = this.popNextToken();
    for (const rule of this.callStack[this.callStack.length - 1]) {
      if (rule.pattern.test(nextToken)) {
        if (rule.action !== null) {
          rule.action(nextToken);
        }
        if (rule.childRules === null) {
          this.callStack.pop();
        } else if (rule.childRules.length) {
          this.callStack.push(rule.childRules);
        }
        break;
      }
    }
  }
}
