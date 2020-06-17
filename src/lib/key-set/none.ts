import { Key, KeySet, KeySetNoneSerialized, KeySetTypes } from "./-base";
import { KeySetGlobal } from "./-global";
import { KeySetAll } from "./all";

export class KeySetNone<T extends Key = Key> extends KeySetGlobal<T> {
  public readonly type = KeySetTypes.none;

  public serialized(): KeySetNoneSerialized<T> {
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

  public remove(_other: KeySet<T> | KeySetGlobal<Key>): KeySetNone<T> {
    return new KeySetNone<T>();
  }

  public intersect(_other: KeySet | KeySetGlobal<Key>): KeySetNone<T> {
    return new KeySetNone<T>();
  }
}

export function none<T extends Key = Key>(): KeySetNone<T> {
  return new KeySetNone<T>();
}
