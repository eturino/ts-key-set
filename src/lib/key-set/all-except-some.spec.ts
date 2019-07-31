import test from 'ava';
import { KeySetAllExceptSome } from './all-except-some';

const keySet = new KeySetAllExceptSome([3, 1, 2, 3, 2, 1]); // => keys 1, 2, 3

test('removes duplicates and sorts', t => {
  t.deepEqual(keySet.keys, [1, 2, 3]);
});

test('#clone()', t => {
  const result = keySet.clone();
  t.assert(result instanceof KeySetAllExceptSome);
  t.false(keySet === result, 'different object');
  t.deepEqual(keySet.keys, result.keys);
});
