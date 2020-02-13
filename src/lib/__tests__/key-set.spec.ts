// tslint:disable:no-expression-statement
import {
  all,
  allExceptSome,
  KeySetAll,
  KeySetAllExceptSome,
  KeySetNone,
  KeySetSome,
  KeySetTypes,
  none,
  some
} from "../key-set";

test("all()", () => {
  const keySet = all();
  expect(keySet instanceof KeySetAll).toBeTruthy();
  expect(keySet.type).toEqual(KeySetTypes.all);
});

test("none()", () => {
  const keySet = none();
  expect(keySet instanceof KeySetNone).toBeTruthy();
  expect(keySet.type).toEqual(KeySetTypes.none);
});

test("some([])", () => {
  const keySet = some([]);
  expect(keySet instanceof KeySetNone).toBeTruthy();
  expect(keySet.type).toEqual(KeySetTypes.none);
});

test("allExceptSome([])", () => {
  const keySet = allExceptSome([]);
  expect(keySet instanceof KeySetAll).toBeTruthy();
  expect(keySet.type).toEqual(KeySetTypes.all);
});

test("some([1, 2, 3])", () => {
  const keySet = some([1, 2, 3]);
  expect(keySet instanceof KeySetSome).toBeTruthy();
  expect((keySet as KeySetSome<number>).keys).toEqual([1, 2, 3]);
  expect(keySet.type).toEqual(KeySetTypes.some);
});

test("allExceptSome([1, 2, 3])", () => {
  const keySet = allExceptSome([1, 2, 3]);
  expect(keySet instanceof KeySetAllExceptSome).toBeTruthy();
  expect((keySet as KeySetAllExceptSome<number>).keys).toEqual([1, 2, 3]);
  expect(keySet.type).toEqual(KeySetTypes.allExceptSome);
});
