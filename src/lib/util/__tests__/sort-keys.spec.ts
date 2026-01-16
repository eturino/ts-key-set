import { describe, expect, it } from "vitest";
import { sortKeys } from "../../..";

describe("sortKeys", () => {
  describe("with strings", () => {
    const unsorted = ["a", "c", "b"];
    const unsortedSet = new Set(unsorted);
    const sorted = ["a", "b", "c"];
    const sortedSet = new Set(sorted);

    it("should sort the keys", () => {
      expect(sortKeys(unsorted)).toEqual(sorted);
      expect(sortKeys(unsortedSet)).toEqual(sorted);
    });

    it("returns a new one even if already sorted", () => {
      expect(sortKeys(sorted)).toEqual(sorted);
      expect(sortKeys(sorted)).not.toBe(sorted);
      expect(sortKeys(sortedSet)).toEqual(sorted);
      expect(sortKeys(sortedSet)).not.toBe(sorted);
    });
  });

  describe("with numbers", () => {
    const unsorted = [1, 3, 2];
    const unsortedSet = new Set(unsorted);
    const sorted = [1, 2, 3];
    const sortedSet = new Set(sorted);

    it("should sort the keys", () => {
      expect(sortKeys(unsorted)).toEqual(sorted);
      expect(sortKeys(unsortedSet)).toEqual(sorted);
    });

    it("returns a new one even if already sorted", () => {
      expect(sortKeys(sorted)).toEqual(sorted);
      expect(sortKeys(sorted)).not.toBe(sorted);
      expect(sortKeys(sortedSet)).toEqual(sorted);
      expect(sortKeys(sortedSet)).not.toBe(sorted);
    });
  });

  describe("with key labels", () => {
    const unsorted = [
      { key: "a", label: "Something" },
      { key: "c", label: "AAA" },
      { key: "b", label: "Whatever" },
    ];
    const unsortedSet = new Set(unsorted);
    const sorted = [
      { key: "a", label: "Something" },
      { key: "b", label: "Whatever" },
      { key: "c", label: "AAA" },
    ];
    const sortedSet = new Set(sorted);

    it("should sort the keys", () => {
      expect(sortKeys(unsorted)).toEqual(sorted);
      expect(sortKeys(unsortedSet)).toEqual(sorted);
    });

    it("returns a new one even if already sorted", () => {
      expect(sortKeys(sorted)).toEqual(sorted);
      expect(sortKeys(sorted)).not.toBe(sorted);
      expect(sortKeys(sortedSet)).toEqual(sorted);
      expect(sortKeys(sortedSet)).not.toBe(sorted);
    });
  });

  describe("with key labels (numeric keys)", () => {
    const unsorted = [
      { key: 1, label: "Something" },
      { key: 3, label: "AAA" },
      { key: 2, label: "Whatever" },
    ];
    const unsortedSet = new Set(unsorted);
    const sorted = [
      { key: 1, label: "Something" },
      { key: 2, label: "Whatever" },
      { key: 3, label: "AAA" },
    ];
    const sortedSet = new Set(sorted);

    it("should sort the keys", () => {
      expect(sortKeys(unsorted)).toEqual(sorted);
      expect(sortKeys(unsortedSet)).toEqual(sorted);
    });

    it("returns a new one even if already sorted", () => {
      expect(sortKeys(sorted)).toEqual(sorted);
      expect(sortKeys(sorted)).not.toBe(sorted);
      expect(sortKeys(sortedSet)).toEqual(sorted);
      expect(sortKeys(sortedSet)).not.toBe(sorted);
    });
  });

  describe("with key labels having equal keys", () => {
    it("preserves order for equal keys", () => {
      const input = [
        { key: "a", label: "First" },
        { key: "a", label: "Second" },
      ];
      const result = sortKeys(input);
      expect(result).toEqual(input);
      expect(result).not.toBe(input);
    });
  });
});
