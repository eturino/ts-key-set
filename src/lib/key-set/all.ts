import { Key, KeySet, KeySetAllSerialized, KeySetTypes } from "./-base";
import { KeySetGlobal } from "./-global";
import { KeySetAllExceptSome } from "./all-except-some";
import { InvalidKeySetError } from "./invalid-key-set-error";
import { KeySetNone } from "./none";
import { KeySetSome } from "./some";

export class KeySetAll<T extends Key = Key> extends KeySetGlobal<T> {
  public readonly type = KeySetTypes.all;

  public serialized(): KeySetAllSerialized<T> {
    return { type: this.type };
  }

  public representsAll() {
    return true;
  }

  public representsNone() {
    return false;
  }

  public representsSome() {
    return false;
  }

  public representsAllExceptSome() {
    return false;
  }

  public includes(_element: T) {
    return true;
  }

  public clone(): KeySetAll<T> {
    return new KeySetAll<T>();
  }

  public invert(): KeySetNone<T> {
    return new KeySetNone<T>();
  }

  public isEqual(other: KeySet): boolean {
    return other.representsAll();
  }

  public remove(other: KeySetAll<T> | KeySetAll<Key>): KeySetNone<T>;
  public remove(other: KeySetNone<T> | KeySetNone<Key>): KeySetAll<T>;
  public remove(other: KeySetSome<T>): KeySetAllExceptSome<T>;
  public remove(other: KeySetAllExceptSome<T>): KeySetSome<T>;
  public remove(other: KeySet<T> | KeySetAll<Key> | KeySetNone<Key>): KeySet<T>;
  public remove(other: KeySet<T> | KeySetAll<Key> | KeySetNone<Key>): KeySet<T> {
    if (other instanceof KeySetSome) return new KeySetAllExceptSome(other.elementsList);
    if (other instanceof KeySetAllExceptSome) return new KeySetSome(other.elementsList);
    if (other instanceof KeySetAll) return new KeySetNone<T>();

    return new KeySetAll<T>();
  }

  public intersect(other: KeySetAll<T> | KeySetAll<Key>): KeySetAll<T>;
  public intersect(other: KeySetNone<T> | KeySetNone<Key>): KeySetNone<T>;
  public intersect(other: KeySetSome<T>): KeySetSome<T>;
  public intersect(other: KeySetAllExceptSome<T>): KeySetAllExceptSome<T>;
  public intersect(other: KeySet<T> | KeySetAll<Key> | KeySetNone<Key>): KeySet<T>;
  public intersect(other: KeySet<T> | KeySetAll<Key> | KeySetNone<Key>): KeySet<T> {
    if (other instanceof KeySetAll) return new KeySetAll<T>();
    if (other instanceof KeySetNone) return new KeySetNone<T>();
    if (other instanceof KeySetSome) return new KeySetSome(other.elementsList);
    if (other instanceof KeySetAllExceptSome) {
      return new KeySetAllExceptSome(other.elementsList);
    }

    throw new InvalidKeySetError(`other key set not recognised ${other}`);
  }

  public union(other: KeySet<T> | KeySetAll<Key> | KeySetNone<Key>): KeySetAll<T> {
    if (other instanceof KeySetAll) return new KeySetAll();
    if (other instanceof KeySetNone) return new KeySetAll();
    if (other instanceof KeySetSome) return new KeySetAll();
    if (other instanceof KeySetAllExceptSome) return new KeySetAll();

    throw new InvalidKeySetError(`other key set not recognised ${other}`);
  }
}

export function all<T extends Key = Key>(): KeySetAll<T> {
  return new KeySetAll<T>();
}

/**
 * alias of `all`
 * @see all
 */
export const allKeySet = all;
