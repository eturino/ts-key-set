import { IKeyLabel, isKeyLabel } from "../util/object-utils";
import { firstOf } from "../util/set-by-keys";
import {
  KeySetAllExceptSomeSerialized,
  KeySetAllSerialized,
  KeySetNoneSerialized,
  KeySetSerialized,
  KeySetSomeSerialized,
} from "./-base";
import { isKeySetAllNoneSerialized, isKeySetElementsSerialized } from "./serialize";

export function isKeySetSerializedOfStrings(x: KeySetAllSerialized): x is KeySetAllSerialized;
export function isKeySetSerializedOfStrings(x: KeySetNoneSerialized): x is KeySetNoneSerialized;
export function isKeySetSerializedOfStrings(x: KeySetSomeSerialized<any>): x is KeySetSomeSerialized<string>;
export function isKeySetSerializedOfStrings(
  x: KeySetAllExceptSomeSerialized<any>
): x is KeySetAllExceptSomeSerialized<string>;
export function isKeySetSerializedOfStrings(x: KeySetSerialized): x is KeySetSerialized<string>;
export function isKeySetSerializedOfStrings(x: KeySetSerialized): x is KeySetSerialized<string> {
  if (isKeySetAllNoneSerialized(x)) return true;
  return isKeySetElementsSerialized(x) && typeof firstOf(x.elements) === "string";
}

export function isKeySetSerializedOfNumbers(x: KeySetAllSerialized): x is KeySetAllSerialized;
export function isKeySetSerializedOfNumbers(x: KeySetNoneSerialized): x is KeySetNoneSerialized;
export function isKeySetSerializedOfNumbers(x: KeySetSomeSerialized<any>): x is KeySetSomeSerialized<number>;
export function isKeySetSerializedOfNumbers(
  x: KeySetAllExceptSomeSerialized<any>
): x is KeySetAllExceptSomeSerialized<number>;
export function isKeySetSerializedOfNumbers(x: KeySetSerialized): x is KeySetSerialized<number>;
export function isKeySetSerializedOfNumbers(x: KeySetSerialized): x is KeySetSerialized<number> {
  if (isKeySetAllNoneSerialized(x)) return true;
  return isKeySetElementsSerialized(x) && typeof firstOf(x.elements) === "number";
}

export function isKeySetSerializedOfStringKeyLabels(x: KeySetAllSerialized): x is KeySetAllSerialized;
export function isKeySetSerializedOfStringKeyLabels(x: KeySetNoneSerialized): x is KeySetNoneSerialized;
export function isKeySetSerializedOfStringKeyLabels(
  x: KeySetSomeSerialized<any>
): x is KeySetSomeSerialized<IKeyLabel<string>>;
export function isKeySetSerializedOfStringKeyLabels(
  x: KeySetAllExceptSomeSerialized<any>
): x is KeySetAllExceptSomeSerialized<IKeyLabel<string>>;
export function isKeySetSerializedOfStringKeyLabels(x: KeySetSerialized): x is KeySetSerialized<IKeyLabel<string>>;
export function isKeySetSerializedOfStringKeyLabels(x: KeySetSerialized): x is KeySetSerialized<IKeyLabel<string>> {
  if (isKeySetAllNoneSerialized(x)) return true;
  if (!isKeySetElementsSerialized(x)) return false;

  const e = firstOf(x.elements);
  return isKeyLabel(e) && typeof e.key === "string";
}

export function isKeySetSerializedOfNumberKeyLabels(x: KeySetAllSerialized): x is KeySetAllSerialized;
export function isKeySetSerializedOfNumberKeyLabels(x: KeySetNoneSerialized): x is KeySetNoneSerialized;
export function isKeySetSerializedOfNumberKeyLabels(
  x: KeySetSomeSerialized<any>
): x is KeySetSomeSerialized<IKeyLabel<number>>;
export function isKeySetSerializedOfNumberKeyLabels(
  x: KeySetAllExceptSomeSerialized<any>
): x is KeySetAllExceptSomeSerialized<IKeyLabel<number>>;
export function isKeySetSerializedOfNumberKeyLabels(x: KeySetSerialized): x is KeySetSerialized<IKeyLabel<number>>;
export function isKeySetSerializedOfNumberKeyLabels(x: KeySetSerialized): x is KeySetSerialized<IKeyLabel<number>> {
  if (isKeySetAllNoneSerialized(x)) return true;
  if (!isKeySetElementsSerialized(x)) return false;

  const e = firstOf(x.elements);
  return isKeyLabel(e) && typeof e.key === "number";
}
