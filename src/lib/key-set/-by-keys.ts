import { IKeySetClass } from './-base';
import { KeySetAll } from './all';
import { KeySetAllExceptSome } from './all-except-some';
import { KeySetNone } from './none';
import { KeySetSome } from './some';

function onlyUnique<T extends string | number>(value: T, index: number, self: T[]) {
  return self.indexOf(value) === index;
}

// copied from https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
function arraysEqual<T extends string | number>(a: T[], b: T[]) {
  if (a === b) {
    return true;
  }
  if (a == null || b == null) {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

export abstract class KeySetByKeys<T extends string | number> implements IKeySetClass {
  private readonly keySet: T[];

  constructor(keys: T[]) {
    this.keySet = [...keys].filter(onlyUnique).sort();
  }

  public abstract representsAll(): boolean;

  public abstract representsNone(): boolean;

  public abstract representsSome(): boolean;

  public abstract representsAllExceptSome(): boolean;

  public abstract clone(): KeySetSome<string | number> | KeySetAllExceptSome<string | number>;

  public abstract isEqual(other: KeySetAll | KeySetNone | KeySetSome<string | number> | KeySetAllExceptSome<string | number>): boolean;

  public abstract remove(other: KeySetAll | KeySetNone | KeySetSome<string | number> | KeySetAllExceptSome<string | number>): KeySetAll | KeySetNone | KeySetSome<string | number> | KeySetAllExceptSome<string | number>;

  public get keys(): T[] {
    return [...this.keySet];
  }

  protected hasSameKeys(other: KeySetByKeys<string | number>): boolean {
    return arraysEqual(this.keys, other.keys);
  }
}
