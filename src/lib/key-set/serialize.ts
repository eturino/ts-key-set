import { isObject } from "../util/object-utils";
import {
  isKeySet,
  Key,
  KeySet,
  KeySetAllExceptSomeSerialized,
  KeySetAllSerialized,
  KeySetNoneSerialized,
  KeySetSerialized,
  KeySetSomeSerialized,
  KeySetTypes
} from "./-base";
import { all, KeySetAll } from "./all";
import { allExceptSome, KeySetAllExceptSome } from "./all-except-some";
import { InvalidKeySetError } from "./invalid-key-set-error";
import { KeySetNone, none } from "./none";
import { KeySetSome, some } from "./some";

/**
 * @hidden
 * @internal
 */
function hasShapeOfSerialized(
  given: any
): given is { type: string; elements?: Key[] } {
  if (!isObject(given)) return false;

  if (given.elements && !Array.isArray(given.elements)) return false;

  return typeof given.type === "string";
}

/**
 * @hidden
 * @internal
 */
function isValidKeySetAllNone(type: any, elements: any): boolean {
  if (type !== KeySetTypes.all && type !== KeySetTypes.none) return false;

  return !elements || (Array.isArray(elements) && elements.length === 0);
}

/**
 * @hidden
 * @internal
 */
function isValidKeySetElements(type: any, elements: any): boolean {
  if (type !== KeySetTypes.some && type !== KeySetTypes.allExceptSome) {
    return false;
  }

  return elements && Array.isArray(elements) && elements.length > 0;
}

export function isKeySetSerialized(given: any): given is KeySetSerialized {
  if (!hasShapeOfSerialized(given)) return false;

  return (
    isValidKeySetAllNone(given.type, given.elements) ||
    isValidKeySetElements(given.type, given.elements)
  );
}

export function isKeySetAllNoneSerialized(
  given: any
): given is KeySetAllSerialized | KeySetNoneSerialized {
  return (
    hasShapeOfSerialized(given) &&
    isValidKeySetAllNone(given.type, given.elements)
  );
}

export function isKeySetElementsSerialized(
  given: any
): given is KeySetSomeSerialized | KeySetAllExceptSomeSerialized {
  return (
    hasShapeOfSerialized(given) &&
    isValidKeySetElements(given.type, given.elements)
  );
}

export function isKeySetAllSerialized(
  given: any
): given is KeySetAllSerialized {
  return isKeySetAllNoneSerialized(given) && given.type === KeySetTypes.all;
}

export function isKeySetNoneSerialized(
  given: any
): given is KeySetNoneSerialized {
  return isKeySetAllNoneSerialized(given) && given.type === KeySetTypes.none;
}

export function isKeySetSomeSerialized(
  given: any
): given is KeySetSomeSerialized {
  return isKeySetElementsSerialized(given) && given.type === KeySetTypes.some;
}

export function isKeySetAllExceptSomeSerialized(
  given: any
): given is KeySetAllExceptSomeSerialized {
  return (
    isKeySetElementsSerialized(given) &&
    given.type === KeySetTypes.allExceptSome
  );
}

export function serializeKeySet<T extends Key>(
  x: KeySetAllSerialized | KeySetAll
): KeySetAllSerialized;
export function serializeKeySet<T extends Key>(
  x: KeySetNoneSerialized | KeySetNone
): KeySetNoneSerialized;
export function serializeKeySet<T extends Key>(
  x: KeySetSomeSerialized<T> | KeySetSome<T>
): KeySetSomeSerialized<T>;
export function serializeKeySet<T extends Key>(
  x: KeySetAllExceptSomeSerialized<T> | KeySetAllExceptSome<T>
): KeySetAllExceptSomeSerialized<T>;
export function serializeKeySet<T extends Key>(
  x: KeySetSerialized<T> | KeySet<T>
): KeySetSerialized<T>;
export function serializeKeySet<T extends Key>(
  keySet: KeySet<T> | KeySetSerialized<T>
): KeySetSerialized<T> {
  if (isKeySet(keySet)) {
    return keySet.serialized();
  }

  if (isKeySetSerialized(keySet)) return keySet;

  throw new InvalidKeySetError(
    `keySet expected, given ${JSON.stringify(keySet)}`
  );
}

export function parseKeySet<T extends Key>(
  x: KeySetAllSerialized | KeySetAll
): KeySetAll;
export function parseKeySet<T extends Key>(
  x: KeySetNoneSerialized | KeySetNone
): KeySetNone;
export function parseKeySet<T extends Key>(
  x: KeySetSomeSerialized<T> | KeySetSome<T>
): KeySetSome<T>;
export function parseKeySet<T extends Key>(
  x: KeySetAllExceptSomeSerialized<T> | KeySetAllExceptSome<T>
): KeySetAllExceptSome<T>;
export function parseKeySet<T extends Key>(
  x: KeySetSerialized<T> | KeySet<T>
): KeySet<T>;
export function parseKeySet<T extends Key>(
  x: KeySetSerialized<T> | KeySet<T>
): KeySet<T> {
  if (isKeySet(x)) return x;

  if (!isKeySetSerialized(x)) {
    throw new InvalidKeySetError(
      `keySetSerialized expected, given ${JSON.stringify(x)}`
    );
  }

  if (x.type === KeySetTypes.all) return all();
  if (x.type === KeySetTypes.none) return none();
  if (x.type === KeySetTypes.some) {
    return some((x as KeySetSomeSerialized<T>).elements);
  }
  return allExceptSome((x as KeySetAllExceptSomeSerialized<T>).elements);
}
