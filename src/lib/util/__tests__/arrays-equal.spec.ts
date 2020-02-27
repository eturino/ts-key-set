import { arraysEqual } from "../../..";

test("arraysEqual([], [])", () => {
  expect(arraysEqual([], [])).toBe(true);
});

test("arraysEqual(null, null)", () => {
  expect(arraysEqual(null, null)).toBe(true);
});

test("arraysEqual([], null)", () => {
  expect(arraysEqual([], null)).toBe(false);
});

test("arraysEqual(null, [])", () => {
  expect(arraysEqual(null, [])).toBe(false);
});

test("arraysEqual([1, 2, 3], [1, 2, 3])", () => {
  expect(arraysEqual([1, 2, 3], [1, 2, 3])).toBe(true);
});

test("arraysEqual([1, 3, 2], [1, 2, 3])", () => {
  expect(arraysEqual([1, 3, 2], [1, 2, 3])).toBe(false);
});

test("arraysEqual([1, 2], [1, 2, 3])", () => {
  expect(arraysEqual([1, 2], [1, 2, 3])).toBe(false);
});
