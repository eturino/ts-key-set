import { allExceptSome, allExceptSomeKeySet, KeySetAllExceptSome, KeySetSome } from "../../..";

const keySet = new KeySetAllExceptSome([3, 1, 2, 3, 2, 1]); // => keys 1, 2, 3

test("allExceptSome()", () => {
  expect(allExceptSome([1])).toBeInstanceOf(KeySetAllExceptSome);
});
test("allExceptSomeKeySet()", () => {
  expect(allExceptSomeKeySet([1])).toBeInstanceOf(KeySetAllExceptSome);
});
test("removes duplicates", () => {
  expect(keySet.elements).toEqual(new Set([3, 1, 2]));
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
  expect(result instanceof KeySetAllExceptSome).toBeTruthy();
  expect(keySet === result).toBe(false);
  expect(keySet.elements).toEqual(new Set(result.elements));
});

test("#invert()", () => {
  const result = keySet.invert();
  expect(result instanceof KeySetSome).toBeTruthy();
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
  expect(keySet.representsSome()).toBe(false);
  if (keySet.representsSome()) {
    const _never: never = keySet;
    throw new Error(`Expected keySet type, but it was ${_never}`);
  }
});

test("#representsAllExceptSome()", () => {
  expect(keySet.representsAllExceptSome()).toBe(true);
  if (!keySet.representsAllExceptSome()) {
    const _never: never = keySet;
    throw new Error(`Expected keySet type, but it was ${_never}`);
  }
});
