import test from 'ava';
import { KeySetAll } from '../all';
import { KeySetAllExceptSome } from '../all-except-some';
import { KeySetNone } from '../none';
import { KeySetSome } from '../some';

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

test('#isEqual(keySetAll)', t => {
  t.false(keySet.isEqual(keySetAll));
});

test('#isEqual(keySetNone)', t => {
  t.false(keySet.isEqual(keySetNone));
});

test('#isEqual(keySetSome)', t => {
  t.false(keySet.isEqual(keySetSomeSameKeys));
  t.false(keySet.isEqual(keySetSomeSubSetKeys));
  t.false(keySet.isEqual(keySetSomeMoreKeys));
  t.false(keySet.isEqual(keySetSomeDiffKeys));
});

test('#isEqual(keySetAllExceptSomeSameKeys)', t => {
  t.true(keySet.isEqual(keySetAllExceptSomeSameKeys));
});

test('#isEqual(keySetAllExceptSomeSubSetKeys)', t => {
  t.false(keySet.isEqual(keySetAllExceptSomeSubSetKeys));
});

test('#isEqual(keySetAllExceptSomeMoreKeys)', t => {
  t.false(keySet.isEqual(keySetAllExceptSomeMoreKeys));
});

test('#isEqual(keySetAllExceptSomeDiffKeys)', t => {
  t.false(keySet.isEqual(keySetAllExceptSomeDiffKeys));
});
