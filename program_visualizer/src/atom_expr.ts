import { FuncDef } from './func_def';
import { Interpreter, Rule } from './interpreter';

export class AtomExpr {
  funcDef: FuncDef | null = null;
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
        this.atom = this.interpreter.lexer.symbol;
        for (const funcDef of this.interpreter.funcDefs) {
          if (funcDef.name === this.atom) {
            this.funcDef = funcDef;
            return [];
          }
        }
        throw new Error(`Name '${this.atom}' is not defined`);
      }
      throw new Error('No symbol');
    },
  ];
  readAtomRule(): Rule {
    return this.funcCallRule;
  }
}
