import test from 'ava';
import { KeySetAll } from '../all';
import { KeySetAllExceptSome } from '../all-except-some';
import { KeySetNone } from '../none';
import { KeySetSome } from '../some';

const keySetAll = new KeySetAll();
const keySetNone = new KeySetNone();


const subSetKeys = [1, 2];
const restKeys = [3];
const keys = [...subSetKeys, ...restKeys];
const extraKeys = [4];
const moreKeys = [...keys, ...extraKeys];
const otherKeys = [5, 6];

const keySetSomeSameKeys = new KeySetSome(keys);
const keySetSomeSubSetKeys = new KeySetSome(subSetKeys);
const keySetSomeMoreKeys = new KeySetSome(moreKeys);
const keySetSomeDiffKeys = new KeySetSome(otherKeys);

const keySetAllExceptSomeSameKeys = new KeySetAllExceptSome(keys);
const keySetAllExceptSomeSubSetKeys = new KeySetAllExceptSome(subSetKeys);
const keySetAllExceptSomeMoreKeys = new KeySetAllExceptSome(moreKeys);
const keySetAllExceptSomeDiffKeys = new KeySetAllExceptSome(otherKeys);

const keySet = new KeySetSome(keys); // => keys 1, 2, 3

// ALL

test('#remove(keySetAll)', t => {
  const rest = keySet.remove(keySetAll);
  t.assert(rest instanceof KeySetNone);
  t.false(keySet === rest, 'different object');
});

// NONE

test('#remove(keySetNone)', t => {
  const rest = keySet.remove(keySetNone);
  t.assert(rest instanceof KeySetSome);
  t.false(keySet === rest, 'different object');
  const r = rest as KeySetSome<number>;
  t.deepEqual(r.keys, keySet.keys);
});

// SAME

test('#remove(keySetSomeSameKeys)', t => {
  const rest = keySet.remove(keySetSomeSameKeys);
  t.assert(rest instanceof KeySetNone);
  t.false(keySet === rest, 'different object');
});

test('#remove(keySetSomeSubSetKeys)', t => {
  const rest = keySet.remove(keySetSomeSubSetKeys);
  t.assert(rest instanceof KeySetSome);
  t.false(keySet === rest, 'different object');
  const r = rest as KeySetSome<number>;
  t.deepEqual(r.keys, restKeys);
});

test('#remove(keySetSomeMoreKeys)', t => {
  const rest = keySet.remove(keySetSomeMoreKeys);
  t.assert(rest instanceof KeySetNone);
  t.false(keySet === rest, 'different object');
});

test('#remove(keySetSomeDiffKeys)', t => {
  const rest = keySet.remove(keySetSomeDiffKeys);
  t.assert(rest instanceof KeySetSome);
  t.false(keySet === rest, 'different object');
  const r = rest as KeySetSome<number>;
  t.deepEqual(r.keys, keySet.keys);
});

// ALL EXCEPT SOME

test('#remove(keySetAllExceptSomeSameKeys)', t => {
  const rest = keySet.remove(keySetAllExceptSomeSameKeys);
  t.assert(rest instanceof KeySetSome);
  t.false(keySet === rest, 'different object');
  const r = rest as KeySetSome<number>;
  t.deepEqual(r.keys, keySet.keys);
});

test('#remove(keySetAllExceptSomeSubSetKeys)', t => {
  const rest = keySet.remove(keySetAllExceptSomeSubSetKeys);
  t.assert(rest instanceof KeySetSome);
  t.false(keySet === rest, 'different object');
  const r = rest as KeySetSome<number>;
  t.deepEqual(r.keys, subSetKeys);
});

test('#remove(keySetAllExceptSomeMoreKeys)', t => {
  const rest = keySet.remove(keySetAllExceptSomeMoreKeys);
  t.assert(rest instanceof KeySetSome);
  t.false(keySet === rest, 'different object');
  const r = rest as KeySetSome<number>;
  t.deepEqual(r.keys, keySet.keys);
});

test('#remove(keySetAllExceptSomeDiffKeys)', t => {
  const rest = keySet.remove(keySetAllExceptSomeDiffKeys);
  t.assert(rest instanceof KeySetNone);
  t.false(keySet === rest, 'different object');
});
