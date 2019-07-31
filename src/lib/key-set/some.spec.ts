import test from 'ava';
import { KeySetSome } from './some';

test('removes duplicates and sorts', t => {
  const keySet = new KeySetSome([3, 1, 2, 3, 2, 1]);
  t.deepEqual(keySet.keys, [1, 2, 3]);
});
