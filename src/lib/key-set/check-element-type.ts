import { type IKeyLabel, isKeyLabel } from "../util/object-utils";
import { firstOf } from "../util/set-by-keys";
import { type Key, type KeySet, isKeySet } from "./-base";
import { KeySetAll } from "./all";
import type { KeySetAllExceptSome } from "./all-except-some";
import { KeySetNone } from "./none";
import type { KeySetSome } from "./some";

export function isKeySetOfStrings(x: KeySetAll): x is KeySetAll;
export function isKeySetOfStrings(x: KeySetNone): x is KeySetNone;
export function isKeySetOfStrings(x: KeySetSome<Key>): x is KeySetSome<string>;
export function isKeySetOfStrings(x: KeySetAllExceptSome<Key>): x is KeySetAllExceptSome<string>;
export function isKeySetOfStrings(x: KeySet): x is KeySet<string>;
export function isKeySetOfStrings(x: KeySet): x is KeySet<string> {
  if (!isKeySet(x)) return false;
  if (x instanceof KeySetAll || x instanceof KeySetNone) return true;
  return typeof firstOf(x.elements) === "string";
}

export function isKeySetOfNumbers(x: KeySetAll): x is KeySetAll;
export function isKeySetOfNumbers(x: KeySetNone): x is KeySetNone;
export function isKeySetOfNumbers(x: KeySetSome<Key>): x is KeySetSome<number>;
export function isKeySetOfNumbers(x: KeySetAllExceptSome<Key>): x is KeySetAllExceptSome<number>;
export function isKeySetOfNumbers(x: KeySet): x is KeySet<number>;
export function isKeySetOfNumbers(x: KeySet): x is KeySet<number> {
  if (!isKeySet(x)) return false;
  if (x instanceof KeySetAll || x instanceof KeySetNone) return true;
  return typeof firstOf(x.elements) === "number";
}

export function isKeySetOfStringKeyLabels(x: KeySetAll): x is KeySetAll;
export function isKeySetOfStringKeyLabels(x: KeySetNone): x is KeySetNone;
export function isKeySetOfStringKeyLabels(x: KeySetSome<Key>): x is KeySetSome<IKeyLabel<string>>;
export function isKeySetOfStringKeyLabels(x: KeySetAllExceptSome<Key>): x is KeySetAllExceptSome<IKeyLabel<string>>;
export function isKeySetOfStringKeyLabels(x: KeySet): x is KeySet<IKeyLabel<string>>;
export function isKeySetOfStringKeyLabels(x: KeySet): x is KeySet<IKeyLabel<string>> {
  if (!isKeySet(x)) return false;
  if (x instanceof KeySetAll || x instanceof KeySetNone) return true;
  const e = firstOf(x.elements);
  return isKeyLabel(e) && typeof e.key === "string";
}

export function isKeySetOfNumberKeyLabels(x: KeySetAll): x is KeySetAll;
export function isKeySetOfNumberKeyLabels(x: KeySetNone): x is KeySetNone;
export function isKeySetOfNumberKeyLabels(x: KeySetSome<Key>): x is KeySetSome<IKeyLabel<number>>;
export function isKeySetOfNumberKeyLabels(x: KeySetAllExceptSome<Key>): x is KeySetAllExceptSome<IKeyLabel<number>>;
export function isKeySetOfNumberKeyLabels(x: KeySet): x is KeySet<IKeyLabel<number>>;
export function isKeySetOfNumberKeyLabels(x: KeySet): x is KeySet<IKeyLabel<number>> {
  if (!isKeySet(x)) return false;
  if (x instanceof KeySetAll || x instanceof KeySetNone) return true;
  const e = firstOf(x.elements);
  return isKeyLabel(e) && typeof e.key === "number";
}
