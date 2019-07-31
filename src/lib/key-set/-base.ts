import { KeySetAll } from './all';
import { KeySetAllExceptSome } from './all-except-some';
import { KeySetNone } from './none';
import { KeySetSome } from './some';

export interface IKeySetClass {
  representsAll(): boolean;

  representsNone(): boolean;

  representsSome(): boolean;

  representsAllExceptSome(): boolean;

  isEqual(other: KeySetAll | KeySetNone | KeySetSome<string | number> | KeySetAllExceptSome<string | number>): boolean;

  remove(other: KeySetAll | KeySetNone | KeySetSome<string | number> | KeySetAllExceptSome<string | number>): KeySetAll | KeySetNone | KeySetSome<string | number> | KeySetAllExceptSome<string | number>;
}
