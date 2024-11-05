import type { Key } from "../key-set/-base";
import { type IKeyLabel, isKeyLabel } from "./object-utils";
import { sizeOf } from "./size-of";

/**
 * Returns a new Set containing the unique elements of the source list. If the elements given are KeyLabel, they are compared by key.
 *
 * @param source
 */
export function setByKeys<T extends Key>(source: T[] | ReadonlyArray<T> | Set<T>): Set<T> {
  if (sizeOf(source) === 0) return new Set();

  const elements = source instanceof Set ? [...source.values()] : source;
  if (isArrayOfKeyLabels(elements)) {
    return uniqueKeyLabelSet(elements) as Set<T>;
  }

  return new Set(source);
}

/**
 * @internal
 * @hidden
 */
function isArrayOfKeyLabels(source: unknown[] | ReadonlyArray<unknown>): source is IKeyLabel<string | number>[] {
  const firstElement = firstOf(source);
  return isKeyLabel(firstElement);
}

/**
 * @internal
 * @hidden
 */
export function firstOf<T>(source: T[] | ReadonlyArray<T> | Set<T>): T | undefined {
  if (source instanceof Set) {
    return source.values().next().value;
  }

  return source[0];
}

function uniqueKeyLabelSet<K extends string | number>(
  source: IKeyLabel<K>[] | ReadonlyArray<IKeyLabel<K>>,
): Set<IKeyLabel<K>> {
  const result = new Set<IKeyLabel<K>>();
  const seen = new Set<K>();
  for (const value of source) {
    if (!seen.has(value.key)) {
      seen.add(value.key);
      result.add(value);
    }
  }
  return result;
}
