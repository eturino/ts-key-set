import { Key, KeySet, KeySetAllSerialized, KeySetTypes } from "./-base";
import { KeySetGlobal } from "./-global";
import { KeySetAllExceptSome } from "./all-except-some";
import { InvalidKeySetError } from "./invalid-key-set-error";
import { KeySetNone } from "./none";
import { KeySetSome } from "./some";

export class KeySetAll<T extends Key = Key> extends KeySetGlobal<T> {
  public readonly type = KeySetTypes.all;

  public serialized(): KeySetAllSerialized {
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

  public clone(): KeySetAll {
    return new KeySetAll();
  }

  public invert(): KeySetNone {
    return new KeySetNone();
  }

  public isEqual(other: KeySet) {
    return other instanceof KeySetAll;
  }

  public remove(other: KeySetAll): KeySetNone;
  public remove(other: KeySetNone): KeySetAll;
  public remove(other: KeySetSome<T>): KeySetAllExceptSome<T>;
  public remove(other: KeySetAllExceptSome<T>): KeySetSome<T>;
  public remove(other: KeySet<T>): KeySet<T>;
  public remove(other: KeySet<T>): KeySet<T> {
    if (other instanceof KeySetSome) return new KeySetAllExceptSome(other.keys);
    if (other instanceof KeySetAllExceptSome) return new KeySetSome(other.keys);
    if (other instanceof KeySetAll) return new KeySetNone();

    return new KeySetAll();
  }

  public intersect(other: KeySetAll): KeySetAll;
  public intersect(other: KeySetNone): KeySetNone;
  public intersect(other: KeySetSome<T>): KeySetSome<T>;
  public intersect(other: KeySetAllExceptSome<T>): KeySetAllExceptSome<T>;
  public intersect(other: KeySet<T>): KeySet<T>;
  public intersect(other: KeySet<T>): KeySet<T> {
    if (other instanceof KeySetAll) return new KeySetAll();
    if (other instanceof KeySetNone) return new KeySetNone();
    if (other instanceof KeySetSome) return new KeySetSome(other.keys);
    if (other instanceof KeySetAllExceptSome) {
      return new KeySetAllExceptSome(other.keys);
    }

    throw new InvalidKeySetError(`other key set not recognised ${other}`);
  }
}

export function all(): KeySetAll {
  return new KeySetAll();
}
