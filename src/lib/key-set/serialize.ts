import { type IKeyLabel, isKeyLabel, isObject } from "../util/object-utils";
import {
  type ComposedKeyLabelSetSerialized,
  type ComposedKeySetSerialized,
  type Key,
  type KeyLabelSet,
  type KeyLabelSetAll,
  type KeyLabelSetAllExceptSome,
  type KeyLabelSetAllExceptSomeSerialized,
  type KeyLabelSetAllSerialized,
  type KeyLabelSetNone,
  type KeyLabelSetNoneSerialized,
  type KeyLabelSetSerialized,
  type KeyLabelSetSome,
  type KeyLabelSetSomeSerialized,
  type KeySet,
  type KeySetAllExceptSomeSerialized,
  type KeySetAllSerialized,
  type KeySetNoneSerialized,
  type KeySetSerialized,
  type KeySetSomeSerialized,
  KeySetTypes,
  isKeyLabelSet,
  isKeySet,
  isKeySetType,
} from "./-base";
import { type KeySetAll, all } from "./all";
import { type KeySetAllExceptSome, allExceptSome } from "./all-except-some";
import {
  type ComposedKeyLabelSet,
  type ComposedKeySet,
  composedKeySetFrom,
  isComposedKeyLabelSet,
  isComposedKeySet,
} from "./composed";
import { InvalidKeySetError } from "./invalid-key-set-error";
import { type KeySetNone, none } from "./none";
import { type KeySetSome, some } from "./some";

/**
 * @hidden
 * @internal
 */
function hasShapeOfSerialized(given: unknown): given is { type: KeySetTypes; elements?: Key[] } {
  if (!isObject(given)) return false;

  if (given.elements && !Array.isArray(given.elements)) return false;

  return isKeySetType(given.type);
}

/**
 * @hidden
 * @internal
 */
function isValidKeySetAllNone(type: unknown, elements: unknown): boolean {
  if (type !== KeySetTypes.all && type !== KeySetTypes.none) return false;

  return !elements || (Array.isArray(elements) && elements.length === 0);
}

/**
 * @hidden
 * @internal
 */
function isValidKeySetElements(type: unknown, elements: unknown): boolean {
  if (type !== KeySetTypes.some && type !== KeySetTypes.allExceptSome) {
    return false;
  }

  return !!elements && Array.isArray(elements) && elements.length > 0;
}

export function isKeySetSerialized(given: unknown): given is KeySetSerialized {
  if (!hasShapeOfSerialized(given)) return false;

  return isValidKeySetAllNone(given.type, given.elements) || isValidKeySetElements(given.type, given.elements);
}

export function isKeySetAllNoneSerialized(given: unknown): given is KeySetAllSerialized | KeySetNoneSerialized {
  return hasShapeOfSerialized(given) && isValidKeySetAllNone(given.type, given.elements);
}

export function isKeySetElementsSerialized(
  given: unknown,
): given is KeySetSomeSerialized | KeySetAllExceptSomeSerialized {
  return hasShapeOfSerialized(given) && isValidKeySetElements(given.type, given.elements);
}

export function isKeySetAllSerialized(given: unknown): given is KeySetAllSerialized {
  return isKeySetAllNoneSerialized(given) && given.type === KeySetTypes.all;
}

export function isKeySetNoneSerialized(given: unknown): given is KeySetNoneSerialized {
  return isKeySetAllNoneSerialized(given) && given.type === KeySetTypes.none;
}

export function isKeySetSomeSerialized(given: unknown): given is KeySetSomeSerialized {
  return isKeySetElementsSerialized(given) && given.type === KeySetTypes.some;
}

export function isKeySetAllExceptSomeSerialized(given: unknown): given is KeySetAllExceptSomeSerialized {
  return isKeySetElementsSerialized(given) && given.type === KeySetTypes.allExceptSome;
}

