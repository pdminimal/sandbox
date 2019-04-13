import {Rule} from './interpreter';
import {Tokenizer} from './tokenizer';

export class Funcdef {
  name = '';
  parameters: string[] = [];
  body = '';
  tokenizer: Tokenizer;

  constructor(tokenizer: Tokenizer) {
    this.tokenizer = tokenizer;
  }

  action(): Rule[] {
    const tokenizer = this.tokenizer;
    return [
      [
        '(',
        () => {
          this.name = tokenizer.popName();
          return [
            [
              ')',
              () => {
                this.parameters = [tokenizer.popName()];
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
            tokenizer.readNameRule,
          ];
        }
      ],
      ['spaces', () => []], tokenizer.readSpacesRule, tokenizer.readNameRule
    ];
  }
}