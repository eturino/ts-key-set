import test from 'ava';
import { KeySetAll } from './all';
import { KeySetNone } from './none';

const keySet = new KeySetNone();

test('#clone()', t => {
  const result = keySet.clone();
  t.truthy(result instanceof KeySetNone);
  t.false(keySet === result, 'different object');
});

test('#invert()', t => {
  const result = keySet.invert();
  t.truthy(result instanceof KeySetAll);
});

test('#representsAll()', t => {
  t.false(keySet.representsAll());
});

test('#representsNone()', t => {
  t.true(keySet.representsNone());
});

test('#representsSome()', t => {
  t.false(keySet.representsSome());
});

test('#representsAllExceptSome()', t => {
  t.false(keySet.representsAllExceptSome());
});