export function isKeyLabelSetSerialized(given: unknown): given is KeyLabelSetSerialized {
  if (isKeySetElementsSerialized(given)) {
    return given.elements.every((x) => isKeyLabel(x));
  }

  return isKeySetAllSerialized(given) || isKeySetNoneSerialized(given);
}

export function isComposedKeySetSerialized<T extends Key>(
  x: ComposedKeySetSerialized<T>,
): x is ComposedKeySetSerialized<T>;
export function isComposedKeySetSerialized(x: unknown): x is ComposedKeySetSerialized;
export function isComposedKeySetSerialized(x: unknown): x is ComposedKeySetSerialized {
  if (!x || !Array.isArray(x)) return false;

  return x.every((y) => isKeySetSerialized(y));
}

export function isComposedKeyLabelSetSerialized<T extends string | number>(
  x: ComposedKeyLabelSetSerialized<T>,
): x is ComposedKeyLabelSetSerialized<T>;
export function isComposedKeyLabelSetSerialized(x: unknown): x is ComposedKeyLabelSetSerialized;
export function isComposedKeyLabelSetSerialized(x: unknown): x is ComposedKeyLabelSetSerialized {
  if (!x || !Array.isArray(x)) return false;

  return x.every((y) => isKeyLabelSetSerialized(y));
}

export function serializeComposedKeySet<T extends Key>(
  x: ComposedKeySet<T> | ComposedKeySetSerialized<T>,
): ComposedKeySetSerialized<T> {
  if (isComposedKeySetSerialized(x)) return x;
  return x.serialized();
}

export function serializeComposedKeyLabelSet<T extends string | number>(
  x: ComposedKeyLabelSet<T> | ComposedKeyLabelSetSerialized<T>,
): ComposedKeyLabelSetSerialized<T> {
  if (isComposedKeyLabelSetSerialized(x)) return x;
  return x.serialized();
}

export function serializeKeySet<T extends string | number>(
  x: KeyLabelSetAllSerialized<T> | KeyLabelSetAll<T>,
): KeyLabelSetAllSerialized<T>;
export function serializeKeySet<T extends string | number>(
  x: KeyLabelSetNoneSerialized<T> | KeyLabelSetNone<T>,
): KeyLabelSetNoneSerialized<T>;
export function serializeKeySet<T extends string | number>(
  x: KeyLabelSetSomeSerialized<T> | KeyLabelSetSome<T>,
): KeyLabelSetSomeSerialized<T>;
export function serializeKeySet<T extends string | number>(
  x: KeyLabelSetAllExceptSomeSerialized<T> | KeyLabelSetAllExceptSome<T>,
): KeyLabelSetAllExceptSomeSerialized<T>;
export function serializeKeySet<T extends Key>(x: KeySetAllSerialized<T> | KeySetAll<T>): KeySetAllSerialized<T>;
export function serializeKeySet<T extends Key>(x: KeySetNoneSerialized<T> | KeySetNone<T>): KeySetNoneSerialized<T>;
export function serializeKeySet<T extends Key>(x: KeySetSomeSerialized<T> | KeySetSome<T>): KeySetSomeSerialized<T>;
export function serializeKeySet<T extends Key>(
  x: KeySetAllExceptSomeSerialized<T> | KeySetAllExceptSome<T>,
): KeySetAllExceptSomeSerialized<T>;
export function serializeKeySet<T extends Key>(x: KeySetSerialized<T> | KeySet<T>): KeySetSerialized<T>;
export function serializeKeySet<T extends Key>(keySet: KeySet<T> | KeySetSerialized<T>): KeySetSerialized<T> {
  if (isKeySet(keySet)) {
    return keySet.serialized();
  }

  if (isKeySetSerialized(keySet)) return keySet;

  throw new InvalidKeySetError(`keySet expected, given ${JSON.stringify(keySet)}`);
}

export const serializeKeyLabelSet = serializeKeySet;

