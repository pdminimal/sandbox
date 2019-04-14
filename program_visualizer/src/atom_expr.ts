import {FuncDef} from './func_def';
import {Interpreter, Rule} from './interpreter';

export class AtomExpr {
  funcDef: FuncDef|null = null;
  argList: string[] = [];
  atom = '';
}