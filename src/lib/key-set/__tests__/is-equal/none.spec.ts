import { KeySetAll, KeySetAllExceptSome, KeySetNone, KeySetSome } from "../../../..";

const keySetAll = new KeySetAll();
const keySetNone = new KeySetNone();
const keySetSome = new KeySetSome([1, 2, 3]);
const keySetAllExceptSome = new KeySetAllExceptSome([1, 2, 3]);

const keySet = new KeySetNone();

test("#isEqual(keySetAll)", () => {
  expect(keySet.isEqual(keySetAll)).toBe(false);
});

test("#isEqual(keySetNone)", () => {
  expect(keySet.isEqual(keySetNone)).toBe(true);
});

test("#isEqual(keySetSome)", () => {
  expect(keySet.isEqual(keySetSome)).toBe(false);
});

test("#isEqual(keySetAllExceptSome)", () => {
  expect(keySet.isEqual(keySetAllExceptSome)).toBe(false);
});
