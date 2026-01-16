import { expect, test } from "vitest";

import {
  KeySetAll,
  KeySetAllExceptSome,
  KeySetNone,
  KeySetSome,
} from "../../../..";

const keySetAll = new KeySetAll();
const keySetNone = new KeySetNone();

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

test("#remove(keySetAll)", () => {
  const rest = keySet.remove(keySetAll);
  expect(rest instanceof KeySetNone).toBeTruthy();
});

// NONE

test("#remove(keySetNone)", () => {
  const rest = keySet.remove(keySetNone);
  expect(rest instanceof KeySetAllExceptSome).toBeTruthy();
  expect(rest.elementsSorted).toEqual(keySet.elementsSorted);
});

// SAME

test("#remove(keySetSomeSameKeys)", () => {
  const rest = keySet.remove(keySetSomeSameKeys);
  expect(rest instanceof KeySetAllExceptSome).toBeTruthy();
  expect(keySet === rest).toBe(false);
  expect(rest.elementsSorted).toEqual(keySet.elementsSorted);
});

test("#remove(keySetSomeSubSetKeys)", () => {
  const rest = keySet.remove(keySetSomeSubSetKeys);
  expect(rest instanceof KeySetAllExceptSome).toBeTruthy();
  expect(keySet === rest).toBe(false);
  expect(rest.elementsSorted).toEqual(keySet.elementsSorted);
});

test("#remove(keySetSomeMoreKeys)", () => {
  const rest = keySet.remove(keySetSomeMoreKeys);
  expect(rest instanceof KeySetAllExceptSome).toBeTruthy();
  expect(keySet === rest).toBe(false);
  const r = rest as KeySetAllExceptSome<number>;
  expect(r.elementsSorted).toEqual(moreKeys);
});

test("#remove(keySetSomeDiffKeys)", () => {
  const rest = keySet.remove(keySetSomeDiffKeys);
  expect(rest instanceof KeySetAllExceptSome).toBeTruthy();
  expect(keySet === rest).toBe(false);
  expect(rest.elementsSorted).toEqual([...keySet.elementsSorted, ...otherKeys]);
});

// ALL EXCEPT SOME

test("#remove(keySetAllExceptSomeSameKeys)", () => {
  const rest = keySet.remove(keySetAllExceptSomeSameKeys);
  expect(rest instanceof KeySetNone).toBeTruthy();
});

test("#remove(keySetAllExceptSomeSubSetKeys)", () => {
  const rest = keySet.remove(keySetAllExceptSomeSubSetKeys);
  expect(rest instanceof KeySetNone).toBeTruthy();
});

test("#remove(keySetAllExceptSomeMoreKeys)", () => {
  const rest = keySet.remove(keySetAllExceptSomeMoreKeys);
  expect(rest instanceof KeySetSome).toBeTruthy();
  expect(rest.elementsSorted).toEqual(extraKeys);
});

test("#remove(keySetAllExceptSomeDiffKeys)", () => {
  const rest = keySet.remove(keySetAllExceptSomeDiffKeys);
  expect(rest instanceof KeySetSome).toBeTruthy();
  expect(rest.elementsSorted).toEqual(otherKeys);
});
