import { KeySetAll, KeySetAllExceptSome, KeySetNone, KeySetSome } from "../../../..";

const keySetAll = new KeySetAll();
const keySetNone = new KeySetNone();
const keySetSome = new KeySetSome([1, 2, 3]);
const keySetAllExceptSome = new KeySetAllExceptSome([1, 2, 3]);

const keySet = new KeySetAll();

test("#remove(keySetAll)", () => {
  expect(keySet.remove(keySetAll) instanceof KeySetNone).toBeTruthy();
});

test("#remove(keySetNone)", () => {
  const rest = keySet.remove(keySetNone);
  expect(rest instanceof KeySetAll).toBeTruthy();
  expect(keySet === rest).toBe(false);
});

test("#remove(keySetSome)", () => {
  const rest = keySet.remove(keySetSome);
  expect(rest instanceof KeySetAllExceptSome).toBeTruthy();

  const r = rest as KeySetAllExceptSome<number>;
  expect(r.keys).toEqual(keySetSome.keys);
});

test("#remove(keySetAllExceptSome)", () => {
  const rest = keySet.remove(keySetAllExceptSome);
  expect(rest instanceof KeySetSome).toBeTruthy();

  const r = rest as KeySetSome<number>;
  expect(r.keys).toEqual(keySetAllExceptSome.keys);
});
