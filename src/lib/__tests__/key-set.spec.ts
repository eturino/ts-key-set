import { describe, expect, it } from "vitest";

import {
  all,
  allExceptSome,
  allExceptSomeForced,
  type IKeyLabel,
  InvalidEmptySetError,
  isValidKey,
  KeySetAll,
  KeySetAllExceptSome,
  KeySetNone,
  KeySetSome,
  KeySetTypes,
  none,
  some,
  someForced,
} from "../..";

describe("isValidKey()", () => {
  it("isValidKey(1): true", () => {
    expect(isValidKey(1)).toBeTruthy();
  });
  it("isValidKey('1'): true", () => {
    expect(isValidKey("1")).toBeTruthy();
  });
  it("isValidKey({}): false", () => {
    expect(isValidKey({})).toBeFalsy();
  });
  it("isValidKey({key: 1}): false", () => {
    expect(isValidKey({ key: 1 })).toBeFalsy();
  });
  it("isValidKey({key: 1, label: 'A'}): true", () => {
    expect(isValidKey({ key: 1, label: "A" })).toBeTruthy();
  });
  it("isValidKey({key: 1, label: 'A', other: 'stuff'}): true", () => {
    expect(isValidKey({ key: 1, label: "A", other: "stuff" })).toBeTruthy();
  });
});

test("all()", () => {
  const keySet = all();
  expect(keySet instanceof KeySetAll).toBeTruthy();
  expect(keySet.type).toEqual(KeySetTypes.all);
  expect(keySet.elementsSorted).toEqual([]);
  expect(keySet.elementsList).toEqual([]);
  expect(keySet.elements).toEqual(new Set([]));
});

test("none()", () => {
  const keySet = none();
  expect(keySet instanceof KeySetNone).toBeTruthy();
  expect(keySet.type).toEqual(KeySetTypes.none);
  expect(keySet.elementsSorted).toEqual([]);
  expect(keySet.elementsList).toEqual([]);
  expect(keySet.elements).toEqual(new Set([]));
});

test("some([])", () => {
  const keySet = some([]);
  expect(keySet instanceof KeySetNone).toBeTruthy();
  expect(keySet.type).toEqual(KeySetTypes.none);
  expect(keySet.elementsSorted).toEqual([]);
  expect(keySet.elementsList).toEqual([]);
  expect(keySet.elements).toEqual(new Set([]));
});

test("someForced([])", () => {
  expect(() => {
    someForced([]);
  }).toThrowError(InvalidEmptySetError);
});

test("allExceptSome([])", () => {
  const keySet = allExceptSome([]);
  expect(keySet instanceof KeySetAll).toBeTruthy();
  expect(keySet.type).toEqual(KeySetTypes.all);
  expect(keySet.elementsSorted).toEqual([]);
  expect(keySet.elementsList).toEqual([]);
  expect(keySet.elements).toEqual(new Set([]));
});

test("allExceptSomeForced([])", () => {
  expect(() => {
    allExceptSomeForced([]);
  }).toThrowError(InvalidEmptySetError);
});

test("some([1, 3, 2])", () => {
  const keySet = some([1, 3, 2]);
  expect(keySet instanceof KeySetSome).toBeTruthy();
  expect((keySet as KeySetSome<number>).elementsSorted).toEqual([1, 2, 3]);
  expect((keySet as KeySetSome<number>).elementsList).toEqual([1, 3, 2]);
  expect((keySet as KeySetSome<number>).elements).toEqual(new Set([1, 2, 3]));
  expect(keySet.type).toEqual(KeySetTypes.some);
});

test("allExceptSome([1, 3, 2])", () => {
  const keySet = allExceptSome([1, 3, 2]);
  expect(keySet instanceof KeySetAllExceptSome).toBeTruthy();
  expect((keySet as KeySetAllExceptSome<number>).elementsSorted).toEqual([
    1, 2, 3,
  ]);
  expect((keySet as KeySetAllExceptSome<number>).elementsList).toEqual([
    1, 3, 2,
  ]);
  expect((keySet as KeySetAllExceptSome<number>).elements).toEqual(
    new Set([1, 2, 3]),
  );
  expect(keySet.type).toEqual(KeySetTypes.allExceptSome);
});

