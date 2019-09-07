import { IKeySetClass, KeySet } from './-base';
import { KeySetAll } from './all';

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

  public isEqual(other: KeySet): boolean {
    return other.representsNone();
  }

  public remove(_other: KeySet) {
    return new KeySetNone();
  }

  public intersect(_other: KeySet): KeySetNone {
    return new KeySetNone();
  }
}

export function none(): KeySetNone {
  return new KeySetNone();
}
