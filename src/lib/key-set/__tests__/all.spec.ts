import { expect, test } from "vitest";
import { all, allKeySet, KeySetAll, KeySetNone } from "../../..";

const keySet = new KeySetAll();

test("all()", () => {
  expect(all()).toBeInstanceOf(KeySetAll);
});
test("allKeySet()", () => {
  expect(allKeySet()).toBeInstanceOf(KeySetAll);
});

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
  if (!keySet.representsAll()) {
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
  expect(keySet.representsAllExceptSome()).toBe(false);
  if (keySet.representsAllExceptSome()) {
    const _never: never = keySet;
    throw new Error(`Expected keySet type, but it was ${_never}`);
  }
});
