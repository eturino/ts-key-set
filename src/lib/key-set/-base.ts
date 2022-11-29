import { IKeyLabel, isKeyLabel } from "../key-set";
import { EmptyArray, NonEmptyArray } from "../util/array-types";
import { KeySetAll } from "./all";
import { KeySetAllExceptSome } from "./all-except-some";
import { KeySetNone } from "./none";
import { KeySetSome } from "./some";

export type Key = string | number | IKeyLabel<string | number> | IKeyLabel<string> | IKeyLabel<number>;

export function isValidKey(x: unknown): x is Key {
  if (typeof x === "string" || typeof x === "number") return true;
  return isKeyLabel(x);
}

export type KeySet<T extends Key = Key> = KeySetAll<T> | KeySetNone<T> | KeySetSome<T> | KeySetAllExceptSome<T>;

export type KeyLabelSet<T extends string | number = string | number> =
  | KeySetAll<IKeyLabel<T>>
  | KeySetNone<IKeyLabel<T>>
  | KeySetSome<IKeyLabel<T>>
  | KeySetAllExceptSome<IKeyLabel<T>>;

/**
 * one type for each of the 4 sets
 */
export enum KeySetTypes {
  all = "ALL",
  allExceptSome = "ALL_EXCEPT_SOME",
  none = "NONE",
  some = "SOME",
}

export type KeySetTypesEnumValues = "ALL" | "ALL_EXCEPT_SOME" | "NONE" | "SOME";

export type KeySetAllSerialized<T extends Key = Key> =
  | { type: KeySetTypes.all }
  | { type: KeySetTypes.all; elements: EmptyArray<T> };

export type KeySetNoneSerialized<T extends Key = Key> =
  | { type: KeySetTypes.none }
  | { type: KeySetTypes.none; elements: EmptyArray<T> };

export type KeySetSomeSerialized<T extends Key = Key> = {
  type: KeySetTypes.some;
  elements: NonEmptyArray<T>;
};

export type KeySetAllExceptSomeSerialized<T extends Key = Key> = {
  type: KeySetTypes.allExceptSome;
  elements: NonEmptyArray<T>;
};

export type KeySetSerialized<T extends Key = Key> =
  | { type: KeySetTypes }
  | KeySetAllSerialized<T>
  | KeySetNoneSerialized<T>
  | KeySetSomeSerialized<T>
  | KeySetAllExceptSomeSerialized<T>;

export type KeyLabelSetAllSerialized<T extends string | number = string | number> =
  | { type: KeySetTypes.all }
  | { type: KeySetTypes.all; elements: EmptyArray<T> };

export type KeyLabelSetNoneSerialized<T extends string | number = string | number> =
  | { type: KeySetTypes.none }
  | { type: KeySetTypes.none; elements: EmptyArray<T> };

export type KeyLabelSetSomeSerialized<T extends string | number = string | number> = {
  type: KeySetTypes.some;
  elements: NonEmptyArray<IKeyLabel<T>>;
};

export type KeyLabelSetAllExceptSomeSerialized<T extends string | number = string | number> = {
  type: KeySetTypes.allExceptSome;
  elements: NonEmptyArray<IKeyLabel<T>>;
};

export type KeyLabelSetSerialized<T extends string | number = string | number> =
  | { type: KeySetTypes }
  | KeyLabelSetAllSerialized<T>
  | KeyLabelSetNoneSerialized<T>
  | KeyLabelSetSomeSerialized<T>
  | KeyLabelSetAllExceptSomeSerialized<T>;

export interface IKeySetClass<T extends Key> {
  /**
   * returns the KeySetType that defines this class
   */
  readonly type: KeySetTypes;

  readonly elements: Set<T>;

  serialized(): KeySetSerialized;

  /**
   * returns true if the KeySet represents ALL elements (KeySetAll) (U or universal set)
   */
  representsAll(): boolean;

  /**
   * returns true if the KeySet represents NO elements (KeySetNone) (∅ or empty set {})
   */
  representsNone(): boolean;

  /**
   * returns true if the KeySet represents only some elements (KeySetSome) (Set of A {1,2,3})
   */
  representsSome(): boolean;

  /**
   * returns true if the KeySet represents all except a specific list of elements (KeySetAllExceptSome) (Complement set of A {1,2,3})
   */
  representsAllExceptSome(): boolean;

  /**
   * returns another KeySet of the same type that represents the same Set
   */
  clone(): KeySet;

  /**
   * returns true if the other KeySet is of the same type and represents the same Set
   *
   * @param other
   */
  isEqual(other: KeySet): boolean;

  /**
   * returns the complementary KeySet, of the opposite type, representing the elements that this set does not include
   *
   * All -> None
   * None -> All
   * Some -> AllExceptSome
   * AllExceptSome -> Some
   */
  invert(): KeySet;

  /**
   * returns a new KeySet with the difference between ThisSet - OtherSet (A - B)
   *
   * @param other
   */
  remove(other: KeySet): KeySet;

  /**
   * returns a new KeySet with the intersection of both Sets (A ∩ B), representing the elements present in both sets
   * @param other
   */
  intersect(other: KeySet): KeySet;

  /**
   * returns a new KeySet with the union of both Sets (A U B), representing the elements present in either A or B
   * @param other
   */
  union(other: KeySet): KeySet;

  /**
   * returns a boolean if the KeySet includes the given element
   *
   * @param element
   * @alias includes
   */
  contains(element: T): boolean;

  /**
   * returns a boolean if the KeySet includes the given element
   *
   * @param element
   * @alias contains
   */
  includes(element: T): boolean;
}

export function isKeySetAll<T extends Key>(x: KeySet<T> | KeySetSerialized<T>): x is KeySetAll<T>;
export function isKeySetAll(x: unknown): x is KeySetAll;
export function isKeySetAll(x: unknown): x is KeySetAll {
  return x instanceof KeySetAll;
}

export function isKeySetNone<T extends Key>(x: KeySet<T> | KeySetSerialized<T>): x is KeySetNone<T>;
export function isKeySetNone(x: unknown): x is KeySetNone;
export function isKeySetNone(x: unknown): x is KeySetNone {
  return x instanceof KeySetNone;
}

export function isKeySetSome<T extends Key>(x: KeySet<T> | KeySetSerialized<T>): x is KeySetSome<T>;
export function isKeySetSome(x: unknown): x is KeySetSome<Key>;
export function isKeySetSome(x: unknown): x is KeySetSome<Key> {
  return x instanceof KeySetSome;
}

export function isKeySetAllExceptSome<T extends Key>(x: KeySet<T> | KeySetSerialized<T>): x is KeySetAllExceptSome<T>;
export function isKeySetAllExceptSome(x: unknown): x is KeySetAllExceptSome<Key>;
export function isKeySetAllExceptSome(x: unknown): x is KeySetAllExceptSome<Key> {
  return x instanceof KeySetAllExceptSome;
}

export function isKeySet<T extends Key>(x: KeySet<T> | KeySetSerialized<T>): x is KeySet<T>;
export function isKeySet(x: unknown): x is KeySet;
export function isKeySet(x: unknown): x is KeySet {
  return isKeySetAll(x) || isKeySetNone(x) || isKeySetSome(x) || isKeySetAllExceptSome(x);
}
