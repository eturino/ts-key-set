import test from 'ava';
import { KeySetAll } from '../all';
import { KeySetAllExceptSome } from '../all-except-some';
import { KeySetNone } from '../none';
import { KeySetSome } from '../some';

const keySetAll = new KeySetAll();
const keySetNone = new KeySetNone();
const keySetSome = new KeySetSome([1, 2, 3]);
const keySetAllExceptSome = new KeySetAllExceptSome([1, 2, 3]);

const keySet = new KeySetAll();

test('#isEqual(keySetAll)', t => {
  t.true(keySet.isEqual(keySetAll));
});

test('#isEqual(keySetNone)', t => {
  t.false(keySet.isEqual(keySetNone));
});

test('#isEqual(keySetSome)', t => {
  t.false(keySet.isEqual(keySetSome));
});

test('#isEqual(keySetAllExceptSome)', t => {
  t.false(keySet.isEqual(keySetAllExceptSome));
});
