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

  const first = firstOf(list);
  if (isKeyLabel(first)) {
    const keyLabelList = list as IKeyLabel<string | number>[];
    // Sort in place - list is already a copy from the spread above
    return keyLabelList.sort((a, b) => {
      if (a.key < b.key) return -1;
      if (a.key > b.key) return 1;
      return 0;
    }) as T[];
  }

  // Sort in place - list is already a copy from the spread above
  return list.sort();
}
