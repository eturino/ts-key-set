// tslint:disable:no-expression-statement
import test from 'ava';
import {
  all,
  allExceptSome,
  KeySetAll,
  KeySetAllExceptSome,
  KeySetNone,
  KeySetSome,
  none,
  some
} from './key-set';

test('all()', t => {
  const keySet = all();
  t.assert(keySet instanceof KeySetAll);
});

test('none()', t => {
  const keySet = none();
  t.assert(keySet instanceof KeySetNone);
});

test('some([])', t => {
  const keySet = some([]);
  t.assert(keySet instanceof KeySetNone);
});

test('allExceptSome([])', t => {
  const keySet = allExceptSome([]);
  t.assert(keySet instanceof KeySetAll);
});

test('some([1, 2, 3])', t => {
  const keySet = some([1, 2, 3]);
  t.assert(keySet instanceof KeySetSome);
  t.deepEqual((keySet as KeySetSome<number>).keys, [1, 2, 3]);
});

test('allExceptSome([1, 2, 3])', t => {
  const keySet = allExceptSome([1, 2, 3]);
  t.assert(keySet instanceof KeySetAllExceptSome);
  t.deepEqual((keySet as KeySetAllExceptSome<number>).keys, [1, 2, 3]);
});
