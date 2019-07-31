import { IKeySetClass } from './-base';
import { KeySetAllExceptSome } from './all-except-some';
import { KeySetNone } from './none';
import { KeySetSome } from './some';

export class KeySetAll implements IKeySetClass {
  public representsAll() {
    return true;
  }

  public representsNone() {
    return false;
  }

  public representsSome() {
    return false;
  }

  public representsAllExceptSome() {
    return false;
  }

  public isEqual(other: KeySetAll | KeySetNone | KeySetSome<string | number> | KeySetAllExceptSome<string | number>) {
    return other instanceof KeySetAll;
  }

  public remove(other: KeySetAll | KeySetNone | KeySetSome<string | number> | KeySetAllExceptSome<string | number>): KeySetAll | KeySetNone | KeySetSome<string | number> | KeySetAllExceptSome<string | number> {
    if (other instanceof KeySetSome) return new KeySetAllExceptSome(other.keys);
    if (other instanceof KeySetAllExceptSome) return new KeySetSome(other.keys);
    if (other instanceof KeySetAll) return new KeySetNone();

    return new KeySetAll();
  }
}

export function all(): KeySetAll {
  return new KeySetAll();
}
