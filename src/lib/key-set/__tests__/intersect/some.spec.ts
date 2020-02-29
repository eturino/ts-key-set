import {
  KeySetAll,
  KeySetAllExceptSome,
  KeySetNone,
  KeySetSome
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

const keySet = new KeySetSome(keys); // => keys 1, 2, 3

// ALL

test("#intersect(keySetAll)", () => {
  const rest = keySet.intersect(keySetAll);
  expect(rest instanceof KeySetSome).toBeTruthy();
  expect(rest.keys).toEqual(keySet.keys);
});

// NONE

test("#intersect(keySetNone)", () => {
  const rest = keySet.intersect(keySetNone);
  expect(rest instanceof KeySetNone).toBeTruthy();
});

// SOME

test("#intersect(keySetSomeSameKeys)", () => {
  const rest = keySet.intersect(keySetSomeSameKeys);
  expect(rest instanceof KeySetSome).toBeTruthy();
  expect(keySet === rest).toBe(false);
  const r = rest as KeySetSome<number>;
  expect(r.keys).toEqual(keySet.keys);
});

test("#intersect(keySetSomeSubSetKeys)", () => {
  const rest = keySet.intersect(keySetSomeSubSetKeys);
  expect(rest instanceof KeySetSome).toBeTruthy();
  expect(keySet === rest).toBe(false);
  const r = rest as KeySetSome<number>;
  expect(r.keys).toEqual(subSetKeys);
});

test("#intersect(keySetSomeMoreKeys)", () => {
  const rest = keySet.intersect(keySetSomeMoreKeys);
  expect(rest instanceof KeySetSome).toBeTruthy();
  expect(keySet === rest).toBe(false);
  const r = rest as KeySetSome<number>;
  expect(r.keys).toEqual(keySet.keys);
});

test("#intersect(keySetSomeDiffKeys)", () => {
  const rest = keySet.intersect(keySetSomeDiffKeys);
  expect(rest instanceof KeySetNone).toBeTruthy();
  expect(keySet === rest).toBe(false);
});

// ALL EXCEPT SOME

test("#intersect(keySetAllExceptSomeSameKeys)", () => {
  const rest = keySet.intersect(keySetAllExceptSomeSameKeys);
  expect(rest instanceof KeySetNone).toBeTruthy();
  expect(keySet === rest).toBe(false);
});

test("#intersect(keySetAllExceptSomeSubSetKeys)", () => {
  const rest = keySet.intersect(keySetAllExceptSomeSubSetKeys);
  expect(rest instanceof KeySetSome).toBeTruthy();
  expect(keySet === rest).toBe(false);
  const r = rest as KeySetSome<number>;
  expect(r.keys).toEqual(restKeys);
});

test("#intersect(keySetAllExceptSomeMoreKeys)", () => {
  const rest = keySet.intersect(keySetAllExceptSomeMoreKeys);
  expect(rest instanceof KeySetNone).toBeTruthy();
  expect(keySet === rest).toBe(false);
});

test("#intersect(keySetAllExceptSomeDiffKeys)", () => {
  const rest = keySet.intersect(keySetAllExceptSomeDiffKeys);
  expect(rest instanceof KeySetSome).toBeTruthy();
  expect(keySet === rest).toBe(false);
  const r = rest as KeySetSome<number>;
  expect(r.keys).toEqual(keys);
});
