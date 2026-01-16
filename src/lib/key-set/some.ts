import type { EmptyArray, NonEmptyArray } from "../util/array-types";
import {
  type Key,
  type KeySet,
  type KeySetSomeSerialized,
  KeySetTypes,
} from "./-base";
import { KeySetByKeys } from "./-by-keys";
import { INSPECT } from "./-is-node-env";
import { KeySetAll } from "./all";
import { allExceptSome, KeySetAllExceptSome } from "./all-except-some";
import { InvalidEmptySetError } from "./invalid-empty-set-error";
import { KeySetNone, none } from "./none";

export class KeySetSome<T extends Key> extends KeySetByKeys<T> {
  public readonly type = KeySetTypes.some;

  public toString(): string {
    return `KeySet<SOME[${this.elementsSorted.map((x) => x.toString())}]>`;
  }

  public [INSPECT]() {
    return this.toString();
  }

  public serialized(): KeySetSomeSerialized<T> {
    return {
      type: this.type,
      elements: this.elementsSorted as NonEmptyArray<T>,
    };
  }

  public representsAll(): this is KeySetAll<T> {
    return false;
  }

  public representsNone(): this is KeySetNone<T> {
    return false;
  }

  public representsSome(): this is KeySetSome<T> {
    return true;
  }

  public representsAllExceptSome(): this is KeySetAllExceptSome<T> {
    return false;
  }

  public includes(element: T) {
    return this.elements.has(element);
  }

  public clone(): KeySetSome<T> {
    return new KeySetSome(this.elementsList);
  }

  public invert(): KeySetAllExceptSome<T> {
    return new KeySetAllExceptSome(this.elementsList);
  }

  public isEqual(other: KeySet<T>): boolean {
    return other instanceof KeySetSome && this.hasSameKeys(other);
  }

  public remove(other: KeySetNone<T> | KeySetNone<Key>): KeySetSome<T>;
  public remove(other: KeySetAll<T> | KeySetAll<Key>): KeySetNone<T>;
  public remove(
    other: KeySet<T> | KeySetAll<Key> | KeySetNone<Key>,
  ): KeySetSome<T> | KeySetNone<T>;
  public remove(
    other: KeySet<T> | KeySetAll<Key> | KeySetNone<Key>,
  ): KeySetSome<T> | KeySetNone<T> {
    if (other instanceof KeySetSome) {
      return some(this.excludeKeys(other.elements));
    }

    if (other instanceof KeySetAllExceptSome) {
      return some(this.intersectKeys(other.elements));
    }

    if (other instanceof KeySetNone) {
      return new KeySetSome(this.elementsList);
    }

    return new KeySetNone();
  }

  public intersect(other: KeySetAll<T> | KeySetAll<Key>): KeySetSome<T>;
  public intersect(other: KeySetNone<T> | KeySetNone<Key>): KeySetNone<T>;
  public intersect(
    other: KeySet<T> | KeySetAll<Key> | KeySetNone<Key>,
  ): KeySetSome<T> | KeySetNone<T>;
  public intersect(
    other: KeySet<T> | KeySetAll<Key> | KeySetNone<Key>,
  ): KeySetSome<T> | KeySetNone<T> {
    if (other instanceof KeySetAll) return new KeySetSome(this.elementsList);

    if (other instanceof KeySetSome) {
      return some(this.intersectKeys(other.elements));
    }

    if (other instanceof KeySetAllExceptSome) {
      return some(this.excludeKeys(other.elements));
    }

    return new KeySetNone();
  }

  public union(other: KeySetAll<T> | KeySetAll<Key>): KeySetAll<T>;
  public union(
    other: KeySetNone<T> | KeySetNone<Key> | KeySetSome<T>,
  ): KeySetSome<T>;
  public union(
    other: KeySetAllExceptSome<T>,
  ): KeySetAllExceptSome<T> | KeySetAll<T>;
  public union(
    other: KeySet<T> | KeySetAll<Key> | KeySetNone<Key>,
  ): KeySetSome<T> | KeySetAllExceptSome<T> | KeySetAll<T>;
  public union(
    other: KeySet<T> | KeySetAll<Key> | KeySetNone<Key>,
  ): KeySetSome<T> | KeySetAllExceptSome<T> | KeySetAll<T> {
    if (other instanceof KeySetSome) {
      return new KeySetSome([...this.elementsList, ...other.elementsList]);
    }

    if (other instanceof KeySetAllExceptSome) {
      return allExceptSome(this.excludeMyKeys(other.elements));
    }

    if (other instanceof KeySetNone) return new KeySetSome(this.elementsList);

    return new KeySetAll();
  }

  private excludeMyKeys(keys: Set<T>): T[] {
    return [...keys].filter((key) => !this.elements.has(key));
  }

  private intersectKeys(otherKeys: Set<T>): T[] {
    return [...this.elements].filter((key) => otherKeys.has(key));
  }

  private excludeKeys(otherKeys: Set<T>): T[] {
    return [...this.elements].filter((key) => !otherKeys.has(key));
  }
}

/**
 * if the given list is empty, it will throw an error, otherwise it will build a KeySetSome with those keys
 *
 * @param keys list of keys for the KeySet
 * @throws InvalidEmptySetError
 */
export function someForced<T extends Key>(
  keys: T[] | ReadonlyArray<T>,
): KeySetSome<T> {
  if (!keys.length) {
    throw new InvalidEmptySetError(
      "calling `someForced` with an empty list of keys",
    );
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
export function some<T extends Key>(
  keys: T[] | ReadonlyArray<T>,
): KeySetNone<T> | KeySetSome<T>;
export function some<T extends Key>(
  keys: T[] | ReadonlyArray<T>,
): KeySetNone<T> | KeySetSome<T> {
  if (!keys.length) return none<T>();

  return someForced(keys);
}

/**
 * alias of `some`
 * @see some
 */
export const someKeySet = some;

/**
 * alias of `someForced`
 * @see someForced
 */
export const someKeySetForced = someForced;
