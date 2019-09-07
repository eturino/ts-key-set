import test from 'ava';
import { uniqueArray } from './unique-array';

test('uniqueArray([])', t => {
  t.deepEqual(uniqueArray([]), []);
});

test('uniqueArray([1, 3, 1, 3, 4, 2])', t => {
  t.deepEqual(uniqueArray([1, 3, 1, 3, 4, 2]), [1, 3, 4, 2]);
});

test('uniqueArray(["a", "c", "d", "c", "a", "b"])', t => {
  t.deepEqual(uniqueArray(['a', 'c', 'd', 'c', 'a', 'b']), [
    'a',
    'c',
    'd',
    'b'
  ]);
});
