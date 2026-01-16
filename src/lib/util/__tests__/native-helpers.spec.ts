import { describe, expect, it } from "vitest";
import { setsEqual, sortBy, uniqueWith } from "../native-helpers";

describe("native-helpers", () => {
  describe("sortBy", () => {
    it("sorts by primitive iteratee", () => {
      const arr = [{ a: 3 }, { a: 1 }, { a: 2 }];
      expect(sortBy(arr, (x) => x.a)).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }]);
    });

    it("sorts by string iteratee", () => {
      const arr = [{ name: "charlie" }, { name: "alice" }, { name: "bob" }];
      expect(sortBy(arr, (x) => x.name)).toEqual([
        { name: "alice" },
        { name: "bob" },
        { name: "charlie" },
      ]);
    });

    it("sorts by array iteratee (multi-key)", () => {
      const arr = [
        { type: "b", val: 2 },
        { type: "a", val: 2 },
        { type: "a", val: 1 },
      ];
      expect(sortBy(arr, (x) => [x.type, x.val])).toEqual([
        { type: "a", val: 1 },
        { type: "a", val: 2 },
        { type: "b", val: 2 },
      ]);
    });

    it("does not mutate original array", () => {
      const arr = [{ a: 3 }, { a: 1 }];
      const sorted = sortBy(arr, (x) => x.a);
      expect(arr).toEqual([{ a: 3 }, { a: 1 }]);
      expect(sorted).not.toBe(arr);
    });

    it("handles null values in comparison", () => {
      const arr = [{ a: 1 }, { a: null }, { a: 2 }];
      const result = sortBy(arr, (x) => x.a);
      expect(result).toEqual([{ a: 1 }, { a: 2 }, { a: null }]);
    });

    it("handles undefined values in comparison", () => {
      const arr = [{ a: 1 }, { a: undefined }, { a: 2 }];
      const result = sortBy(arr, (x) => x.a);
      expect(result).toEqual([{ a: 1 }, { a: 2 }, { a: undefined }]);
    });

    it("handles both null values", () => {
      const arr = [{ a: null }, { a: null }];
      const result = sortBy(arr, (x) => x.a);
      expect(result).toEqual([{ a: null }, { a: null }]);
    });

    it("handles null vs non-null (null comes last)", () => {
      const arr = [{ a: null }, { a: 1 }];
      const result = sortBy(arr, (x) => x.a);
      expect(result).toEqual([{ a: 1 }, { a: null }]);
    });

    it("handles non-null vs null (null comes last)", () => {
      const arr = [{ a: 1 }, { a: null }];
      const result = sortBy(arr, (x) => x.a);
      expect(result).toEqual([{ a: 1 }, { a: null }]);
    });

    it("handles both undefined values", () => {
      const arr = [{ a: undefined }, { a: undefined }];
      const result = sortBy(arr, (x) => x.a);
      expect(result).toEqual([{ a: undefined }, { a: undefined }]);
    });

    it("handles equal values", () => {
      const arr = [{ a: 1 }, { a: 1 }];
      const result = sortBy(arr, (x) => x.a);
      expect(result).toEqual([{ a: 1 }, { a: 1 }]);
    });

    it("handles arrays of different lengths (shorter first, lexicographic)", () => {
      const arr = [{ keys: [1, 2, 3] }, { keys: [1, 2] }, { keys: [1] }];
      const result = sortBy(arr, (x) => x.keys);
      expect(result).toEqual([
        { keys: [1] },
        { keys: [1, 2] },
        { keys: [1, 2, 3] },
      ]);
    });
  });

  describe("uniqueWith", () => {
    it("removes duplicates using custom comparator", () => {
      const arr = [{ id: 1 }, { id: 2 }, { id: 1 }];
      const result = uniqueWith(arr, (a, b) => a.id === b.id);
      expect(result).toEqual([{ id: 1 }, { id: 2 }]);
    });

    it("keeps first occurrence", () => {
      const arr = [
        { id: 1, name: "first" },
        { id: 1, name: "second" },
      ];
      const result = uniqueWith(arr, (a, b) => a.id === b.id);
      expect(result).toEqual([{ id: 1, name: "first" }]);
    });

    it("returns empty array for empty input", () => {
      expect(uniqueWith([], () => true)).toEqual([]);
    });
  });

  describe("setsEqual", () => {
    it("returns true for equal sets", () => {
      const a = new Set([1, 2, 3]);
      const b = new Set([1, 2, 3]);
      expect(setsEqual(a, b)).toBe(true);
    });

    it("returns true for equal sets regardless of insertion order", () => {
      const a = new Set([1, 2, 3]);
      const b = new Set([3, 2, 1]);
      expect(setsEqual(a, b)).toBe(true);
    });

    it("returns false for sets of different sizes", () => {
      const a = new Set([1, 2, 3]);
      const b = new Set([1, 2]);
      expect(setsEqual(a, b)).toBe(false);
    });

    it("returns false for sets with different elements", () => {
      const a = new Set([1, 2, 3]);
      const b = new Set([1, 2, 4]);
      expect(setsEqual(a, b)).toBe(false);
    });

    it("returns true for empty sets", () => {
      const a = new Set<number>();
      const b = new Set<number>();
      expect(setsEqual(a, b)).toBe(true);
    });
  });
});
