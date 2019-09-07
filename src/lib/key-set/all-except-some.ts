import { Key, KeySet } from './-base';
import { KeySetByKeys } from './-by-keys';
import { all, KeySetAll } from './all';
import { KeySetNone } from './none';
import { KeySetSome, some } from './some';

export class KeySetAllExceptSome<T extends Key> extends KeySetByKeys<T> {
  public representsAll() {
    return false;
  }

  public representsNone() {
    return false;
  }

  public representsAllExceptSome(): boolean {
    return true;
  }

  public representsSome(): boolean {
    return false;
  }

  public clone(): KeySetAllExceptSome<T> {
    return new KeySetAllExceptSome(this.keys);
  }

  public invert(): KeySetSome<T> {
    return new KeySetSome(this.keys);
  }

  public isEqual(other: KeySet): boolean {
    return other instanceof KeySetAllExceptSome && this.hasSameKeys(other);
  }

  public remove(other: KeySet): KeySet {
    if (other instanceof KeySetSome) {
      const keys = [...this.keys, ...other.keys];
      return new KeySetAllExceptSome(keys);
    }

    if (other instanceof KeySetAllExceptSome) {
      return some(this.excludeMyKeys(other.keys));
    }

    if (other instanceof KeySetAll) return new KeySetNone();

    return new KeySetAllExceptSome<T>(this.keys);
  }

  public intersect(other: KeySet): KeySet<T> {
    if (other instanceof KeySetAll) {
      return new KeySetAllExceptSome([...this.keys]);
    }

    if (other instanceof KeySetNone) return new KeySetNone();

    if (other instanceof KeySetSome) {
      // we have all except some, we remove some others => we have all except the ones that we didn't have before and the ones that we don't have now
      return some(this.excludeMyKeys(other.keys));
    }

    return allExceptSome([...this.keys, ...other.keys]);
  }

  private excludeMyKeys(keys: Key[]) {
    return [...keys].filter(key => !this.keys.includes(key as T));
  }
}

export function allExceptSome<T extends Key>(
  keys: T[]
): KeySetAll | KeySetAllExceptSome<T> {
  if (!keys.length) {
    return all();
  }

  return new KeySetAllExceptSome(keys);
}
