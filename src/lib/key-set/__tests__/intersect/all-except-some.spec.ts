import { expect, test } from "vitest";

import {
  KeySetAll,
  KeySetAllExceptSome,
  KeySetNone,
  KeySetSome,
} from "../../../..";

const keySetAll = new KeySetAll<number>();
const keySetNone = new KeySetNone<number>();

const subSetKeys = [1, 2];
const restKeys = [3];
const keys = [...subSetKeys, ...restKeys];
const extraKeys = [4];
const moreKeys = [...keys, ...extraKeys];
const otherKeys = [5, 6];

const keySetSomeSameKeys = new KeySetSome(keys);
const keySetSomeSubSetKeys = new KeySetSome(subSetKeys);
const keySetSomeMoreKeys = new KeySetSome(moreKeys);
const keySetSomeDiffKeys = new KeySetSome(otherKeys);

const keySetAllExceptSomeSameKeys = new KeySetAllExceptSome(keys);
const keySetAllExceptSomeSubSetKeys = new KeySetAllExceptSome(subSetKeys);
const keySetAllExceptSomeMoreKeys = new KeySetAllExceptSome(moreKeys);
const keySetAllExceptSomeDiffKeys = new KeySetAllExceptSome(otherKeys);

const keySet = new KeySetAllExceptSome(keys); // => keys 1, 2, 3

// ALL

test("#intersect(keySetAll)", () => {
  const rest = keySet.intersect(keySetAll);
  expect(rest instanceof KeySetAllExceptSome).toBeTruthy();
  expect(keySet === rest).toBe(false);
  const r = rest as KeySetAllExceptSome<number>;
  expect(r.elementsSorted).toEqual(keySet.elementsSorted);
});

// NONE

test("#intersect(keySetNone)", () => {
  const rest = keySet.intersect(keySetNone);
  expect(rest instanceof KeySetNone).toBeTruthy();
});

// SOME

test("#intersect(keySetSomeSameKeys)", () => {
  const rest = keySet.intersect(keySetSomeSameKeys);
  expect(rest instanceof KeySetNone).toBeTruthy();
});

test("#intersect(keySetSomeSubSetKeys)", () => {
  const rest = keySet.intersect(keySetSomeSubSetKeys);
  expect(rest instanceof KeySetNone).toBeTruthy();
});

test("#intersect(keySetSomeMoreKeys)", () => {
  const rest = keySet.intersect(keySetSomeMoreKeys);
  expect(rest instanceof KeySetSome).toBeTruthy();
  expect(rest.elementsSorted).toEqual(extraKeys);
});

test("#intersect(keySetSomeDiffKeys)", () => {
  const rest = keySet.intersect(keySetSomeDiffKeys);
  expect(rest instanceof KeySetSome).toBeTruthy();
  expect(rest.elementsSorted).toEqual(otherKeys);
});

// ALL EXCEPT SOME

test("#intersect(keySetAllExceptSomeSameKeys)", () => {
  const rest = keySet.intersect(keySetAllExceptSomeSameKeys);
  expect(rest instanceof KeySetAllExceptSome).toBeTruthy();
  expect(keySet === rest).toBe(false);
  expect(rest.elementsSorted).toEqual(keys);
});

test("#intersect(keySetAllExceptSomeSubSetKeys)", () => {
  const rest = keySet.intersect(keySetAllExceptSomeSubSetKeys);
  expect(rest instanceof KeySetAllExceptSome).toBeTruthy();
  expect(keySet === rest).toBe(false);
  const r = rest as KeySetAllExceptSome<number>;
  expect(r.elementsSorted).toEqual(keys);
});

test("#intersect(keySetAllExceptSomeMoreKeys)", () => {
  const rest = keySet.intersect(keySetAllExceptSomeMoreKeys);
  expect(rest instanceof KeySetAllExceptSome).toBeTruthy();
  expect(keySet === rest).toBe(false);
  const r = rest as KeySetAllExceptSome<number>;
  expect(r.elementsSorted).toEqual(moreKeys);
});

test("#intersect(keySetAllExceptSomeDiffKeys)", () => {
  const rest = keySet.intersect(keySetAllExceptSomeDiffKeys);
  expect(rest instanceof KeySetAllExceptSome).toBeTruthy();
  expect(keySet === rest).toBe(false);
  const r = rest as KeySetAllExceptSome<number>;
  expect(r.elementsSorted).toEqual([...keys, ...otherKeys].sort());
});
