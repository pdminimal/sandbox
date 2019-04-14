import {FuncDef} from './func_def';
import {Interpreter, Rule} from './interpreter';

export class AtomExpr {
  funcDef: FuncDef|null = null;
  argList: string[] = [];
  atom = '';
  interpreter: Interpreter;

  constructor(interpreter: Interpreter) {
    this.interpreter = interpreter;
  }

  private funcCallRule: Rule = [
    '(',
    () => {
      if (this.interpreter.lexer.symbol) {
        this.atom = this.interpreter.lexer.symbol
        throw new Error(`Name '${this.atom}' is not defined`);
      }
      return [];
    }
  ];
  readAtomRule(): Rule[] {
    return [
      ['EOS', () => null],
      [
        'def',
        () => {
          const funcDef = new FuncDef(this.interpreter);
          this.interpreter.curFuncDef = funcDef;
          return funcDef.readDefinition();
        }
      ],
      this.funcCallRule,
      [
        'spaces',
        () => {
          const lexer = this.interpreter.lexer;
          if (lexer.symbol) {
            lexer.pushSymbol();
          } else {
            throw new Error('Unexpected indent.');
          }
          return [];
        }
      ],
      this.interpreter.lexer.readSpacesRule,
      this.interpreter.lexer.readNameRule,
    ];
  }
}