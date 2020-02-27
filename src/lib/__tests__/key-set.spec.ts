// tslint:disable:no-expression-statement
import {
  all,
  allExceptSome,
  allExceptSomeForced,
  InvalidEmptySetError,
  KeySetAll,
  KeySetAllExceptSome,
  KeySetNone,
  KeySetSome,
  KeySetTypes,
  none,
  some,
  someForced
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

test("someForced([])", () => {
  expect(() => {
    someForced([]);
  }).toThrowError(InvalidEmptySetError);
});

test("allExceptSome([])", () => {
  const keySet = allExceptSome([]);
  expect(keySet instanceof KeySetAll).toBeTruthy();
  expect(keySet.type).toEqual(KeySetTypes.all);
});

test("allExceptSomeForced([])", () => {
  expect(() => {
    allExceptSomeForced([]);
  }).toThrowError(InvalidEmptySetError);
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

test("someForced([1, 2, 3])", () => {
  const keySet = someForced([1, 2, 3]);
  expect(keySet instanceof KeySetSome).toBeTruthy();
  expect((keySet as KeySetSome<number>).keys).toEqual([1, 2, 3]);
  expect(keySet.type).toEqual(KeySetTypes.some);
});

test("allExceptSomeForced([1, 2, 3])", () => {
  const keySet = allExceptSomeForced([1, 2, 3]);
  expect(keySet instanceof KeySetAllExceptSome).toBeTruthy();
  expect((keySet as KeySetAllExceptSome<number>).keys).toEqual([1, 2, 3]);
  expect(keySet.type).toEqual(KeySetTypes.allExceptSome);
});

test("new KeySetSome([]) throws error", () => {
  expect(() => new KeySetSome([])).toThrowError(InvalidEmptySetError);
});

test("new KeySetAllExceptSome([]) throws error", () => {
  expect(() => new KeySetAllExceptSome([])).toThrowError(InvalidEmptySetError);
});
