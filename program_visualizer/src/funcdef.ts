import {Interpreter, Rule} from './interpreter';

export class Funcdef {
  name = '';
  parameters: string[] = [];
  body = '';
  interpreter: Interpreter;

  constructor(interpreter: Interpreter) {
    this.interpreter = interpreter;
  }

  action(): Rule[] {
    const tokenizer = this.interpreter.tokenizer;
    const gotoParent = (token:string) => {
      this.interpreter.precedenceTokens.unshift(token);
      return null;
    };

    const readBody: Rule[] = [
      [
        'EOS',
        () => {
          if (!this.body.trim().length) {
            throw new Error('Unexpected end.');
          }

          this.interpreter.precedenceTokens.unshift('EOS');
          this.interpreter.precedenceTokens.unshift('endDef');
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
                  [/\n|EOS/, token => {
                    if (token === '\n') {
                      this.body += '\n';
                    }
                    return gotoParent(token);
                  }],
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
            tokenizer.readSpacesRule,
          ];
        }
      ],
      [/^[^\s]$/, () => {
        this.interpreter.precedenceTokens.unshift('EOS');
        this.interpreter.precedenceTokens.unshift('endDef');
        return [];
      }],
      [
        'spaces',
        () => []
      ],
      tokenizer.readSpacesRule,
    ];

    return [
      ['endDef', () => null],
      [
        '(',
        () => {
          this.name = tokenizer.popName();
          if (!this.name) {
            throw new Error('Empty function name.');
          }
          return [
            ['endDef', gotoParent],
            [
              /[,)]/,
              token => {
                if (!this.parameters) {
                  this.parameters = [tokenizer.popName()];
                } else {
                  this.parameters.push(tokenizer.popName());
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
                    tokenizer.readSpacesRule,
                  ];
                } else {
                  return [];
                }
              }
            ],
            ['spaces', () => []],
            tokenizer.readSpacesRule,
            tokenizer.readNameRule,
          ];
        }
      ],
      ['spaces', () => []], tokenizer.readSpacesRule, tokenizer.readNameRule
    ];
  }
}