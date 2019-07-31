import test from 'ava';
import { KeySetAll } from '../all';
import { KeySetAllExceptSome } from '../all-except-some';
import { KeySetNone } from '../none';
import { KeySetSome } from '../some';

const keySetAll = new KeySetAll();
const keySetNone = new KeySetNone();
const keySetSome = new KeySetSome([1, 2, 3]);
const keySetAllExceptSome = new KeySetAllExceptSome([1, 2, 3]);

const keySet = new KeySetNone();

test('#intersect(keySetAll)', t => {
  const rest = keySet.intersect(keySetAll);
  t.assert(rest instanceof KeySetNone);
  t.false(keySet === rest, 'different object');
});

test('#intersect(keySetNone)', t => {
  const rest = keySet.intersect(keySetNone);
  t.assert(rest instanceof KeySetNone);
  t.false(keySet === rest, 'different object');
});

test('#intersect(keySetSome)', t => {
  const rest = keySet.intersect(keySetSome);
  t.assert(rest instanceof KeySetNone);
  t.false(keySet === rest, 'different object');
});

test('#intersect(keySetAllExceptSome)', t => {
  const rest = keySet.intersect(keySetAllExceptSome);
  t.assert(rest instanceof KeySetNone);
  t.false(keySet === rest, 'different object');
});
