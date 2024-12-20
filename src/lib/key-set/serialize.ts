import { isObject } from "../util/object-utils";
import {
  type Key,
  type KeySet,
  type KeySetAllExceptSomeSerialized,
  type KeySetAllSerialized,
  type KeySetNoneSerialized,
  type KeySetSerialized,
  type KeySetSomeSerialized,
  KeySetTypes,
  isKeySet,
} from "./-base";
import { type KeySetAll, all } from "./all";
import { type KeySetAllExceptSome, allExceptSome } from "./all-except-some";
import { InvalidKeySetError } from "./invalid-key-set-error";
import { type KeySetNone, none } from "./none";
import { type KeySetSome, some } from "./some";

/**
 * @hidden
 * @internal
 */
function hasShapeOfSerialized(given: unknown): given is { type: string; elements?: Key[] } {
  if (!isObject(given)) return false;

  if (given.elements && !Array.isArray(given.elements)) return false;

  return typeof given.type === "string";
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
