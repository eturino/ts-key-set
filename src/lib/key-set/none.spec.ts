import test from 'ava';
import { KeySetNone } from './none';

const keySet = new KeySetNone();

test('#clone()', t => {
  const result = keySet.clone();
  t.assert(result instanceof KeySetNone);
  t.false(keySet === result, 'different object');
});
