import { KeySetAllExceptSome } from "../all-except-some";
import { KeySetSome } from "../some";

const keySet = new KeySetAllExceptSome([3, 1, 2, 3, 2, 1]); // => keys 1, 2, 3

test("removes duplicates and sorts", () => {
  expect(keySet.keys).toEqual([1, 2, 3]);
});

test("#clone()", () => {
  const result = keySet.clone();
  expect(result instanceof KeySetAllExceptSome).toBeTruthy();
  expect(keySet === result).toBe(false);
  expect(keySet.keys).toEqual(result.keys);
});

test("#invert()", () => {
  const result = keySet.invert();
  expect(result instanceof KeySetSome).toBeTruthy();
  expect(keySet.keys).toEqual(result.keys);
});

test("#representsAll()", () => {
  expect(keySet.representsAll()).toBe(false);
});

test("#representsNone()", () => {
  expect(keySet.representsNone()).toBe(false);
});

test("#representsSome()", () => {
  expect(keySet.representsSome()).toBe(false);
});

test("#representsAllExceptSome()", () => {
  expect(keySet.representsAllExceptSome()).toBe(true);
});
