import { KeySetAll } from '../../all';
import { KeySetAllExceptSome } from '../../all-except-some';
import { KeySetNone } from '../../none';
import { KeySetSome } from '../../some';

const keySetAll = new KeySetAll();
const keySetNone = new KeySetNone();
const keySetSome = new KeySetSome([1, 2, 3]);
const keySetAllExceptSome = new KeySetAllExceptSome([1, 2, 3]);

const keySet = new KeySetAll();

test('#isEqual(keySetAll)', () => {
  expect(keySet.isEqual(keySetAll)).toBe(true);
});

test('#isEqual(keySetNone)', () => {
  expect(keySet.isEqual(keySetNone)).toBe(false);
});

test('#isEqual(keySetSome)', () => {
  expect(keySet.isEqual(keySetSome)).toBe(false);
});

test('#isEqual(keySetAllExceptSome)', () => {
  expect(keySet.isEqual(keySetAllExceptSome)).toBe(false);
});