export function parseComposedKeySet<T extends Key>(
  x: ComposedKeySetSerialized<T> | ComposedKeySet<T>,
): ComposedKeySet<T> {
  if (isComposedKeySet(x)) return x;

  if (!isComposedKeySetSerialized(x)) {
    throw new InvalidKeySetError(`composedKeySetSerialized expected, given ${JSON.stringify(x)}`);
  }

  return composedKeySetFrom(x.map((y) => parseKeySet(y)));
}

export function parseComposedKeyLabelSet<T extends string | number>(
  x: ComposedKeyLabelSetSerialized<T> | ComposedKeyLabelSet<T>,
): ComposedKeyLabelSet<T> {
  if (isComposedKeyLabelSet(x)) return x;

  if (!isComposedKeySetSerialized(x)) {
    throw new InvalidKeySetError(`composedKeySetSerialized expected, given ${JSON.stringify(x)}`);
  }

  return composedKeySetFrom(x.map((y) => parseKeyLabelSet(y)));
}

export function parseKeySet<T extends Key>(x: KeySetAllSerialized<T> | KeySetAll<T>): KeySetAll<T>;
export function parseKeySet<T extends Key>(x: KeySetNoneSerialized<T> | KeySetNone<T>): KeySetNone<T>;
export function parseKeySet<T extends Key>(x: KeySetSomeSerialized<T> | KeySetSome<T>): KeySetSome<T>;
export function parseKeySet<T extends Key>(
  x: KeySetAllExceptSomeSerialized<T> | KeySetAllExceptSome<T>,
): KeySetAllExceptSome<T>;
export function parseKeySet<T extends Key>(x: KeySetSerialized<T> | KeySet<T>): KeySet<T>;
export function parseKeySet<T extends Key>(x: KeySetSerialized<T> | KeySet<T>): KeySet<T> {
  if (isKeySet(x)) return x;

  if (!isKeySetSerialized(x)) {
    throw new InvalidKeySetError(`keySetSerialized expected, given ${JSON.stringify(x)}`);
  }

  if (x.type === KeySetTypes.all) return all<T>();
  if (x.type === KeySetTypes.none) return none<T>();
  if (x.type === KeySetTypes.some) {
    return some((x as KeySetSomeSerialized<T>).elements);
  }
  return allExceptSome((x as KeySetAllExceptSomeSerialized<T>).elements);
}

export function parseKeyLabelSet<T extends string | number>(
  x: KeyLabelSetAllSerialized<T> | KeyLabelSetAll<T>,
): KeyLabelSetAll<T>;
export function parseKeyLabelSet<T extends string | number>(
  x: KeyLabelSetNoneSerialized<T> | KeyLabelSetNone<T>,
): KeyLabelSetNone<T>;
export function parseKeyLabelSet<T extends string | number>(
  x: KeyLabelSetSomeSerialized<T> | KeyLabelSetSome<T>,
): KeyLabelSetSome<T>;
export function parseKeyLabelSet<T extends string | number>(
  x: KeyLabelSetAllExceptSomeSerialized<T> | KeyLabelSetAllExceptSome<T>,
): KeyLabelSetAllExceptSome<T>;
export function parseKeyLabelSet<T extends string | number>(
  x: KeyLabelSetSerialized<T> | KeyLabelSet<T>,
): KeyLabelSet<T>;
export function parseKeyLabelSet<T extends string | number>(
  x: KeyLabelSetSerialized<T> | KeyLabelSet<T>,
): KeyLabelSet<T> {
  if (isKeyLabelSet<T>(x)) return x;

  if (!isKeyLabelSetSerialized(x)) {
    throw new InvalidKeySetError(`KeyLabelSetSerialized expected, given ${JSON.stringify(x)}`);
  }

  if (x.type === KeySetTypes.all) return all<IKeyLabel<T>>();
  if (x.type === KeySetTypes.none) return none<IKeyLabel<T>>();
  if (x.type === KeySetTypes.some) {
    return some((x as KeyLabelSetSomeSerialized<T>).elements);
  }
  return allExceptSome((x as KeyLabelSetAllExceptSomeSerialized<T>).elements);
}
