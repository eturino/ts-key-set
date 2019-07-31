import test from 'ava';
import { KeySetAllExceptSome } from './all-except-some';

const keySet = new KeySetAllExceptSome([3, 1, 2, 3, 2, 1]); // => keys 1, 2, 3

test('removes duplicates and sorts', t => {
  t.deepEqual(keySet.keys, [1, 2, 3]);
});
