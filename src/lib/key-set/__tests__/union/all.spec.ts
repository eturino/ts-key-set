import { InvalidKeySetError, KeySetAll, KeySetAllExceptSome, KeySetNone, KeySetSome } from "../../../..";

const keySetAll = new KeySetAll();
const keySetNone = new KeySetNone();
const keySetSome = new KeySetSome([1, 2, 3]);
const keySetAllExceptSome = new KeySetAllExceptSome([1, 2, 3]);

const keySet = new KeySetAll();

test("#union(keySetAll)", () => {
  const rest = keySet.union(keySetAll);
  expect(rest instanceof KeySetAll).toBeTruthy();
  expect(keySet).not.toBe(rest);
});

test("#union(keySetNone)", () => {
  const rest = keySet.union(keySetNone);
  expect(rest instanceof KeySetAll).toBeTruthy();
  expect(keySet).not.toBe(rest);
});

test("#union(keySetSome)", () => {
  const rest = keySet.union(keySetSome);
  expect(rest instanceof KeySetAll).toBeTruthy();
  expect(keySet).not.toBe(rest);
});

test("#union(keySetAllExceptSome)", () => {
  const rest = keySet.union(keySetAllExceptSome);
  expect(rest instanceof KeySetAll).toBeTruthy();
  expect(keySet).not.toBe(rest);
});

test("#union(somethingInvalid)", () => {
  expect(() => {
    keySet.union(null as unknown as KeySetAll);
  }).toThrowError(InvalidKeySetError);
});
