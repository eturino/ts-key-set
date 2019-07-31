import { IKeySetClass } from './-base';
import { KeySetAll } from './all';
import { KeySetAllExceptSome } from './all-except-some';
import { KeySetSome } from './some';

export class KeySetNone implements IKeySetClass {
  public representsAll() {
    return false;
  }

  public representsNone() {
    return true;
  }

  public representsSome() {
    return false;
  }

  public representsAllExceptSome() {
    return false;
  }

  public clone(): KeySetNone {
    return new KeySetNone();
  }

  public invert(): KeySetAll {
    return new KeySetAll();
  }

  public isEqual(other: KeySetAll | KeySetNone | KeySetSome<string | number> | KeySetAllExceptSome<string | number>): boolean {
    return other.representsNone();
  }

  public remove(_other: KeySetAll | KeySetNone | KeySetSome<string | number> | KeySetAllExceptSome<string | number>) {
    return new KeySetNone();
  }
}

export function none(): KeySetNone {
  return new KeySetNone();
}
