import { sortBy } from "es-toolkit/compat";
import type { Key } from "../key-set/-base";
import { type IKeyLabel, isKeyLabel } from "./object-utils";
import { firstOf } from "./set-by-keys";

/**
 * Sorts a list of keys. If the keys are actually KeyLabel objects, they are sorted by key. Otherwise, they are naturally sorted.
 * Returns a new array with the sorted keys.
 *
 * @param keys
 */
export function sortKeys<T extends Key>(keys: Iterable<T>): T[] {
  const list = [...keys];
  if (list.length < 2) {
    return list;
  }

  if (isArrayOfKeyLabels(list)) {
    return sortBy(list, (key) => key.key);
  }

  return list.sort();
}

/**
 * @internal
 * @hidden
 */
function isArrayOfKeyLabels(keys: Key[]): keys is IKeyLabel<string | number>[] {
  return isKeyLabel(firstOf(keys)); // we can check only one because all the keys should be the same type
}
