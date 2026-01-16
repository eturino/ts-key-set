import { expect, test } from "vitest";
import {
  InvalidKeySetError,
  KeySetAll,
  KeySetAllExceptSome,
  KeySetNone,
  KeySetSome,
} from "../../../..";

const keySetAll = new KeySetAll();
const keySetNone = new KeySetNone();
const keySetSome = new KeySetSome([1, 2, 3]);
const keySetAllExceptSome = new KeySetAllExceptSome([1, 2, 3]);

const keySet = new KeySetNone();

test("#union(keySetAll)", () => {
  const rest = keySet.union(keySetAll);
  expect(rest instanceof KeySetAll).toBeTruthy();
  expect(keySet).not.toBe(rest);
});

test("#union(keySetNone)", () => {
  const rest = keySet.union(keySetNone);
  expect(rest instanceof KeySetNone).toBeTruthy();
  expect(keySet).not.toBe(rest);
});

test("#union(keySetSome)", () => {
  const rest = keySet.union(keySetSome);
  expect(rest instanceof KeySetSome).toBeTruthy();

  const r = rest as KeySetSome<number>;
  expect(r.elementsSorted).toEqual(keySetSome.elementsSorted);
});

test("#union(keySetAllExceptSome)", () => {
  const rest = keySet.union(keySetAllExceptSome);
  expect(rest instanceof KeySetAllExceptSome).toBeTruthy();

  const r = rest as KeySetAllExceptSome<number>;
  expect(r.elementsSorted).toEqual(keySetAllExceptSome.elementsSorted);
});

test("#union(somethingInvalid)", () => {
  expect(() => {
    keySet.union(null as unknown as KeySetAll);
  }).toThrowError(InvalidKeySetError);
});
