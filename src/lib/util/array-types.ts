export type NonEmptyArray<T = unknown> = [T, ...T[]];
export type EmptyArray<T = unknown> = T[] & { length: 0 };

export function isEmptyArray<T>(x: T[]): x is EmptyArray<T> {
  return x.length === 0;
}

export function isNonEmptyArray<T>(x: T[]): x is NonEmptyArray<T> {
  return x.length > 0;
}

// const lists: Array<NonEmptyArray<any>> = [
//   [1], // ok
//   [] // error
// ]
//
// const lists2: Array<EmptyArray<any>> = [
//   [], // ok
//   [1] // error
// ]
