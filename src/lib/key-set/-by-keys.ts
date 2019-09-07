import { arraysEqual } from '../util/arrays-equal';
import { IKeySetClass, KeySet } from './-base';
import { KeySetAllExceptSome } from './all-except-some';
import { KeySetSome } from './some';

function onlyUnique<T extends string | number>(
  value: T,
  index: number,
  self: T[]
) {
  return self.indexOf(value) === index;
}

export abstract class KeySetByKeys<T extends string | number>
  implements IKeySetClass {
  private readonly keySet: T[];

  constructor(keys: T[]) {
    this.keySet = [...keys].filter(onlyUnique).sort();
  }

  public abstract representsAll(): boolean;

  public abstract representsNone(): boolean;

  public abstract representsSome(): boolean;

  public abstract representsAllExceptSome(): boolean;

  public abstract clone(): KeySetSome<T> | KeySetAllExceptSome<T>;

  public abstract invert(): KeySetSome<T> | KeySetAllExceptSome<T>;

  public abstract isEqual(other: KeySet): boolean;

  public abstract remove(other: KeySet): KeySet;

  public abstract intersect(other: KeySet): KeySet;

  public get keys(): T[] {
    return [...this.keySet];
  }

  protected hasSameKeys(other: KeySetByKeys<string | number>): boolean {
    return arraysEqual(this.keys, other.keys);
  }
}
