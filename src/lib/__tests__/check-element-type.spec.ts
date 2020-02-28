import {
  all,
  isKeySetOfNumberKeyLabels,
  isKeySetOfNumbers,
  isKeySetOfStringKeyLabels,
  isKeySetOfStrings,
  KeySet,
  none,
  some
} from "../..";

describe("isKeySetOfStrings()", () => {
  it("isKeySetOfStrings(invalidKeySet): false", () => {
    expect(isKeySetOfStrings(("blah" as unknown) as KeySet)).toBeFalsy();
  });

  it("isKeySetOfStrings(all()): true", () => {
    expect(isKeySetOfStrings(all())).toBeTruthy();
  });

  it("isKeySetOfStrings(none()): true", () => {
    expect(isKeySetOfStrings(none())).toBeTruthy();
  });

  it("isKeySetOfStrings(some([1, 2])): false", () => {
    expect(isKeySetOfStrings(some([1, 2]))).toBeFalsy();
  });

  it("isKeySetOfStrings(some(['1', '2'])): true", () => {
    expect(isKeySetOfStrings(some(["1", "2"]))).toBeTruthy();
  });

  it("isKeySetOfStrings(some([{ key: 1, label: 'A' }])): false", () => {
    expect(isKeySetOfStrings(some([{ key: 1, label: "A" }]))).toBeFalsy();
  });

  it("isKeySetOfStrings(some([{ key: '1', label: 'A' }])): false", () => {
    expect(isKeySetOfStrings(some([{ key: "1", label: "A" }]))).toBeFalsy();
  });
});

describe("isKeySetOfNumbers()", () => {
  it("isKeySetOfNumbers(invalidKeySet): false", () => {
    expect(isKeySetOfNumbers(("blah" as unknown) as KeySet)).toBeFalsy();
  });

  it("isKeySetOfNumbers(all()): true", () => {
    expect(isKeySetOfNumbers(all())).toBeTruthy();
  });

  it("isKeySetOfNumbers(none()): true", () => {
    expect(isKeySetOfNumbers(none())).toBeTruthy();
  });

  it("isKeySetOfNumbers(some([1, 2])): true", () => {
    expect(isKeySetOfNumbers(some([1, 2]))).toBeTruthy();
  });

  it("isKeySetOfNumbers(some(['1', '2'])): false", () => {
    expect(isKeySetOfNumbers(some(["1", "2"]))).toBeFalsy();
  });

  it("isKeySetOfNumbers(some([{ key: 1, label: 'A' }])): false", () => {
    expect(isKeySetOfNumbers(some([{ key: 1, label: "A" }]))).toBeFalsy();
  });

  it("isKeySetOfNumbers(some([{ key: '1', label: 'A' }])): false", () => {
    expect(isKeySetOfNumbers(some([{ key: "1", label: "A" }]))).toBeFalsy();
  });
});

describe("isKeySetOfStringKeyLabels()", () => {
  it("isKeySetOfStringKeyLabels(invalidKeySet): false", () => {
    expect(
      isKeySetOfStringKeyLabels(("blah" as unknown) as KeySet)
    ).toBeFalsy();
  });

  it("isKeySetOfStringKeyLabels(all()): true", () => {
    expect(isKeySetOfStringKeyLabels(all())).toBeTruthy();
  });

  it("isKeySetOfStringKeyLabels(none()): true", () => {
    expect(isKeySetOfStringKeyLabels(none())).toBeTruthy();
  });

  it("isKeySetOfStringKeyLabels(some([1, 2])): false", () => {
    expect(isKeySetOfStringKeyLabels(some([1, 2]))).toBeFalsy();
  });

  it("isKeySetOfStringKeyLabels(some(['1', '2'])): false", () => {
    expect(isKeySetOfStringKeyLabels(some(["1", "2"]))).toBeFalsy();
  });

  it("isKeySetOfStringKeyLabels(some([{ key: 1, label: 'A' }])): false", () => {
    expect(
      isKeySetOfStringKeyLabels(some([{ key: 1, label: "A" }]))
    ).toBeFalsy();
  });

  it("isKeySetOfStringKeyLabels(some([{ key: '1', label: 'A' }])): true", () => {
    expect(
      isKeySetOfStringKeyLabels(some([{ key: "1", label: "A" }]))
    ).toBeTruthy();
  });
});

describe("isKeySetOfNumberKeyLabels()", () => {
  it("isKeySetOfNumberKeyLabels(invalidKeySet): false", () => {
    expect(
      isKeySetOfNumberKeyLabels(("blah" as unknown) as KeySet)
    ).toBeFalsy();
  });

  it("isKeySetOfNumberKeyLabels(all()): true", () => {
    expect(isKeySetOfNumberKeyLabels(all())).toBeTruthy();
  });

  it("isKeySetOfNumberKeyLabels(none()): true", () => {
    expect(isKeySetOfNumberKeyLabels(none())).toBeTruthy();
  });

  it("isKeySetOfNumberKeyLabels(some([1, 2])): false", () => {
    expect(isKeySetOfNumberKeyLabels(some([1, 2]))).toBeFalsy();
  });

  it("isKeySetOfNumberKeyLabels(some(['1', '2'])): false", () => {
    expect(isKeySetOfNumberKeyLabels(some(["1", "2"]))).toBeFalsy();
  });

  it("isKeySetOfNumberKeyLabels(some([{ key: 1, label: 'A' }])): true", () => {
    expect(
      isKeySetOfNumberKeyLabels(some([{ key: 1, label: "A" }]))
    ).toBeTruthy();
  });

  it("isKeySetOfNumberKeyLabels(some([{ key: '1', label: 'A' }])): false", () => {
    expect(
      isKeySetOfNumberKeyLabels(some([{ key: "1", label: "A" }]))
    ).toBeFalsy();
  });
});
