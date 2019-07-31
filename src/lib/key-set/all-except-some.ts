import { KeySetByKeys } from './-by-keys';
import { all, KeySetAll } from './all';
import { KeySetNone } from './none';
import { KeySetSome, some } from './some';

export class KeySetAllExceptSome<T extends string | number> extends KeySetByKeys<T> {
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

  public isEqual(other: KeySetAll | KeySetNone | KeySetSome<string | number> | KeySetAllExceptSome<string | number>): boolean {
    return other instanceof KeySetAllExceptSome && this.hasSameKeys(other);
  }

  public remove(other: KeySetAll | KeySetNone | KeySetSome<string | number> | KeySetAllExceptSome<string | number>): KeySetAll | KeySetNone | KeySetSome<string | number> | KeySetAllExceptSome<string | number> {
    if (other instanceof KeySetSome) {
      const keys = [...this.keys, ...other.keys];
      return new KeySetAllExceptSome(keys);
    }

    if (other instanceof KeySetAllExceptSome) {
      const keys = [...other.keys].filter((key) => !this.keys.includes(key as T));
      return some(keys);
    }

    if (other instanceof KeySetAll) return new KeySetNone();

    return new KeySetAllExceptSome<T>(this.keys);
  }
}

export function allExceptSome<T extends string | number>(keys: T[]): KeySetAll | KeySetAllExceptSome<T> {
  if (!keys.length) {
    return all();
  }

  return new KeySetAllExceptSome(keys);
}
