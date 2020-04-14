import { Key } from "../key-set/-base";
import { IKeyLabel, isKeyLabel } from "./object-utils";

// from https://medium.com/@jakubsynowiec/unique-array-values-in-javascript-7c932682766c (credit to Jakub Synowiec)
export function uniqueArray<T>(source: T[] | ReadonlyArray<T>): T[] {
  const length = source.length;
  const result = [];
  const seen = new Set<T>();
  outer: for (let index = 0; index < length; index++) {
    const value = source[index];
    if (seen.has(value)) continue outer;
    seen.add(value);
    result.push(value);
  }
  return result;
}

export function uniqueKeyLabelArray<K extends string | number>(
  source: IKeyLabel<K>[] | ReadonlyArray<IKeyLabel<K>>
): IKeyLabel<K>[] {
  const length = source.length;
  const result = [];
  const seen = new Set<K>();
  outer: for (let index = 0; index < length; index++) {
    const value = source[index];
    const key = value.key;
    if (seen.has(key)) continue outer;
    seen.add(key);
    result.push(value);
  }
  return result;
}

export function uniqueKeys<T extends Key>(source: T[] | ReadonlyArray<T>): T[] {
  if (!source || !source.length) return [];

  if (isKeyLabel(source[0])) {
    return uniqueKeyLabelArray(source as IKeyLabel<string | number>[]) as T[];
  }

  return uniqueArray(source);
}
