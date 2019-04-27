import { Interpreter, Rule } from './interpreter';

export class FuncDef {
  name = '';
  parameters: string[] = [];
  body = '';
  interpreter: Interpreter;
  indentationLength: number;

  constructor(interpreter: Interpreter, indentationLength: number) {
    this.interpreter = interpreter;
    this.indentationLength = indentationLength;
  }

  readDefinition(): Rule[] {
    const lexer = this.interpreter.lexer;
    const gotoParent = (token: string) => {
      this.interpreter.precedenceTokens.push(token);
      return null;
    };

    const readBody: Rule[] = [
      ['endDef', gotoParent],
      [
        'EOS',
        () => {
          if (!this.body.trim().length) {
            throw new Error('Unexpected end.');
          }

          this.interpreter.precedenceTokens.push('EOS');
          this.interpreter.precedenceTokens.push('endDef');
          return null;
        },
      ],
      [
        '\n',
        () => {
          return [
            [/EOS|endDef/, gotoParent],
            [
              'spaces',
              () => {
                this.interpreter.pushIndent();
                return [
                  [
                    'unindent',
                    token => {
                      if (lexer.spaces.length <= this.indentationLength) {
                        this.interpreter.precedenceTokens.push('endDef');
                      }
                      return null;
                    },
                  ],
                  [
                    /\n|EOS/,
                    token => {
                      if (token === '\n') {
                        this.body += '\n';
                        return null;
                      }
                      return gotoParent(token);
                    },
                  ],
                  [
                    /^[^\n]$/,
                    token => {
                      this.body += token;
                      return [];
                    },
                  ],
                ];
              },
            ],
            lexer.readSpacesRule,
            [
              /^.$/,
              nextInput => {
                lexer.spaces = '';
                lexer.symbol = '';
                this.interpreter.precedenceTokens.push(nextInput);
                this.interpreter.precedenceTokens.push('spaces');
                return [];
              },
            ],
          ];
        },
      ],
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
                      },
                    ],
                    ['spaces', () => []],
                    lexer.readSpacesRule,
                  ];
                } else {
                  return [];
                }
              },
            ],
            ['spaces', () => []],
            lexer.readSpacesRule,
            lexer.readNameRule,
          ];
        },
      ],
      ['spaces', () => []],
      lexer.readSpacesRule,
      lexer.readNameRule,
    ];
  }
}
