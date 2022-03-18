import { InvalidKeySetError, KeySetAll, KeySetAllExceptSome, KeySetNone, KeySetSome } from "../../../..";

const keySetAll = new KeySetAll();
const keySetNone = new KeySetNone();
const keySetSome = new KeySetSome([1, 2, 3]);
const keySetAllExceptSome = new KeySetAllExceptSome([1, 2, 3]);

const keySet = new KeySetAll();

test("#intersect(keySetAll)", () => {
  const rest = keySet.intersect(keySetAll);
  expect(rest instanceof KeySetAll).toBeTruthy();
  expect(keySet === rest).toBe(false);
});

test("#intersect(keySetNone)", () => {
  const rest = keySet.intersect(keySetNone);
  expect(rest instanceof KeySetNone).toBeTruthy();
  expect(keySet).not.toBe(rest);
});

test("#intersect(keySetSome)", () => {
  const rest = keySet.intersect(keySetSome);
  expect(rest instanceof KeySetSome).toBeTruthy();

  const r = rest as KeySetSome<number>;
  expect(r.elementsSorted).toEqual(keySetSome.elementsSorted);
});

test("#intersect(keySetAllExceptSome)", () => {
  const rest = keySet.intersect(keySetAllExceptSome);
  expect(rest instanceof KeySetAllExceptSome).toBeTruthy();

  const r = rest as KeySetAllExceptSome<number>;
  expect(r.elementsSorted).toEqual(keySetAllExceptSome.elementsSorted);
});

test("#intersect(somethingInvalid)", () => {
  expect(() => {
    keySet.intersect(null as unknown as KeySetAll);
  }).toThrowError(InvalidKeySetError);
});
