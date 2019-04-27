import {Interpreter, Rule} from './interpreter';

export class FuncDef {
  name = '';
  parameters: string[] = [];
  body = '';
  interpreter: Interpreter;

  constructor(interpreter: Interpreter) {
    this.interpreter = interpreter;
  }

  readDefinition(): Rule[] {
    const lexer = this.interpreter.lexer;
    const gotoParent = (token: string) => {
      this.interpreter.precedenceTokens.push(token);
      return null;
    };

    const readBody: Rule[] = [
      [
        'EOS',
        () => {
          if (!this.body.trim().length) {
            throw new Error('Unexpected end.');
          }

          this.interpreter.precedenceTokens.push('EOS');
          this.interpreter.precedenceTokens.push('endDef');
          return null;
        }
      ],
      [
        '\n',
        () => {
          return [
            [/\n|EOS/, gotoParent],
            [
              'spaces',
              () => {
                this.interpreter.pushIndent();
                return [
                  [
                    /\n|EOS/,
                    token => {
                      if (token === '\n') {
                        this.body += '\n';
                      }
                      return gotoParent(token);
                    }
                  ],
                  [
                    /^[^\n]$/,
                    token => {
                      this.body += token;
                      return [];
                    }
                  ],

                ];
              }
            ],
            lexer.readSpacesRule,
          ];
        }
      ],
      [
        /^[^\s]$/,
        () => {
          this.interpreter.precedenceTokens.push('EOS');
          this.interpreter.precedenceTokens.push('endDef');
          return [];
        }
      ],
      ['spaces', () => []],
      lexer.readSpacesRule,
    ];

    return [
      ['endDef', () => null],
      [
        '(',
        () => {
          this.name = lexer.popSymbol();
          if (!this.name) {
            throw new Error('Empty function name.');
          }
          return [
            ['endDef', gotoParent],
            [
              /[,)]/,
              token => {
                if (!this.parameters) {
                  this.parameters = [lexer.popSymbol()];
                } else {
                  this.parameters.push(lexer.popSymbol());
                }
                if (token === ')') {
                  return [
                    ['endDef', gotoParent],
                    [
                      ':',
                      () => {
                        return readBody;
                      }
                    ],
                    ['spaces', () => []],
                    lexer.readSpacesRule,
                  ];
                } else {
                  return [];
                }
              }
            ],
            ['spaces', () => []],
            lexer.readSpacesRule,
            lexer.readNameRule,
          ];
        }
      ],
      ['spaces', () => []], lexer.readSpacesRule, lexer.readNameRule
    ];
  }
}