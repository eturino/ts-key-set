/**
 * Native helper functions to replace es-toolkit dependencies.
 * These are optimized for the specific use cases in this library.
 */

/**
 * Sorts an array by the result of an iteratee function.
 * Returns a new array (does not mutate the original).
 *
 * Uses Schwartzian transform (decorate-sort-undecorate) to call iteratee
 * only once per element, O(n), instead of once per comparison, O(n log n).
 *
 * @param arr - The array to sort
 * @param iteratee - Function that returns the value to sort by
 */
export function sortBy<T, U>(arr: T[], iteratee: (item: T) => U): T[] {
  // Decorate: compute sort keys once per element
  return arr
    .map((item) => ({ item, key: iteratee(item) }))
    .sort((a, b) => compareValues(a.key, b.key))
    .map(({ item }) => item); // Undecorate: extract original items
}

/**
 * Compares two values for sorting.
 * Handles primitives and arrays (for multi-key sorting).
 */
function compareValues(a: unknown, b: unknown): number {
  // Handle array comparison (multi-key sort) - lexicographic ordering
  if (Array.isArray(a) && Array.isArray(b)) {
    const minLen = Math.min(a.length, b.length);
    for (let i = 0; i < minLen; i++) {
      const result = compareValues(a[i], b[i]);
      if (result !== 0) return result;
    }
    // Shorter arrays come first (like string comparison)
    return a.length - b.length;
  }

  // Handle undefined (sorted last)
  if (a === undefined && b === undefined) return 0;
  if (a === undefined) return 1;
  if (b === undefined) return -1;

  // Handle null (sorted after defined values, before undefined)
  if (a === null && b === null) return 0;
  if (a === null) return 1;
  if (b === null) return -1;

  // Handle primitives
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

/**
 * Returns unique elements from an array using a custom comparator.
 * Keeps the first occurrence of each unique element.
 *
 * @param arr - The array to deduplicate
 * @param comparator - Function that returns true if two elements are equal
 */
export function uniqueWith<T>(
  arr: T[],
  comparator: (a: T, b: T) => boolean,
): T[] {
  const result: T[] = [];
  for (const item of arr) {
    const isDuplicate = result.some((existing) => comparator(item, existing));
    if (!isDuplicate) {
      result.push(item);
    }
  }
  return result;
}

/**
 * Checks if two Sets are equal (same size and same elements).
 * Elements are compared using strict equality.
 *
 * @param a - First set
 * @param b - Second set
 */
export function setsEqual<T>(a: Set<T>, b: Set<T>): boolean {
  if (a.size !== b.size) return false;
  for (const item of a) {
    if (!b.has(item)) return false;
  }
  return true;
}
