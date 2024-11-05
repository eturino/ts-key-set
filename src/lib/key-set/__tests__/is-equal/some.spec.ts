import { expect, test } from "vitest";

import { KeySetAll, KeySetAllExceptSome, KeySetNone, KeySetSome } from "../../../..";

const keySetAll = new KeySetAll<number>();
const keySetNone = new KeySetNone<number>();

const keySetSomeSameKeys = new KeySetSome<number>([1, 2, 3]);
const keySetSomeSubSetKeys = new KeySetSome<number>([1, 2]);
const keySetSomeMoreKeys = new KeySetSome<number>([1, 2, 3, 4]);
const keySetSomeDiffKeys = new KeySetSome<number>([5, 6]);

const keySetAllExceptSomeSameKeys = new KeySetAllExceptSome<number>([1, 2, 3]);
const keySetAllExceptSomeSubSetKeys = new KeySetAllExceptSome<number>([1, 2]);
const keySetAllExceptSomeMoreKeys = new KeySetAllExceptSome<number>([1, 2, 3, 4]);
const keySetAllExceptSomeDiffKeys = new KeySetAllExceptSome<number>([5, 6]);

const keySet = new KeySetSome<number>([3, 1, 2, 3, 2, 1]); // => keys 1, 2, 3

test("#isEqual(keySetAll)", () => {
  expect(keySet.isEqual(keySetAll)).toBe(false);
});

test("#isEqual(keySetNone)", () => {
  expect(keySet.isEqual(keySetNone)).toBe(false);
});

test("#isEqual(keySetAllExceptSomeSameKeys)", () => {
  expect(keySet.isEqual(keySetAllExceptSomeSameKeys)).toBe(false);
  expect(keySet.isEqual(keySetAllExceptSomeSubSetKeys)).toBe(false);
  expect(keySet.isEqual(keySetAllExceptSomeMoreKeys)).toBe(false);
  expect(keySet.isEqual(keySetAllExceptSomeDiffKeys)).toBe(false);
});

test("#isEqual(keySetSomeSameKeys)", () => {
  expect(keySet.isEqual(keySetSomeSameKeys)).toBe(true);
});

test("#isEqual(keySetSomeSubSetKeys)", () => {
  expect(keySet.isEqual(keySetSomeSubSetKeys)).toBe(false);
});

test("#isEqual(keySetSomeMoreKeys)", () => {
  expect(keySet.isEqual(keySetSomeMoreKeys)).toBe(false);
});

test("#isEqual(keySetSomeDiffKeys)", () => {
  expect(keySet.isEqual(keySetSomeDiffKeys)).toBe(false);
});
