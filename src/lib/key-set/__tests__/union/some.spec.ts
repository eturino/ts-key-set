import { KeySetAll, KeySetAllExceptSome, KeySetNone, KeySetSome } from "../../../..";

const keySetAll = new KeySetAll<number>();
const keySetNone = new KeySetNone<number>();

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

test("#union(keySetAll)", () => {
  const rest = keySet.union(keySetAll);
  expect(rest instanceof KeySetAll).toBeTruthy();
});

// NONE

test("#union(keySetNone)", () => {
  const rest = keySet.union(keySetNone);
  expect(rest instanceof KeySetSome).toBeTruthy();
  expect(rest.keys).toEqual(keySet.keys);
});

// SOME

test("#union(keySetSomeSameKeys)", () => {
  const rest = keySet.union(keySetSomeSameKeys);
  expect(rest instanceof KeySetSome).toBeTruthy();
  expect(keySet === rest).toBe(false);
  const r = rest as KeySetSome<number>;
  expect(r.keys).toEqual(keySet.keys);
});

test("#union(keySetSomeSubSetKeys)", () => {
  const rest = keySet.union(keySetSomeSubSetKeys);
  expect(rest instanceof KeySetSome).toBeTruthy();
  expect(keySet === rest).toBe(false);
  const r = rest as KeySetSome<number>;
  expect(r.keys).toEqual(keySet.keys);
});

test("#union(keySetSomeMoreKeys)", () => {
  const rest = keySet.union(keySetSomeMoreKeys);
  expect(rest instanceof KeySetSome).toBeTruthy();
  expect(keySet === rest).toBe(false);
  const r = rest as KeySetSome<number>;
  expect(r.keys).toEqual(moreKeys);
});

test("#union(keySetSomeDiffKeys)", () => {
  const rest = keySet.union(keySetSomeDiffKeys);
  expect(rest instanceof KeySetSome).toBeTruthy();
  expect(keySet === rest).toBe(false);
  const r = rest as KeySetSome<number>;
  expect(r.keys).toEqual([...keys, ...otherKeys].sort());
});

// ALL EXCEPT SOME

test("#union(keySetAllExceptSomeSameKeys)", () => {
  const rest = keySet.union(keySetAllExceptSomeSameKeys);
  expect(rest instanceof KeySetAll).toBeTruthy();
});

test("#union(keySetAllExceptSomeSubSetKeys)", () => {
  const rest = keySet.union(keySetAllExceptSomeSubSetKeys);
  expect(rest instanceof KeySetAll).toBeTruthy();
});

test("#union(keySetAllExceptSomeMoreKeys)", () => {
  const rest = keySet.union(keySetAllExceptSomeMoreKeys);
  expect(rest instanceof KeySetAllExceptSome).toBeTruthy();
  const r = rest as KeySetAllExceptSome<number>;
  expect(r.keys).toEqual(extraKeys);
});

test("#union(keySetAllExceptSomeDiffKeys)", () => {
  const rest = keySet.union(keySetAllExceptSomeDiffKeys);
  expect(rest instanceof KeySetAllExceptSome).toBeTruthy();
  const r = rest as KeySetAllExceptSome<number>;
  expect(r.keys).toEqual(otherKeys);
});
