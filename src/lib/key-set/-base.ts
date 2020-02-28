/* tslint:disable:interface-over-type-literal */
import { IKeyLabel, isKeyLabel } from "../key-set";
import { EmptyArray, NonEmptyArray } from "../util/array-types";
import { KeySetAll } from "./all";
import { KeySetAllExceptSome } from "./all-except-some";
import { KeySetNone } from "./none";
import { KeySetSome } from "./some";

export type Key = string | number | IKeyLabel<string> | IKeyLabel<number>;

export function isValidKey(x: any): x is Key {
  if (typeof x === "string" || typeof x === "number") return true;
  return isKeyLabel(x);
}

export type KeySet<T extends Key = Key> =
  | KeySetAll
  | KeySetNone
  | KeySetSome<T>
  | KeySetAllExceptSome<T>;

/**
 * one type for each of the 4 sets
 */
export enum KeySetTypes {
  all = "ALL",
  allExceptSome = "ALL_EXCEPT_SOME",
  none = "NONE",
  some = "SOME"
}

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

export interface IKeySetClass {
  /**
   * returns the KeySetType that defines this class
   */
  readonly type: KeySetTypes;

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
}

export function isKeySetAll(x: any): x is KeySetAll {
  return x instanceof KeySetAll;
}

export function isKeySetNone(x: any): x is KeySetNone {
  return x instanceof KeySetNone;
}

export function isKeySetSome(x: any): x is KeySetSome<Key> {
  return x instanceof KeySetSome;
}

export function isKeySetAllExceptSome(x: any): x is KeySetAllExceptSome<Key> {
  return x instanceof KeySetAllExceptSome;
}

export function isKeySet(x: any): x is KeySet {
  return (
    isKeySetAll(x) ||
    isKeySetNone(x) ||
    isKeySetSome(x) ||
    isKeySetAllExceptSome(x)
  );
}
