import { EmptyArray, NonEmptyArray } from "../util/array-types";
import { uniqueKeys } from "../util/unique-array";
import { Key, KeySet, KeySetSomeSerialized, KeySetTypes } from "./-base";
import { KeySetByKeys } from "./-by-keys";
import { KeySetGlobal } from "./-global";
import { KeySetAll } from "./all";
import { allExceptSome, KeySetAllExceptSome } from "./all-except-some";
import { InvalidEmptySetError } from "./invalid-empty-set-error";
import { KeySetNone, none } from "./none";

export class KeySetSome<T extends Key> extends KeySetByKeys<T> {
  public readonly type = KeySetTypes.some;

  public serialized(): KeySetSomeSerialized<T> {
    return { type: this.type, elements: [...this.keys] as NonEmptyArray };
  }

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

  public includes(element: T) {
    return this.keys.includes(element);
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

  public remove(other: KeySetNone<T> | KeySetNone<Key>): KeySetSome<T>;
  public remove(other: KeySetAll<T> | KeySetAll<Key>): KeySetNone<T>;
  public remove(other: KeySet<T> | KeySetGlobal<Key>): KeySetSome<T> | KeySetNone<T>;
  public remove(other: KeySet<T> | KeySetGlobal<Key>): KeySetSome<T> | KeySetNone<T> {
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

  public intersect(other: KeySetAll<T> | KeySetAll<Key>): KeySetSome<T>;
  public intersect(other: KeySetNone<T> | KeySetNone<Key>): KeySetNone<T>;
  public intersect(other: KeySet<T> | KeySetGlobal<Key>): KeySetSome<T> | KeySetNone<T>;
  public intersect(other: KeySet<T> | KeySetGlobal<Key>): KeySetSome<T> | KeySetNone<T> {
    if (other instanceof KeySetAll) return new KeySetSome(this.keys);

    if (other instanceof KeySetSome) {
      return some(this.intersectKeys(other.keys));
    }

    if (other instanceof KeySetAllExceptSome) {
      return some(this.excludeKeys(other.keys));
    }

    return new KeySetNone();
  }

  public union(other: KeySetAll<T> | KeySetAll<Key>): KeySetAll<T>;
  public union(other: KeySetNone<T> | KeySetNone<Key> | KeySetSome<T>): KeySetSome<T>;
  public union(other: KeySetAllExceptSome<T>): KeySetAllExceptSome<T> | KeySetAll<T>;
  public union(other: KeySet<T> | KeySetGlobal<Key>): KeySetSome<T> | KeySetAllExceptSome<T> | KeySetAll<T>;
  public union(other: KeySet<T> | KeySetGlobal<Key>): KeySetSome<T> | KeySetAllExceptSome<T> | KeySetAll<T> {
    if (other instanceof KeySetSome) {
      return new KeySetSome(uniqueKeys([...this.keys, ...other.keys].sort()));
    }

    if (other instanceof KeySetAllExceptSome) {
      return allExceptSome(this.excludeMyKeys(other.keys));
    }

    if (other instanceof KeySetNone) return new KeySetSome([...this.keys]);

    return new KeySetAll();
  }

  private excludeMyKeys(keys: T[]) {
    return [...keys].filter((key) => !this.keys.includes(key));
  }
  private intersectKeys(otherKeys: T[]) {
    return [...this.keys].filter((key) => otherKeys.includes(key));
  }

  private excludeKeys(otherKeys: T[]) {
    return [...this.keys].filter((key) => !otherKeys.includes(key));
  }
}

/**
 * if the given list is empty, it will throw an error, otherwise it will build a KeySetSome with those keys
 *
 * @param keys list of keys for the KeySet
 * @throws InvalidEmptySetError
 */
export function someForced<T extends Key>(keys: T[] | ReadonlyArray<T>): KeySetSome<T> {
  if (!keys.length) {
    throw new InvalidEmptySetError("calling `someForced` with an empty list of keys");
  }

  return new KeySetSome(keys);
}

/**
 * if the given list is empty, it will return a KeySetNone, otherwise it will build a KeySetSome with those keys
 *
 * @param keys list of keys for the KeySet
 */
export function some<T extends Key>(keys: EmptyArray<T>): KeySetNone<T>;
export function some<T extends Key>(keys: NonEmptyArray<T>): KeySetSome<T>;
export function some<T extends Key>(keys: T[] | ReadonlyArray<T>): KeySetNone<T> | KeySetSome<T>;
export function some<T extends Key>(keys: T[] | ReadonlyArray<T>): KeySetNone<T> | KeySetSome<T> {
  if (!keys.length) return none<T>();

  return someForced(keys);
}
