import test from 'ava';
import { KeySetAll } from './all';

const keySet = new KeySetAll();

test('#clone()', t => {
  const result = keySet.clone();
  t.assert(result instanceof KeySetAll);
  t.false(keySet === result, 'different object');
});
