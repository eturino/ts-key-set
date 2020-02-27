import { isEmptyArray, isNonEmptyArray } from "../../..";

describe("isEmptyArray()", () => {
  it("isEmptyArray([]): true", () => {
    expect(isEmptyArray([])).toBeTruthy();
  });
  it("isEmptyArray([1, 2]): true", () => {
    expect(isEmptyArray([1, 2])).toBeFalsy();
  });
});

describe("isNonEmptyArray()", () => {
  it("isNonEmptyArray([]): true", () => {
    expect(isNonEmptyArray([])).toBeFalsy();
  });
  it("isNonEmptyArray([1, 2]): true", () => {
    expect(isNonEmptyArray([1, 2])).toBeTruthy();
  });
});
