import { KeySetAll } from '../../all';
import { KeySetAllExceptSome } from '../../all-except-some';
import { KeySetNone } from '../../none';
import { KeySetSome } from '../../some';

const keySetAll = new KeySetAll();
const keySetNone = new KeySetNone();

const keySetSomeSameKeys = new KeySetSome([1, 2, 3]);
const keySetSomeSubSetKeys = new KeySetSome([1, 2]);
const keySetSomeMoreKeys = new KeySetSome([1, 2, 3, 4]);
const keySetSomeDiffKeys = new KeySetSome([5, 6]);

const keySetAllExceptSomeSameKeys = new KeySetAllExceptSome([1, 2, 3]);
const keySetAllExceptSomeSubSetKeys = new KeySetAllExceptSome([1, 2]);
const keySetAllExceptSomeMoreKeys = new KeySetAllExceptSome([1, 2, 3, 4]);
const keySetAllExceptSomeDiffKeys = new KeySetAllExceptSome([5, 6]);

const keySet = new KeySetAllExceptSome([3, 1, 2, 3, 2, 1]); // => keys 1, 2, 3

test('#isEqual(keySetAll)', () => {
  expect(keySet.isEqual(keySetAll)).toBe(false);
});

test('#isEqual(keySetNone)', () => {
  expect(keySet.isEqual(keySetNone)).toBe(false);
});

test('#isEqual(keySetSome)', () => {
  expect(keySet.isEqual(keySetSomeSameKeys)).toBe(false);
  expect(keySet.isEqual(keySetSomeSubSetKeys)).toBe(false);
  expect(keySet.isEqual(keySetSomeMoreKeys)).toBe(false);
  expect(keySet.isEqual(keySetSomeDiffKeys)).toBe(false);
});

test('#isEqual(keySetAllExceptSomeSameKeys)', () => {
  expect(keySet.isEqual(keySetAllExceptSomeSameKeys)).toBe(true);
});

test('#isEqual(keySetAllExceptSomeSubSetKeys)', () => {
  expect(keySet.isEqual(keySetAllExceptSomeSubSetKeys)).toBe(false);
});

test('#isEqual(keySetAllExceptSomeMoreKeys)', () => {
  expect(keySet.isEqual(keySetAllExceptSomeMoreKeys)).toBe(false);
});

test('#isEqual(keySetAllExceptSomeDiffKeys)', () => {
  expect(keySet.isEqual(keySetAllExceptSomeDiffKeys)).toBe(false);
});
