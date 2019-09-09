import { KeySetAll } from '../../all';
import { KeySetAllExceptSome } from '../../all-except-some';
import { KeySetNone } from '../../none';
import { KeySetSome } from '../../some';

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

test('#remove(keySetAll)', () => {
  const rest = keySet.remove(keySetAll);
  expect(rest instanceof KeySetNone).toBeTruthy();
  expect(keySet === rest).toBe(false);
});

// NONE

test('#remove(keySetNone)', () => {
  const rest = keySet.remove(keySetNone);
  expect(rest instanceof KeySetSome).toBeTruthy();
  expect(keySet === rest).toBe(false);
  const r = rest as KeySetSome<number>;
  expect(r.keys).toEqual(keySet.keys);
});

// SOME

test('#remove(keySetSomeSameKeys)', () => {
  const rest = keySet.remove(keySetSomeSameKeys);
  expect(rest instanceof KeySetNone).toBeTruthy();
  expect(keySet === rest).toBe(false);
});

test('#remove(keySetSomeSubSetKeys)', () => {
  const rest = keySet.remove(keySetSomeSubSetKeys);
  expect(rest instanceof KeySetSome).toBeTruthy();
  expect(keySet === rest).toBe(false);
  const r = rest as KeySetSome<number>;
  expect(r.keys).toEqual(restKeys);
});

test('#remove(keySetSomeMoreKeys)', () => {
  const rest = keySet.remove(keySetSomeMoreKeys);
  expect(rest instanceof KeySetNone).toBeTruthy();
  expect(keySet === rest).toBe(false);
});

test('#remove(keySetSomeDiffKeys)', () => {
  const rest = keySet.remove(keySetSomeDiffKeys);
  expect(rest instanceof KeySetSome).toBeTruthy();
  expect(keySet === rest).toBe(false);
  const r = rest as KeySetSome<number>;
  expect(r.keys).toEqual(keySet.keys);
});

// ALL EXCEPT SOME

test('#remove(keySetAllExceptSomeSameKeys)', () => {
  const rest = keySet.remove(keySetAllExceptSomeSameKeys);
  expect(rest instanceof KeySetSome).toBeTruthy();
  expect(keySet === rest).toBe(false);
  const r = rest as KeySetSome<number>;
  expect(r.keys).toEqual(keySet.keys);
});

test('#remove(keySetAllExceptSomeSubSetKeys)', () => {
  const rest = keySet.remove(keySetAllExceptSomeSubSetKeys);
  expect(rest instanceof KeySetSome).toBeTruthy();
  expect(keySet === rest).toBe(false);
  const r = rest as KeySetSome<number>;
  expect(r.keys).toEqual(subSetKeys);
});

test('#remove(keySetAllExceptSomeMoreKeys)', () => {
  const rest = keySet.remove(keySetAllExceptSomeMoreKeys);
  expect(rest instanceof KeySetSome).toBeTruthy();
  expect(keySet === rest).toBe(false);
  const r = rest as KeySetSome<number>;
  expect(r.keys).toEqual(keySet.keys);
});

test('#remove(keySetAllExceptSomeDiffKeys)', () => {
  const rest = keySet.remove(keySetAllExceptSomeDiffKeys);
  expect(rest instanceof KeySetNone).toBeTruthy();
  expect(keySet === rest).toBe(false);
});
