import { NonEmptyArray } from "../util/array-types";
import { arraysEqual } from "../util/arrays-equal";
import { uniqueArray } from "../util/unique-array";
import {
  IKeySetClass,
  Key,
  KeySet,
  KeySetAllExceptSomeSerialized,
  KeySetSomeSerialized,
  KeySetTypes
} from "./-base";
import { KeySetAllExceptSome } from "./all-except-some";
import { InvalidEmptySetError } from "./invalid-empty-set-error";
import { KeySetSome } from "./some";

export abstract class KeySetByKeys<T extends Key> implements IKeySetClass {
  public abstract readonly type: KeySetTypes.allExceptSome | KeySetTypes.some;

  private readonly keySet: NonEmptyArray<T>;

  constructor(keys: T[] | ReadonlyArray<T>) {
    const keySet = uniqueArray(keys).sort();
    if (keySet.length === 0) {
      throw new InvalidEmptySetError();
    }
    this.keySet = keySet as NonEmptyArray<T>;
  }

  public abstract serialized():
    | KeySetAllExceptSomeSerialized<T>
    | KeySetSomeSerialized<T>;

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
