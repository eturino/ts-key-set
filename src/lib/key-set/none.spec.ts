import test from 'ava';
import { KeySetAll } from './all';
import { KeySetNone } from './none';

const keySet = new KeySetNone();

test('#clone()', t => {
  const result = keySet.clone();
  t.assert(result instanceof KeySetNone);
  t.false(keySet === result, 'different object');
});

test('#invert()', t => {
  const result = keySet.invert();
  t.assert(result instanceof KeySetAll);
  t.false(keySet === result, 'different object');
});
