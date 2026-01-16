import type {
  IKeySetClass,
  Key,
  KeySet,
  KeySetAllSerialized,
  KeySetNoneSerialized,
  KeySetTypes,
} from "./-base";
import type { KeySetAll } from "./all";
import type { KeySetAllExceptSome } from "./all-except-some";
import type { KeySetNone } from "./none";
import type { KeySetSome } from "./some";

/**
 * @internal
 * @hidden
 */
export abstract class KeySetGlobal<T extends Key> implements IKeySetClass<T> {
  public abstract readonly type: KeySetTypes.all | KeySetTypes.none;

  public readonly elements: Set<T> = Object.freeze(new Set<T>());

  public get elementsList(): T[] {
    return [...this.elements];
  }

  public get elementsSorted(): T[] {
    return [...this.elements].sort();
  }

  public toJSON(
    _key?: string,
  ): KeySetAllSerialized<T> | KeySetNoneSerialized<T> {
    return this.serialized();
  }

  public abstract serialized():
    | KeySetAllSerialized<T>
    | KeySetNoneSerialized<T>;

  public abstract representsAll(): this is KeySetAll<T>;

  public abstract representsNone(): this is KeySetNone<T>;

  public abstract representsSome(): this is KeySetSome<T>;

  public abstract representsAllExceptSome(): this is KeySetAllExceptSome<T>;

  public abstract clone(): KeySetAll | KeySetNone;

  public abstract invert(): KeySetAll | KeySetNone;

  public abstract isEqual(other: KeySet): boolean;

  public abstract remove(
    other: KeySet | KeySetAll<Key> | KeySetNone<Key>,
  ): KeySet;

  public abstract intersect(
    other: KeySet | KeySetAll<Key> | KeySetNone<Key>,
  ): KeySet;

  public abstract union(
    other: KeySet | KeySetAll<Key> | KeySetNone<Key>,
  ): KeySet;

  public abstract includes(element: T): boolean;

  public contains(element: T): boolean {
    return this.includes(element);
  }
}
