import test from 'ava';
import { KeySetAllExceptSome } from './all-except-some';
import { KeySetSome } from './some';

const keySet = new KeySetSome([3, 1, 2, 3, 2, 1]); // => keys 1, 2, 3

test('removes duplicates and sorts', t => {
  t.deepEqual(keySet.keys, [1, 2, 3]);
});

test('#clone()', t => {
  const result = keySet.clone();
  t.assert(result instanceof KeySetSome);
  t.false(keySet === result, 'different object');
  t.deepEqual(keySet.keys, result.keys);
});

test('#invert()', t => {
  const result = keySet.invert();
  t.assert(result instanceof KeySetAllExceptSome);
  t.deepEqual(keySet.keys, result.keys);
});

test('#representsAll()', t => {
  t.false(keySet.representsAll());
});

test('#representsNone()', t => {
  t.false(keySet.representsNone());
});

test('#representsSome()', t => {
  t.true(keySet.representsSome());
});

test('#representsAllExceptSome()', t => {
  t.false(keySet.representsAllExceptSome());
});
