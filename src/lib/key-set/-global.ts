import { EmptyArray } from "../util/array-types";
import { IKeySetClass, Key, KeySet, KeySetAllSerialized, KeySetNoneSerialized, KeySetTypes } from "./-base";
import { KeySetAll } from "./all";
import { KeySetNone } from "./none";

export abstract class KeySetGlobal<T extends Key> implements IKeySetClass<T> {
  public abstract readonly type: KeySetTypes.all | KeySetTypes.none;

  public get keys(): EmptyArray<T> {
    return [] as EmptyArray<T>;
  }

  public get elements(): EmptyArray<T> {
    return [] as EmptyArray<T>;
  }

  public toJSON(_key?: string): KeySetAllSerialized<T> | KeySetNoneSerialized<T> {
    return this.serialized();
  }

  public abstract serialized(): KeySetAllSerialized<T> | KeySetNoneSerialized<T>;

  public abstract representsAll(): boolean;

  public abstract representsNone(): boolean;

  public abstract representsSome(): boolean;

  public abstract representsAllExceptSome(): boolean;

  public abstract clone(): KeySetAll | KeySetNone;

  public abstract invert(): KeySetAll | KeySetNone;

  public abstract isEqual(other: KeySet): boolean;

  public abstract remove(other: KeySet | KeySetGlobal<Key>): KeySet;

  public abstract intersect(other: KeySet | KeySetGlobal<Key>): KeySet;

  public abstract union(other: KeySet | KeySetGlobal<Key>): KeySet;

  public abstract includes(element: T): boolean;

  public contains(element: T): boolean {
    return this.includes(element);
  }
}
