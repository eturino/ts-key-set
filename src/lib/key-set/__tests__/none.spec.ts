import { KeySetAll } from '../all';
import { KeySetNone } from '../none';

const keySet = new KeySetNone();

test('#clone()', () => {
  const result = keySet.clone();
  expect(result instanceof KeySetNone).toBeTruthy();
  expect(keySet === result).toBe(false);
});

test('#invert()', () => {
  const result = keySet.invert();
  expect(result instanceof KeySetAll).toBeTruthy();
});

test('#representsAll()', () => {
  expect(keySet.representsAll()).toBe(false);
});

test('#representsNone()', () => {
  expect(keySet.representsNone()).toBe(true);
});

test('#representsSome()', () => {
  expect(keySet.representsSome()).toBe(false);
});

test('#representsAllExceptSome()', () => {
  expect(keySet.representsAllExceptSome()).toBe(false);
});
