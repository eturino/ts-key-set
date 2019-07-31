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
} from '../key-set';

test('all()', t => {
  const keySet = all();
  t.assert(keySet instanceof KeySetAll);
  t.true(keySet.representsAll());
  t.false(keySet.representsNone());
  t.false(keySet.representsSome());
  t.false(keySet.representsAllExceptSome());
});

test('none()', t => {
  const keySet = none();
  t.assert(keySet instanceof KeySetNone);
  t.false(keySet.representsAll());
  t.true(keySet.representsNone());
  t.false(keySet.representsSome());
  t.false(keySet.representsAllExceptSome());
});

test('some([])', t => {
  const keySet = some([]);
  t.assert(keySet instanceof KeySetNone);
  t.false(keySet.representsAll());
  t.true(keySet.representsNone());
  t.false(keySet.representsSome());
  t.false(keySet.representsAllExceptSome());
});

test('allExceptSome([])', t => {
  const keySet = allExceptSome([]);
  t.assert(keySet instanceof KeySetAll);
  t.true(keySet.representsAll());
  t.false(keySet.representsNone());
  t.false(keySet.representsSome());
  t.false(keySet.representsAllExceptSome());
});

test('some([1, 2, 3])', t => {
  const keySet = some([1, 2, 3]);
  t.assert(keySet instanceof KeySetSome);
  t.false(keySet.representsAll());
  t.false(keySet.representsNone());
  t.true(keySet.representsSome());
  t.false(keySet.representsAllExceptSome());
});

test('allExceptSome([1, 2, 3])', t => {
  const keySet = allExceptSome([1, 2, 3]);
  t.assert(keySet instanceof KeySetAllExceptSome);
  t.false(keySet.representsAll());
  t.false(keySet.representsNone());
  t.false(keySet.representsSome());
  t.true(keySet.representsAllExceptSome());
});
