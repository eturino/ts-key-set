import { NonEmptyArray } from "../util/array-types";
import { arraysEqual } from "../util/arrays-equal";
import { uniqueKeys } from "../util/unique-array";
import { IKeySetClass, Key, KeySet, KeySetAllExceptSomeSerialized, KeySetSomeSerialized, KeySetTypes } from "./-base";
import { KeySetGlobal } from "./-global";
import { KeySetAllExceptSome } from "./all-except-some";
import { InvalidEmptySetError } from "./invalid-empty-set-error";
import { KeySetSome } from "./some";

export abstract class KeySetByKeys<T extends Key> implements IKeySetClass<T> {
  public abstract readonly type: KeySetTypes.allExceptSome | KeySetTypes.some;

  private readonly _elements: NonEmptyArray<T>;

  constructor(keys: T[] | ReadonlyArray<T>) {
    const elements = uniqueKeys(keys).sort();
    if (elements.length === 0) {
      throw new InvalidEmptySetError();
    }
    this._elements = elements as NonEmptyArray<T>;
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

  public abstract remove(other: KeySet | KeySetGlobal<Key>): KeySet;

  public abstract intersect(other: KeySet | KeySetGlobal<Key>): KeySet;

  public abstract includes(element: T): boolean;

  public contains(element: T): boolean {
    return this.includes(element);
  }

  public get keys(): T[] {
    return this.elements;
  }

  public get elements(): T[] {
    return [...this._elements];
  }

  protected hasSameKeys(other: KeySetByKeys<Key>): boolean {
    return arraysEqual(this.keys, other.keys);
  }
}
