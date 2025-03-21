import { expect, test } from "vitest";
import { KeySetAllExceptSome, KeySetSome, some, someKeySet } from "../../..";

const keySet = new KeySetSome([3, 1, 2, 3, 2, 1]); // => keys 1, 2, 3

test("some()", () => {
  expect(some([1])).toBeInstanceOf(KeySetSome);
});
test("someKeySet()", () => {
  expect(someKeySet([1])).toBeInstanceOf(KeySetSome);
});

test("removes duplicates", () => {
  expect(keySet.elements).toEqual(new Set([1, 2, 3]));
});

test("#elements", () => {
  expect(keySet.elements).toEqual(new Set([3, 1, 2]));
});

test("#elementsList", () => {
  expect(keySet.elementsList).toEqual([3, 1, 2]);
});

test("#elementsSorted", () => {
  expect(keySet.elementsSorted).toEqual([1, 2, 3]);
});

test("#clone()", () => {
  const result = keySet.clone();
  expect(result instanceof KeySetSome).toBeTruthy();
  expect(keySet === result).toBe(false);
  expect(keySet.elements).toEqual(new Set(result.elements));
});

test("#invert()", () => {
  const result = keySet.invert();
  expect(result instanceof KeySetAllExceptSome).toBeTruthy();
  expect(keySet.elements).toEqual(new Set(result.elements));
});

test("#representsAll()", () => {
  expect(keySet.representsAll()).toBe(false);
  if (keySet.representsAll()) {
    const _never: never = keySet;
    throw new Error(`Expected keySet type, but it was ${_never}`);
  }
});

test("#representsNone()", () => {
  expect(keySet.representsNone()).toBe(false);
  if (keySet.representsNone()) {
    const _never: never = keySet;
    throw new Error(`Expected keySet type, but it was ${_never}`);
  }
});

test("#representsSome()", () => {
  expect(keySet.representsSome()).toBe(true);
  if (!keySet.representsSome()) {
    const _never: never = keySet;
    throw new Error(`Expected keySet type, but it was ${_never}`);
  }
});

test("#representsAllExceptSome()", () => {
  expect(keySet.representsAllExceptSome()).toBe(false);
  if (keySet.representsAllExceptSome()) {
    const _never: never = keySet;
    throw new Error(`Expected keySet type, but it was ${_never}`);
  }
});
