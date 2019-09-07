import test from 'ava';
import { arraysEqual } from './arrays-equal';

test('arraysEqual([], [])', t => {
  t.true(arraysEqual([], []));
});

test('arraysEqual(null, null)', t => {
  t.true(arraysEqual(null, null));
});

test('arraysEqual([], null)', t => {
  t.false(arraysEqual([], null));
});

test('arraysEqual(null, [])', t => {
  t.false(arraysEqual(null, []));
});

test('arraysEqual([1, 2, 3], [1, 2, 3])', t => {
  t.true(arraysEqual([1, 2, 3], [1, 2, 3]));
});

test('arraysEqual([1, 3, 2], [1, 2, 3])', t => {
  t.false(arraysEqual([1, 3, 2], [1, 2, 3]));
});

test('arraysEqual([1, 2], [1, 2, 3])', t => {
  t.false(arraysEqual([1, 2], [1, 2, 3]));
});
