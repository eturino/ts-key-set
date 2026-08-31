import {
  type Key,
  type KeySet,
  type KeySetAllSerialized,
  KeySetTypes,
} from "./-base.ts";
import { KeySetGlobal } from "./-global.ts";
import { INSPECT } from "./-is-node-env.ts";
import { KeySetAllExceptSome } from "./all-except-some.ts";
import { InvalidKeySetError } from "./invalid-key-set-error.ts";
import { KeySetNone } from "./none.ts";
import { KeySetSome } from "./some.ts";

export class KeySetAll<T extends Key = Key> extends KeySetGlobal<T> {
  public readonly type = KeySetTypes.all;

  public toString(): string {
    return "KeySet<ALL>";
  }

  public [INSPECT]() {
    return this.toString();
  }

  public serialized(): KeySetAllSerialized<T> {
    return { type: this.type };
  }

  public representsAll(): this is KeySetAll<T> {
    return true;
  }

  public representsNone(): this is KeySetNone<T> {
    return false;
  }

  public representsSome(): this is KeySetSome<T> {
    return false;
  }

  public representsAllExceptSome(): this is KeySetAllExceptSome<T> {
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
  public remove(
    other: KeySet<T> | KeySetAll<Key> | KeySetNone<Key>,
  ): KeySet<T> {
    if (other instanceof KeySetSome)
      return new KeySetAllExceptSome(other.elementsList);
    if (other instanceof KeySetAllExceptSome)
      return new KeySetSome(other.elementsList);
    if (other instanceof KeySetAll) return new KeySetNone<T>();

    return new KeySetAll<T>();
  }

  public intersect(other: KeySetAll<T> | KeySetAll<Key>): KeySetAll<T>;
  public intersect(other: KeySetNone<T> | KeySetNone<Key>): KeySetNone<T>;
  public intersect(other: KeySetSome<T>): KeySetSome<T>;
  public intersect(other: KeySetAllExceptSome<T>): KeySetAllExceptSome<T>;
  public intersect(
    other: KeySet<T> | KeySetAll<Key> | KeySetNone<Key>,
  ): KeySet<T>;
  public intersect(
    other: KeySet<T> | KeySetAll<Key> | KeySetNone<Key>,
  ): KeySet<T> {
    if (other instanceof KeySetAll) return new KeySetAll<T>();
    if (other instanceof KeySetNone) return new KeySetNone<T>();
    if (other instanceof KeySetSome) return new KeySetSome(other.elementsList);
    if (other instanceof KeySetAllExceptSome) {
      return new KeySetAllExceptSome(other.elementsList);
    }

    throw new InvalidKeySetError(`other key set not recognised ${other}`);
  }

  public union(
    other: KeySet<T> | KeySetAll<Key> | KeySetNone<Key>,
  ): KeySetAll<T> {
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
