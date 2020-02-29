import { KeySetAll, KeySetAllExceptSome, KeySetNone, KeySetSome } from "../../../..";

const keySetAll = new KeySetAll();
const keySetNone = new KeySetNone();
const keySetSome = new KeySetSome([1, 2, 3]);
const keySetAllExceptSome = new KeySetAllExceptSome([1, 2, 3]);

const keySet = new KeySetNone();

test("#intersect(keySetAll)", () => {
  const rest = keySet.intersect(keySetAll);
  expect(rest instanceof KeySetNone).toBeTruthy();
  expect(keySet === rest).toBe(false);
});

test("#intersect(keySetNone)", () => {
  const rest = keySet.intersect(keySetNone);
  expect(rest instanceof KeySetNone).toBeTruthy();
  expect(keySet === rest).toBe(false);
});

test("#intersect(keySetSome)", () => {
  const rest = keySet.intersect(keySetSome);
  expect(rest instanceof KeySetNone).toBeTruthy();
  expect(keySet === rest).toBe(false);
});

test("#intersect(keySetAllExceptSome)", () => {
  const rest = keySet.intersect(keySetAllExceptSome);
  expect(rest instanceof KeySetNone).toBeTruthy();
  expect(keySet === rest).toBe(false);
});
