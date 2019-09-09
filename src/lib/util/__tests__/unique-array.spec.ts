import { uniqueArray } from "../unique-array";

test("uniqueArray([])", () => {
  expect(uniqueArray([])).toEqual([]);
});

test("uniqueArray([1, 3, 1, 3, 4, 2])", () => {
  expect(uniqueArray([1, 3, 1, 3, 4, 2])).toEqual([1, 3, 4, 2]);
});

test('uniqueArray(["a", "c", "d", "c", "a", "b"])', () => {
  expect(uniqueArray(["a", "c", "d", "c", "a", "b"])).toEqual([
    "a",
    "c",
    "d",
    "b"
  ]);
});
