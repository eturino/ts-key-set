import { KeySetAllExceptSome, KeySetSome } from "../../..";

const keySet = new KeySetSome([3, 1, 2, 3, 2, 1]); // => keys 1, 2, 3

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
});

test("#representsNone()", () => {
  expect(keySet.representsNone()).toBe(false);
});

test("#representsSome()", () => {
  expect(keySet.representsSome()).toBe(true);
});

test("#representsAllExceptSome()", () => {
  expect(keySet.representsAllExceptSome()).toBe(false);
});
