import { Key, KeySet, KeySetNoneSerialized, KeySetTypes } from "./-base";
import { KeySetGlobal } from "./-global";
import { KeySetAll } from "./all";
import { KeySetAllExceptSome } from "./all-except-some";
import { InvalidKeySetError } from "./invalid-key-set-error";
import { KeySetSome } from "./some";

export class KeySetNone<T extends Key = Key> extends KeySetGlobal<T> {
  public readonly type = KeySetTypes.none;

  public serialized(): KeySetNoneSerialized<T> {
    return { type: this.type };
  }

  public representsAll(): this is KeySetAll<T> {
    return false;
  }

  public representsNone(): this is KeySetNone<T> {
    return true;
  }

  public representsSome(): this is KeySetSome<T> {
    return false;
  }

  public representsAllExceptSome(): this is KeySetAllExceptSome<T> {
    return false;
  }

  public includes(_element: T) {
    return false;
  }

  public clone(): KeySetNone<T> {
    return new KeySetNone<T>();
  }

  public invert(): KeySetAll<T> {
    return new KeySetAll<T>();
  }

  public isEqual(other: KeySet): boolean {
    return other.representsNone();
  }

  public remove(_other: KeySet<T> | KeySetAll<Key> | KeySetNone<Key>): KeySetNone<T> {
    return new KeySetNone<T>();
  }

  public intersect(_other: KeySet | KeySetAll<Key> | KeySetNone<Key>): KeySetNone<T> {
    return new KeySetNone<T>();
  }

  public union(other: KeySetAll<T> | KeySetAll<Key>): KeySetAll<T>;
  public union(other: KeySetNone<T> | KeySetNone<Key>): KeySetNone<T>;
  public union(other: KeySetSome<T>): KeySetSome<T>;
  public union(other: KeySetAllExceptSome<T>): KeySetAllExceptSome<T>;
  public union(other: KeySet<T> | KeySetAll<Key> | KeySetNone<Key>): KeySet<T>;
  public union(other: KeySet<T> | KeySetAll<Key> | KeySetNone<Key>): KeySet<T> {
    if (other instanceof KeySetAll) return new KeySetAll<T>();
    if (other instanceof KeySetNone) return new KeySetNone<T>();
    if (other instanceof KeySetSome) return new KeySetSome([...other.elements]);
    if (other instanceof KeySetAllExceptSome) return new KeySetAllExceptSome([...other.elements]);

    throw new InvalidKeySetError(`other key set not recognised ${other}`);
  }
}

export function none<T extends Key = Key>(): KeySetNone<T> {
  return new KeySetNone<T>();
}

/**
 * alias of `none`
 * @see none
 */
export const noneKeySet = none;
