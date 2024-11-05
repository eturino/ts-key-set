import { expect, test } from "vitest";

import { KeySetAll, KeySetAllExceptSome, KeySetNone, KeySetSome } from "../../../..";

const keySetAll = new KeySetAll();
const keySetNone = new KeySetNone();
const keySetSome = new KeySetSome([1, 2, 3]);
const keySetAllExceptSome = new KeySetAllExceptSome([1, 2, 3]);

const keySet = new KeySetNone();

test("#remove(keySetAll)", () => {
  const rest = keySet.remove(keySetAll);
  expect(rest instanceof KeySetNone).toBeTruthy();
  expect(keySet === rest).toBe(false);
});

test("#remove(keySetNone)", () => {
  const rest = keySet.remove(keySetNone);
  expect(rest instanceof KeySetNone).toBeTruthy();
  expect(keySet === rest).toBe(false);
});

test("#remove(keySetSome)", () => {
  const rest = keySet.remove(keySetSome);
  expect(rest instanceof KeySetNone).toBeTruthy();
  expect(keySet === rest).toBe(false);
});

test("#remove(keySetAllExceptSome)", () => {
  const rest = keySet.remove(keySetAllExceptSome);
  expect(rest instanceof KeySetNone).toBeTruthy();
  expect(keySet === rest).toBe(false);
});
