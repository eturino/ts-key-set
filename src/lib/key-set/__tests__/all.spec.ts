import { KeySetAll, KeySetNone } from "../../..";

const keySet = new KeySetAll();

test("#clone()", () => {
  const result = keySet.clone();
  expect(result instanceof KeySetAll).toBeTruthy();
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
  expect(result instanceof KeySetNone).toBeTruthy();
});

test("#representsAll()", () => {
  expect(keySet.representsAll()).toBe(true);
});

test("#representsNone()", () => {
  expect(keySet.representsNone()).toBe(false);
});

test("#representsSome()", () => {
  expect(keySet.representsSome()).toBe(false);
});

test("#representsAllExceptSome()", () => {
  expect(keySet.representsAllExceptSome()).toBe(false);
});
