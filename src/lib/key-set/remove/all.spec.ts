import test from 'ava';
import { KeySetAll } from '../all';
import { KeySetAllExceptSome } from '../all-except-some';
import { KeySetNone } from '../none';
import { KeySetSome } from '../some';

const keySetAll = new KeySetAll();
const keySetNone = new KeySetNone();
const keySetSome = new KeySetSome([1, 2, 3]);
const keySetAllExceptSome = new KeySetAllExceptSome([1, 2, 3]);

const keySet = new KeySetAll();

test('#remove(keySetAll)', t => {
  t.assert(keySet.remove(keySetAll) instanceof KeySetNone);
});

test('#remove(keySetNone)', t => {
  const rest = keySet.remove(keySetNone);
  t.assert(rest instanceof KeySetAll);
  t.false(keySet === rest, 'different object');
});

test('#remove(keySetSome)', t => {
  const rest = keySet.remove(keySetSome);
  t.assert(rest instanceof KeySetAllExceptSome);

  const r = rest as KeySetAllExceptSome<number>;
  t.deepEqual(r.keys, keySetSome.keys);
});

test('#remove(keySetAllExceptSome)', t => {
  const rest = keySet.remove(keySetAllExceptSome);
  t.assert(rest instanceof KeySetSome);

  const r = rest as KeySetSome<number>;
  t.deepEqual(r.keys, keySetAllExceptSome.keys);
});
