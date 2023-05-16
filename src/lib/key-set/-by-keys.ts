import { isEqual } from "lodash";
import { setByKeys } from "../util/set-by-keys";
import { sortKeys } from "../util/sort-keys";
import { IKeySetClass, Key, KeySet, KeySetAllExceptSomeSerialized, KeySetSomeSerialized, KeySetTypes } from "./-base";
import { KeySetAll } from "./all";
import { KeySetAllExceptSome } from "./all-except-some";
import { InvalidEmptySetError } from "./invalid-empty-set-error";
import { KeySetNone } from "./none";
import { KeySetSome } from "./some";

/**
 * @internal
 * @hidden
 */
export abstract class KeySetByKeys<T extends Key> implements IKeySetClass<T> {
  public abstract readonly type: KeySetTypes.allExceptSome | KeySetTypes.some;

  public readonly elements: Set<T>;

  public get elementsList(): T[] {
    return [...this.elements];
  }

  public get elementsSorted(): T[] {
    return sortKeys(this.elements);
  }

  constructor(keys: T[] | ReadonlyArray<T> | Set<T>) {
    const elements = setByKeys(keys);
    Object.freeze(elements);

    if (elements.size === 0) {
      throw new InvalidEmptySetError();
    }
    this.elements = elements;
  }

  public toJSON(_key?: string): KeySetAllExceptSomeSerialized<T> | KeySetSomeSerialized<T> {
    return this.serialized();
  }

  public abstract serialized(): KeySetAllExceptSomeSerialized<T> | KeySetSomeSerialized<T>;

  public abstract representsAll(): boolean;

  public abstract representsNone(): boolean;

  public abstract representsSome(): boolean;

  public abstract representsAllExceptSome(): boolean;

  public abstract clone(): KeySetSome<T> | KeySetAllExceptSome<T>;

  public abstract invert(): KeySetSome<T> | KeySetAllExceptSome<T>;

  public abstract isEqual(other: KeySet): boolean;

  public abstract remove(other: KeySet | KeySetAll<Key> | KeySetNone<Key>): KeySet;

  public abstract intersect(other: KeySet | KeySetAll<Key> | KeySetNone<Key>): KeySet;

  public abstract union(other: KeySet | KeySetAll<Key> | KeySetNone<Key>): KeySet;

  public abstract includes(element: T): boolean;

  public contains(element: T): boolean {
    return this.includes(element);
  }

  protected hasSameKeys(other: KeySet<T>): boolean {
    return isEqual(this.elements, other.elements);
  }
}
