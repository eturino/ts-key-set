import {
  all,
  isKeySetSerializedOfNumberKeyLabels,
  isKeySetSerializedOfNumbers,
  isKeySetSerializedOfStringKeyLabels,
  isKeySetSerializedOfStrings,
  KeySetSerialized,
  none,
  some
} from "../..";

const invalidKeySetSerialized = ("blah" as unknown) as KeySetSerialized;

describe("isKeySetSerializedOfStrings()", () => {
  it("isKeySetSerializedOfStrings(invalidKeySetSerialized): false", () => {
    expect(isKeySetSerializedOfStrings(invalidKeySetSerialized)).toBeFalsy();
  });

  it("isKeySetSerializedOfStrings(all().serialized()): true", () => {
    expect(isKeySetSerializedOfStrings(all().serialized())).toBeTruthy();
  });

  it("isKeySetSerializedOfStrings(none().serialized()): true", () => {
    expect(isKeySetSerializedOfStrings(none().serialized())).toBeTruthy();
  });

  it("isKeySetSerializedOfStrings(some([1, 2]).serialized()): false", () => {
    expect(isKeySetSerializedOfStrings(some([1, 2]).serialized())).toBeFalsy();
  });

  it("isKeySetSerializedOfStrings(some(['1', '2']).serialized()): true", () => {
    expect(isKeySetSerializedOfStrings(some(["1", "2"]).serialized())).toBeTruthy();
  });

  it("isKeySetSerializedOfStrings(some([{ key: 1, label: 'A' }]).serialized()): false", () => {
    expect(isKeySetSerializedOfStrings(some([{ key: 1, label: "A" }]).serialized())).toBeFalsy();
  });

  it("isKeySetSerializedOfStrings(some([{ key: '1', label: 'A' }]).serialized()): false", () => {
    expect(isKeySetSerializedOfStrings(some([{ key: "1", label: "A" }]).serialized())).toBeFalsy();
  });
});

describe("isKeySetSerializedOfNumbers()", () => {
  it("isKeySetSerializedOfNumbers(invalidKeySetSerialized): false", () => {
    expect(isKeySetSerializedOfNumbers(invalidKeySetSerialized)).toBeFalsy();
  });

  it("isKeySetSerializedOfNumbers(all().serialized()): true", () => {
    expect(isKeySetSerializedOfNumbers(all().serialized())).toBeTruthy();
  });

  it("isKeySetSerializedOfNumbers(none().serialized()): true", () => {
    expect(isKeySetSerializedOfNumbers(none().serialized())).toBeTruthy();
  });

  it("isKeySetSerializedOfNumbers(some([1, 2]).serialized()): true", () => {
    expect(isKeySetSerializedOfNumbers(some([1, 2]).serialized())).toBeTruthy();
  });

  it("isKeySetSerializedOfNumbers(some(['1', '2']).serialized()): false", () => {
    expect(isKeySetSerializedOfNumbers(some(["1", "2"]).serialized())).toBeFalsy();
  });

  it("isKeySetSerializedOfNumbers(some([{ key: 1, label: 'A' }]).serialized()): false", () => {
    expect(isKeySetSerializedOfNumbers(some([{ key: 1, label: "A" }]).serialized())).toBeFalsy();
  });

  it("isKeySetSerializedOfNumbers(some([{ key: '1', label: 'A' }]).serialized()): false", () => {
    expect(isKeySetSerializedOfNumbers(some([{ key: "1", label: "A" }]).serialized())).toBeFalsy();
  });
});

describe("isKeySetSerializedOfStringKeyLabels()", () => {
  it("isKeySetSerializedOfStringKeyLabels(invalidKeySetSerialized): false", () => {
    expect(isKeySetSerializedOfStringKeyLabels(invalidKeySetSerialized)).toBeFalsy();
  });

  it("isKeySetSerializedOfStringKeyLabels(all().serialized()): true", () => {
    expect(isKeySetSerializedOfStringKeyLabels(all().serialized())).toBeTruthy();
  });

  it("isKeySetSerializedOfStringKeyLabels(none().serialized()): true", () => {
    expect(isKeySetSerializedOfStringKeyLabels(none().serialized())).toBeTruthy();
  });

  it("isKeySetSerializedOfStringKeyLabels(some([1, 2]).serialized()): false", () => {
    expect(isKeySetSerializedOfStringKeyLabels(some([1, 2]).serialized())).toBeFalsy();
  });

  it("isKeySetSerializedOfStringKeyLabels(some(['1', '2']).serialized()): false", () => {
    expect(isKeySetSerializedOfStringKeyLabels(some(["1", "2"]).serialized())).toBeFalsy();
  });

  it("isKeySetSerializedOfStringKeyLabels(some([{ key: 1, label: 'A' }]).serialized()): false", () => {
    expect(
      isKeySetSerializedOfStringKeyLabels(some([{ key: 1, label: "A" }]).serialized())
    ).toBeFalsy();
  });

  it("isKeySetSerializedOfStringKeyLabels(some([{ key: '1', label: 'A' }]).serialized()): true", () => {
    expect(
      isKeySetSerializedOfStringKeyLabels(some([{ key: "1", label: "A" }]).serialized())
    ).toBeTruthy();
  });
});

describe("isKeySetSerializedOfNumberKeyLabels()", () => {
  it("isKeySetSerializedOfNumberKeyLabels(invalidKeySetSerialized): false", () => {
    expect(isKeySetSerializedOfNumberKeyLabels(invalidKeySetSerialized)).toBeFalsy();
  });

  it("isKeySetSerializedOfNumberKeyLabels(all().serialized()): true", () => {
    expect(isKeySetSerializedOfNumberKeyLabels(all().serialized())).toBeTruthy();
  });

  it("isKeySetSerializedOfNumberKeyLabels(none().serialized()): true", () => {
    expect(isKeySetSerializedOfNumberKeyLabels(none().serialized())).toBeTruthy();
  });

  it("isKeySetSerializedOfNumberKeyLabels(some([1, 2]).serialized()): false", () => {
    expect(isKeySetSerializedOfNumberKeyLabels(some([1, 2]).serialized())).toBeFalsy();
  });

  it("isKeySetSerializedOfNumberKeyLabels(some(['1', '2']).serialized()): false", () => {
    expect(isKeySetSerializedOfNumberKeyLabels(some(["1", "2"]).serialized())).toBeFalsy();
  });

  it("isKeySetSerializedOfNumberKeyLabels(some([{ key: 1, label: 'A' }]).serialized()): true", () => {
    expect(
      isKeySetSerializedOfNumberKeyLabels(some([{ key: 1, label: "A" }]).serialized())
    ).toBeTruthy();
  });

  it("isKeySetSerializedOfNumberKeyLabels(some([{ key: '1', label: 'A' }]).serialized()): false", () => {
    expect(
      isKeySetSerializedOfNumberKeyLabels(some([{ key: "1", label: "A" }]).serialized())
    ).toBeFalsy();
  });
});
