import { NonEmptyArray } from "../util/array-types";
import {
  Key,
  KeySet,
  KeySetAllExceptSomeSerialized,
  KeySetTypes
} from "./-base";
import { KeySetByKeys } from "./-by-keys";
import { all, KeySetAll } from "./all";
import { InvalidEmptySetError } from "./invalid-empty-set-error";
import { KeySetNone } from "./none";
import { KeySetSome, some } from "./some";

export class KeySetAllExceptSome<T extends Key> extends KeySetByKeys<T> {
  public readonly type = KeySetTypes.allExceptSome;

  public serialized(): KeySetAllExceptSomeSerialized<T> {
    return { type: this.type, elements: [...this.keys] as NonEmptyArray };
  }

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

  public remove(
    other: KeySet<T>
  ): KeySetAllExceptSome<T> | KeySetSome<T> | KeySetNone {
    if (other instanceof KeySetSome) {
      const keys = [...this.keys, ...other.keys];
      return new KeySetAllExceptSome(keys);
    }

    if (other instanceof KeySetAllExceptSome) {
      return some(this.excludeMyKeys(other.keys as T[]));
    }

    if (other instanceof KeySetAll) return new KeySetNone();

    return new KeySetAllExceptSome<T>(this.keys);
  }

  public intersect(
    other: KeySet<T>
  ): KeySetAllExceptSome<T> | KeySetNone | KeySetSome<T> | KeySetAll {
    if (other instanceof KeySetAll) {
      return new KeySetAllExceptSome([...this.keys]);
    }

    if (other instanceof KeySetNone) return new KeySetNone();

    const otherKeys = other.keys as T[];

    if (other instanceof KeySetSome) {
      // we have all except some, we remove some others => we have all except the ones that we didn't have before and the ones that we don't have now
      return some(this.excludeMyKeys(otherKeys));
    }

    return allExceptSome([...this.keys, ...otherKeys]);
  }

  private excludeMyKeys(keys: T[]) {
    return [...keys].filter(key => !this.keys.includes(key as T));
  }
}

/**
 * if the given list is empty, it will throw an error, otherwise it will build a KeySetSome with those keys
 *
 * @param keys list of keys for the KeySet
 * @throws InvalidEmptySetError
 */
export function allExceptSomeForced<T extends Key>(
  keys: T[] | ReadonlyArray<T>
): KeySetAllExceptSome<T> {
  if (!keys.length) {
    throw new InvalidEmptySetError(
      "calling `someForced` with an empty list of keys"
    );
  }

  return new KeySetAllExceptSome(keys);
}

/**
 * if the given list is empty, it will return a KeySetAll, otherwise it will build a KeySetSome with those keys
 *
 * @param keys list of keys for the KeySet
 */
export function allExceptSome<T extends Key>(
  keys: T[] | ReadonlyArray<T>
): KeySetAll | KeySetAllExceptSome<T> {
  if (!keys.length) return all();

  return allExceptSomeForced(keys);
}
