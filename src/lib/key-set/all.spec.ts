import test from 'ava';
import { KeySetAll } from './all';
import { KeySetNone } from './none';

const keySet = new KeySetAll();

test('#clone()', t => {
  const result = keySet.clone();
  t.assert(result instanceof KeySetAll);
  t.false(keySet === result, 'different object');
});

test('#invert()', t => {
  const result = keySet.invert();
  t.assert(result instanceof KeySetNone);
});

test('#representsAll()', t => {
  t.true(keySet.representsAll());
});

test('#representsNone()', t => {
  t.false(keySet.representsNone());
});

test('#representsSome()', t => {
  t.false(keySet.representsSome());
});

test('#representsAllExceptSome()', t => {
  t.false(keySet.representsAllExceptSome());
});
