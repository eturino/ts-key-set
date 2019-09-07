import { KeySetAll } from './all';
import { KeySetAllExceptSome } from './all-except-some';
import { KeySetNone } from './none';
import { KeySetSome } from './some';

export type KeySet<T extends string | number = string | number> =
  | KeySetAll
  | KeySetNone
  | KeySetSome<T>
  | KeySetAllExceptSome<T>;

export interface IKeySetClass {
  representsAll(): boolean;

  representsNone(): boolean;

  representsSome(): boolean;

  representsAllExceptSome(): boolean;

  isEqual(other: KeySet): boolean;

  remove(other: KeySet): KeySet;

  clone(): KeySet;

  invert(): KeySet;

  intersect(other: KeySet): KeySet;
}
