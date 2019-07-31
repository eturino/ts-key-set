import { KeySetByKeys } from './-by-keys';
import { KeySetAll } from './all';
import { KeySetAllExceptSome } from './all-except-some';
import { KeySetNone, none } from './none';

export class KeySetSome<T extends string | number> extends KeySetByKeys<T> {
  public representsAll() {
    return false;
  }

  public representsNone() {
    return false;
  }

  public representsAllExceptSome(): boolean {
    return false;
  }

  public representsSome(): boolean {
    return true;
  }

  public clone(): KeySetSome<T> {
    return new KeySetSome(this.keys);
  }

  public isEqual(other: KeySetAll | KeySetNone | KeySetSome<string | number> | KeySetAllExceptSome<string | number>): boolean {
    return other instanceof KeySetSome && this.hasSameKeys(other);
  }

  public remove(other: KeySetAll | KeySetNone | KeySetSome<string | number> | KeySetAllExceptSome<string | number>): KeySetAll | KeySetNone | KeySetSome<string | number> | KeySetAllExceptSome<string | number> {
    if (other instanceof KeySetSome) {
      const otherKeys = other.keys;
      const keys = [...this.keys].filter((key) => !otherKeys.includes(key));
      return some(keys);
    }

    if (other instanceof KeySetAllExceptSome) {
      const otherKeys = other.keys;
      const keys = [...this.keys].filter((key) => otherKeys.includes(key));
      return some(keys);
    }

    if (other instanceof KeySetNone) {
      return new KeySetSome(this.keys);
    }

    return new KeySetNone();
  }
}

export function some<T extends string | number>(keys: T[]): KeySetNone | KeySetSome<T> {
  if (!keys.length) {
    return none();
  }

  return new KeySetSome(keys);
}
