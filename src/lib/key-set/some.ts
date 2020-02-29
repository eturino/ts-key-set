import { NonEmptyArray } from "../util/array-types";
import { Key, KeySet, KeySetSomeSerialized, KeySetTypes } from "./-base";
import { KeySetByKeys } from "./-by-keys";
import { KeySetAll } from "./all";
import { KeySetAllExceptSome } from "./all-except-some";
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

  public clone(): KeySetSome<T> {
    return new KeySetSome(this.keys);
  }

  public invert(): KeySetAllExceptSome<T> {
    return new KeySetAllExceptSome(this.keys);
  }

  public isEqual(other: KeySet): boolean {
    return other instanceof KeySetSome && this.hasSameKeys(other);
  }

  public remove(other: KeySetNone): KeySetSome<T>;
  public remove(other: KeySetAll): KeySetNone;
  public remove(
    other: KeySetAllExceptSome<T> | KeySetSome<T>
  ): KeySetSome<T> | KeySetNone;
  public remove(other: KeySet<T>): KeySetSome<T> | KeySetNone {
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

  public intersect(other: KeySetAll): KeySetSome<T>;
  public intersect(other: KeySetNone): KeySetNone;
  public intersect(
    other: KeySetSome<T> | KeySetAllExceptSome<T>
  ): KeySetSome<T> | KeySetNone;
  public intersect(other: KeySet<T>): KeySetSome<T> | KeySetNone {
    if (other instanceof KeySetAll) return new KeySetSome(this.keys);

    if (other instanceof KeySetSome) {
      return some(this.intersectKeys(other.keys));
    }

    if (other instanceof KeySetAllExceptSome) {
      return some(this.excludeKeys(other.keys));
    }

    return new KeySetNone();
  }

  private intersectKeys(otherKeys: Key[]) {
    return [...this.keys].filter(key => otherKeys.includes(key));
  }

  private excludeKeys(otherKeys: Key[]) {
    return [...this.keys].filter(key => !otherKeys.includes(key));
  }
}

/**
 * if the given list is empty, it will throw an error, otherwise it will build a KeySetSome with those keys
 *
 * @param keys list of keys for the KeySet
 * @throws InvalidEmptySetError
 */
export function someForced<T extends Key>(
  keys: T[] | ReadonlyArray<T>
): KeySetSome<T> {
  if (!keys.length) {
    throw new InvalidEmptySetError(
      "calling `someForced` with an empty list of keys"
    );
  }

  return new KeySetSome(keys);
}

/**
 * if the given list is empty, it will return a KeySetNone, otherwise it will build a KeySetSome with those keys
 *
 * @param keys list of keys for the KeySet
 */
export function some<T extends Key>(
  keys: T[] | ReadonlyArray<T>
): KeySetNone | KeySetSome<T> {
  if (!keys.length) return none();

  return someForced(keys);
}
