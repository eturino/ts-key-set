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

const keySet = new KeySetAllExceptSome(keys); // => keys 1, 2, 3

// ALL

test('#intersect(keySetAll)', t => {
  const rest = keySet.intersect(keySetAll);
  t.truthy(rest instanceof KeySetAllExceptSome);
  t.false(keySet === rest, 'different object');
  const r = rest as KeySetAllExceptSome<number>;
  t.deepEqual(r.keys, keySet.keys);
});

// NONE

test('#intersect(keySetNone)', t => {
  const rest = keySet.intersect(keySetNone);
  t.truthy(rest instanceof KeySetNone);
  t.false(keySet === rest, 'different object');
});

// SOME

test('#intersect(keySetSomeSameKeys)', t => {
  const rest = keySet.intersect(keySetSomeSameKeys);
  t.truthy(rest instanceof KeySetNone);
  t.false(keySet === rest, 'different object');
});

test('#intersect(keySetSomeSubSetKeys)', t => {
  const rest = keySet.intersect(keySetSomeSubSetKeys);
  t.truthy(rest instanceof KeySetNone);
  t.false(keySet === rest, 'different object');
});

test('#intersect(keySetSomeMoreKeys)', t => {
  const rest = keySet.intersect(keySetSomeMoreKeys);
  t.truthy(rest instanceof KeySetSome);
  t.false(keySet === rest, 'different object');
  const r = rest as KeySetSome<number>;
  t.deepEqual(r.keys, extraKeys);
});

test('#intersect(keySetSomeDiffKeys)', t => {
  const rest = keySet.intersect(keySetSomeDiffKeys);
  t.truthy(rest instanceof KeySetSome);
  t.false(keySet === rest, 'different object');
  const r = rest as KeySetSome<number>;
  t.deepEqual(r.keys, otherKeys);
});

// ALL EXCEPT SOME

test('#intersect(keySetAllExceptSomeSameKeys)', t => {
  const rest = keySet.intersect(keySetAllExceptSomeSameKeys);
  t.truthy(rest instanceof KeySetAllExceptSome);
  t.false(keySet === rest, 'different object');
  const r = rest as KeySetAllExceptSome<number>;
  t.deepEqual(r.keys, keys);
});

test('#intersect(keySetAllExceptSomeSubSetKeys)', t => {
  const rest = keySet.intersect(keySetAllExceptSomeSubSetKeys);
  t.truthy(rest instanceof KeySetAllExceptSome);
  t.false(keySet === rest, 'different object');
  const r = rest as KeySetAllExceptSome<number>;
  t.deepEqual(r.keys, keys);
});

test('#intersect(keySetAllExceptSomeMoreKeys)', t => {
  const rest = keySet.intersect(keySetAllExceptSomeMoreKeys);
  t.truthy(rest instanceof KeySetAllExceptSome);
  t.false(keySet === rest, 'different object');
  const r = rest as KeySetAllExceptSome<number>;
  t.deepEqual(r.keys, moreKeys);
});

test('#intersect(keySetAllExceptSomeDiffKeys)', t => {
  const rest = keySet.intersect(keySetAllExceptSomeDiffKeys);
  t.truthy(rest instanceof KeySetAllExceptSome);
  t.false(keySet === rest, 'different object');
  const r = rest as KeySetAllExceptSome<number>;
  t.deepEqual(r.keys, [...keys, ...otherKeys].sort());
});
