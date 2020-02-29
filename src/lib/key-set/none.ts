import { Key, KeySet, KeySetNoneSerialized, KeySetTypes } from "./-base";
import { KeySetGlobal } from "./-global";
import { KeySetAll } from "./all";

export class KeySetNone<K extends Key = Key> extends KeySetGlobal<K> {
  public readonly type = KeySetTypes.none;

  public serialized(): KeySetNoneSerialized {
    return { type: this.type };
  }

  public representsAll() {
    return false;
  }

  public representsNone() {
    return true;
  }

  public representsSome() {
    return false;
  }

  public representsAllExceptSome() {
    return false;
  }

  public clone(): KeySetNone {
    return new KeySetNone();
  }

  public invert(): KeySetAll {
    return new KeySetAll();
  }

  public isEqual(other: KeySet): boolean {
    return other.representsNone();
  }

  public remove(_other: KeySet): KeySetNone {
    return new KeySetNone();
  }

  public intersect(_other: KeySet): KeySetNone {
    return new KeySetNone();
  }
}

export function none(): KeySetNone {
  return new KeySetNone();
}
