import { KeySetAll, KeySetNone, none, noneKeySet } from "../../..";

const keySet = new KeySetNone();

test("none()", () => {
  expect(none()).toBeInstanceOf(KeySetNone);
});
test("noneKeySet()", () => {
  expect(noneKeySet()).toBeInstanceOf(KeySetNone);
});

test("#clone()", () => {
  const result = keySet.clone();
  expect(result instanceof KeySetNone).toBeTruthy();
  expect(keySet === result).toBe(false);
});

test("#elements", () => {
  expect(keySet.elements).toEqual(new Set([]));
});

test("#elementsList", () => {
  expect(keySet.elementsList).toEqual([]);
});

test("#elementsSorted", () => {
  expect(keySet.elementsSorted).toEqual([]);
});

test("#invert()", () => {
  const result = keySet.invert();
  expect(result instanceof KeySetAll).toBeTruthy();
});

test("#representsAll()", () => {
  expect(keySet.representsAll()).toBe(false);
});

test("#representsNone()", () => {
  expect(keySet.representsNone()).toBe(true);
});

test("#representsSome()", () => {
  expect(keySet.representsSome()).toBe(false);
});

test("#representsAllExceptSome()", () => {
  expect(keySet.representsAllExceptSome()).toBe(false);
});