test("allExceptSome([{ key: 1, label: 'wa' }, { key: 1, label: 'B' }, { key: 1, label: 'wa' }, { key: 2, label: 'wa' }, { key: 3, label: 'other' }])", () => {
  const keySet = allExceptSome([
    { key: 3, label: "other" },
    { key: 1, label: "wa" },
    { key: 2, label: "wa" },
    { key: 1, label: "B" },
    { key: 1, label: "wa" },
  ]);
  expect(keySet instanceof KeySetAllExceptSome).toBeTruthy();
  expect(
    (keySet as KeySetAllExceptSome<IKeyLabel<number>>).elementsSorted,
  ).toEqual([
    { key: 1, label: "wa" },
    { key: 2, label: "wa" },
    { key: 3, label: "other" },
  ]);
  expect(
    (keySet as KeySetAllExceptSome<IKeyLabel<number>>).elementsList,
  ).toEqual([
    { key: 3, label: "other" },
    { key: 1, label: "wa" },
    { key: 2, label: "wa" },
  ]);
  expect((keySet as KeySetAllExceptSome<IKeyLabel<number>>).elements).toEqual(
    new Set([
      { key: 1, label: "wa" },
      { key: 2, label: "wa" },
      { key: 3, label: "other" },
    ]),
  );
  expect(keySet.type).toEqual(KeySetTypes.allExceptSome);
});

test("some([{ key: 1, label: 'wa' }, { key: 1, label: 'B' }, { key: 1, label: 'wa' }, { key: 2, label: 'wa' }, { key: 3, label: 'other' }])", () => {
  const keySet = some([
    { key: 3, label: "other" },
    { key: 1, label: "wa" },
    { key: 1, label: "B" },
    { key: 1, label: "wa" },
    { key: 2, label: "wa" },
  ]);
  expect(keySet instanceof KeySetSome).toBeTruthy();
  expect((keySet as KeySetSome<IKeyLabel<number>>).elementsSorted).toEqual([
    { key: 1, label: "wa" },
    { key: 2, label: "wa" },
    { key: 3, label: "other" },
  ]);
  expect((keySet as KeySetSome<IKeyLabel<number>>).elementsList).toEqual([
    { key: 3, label: "other" },
    { key: 1, label: "wa" },
    { key: 2, label: "wa" },
  ]);
  expect((keySet as KeySetSome<IKeyLabel<number>>).elements).toEqual(
    new Set([
      { key: 1, label: "wa" },
      { key: 2, label: "wa" },
      { key: 3, label: "other" },
    ]),
  );
  expect(keySet.type).toEqual(KeySetTypes.some);
});

test("someForced([1, 3, 2])", () => {
  const keySet = someForced([1, 3, 2]);
  expect(keySet instanceof KeySetSome).toBeTruthy();
  expect((keySet as KeySetSome<number>).elementsSorted).toEqual([1, 2, 3]);
  expect((keySet as KeySetSome<number>).elementsList).toEqual([1, 3, 2]);
  expect((keySet as KeySetSome<number>).elements).toEqual(new Set([1, 3, 2]));
  expect(keySet.type).toEqual(KeySetTypes.some);
});

test("allExceptSomeForced([1, 3, 2])", () => {
  const keySet = allExceptSomeForced([1, 3, 2]);
  expect(keySet instanceof KeySetAllExceptSome).toBeTruthy();
  expect((keySet as KeySetAllExceptSome<number>).elementsSorted).toEqual([
    1, 2, 3,
  ]);
  expect((keySet as KeySetAllExceptSome<number>).elementsList).toEqual([
    1, 3, 2,
  ]);
  expect((keySet as KeySetAllExceptSome<number>).elements).toEqual(
    new Set([1, 3, 2]),
  );
  expect(keySet.type).toEqual(KeySetTypes.allExceptSome);
});

test("new KeySetSome([]) throws error", () => {
  expect(() => new KeySetSome([])).toThrowError(InvalidEmptySetError);
});

test("new KeySetAllExceptSome([]) throws error", () => {
  expect(() => new KeySetAllExceptSome([])).toThrowError(InvalidEmptySetError);
});
