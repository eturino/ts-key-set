import { Key, KeySet } from './-base';
import { KeySetByKeys } from './-by-keys';
import { KeySetAll } from './all';
import { KeySetAllExceptSome } from './all-except-some';
import { KeySetNone, none } from './none';

export class KeySetSome<T extends Key> extends KeySetByKeys<T> {
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

  public invert(): KeySetAllExceptSome<T> {
    return new KeySetAllExceptSome(this.keys);
  }

  public isEqual(other: KeySet): boolean {
    return other instanceof KeySetSome && this.hasSameKeys(other);
  }

  public remove(other: KeySet): KeySet {
    if (other instanceof KeySetSome) {
      return some(this.excludeKeys(other.keys));
    }

    if (other instanceof KeySetAllExceptSome) {
      return some(this.intersectKeys(other.keys));
    }

    if (other instanceof KeySetNone) {
      return new KeySetSome(this.keys);
    }

    return new KeySetNone();
  }

  public intersect(other: KeySet): KeySet {
    if (other instanceof KeySetAll) return new KeySetSome(this.keys);

    if (other instanceof KeySetSome) {
      return some(this.intersectKeys(other.keys));
    }

    if (other instanceof KeySetAllExceptSome) {
      return some(this.excludeKeys(other.keys));
    }

    return new KeySetNone();
  }

  private intersectKeys(otherKeys: Key[]) {
    return [...this.keys].filter(key => otherKeys.includes(key));
  }

  private excludeKeys(otherKeys: Key[]) {
    return [...this.keys].filter(key => !otherKeys.includes(key));
  }
}

export function some<T extends Key>(keys: T[]): KeySetNone | KeySetSome<T> {
  if (!keys.length) return none();

  return new KeySetSome(keys);
}
