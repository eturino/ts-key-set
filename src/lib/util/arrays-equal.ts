import { Key } from '../key-set/-base';

// copied from https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript

function sameElements<T extends Key>(a: T[], b: T[]): boolean {
  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

export function arraysEqual<T extends Key>(a: T[] | null, b: T[] | null) {
  if (a === b) return true;
  if (a == null || b == null || a.length !== b.length) return false;
  return sameElements(a, b);
}
