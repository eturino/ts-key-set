import { uniqueArray, uniqueKeyLabelArray } from "../../..";

describe("uniqueArray()", () => {
  it("uniqueArray([])", () => {
    expect(uniqueArray([])).toEqual([]);
  });

  it("uniqueArray([1, 3, 1, 3, 4, 2])", () => {
    expect(uniqueArray([1, 3, 1, 3, 4, 2])).toEqual([1, 3, 4, 2]);
  });

  it('uniqueArray(["a", "c", "d", "c", "a", "b"])', () => {
    expect(uniqueArray(["a", "c", "d", "c", "a", "b"])).toEqual([
      "a",
      "c",
      "d",
      "b"
    ]);
  });
});

describe("uniqueKeyLabelArray()", () => {
  it("uniqueKeyLabelArray([])", () => {
    expect(uniqueKeyLabelArray([])).toEqual([]);
  });

  it("uniqueKeyLabelArray([{ key: 1, label: 'a' }, { key: 1, label: 'b' }, { key: 2, label: 'a' }])", () => {
    expect(
      uniqueKeyLabelArray([
        { key: 1, label: "a" },
        { key: 1, label: "b" },
        { key: 2, label: "a" }
      ])
    ).toEqual([
      { key: 1, label: "a" },
      { key: 2, label: "a" }
    ]);
  });

  it("uniqueKeyLabelArray([{ key: '1', label: 'a' }, { key: '1', label: 'b' }, { key: '2', label: 'a' }])", () => {
    expect(
      uniqueKeyLabelArray([
        { key: "1", label: "a" },
        { key: "1", label: "b" },
        { key: "2", label: "a" }
      ])
    ).toEqual([
      { key: "1", label: "a" },
      { key: "2", label: "a" }
    ]);
  });
});
