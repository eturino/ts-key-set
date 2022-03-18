import { setByKeys } from "../../..";

describe("setByKeys()", () => {
  it("setByKeys([])", () => {
    expect(setByKeys([])).toEqual(new Set([]));
  });

  it("setByKeys([1, 3, 1, 3, 4, 2])", () => {
    expect(setByKeys([1, 3, 1, 3, 4, 2])).toEqual(new Set([1, 3, 4, 2]));
  });

  it("setByKeys(new Set([1, 3, 1, 3, 4, 2]))", () => {
    expect(setByKeys(new Set([1, 3, 1, 3, 4, 2]))).toEqual(new Set([1, 3, 4, 2]));
  });

  it('setByKeys(["a", "c", "d", "c", "a", "b"])', () => {
    expect(setByKeys(["a", "c", "d", "c", "a", "b"])).toEqual(new Set(["a", "c", "d", "b"]));
  });

  it('setByKeys(new Set(["a", "c", "d", "c", "a", "b"]))', () => {
    expect(setByKeys(new Set(["a", "c", "d", "c", "a", "b"]))).toEqual(new Set(["a", "c", "d", "b"]));
  });

  it("setByKeys([{ key: 1, label: 'a' }, { key: 1, label: 'b' }, { key: 2, label: 'a' }])", () => {
    expect(
      setByKeys([
        { key: 1, label: "a" },
        { key: 1, label: "b" },
        { key: 2, label: "a" },
      ])
    ).toEqual(
      new Set([
        { key: 1, label: "a" },
        { key: 2, label: "a" },
      ])
    );
  });

  it("setByKeys([{ key: '1', label: 'a' }, { key: '1', label: 'b' }, { key: '2', label: 'a' }])", () => {
    expect(
      setByKeys([
        { key: "1", label: "a" },
        { key: "1", label: "b" },
        { key: "2", label: "a" },
      ])
    ).toEqual(
      new Set([
        { key: "1", label: "a" },
        { key: "2", label: "a" },
      ])
    );
  });

  it("setByKeys(new Set([{ key: 1, label: 'a' }, { key: 1, label: 'b' }, { key: 2, label: 'a' }]))", () => {
    expect(
      setByKeys(
        new Set([
          { key: 1, label: "a" },
          { key: 1, label: "b" },
          { key: 2, label: "a" },
        ])
      )
    ).toEqual(
      new Set([
        { key: 1, label: "a" },
        { key: 2, label: "a" },
      ])
    );
  });

  it("setByKeys(new Set([{ key: '1', label: 'a' }, { key: '1', label: 'b' }, { key: '2', label: 'a' }]))", () => {
    expect(
      setByKeys(
        new Set([
          { key: "1", label: "a" },
          { key: "1", label: "b" },
          { key: "2", label: "a" },
        ])
      )
    ).toEqual(
      new Set([
        { key: "1", label: "a" },
        { key: "2", label: "a" },
      ])
    );
  });
});
