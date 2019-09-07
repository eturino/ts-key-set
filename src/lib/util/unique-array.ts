// from https://medium.com/@jakubsynowiec/unique-array-values-in-javascript-7c932682766c (credit to Jakub Synowiec)

export function uniqueArray<T>(source: T[]): T[] {
  const length = source.length;
  const result = [];
  const seen = new Set();
  outer: for (let index = 0; index < length; index++) {
    const value = source[index];
    if (seen.has(value)) continue outer;
    seen.add(value);
    result.push(value);
  }
  return result;
}
