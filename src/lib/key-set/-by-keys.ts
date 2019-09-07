import { arraysEqual } from '../util/arrays-equal';
import { uniqueArray } from '../util/unique-array';
import { IKeySetClass, Key, KeySet } from './-base';
import { KeySetAllExceptSome } from './all-except-some';
import { KeySetSome } from './some';

export abstract class KeySetByKeys<T extends Key> implements IKeySetClass {
  private readonly keySet: T[];

  constructor(keys: T[]) {
    this.keySet = uniqueArray(keys).sort();
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

  protected hasSameKeys(other: KeySetByKeys<Key>): boolean {
    return arraysEqual(this.keys, other.keys);
  }
}
