import {
  IKeySetClass,
  Key,
  KeySet,
  KeySetAllSerialized,
  KeySetTypes
} from "./-base";
import { KeySetAllExceptSome } from "./all-except-some";
import { InvalidKeySetError } from "./invalid-key-set-error";
import { KeySetNone } from "./none";
import { KeySetSome } from "./some";

export class KeySetAll implements IKeySetClass {
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

  public remove<T extends Key>(other: KeySet<T>): KeySet<T> {
    if (other instanceof KeySetSome) return new KeySetAllExceptSome(other.keys);
    if (other instanceof KeySetAllExceptSome) return new KeySetSome(other.keys);
    if (other instanceof KeySetAll) return new KeySetNone();

    return new KeySetAll();
  }

  public intersect<O extends KeySet>(other: O): O {
    if (other instanceof KeySetAll) return new KeySetAll() as O;
    if (other instanceof KeySetNone) return new KeySetNone() as O;
    if (other instanceof KeySetSome) return new KeySetSome(other.keys) as O;
    if (other instanceof KeySetAllExceptSome) {
      return new KeySetAllExceptSome(other.keys) as O;
    }

    throw new InvalidKeySetError(`other key set not recognised ${other}`);
  }
}

export function all(): KeySetAll {
  return new KeySetAll();
}
