import { KeySetAll } from "./all";
import { KeySetAllExceptSome } from "./all-except-some";
import { KeySetNone } from "./none";
import { KeySetSome } from "./some";

export type Key = string | number;

export type KeySet<T extends Key = Key> =
  | KeySetAll
  | KeySetNone
  | KeySetSome<T>
  | KeySetAllExceptSome<T>;

/**
 * one type for each of the 4 sets
 */
export enum KeySetTypes {
  all = "all",
  none = "none",
  some = "some",
  allExceptSome = "allExceptSome"
}

export interface IKeySetClass {
  /**
   * returns the KeySetType that defines this class
   */
  readonly type: KeySetTypes;

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
