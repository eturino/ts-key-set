import { sortBy } from "lodash";
import { KeySet } from "../-base";
import { all, KeySetAll } from "../all";
import { allExceptSome, KeySetAllExceptSome } from "../all-except-some";
import { ComposedKeySet, composedKeySetFrom, isComposedKeySet } from "../composed";
import { KeySetNone, none } from "../none";
import { serializeKeySet } from "../serialize";
import { KeySetSome, some } from "../some";

describe("ComposedKeySet", () => {
  describe("isComposedKeySet", () => {
    it("returns true if the object is a ComposedKeySet", () => {
      const ks = new ComposedKeySet([]);
      expect(isComposedKeySet(ks)).toBeTruthy();
    });
    it("returns false with a keySet", () => {
      const ks = all<string>();
      expect(isComposedKeySet(ks)).toBeFalsy();
    });
    it("returns false with a serialized keySet", () => {
      const ks = serializeKeySet(all<string>());
      expect(isComposedKeySet(ks)).toBeFalsy();
    });
    it("returns false with null", () => {
      expect(isComposedKeySet(null)).toBeFalsy();
    });
  });

  describe("construction", () => {
    it("with an empty list => returns Composed([All])", () => {
      const actual = composedKeySetFrom([]);
      const expected = new ComposedKeySet([new KeySetAll()]);
      expect(actual).toEqual(expected);
      expect(actual.isEqual(expected)).toBeTruthy();
    });

    it("a list => returns Composed(sort(list))", () => {
      const ks1 = new KeySetAll();
      const ks2 = new KeySetSome([1, 2, 3]);
      const ks3 = new KeySetAllExceptSome([4]);

      const actual = composedKeySetFrom([ks1, ks2, ks3]);

      const list = [ks1.clone(), ks2.clone(), ks3.clone()];
      const sorted = sortBy(list, (x) => [x.type, x.elements]);
      const expected = new ComposedKeySet(sorted);
      expect(actual).toEqual(expected);
      expect(actual.isEqual(expected)).toBeTruthy();
    });
  });

  describe("#isEqual", () => {
    const a = some([1, 2, 3]);
    const b = some([3, 4]);
    const c = none();
    const d = all();

    it("different length of list => false", () => {
      const original = composedKeySetFrom([a, b, c, d]);
      const other = composedKeySetFrom([a.clone(), b.clone(), c.clone()]);
      expect(original.isEqual(other)).toBeFalsy();
    });

    it("different elements => false", () => {
      const original = composedKeySetFrom([a, b, d]);
      const other = composedKeySetFrom([a.clone(), b.clone(), c.clone()]);
      expect(original.isEqual(other)).toBeFalsy();
    });

    it("same elements, different order => true", () => {
      const original = composedKeySetFrom([a, b, c]);
      const other = composedKeySetFrom([c.clone(), a.clone(), b.clone()]);
      expect(original.isEqual(other)).toBeTruthy();
    });

    it("same elements, same order => true", () => {
      const original = composedKeySetFrom([a, b, c]);
      const other = composedKeySetFrom([a.clone(), b.clone(), c.clone()]);
      expect(original.isEqual(other)).toBeTruthy();
    });

    it("exactly same list (same array) => true", () => {
      const list = [a, b, c];
      const original = composedKeySetFrom(list);
      const other = composedKeySetFrom(list);
      expect(original.isEqual(other)).toBeTruthy();
    });

    it("x.isEqual(x) => true", () => {
      const list = [a, b, c];
      const original = composedKeySetFrom(list);
      expect(original.isEqual(original)).toBeTruthy();
    });
  });

  describe("#clone", () => {
    it("returns an equivalent composed with a clone of each ks", () => {
      const ks1 = new KeySetAll();
      const ks2 = new KeySetSome([1, 2, 3]);
      const ks3 = new KeySetAllExceptSome([4]);

      const original = composedKeySetFrom([ks1, ks2, ks3]);
      const actual = original.clone();
      expect(actual).toEqual(original);
      expect(actual.isEqual(original)).toBeTruthy();
      expect(actual).not.toBe(original);

      expect(actual.list[0]).toEqual(original.list[0]);
      expect(actual.list[0].isEqual(original.list[0])).toBeTruthy();
      expect(actual.list[0]).not.toBe(original.list[0]);
    });
  });

  describe("#collapseUnion", () => {
    it("returns the result of list[0].union(list[1]).union(list[2])...", () => {
      const ks1: KeySetSome<number> = new KeySetSome([1, 2, 3]);
      const ks2: KeySetSome<number> = new KeySetSome([1, 3, 9]);
      const ks3: KeySetSome<number> = new KeySetSome([1, 4]);

      const expected = ks1.union(ks2).union(ks3);

      const original = composedKeySetFrom([ks1, ks2, ks3]);
      const actual = original.collapseUnion();
      expect(actual).toEqual(expected);
    });
  });

  describe("#collapseIntersect", () => {
    it("returns the result of list[0].intersect(list[1]).intersect(list[2])...", () => {
      const ks1: KeySetSome<number> = new KeySetSome([1, 2, 3]);
      const ks2: KeySetSome<number> = new KeySetSome([1, 3, 9]);
      const ks3: KeySetSome<number> = new KeySetSome([1, 4]);

      const expected = ks1.intersect(ks2).intersect(ks3);

      const original = composedKeySetFrom([ks1, ks2, ks3]);
      const actual = original.collapseIntersect();
      expect(actual).toEqual(expected);
    });
  });

  describe("#invert", () => {
    it("returns a new composed with each member of the list inverted", () => {
      const ks1: KeySetSome<number> = new KeySetSome([1, 2, 3]);
      const ks2: KeySetSome<number> = new KeySetSome([1, 3, 9]);
      const ks3: KeySetSome<number> = new KeySetSome([1, 4]);

      const original = composedKeySetFrom([ks1, ks2, ks3]);
      const expected = composedKeySetFrom([ks1.invert(), ks2.invert(), ks3.invert()]);

      const actual = original.invert();
      expect(actual).toEqual(expected);
    });
  });

  describe("#add", () => {
    it("returns a new composed an extra member", () => {
      const ks1: KeySetSome<number> = new KeySetSome([1, 2, 3]);
      const ks2: KeySetSome<number> = new KeySetSome([1, 3, 9]);
      const ks3: KeySetSome<number> = new KeySetSome([1, 4]);
      const extra: KeySetSome<number> = new KeySetSome([1, 4, 10]);

      const original = composedKeySetFrom([ks1, ks2, ks3]);
      const expected = composedKeySetFrom([ks1, ks2, ks3, extra]);

      const actual = original.add(extra);
      expect(actual).toEqual(expected);
    });
  });

  describe("#addList", () => {
    it("returns a new composed an extra members", () => {
      const ks1: KeySetSome<number> = new KeySetSome([1, 2, 3]);
      const ks2: KeySetSome<number> = new KeySetSome([1, 3, 9]);
      const ks3: KeySetSome<number> = new KeySetSome([1, 4]);
      const extra1: KeySetSome<number> = new KeySetSome([1, 4, 10]);
      const extra2: KeySetSome<number> = new KeySetSome([1, 23]);

      const original = composedKeySetFrom([ks1, ks2, ks3]);
      const expected = composedKeySetFrom([ks1, ks2, ks3, extra1, extra2]);

      const actual = original.addList([extra1, extra2]);
      expect(actual).toEqual(expected);
    });
  });

  describe("#without", () => {
    it("returns a new composed with the list of members that are not equivalent with the given one", () => {
      const ks1: KeySetSome<number> = new KeySetSome([1, 2, 3]);
      const ks2: KeySetSome<number> = new KeySetSome([1, 3, 9]);
      const ks3: KeySetSome<number> = new KeySetSome([1, 4]);
      const cln: KeySetSome<number> = new KeySetSome([1, 4]);

      const original = composedKeySetFrom([ks1, ks2, ks3, cln]);
      const expected = composedKeySetFrom([ks1, ks2]);

      const actual = original.without(new KeySetSome([1, 4]));
      expect(actual).toEqual(expected);
    });

    it("if nothing survives, it will have a single ALL", () => {
      const ks1: KeySetSome<number> = new KeySetSome([1, 2, 3]);
      const ks2: KeySetSome<number> = new KeySetSome([1, 2, 3]);

      const original = composedKeySetFrom([ks1, ks2]);
      const expected = composedKeySetFrom([all()]);

      const actual = original.without(new KeySetSome([1, 2, 3]));
      expect(actual).toEqual(expected);
    });
  });

  describe("#withoutList", () => {
    it("returns a new composed with the list of members that are not equivalent with the given one", () => {
      const ks1: KeySetSome<number> = new KeySetSome([1, 2, 3]);
      const ks2: KeySetSome<number> = new KeySetSome([1, 3, 9]);
      const ks3: KeySetSome<number> = new KeySetSome([1, 4]);
      const cln: KeySetSome<number> = new KeySetSome([1, 4]);

      const original = composedKeySetFrom([ks1, ks2, ks3, cln]);
      const expected = composedKeySetFrom([ks1, ks2]);

      const actual = original.withoutList([new KeySetSome([1, 4]), new KeySetSome([19191])]);
      expect(actual).toEqual(expected);
    });

    it("if nothing survives, it will have a single ALL", () => {
      const ks1: KeySetSome<number> = new KeySetSome([1, 2, 3]);
      const ks2: KeySetSome<number> = new KeySetSome([1, 2, 3]);

      const original = composedKeySetFrom([ks1, ks2]);
      const expected = composedKeySetFrom([all()]);

      const actual = original.withoutList([new KeySetSome([1, 2, 3])]);
      expect(actual).toEqual(expected);
    });
  });

  describe("#filter", () => {
    it("returns a new composed with the elements of the list that return true on the given predicate", () => {
      const ks1: KeySetSome<number> = new KeySetSome([1, 2, 3]);
      const ks2: KeySetSome<number> = new KeySetSome([1, 3, 9]);
      const ks3: KeySetSome<number> = new KeySetSome([1, 2]);

      const fn = (ks: KeySet<number>) => ks instanceof KeySetSome && ks.includes(2);

      const original = composedKeySetFrom([ks1, ks2, ks3]);
      const expected = composedKeySetFrom([ks1, ks3]);

      const actual = original.filter(fn);
      expect(actual).toEqual(expected);
    });

    it("if nothing survives, it will have a single ALL", () => {
      const ks1: KeySetSome<number> = new KeySetSome([1, 2, 3]);
      const ks2: KeySetSome<number> = new KeySetSome([1, 3, 9]);
      const ks3: KeySetSome<number> = new KeySetSome([1, 4]);

      const fn = (ks: KeySet<number>) => ks instanceof KeySetNone;

      const original = composedKeySetFrom([ks1, ks2, ks3]);
      const expected = composedKeySetFrom([all()]);

      const actual = original.filter(fn);
      expect(actual).toEqual(expected);
    });
  });

  describe("#map", () => {
    it("returns a new composed with the mapped elements", () => {
      const ks1 = new KeySetSome([1, 2, 3]);
      const ks2 = new KeySetSome([1, 3, 9]);
      const ks3 = new KeySetSome([1, 2]);
      const ks4 = new KeySetAllExceptSome([1, 2]);

      const fn = (ks: KeySet<number>) => (ks instanceof KeySetSome ? some([...ks.elements, 99]) : ks);

      const eks1 = new KeySetSome([1, 2, 3, 99]);
      const eks2 = new KeySetSome([1, 3, 9, 99]);
      const eks3 = new KeySetSome([1, 2, 99]);
      const eks4 = new KeySetAllExceptSome([1, 2]);

      const original = composedKeySetFrom([ks1, ks2, ks3, ks4]);
      const expected = composedKeySetFrom([eks1, eks2, eks3, eks4]);

      const actual = original.map(fn);
      expect(actual).toEqual(expected);
    });
  });

  describe("#contains and #includes", () => {
    it("if every list member contains the element, returns true", () => {
      const ks1: KeySetSome<number> = new KeySetSome([1, 2, 3]);
      const ks2: KeySetSome<number> = new KeySetSome([1, 4]);
      const original = composedKeySetFrom([ks1, ks2]);

      expect(original.contains(1)).toBeTruthy();
      expect(original.includes(1)).toBeTruthy();
    });

    it("if any list member does not contain the element, returns false", () => {
      const ks1: KeySetSome<number> = new KeySetSome([1, 2, 3]);
      const ks2: KeySetSome<number> = new KeySetSome([1, 4]);
      const original = composedKeySetFrom([ks1, ks2]);

      expect(original.contains(3)).toBeFalsy();
      expect(original.includes(3)).toBeFalsy();
    });
  });

  describe("#representsAll", () => {
    it("EVERY element representsAll() => true", () => {
      const original = composedKeySetFrom([all(), all()]);
      expect(original.representsAll()).toBeTruthy();
    });

    it("otherwise false", () => {
      const ks1 = composedKeySetFrom([all(), none()]);
      expect(ks1.representsAll()).toBeFalsy();

      const ks2 = composedKeySetFrom([all(), some([1, 2]), all()]);
      expect(ks2.representsAll()).toBeFalsy();

      const ks3 = composedKeySetFrom([some([1, 2])]);
      expect(ks3.representsAll()).toBeFalsy();
    });
  });

  describe("#representsSome", () => {
    it("EVERY element representsSome() => true", () => {
      const original = composedKeySetFrom([some([1, 2]), some([3])]);
      expect(original.representsSome()).toBeTruthy();
    });

    it("otherwise false", () => {
      const ks1 = composedKeySetFrom([some([1, 2]), none()]);
      expect(ks1.representsSome()).toBeFalsy();

      const ks2 = composedKeySetFrom([some([4, 1]), some([1, 2]), all()]);
      expect(ks2.representsSome()).toBeFalsy();

      const ks3 = composedKeySetFrom([allExceptSome([1, 2])]);
      expect(ks3.representsSome()).toBeFalsy();
    });
  });
  describe("#representsAllExceptSome", () => {
    it("EVERY element representsAllExceptSome() => true", () => {
      const original = composedKeySetFrom([allExceptSome([1, 2]), allExceptSome([3])]);
      expect(original.representsAllExceptSome()).toBeTruthy();
    });

    it("otherwise false", () => {
      const ks1 = composedKeySetFrom([some([1, 2]), allExceptSome([1])]);
      expect(ks1.representsAllExceptSome()).toBeFalsy();

      const ks2 = composedKeySetFrom([allExceptSome([4, 1]), allExceptSome([1, 2]), all()]);
      expect(ks2.representsAllExceptSome()).toBeFalsy();

      const ks3 = composedKeySetFrom([some([1, 2])]);
      expect(ks3.representsAllExceptSome()).toBeFalsy();
    });
  });

  describe("#representsNone", () => {
    it("EVERY element representsNone() => true", () => {
      const original = composedKeySetFrom([none(), none()]);
      expect(original.representsNone()).toBeTruthy();
    });

    it("otherwise false", () => {
      const ks1 = composedKeySetFrom([some([1, 2]), none()]);
      expect(ks1.representsNone()).toBeFalsy();

      const ks2 = composedKeySetFrom([allExceptSome([4, 1]), allExceptSome([1, 2]), none()]);
      expect(ks2.representsNone()).toBeFalsy();

      const ks3 = composedKeySetFrom([all()]);
      expect(ks3.representsNone()).toBeFalsy();
    });
  });

  describe("#compactUnion", () => {
    const a = some([1, 2, 3]);
    const b = some([3, 4]);
    const c = none();
    const d = all();
    const e = allExceptSome([1, 2, 3]);
    const f = allExceptSome([3, 4]);
    const g = allExceptSome([5]);

    it("removes duplicates", () => {
      const original = composedKeySetFrom([some([1, 2, 3]), some([1, 2, 3])]);
      const expected = composedKeySetFrom([some([1, 2, 3])]);
      expect(original.compactUnion()).toEqual(expected);
      expect(original.compactUnion().isEqual(expected)).toBeTruthy();
    });

    it("applies union of the elements of the same type", () => {
      const original = composedKeySetFrom([a, a, b, c, d]);
      const expected = composedKeySetFrom([some([1, 2, 3, 4]), c, d]);
      expect(original.compactUnion()).toEqual(expected);
      expect(original.compactUnion().isEqual(expected)).toBeTruthy();
    });

    it("union of AllExceptSome can end up removing them", () => {
      const original = composedKeySetFrom([a, b, c, d, e, f, g]);
      const expected = composedKeySetFrom([some([1, 2, 3, 4]), c, d]);
      expect(original.compactUnion()).toEqual(expected);
      expect(original.compactUnion().isEqual(expected)).toBeTruthy();
    });
  });

  describe("#compactIntersect", () => {
    const a = allExceptSome([1, 2, 3]);
    const b = allExceptSome([3, 4]);
    const c = none();
    const d = all();
    const e = some([1, 2, 3]);
    const f = some([3, 4]);
    const g = some([5]);

    it("removes duplicates", () => {
      const original = composedKeySetFrom([allExceptSome([1, 2, 3]), allExceptSome([1, 2, 3])]);
      const expected = composedKeySetFrom([allExceptSome([1, 2, 3])]);
      expect(original.compactIntersect()).toEqual(expected);
      expect(original.compactIntersect().isEqual(expected)).toBeTruthy();
    });

    it("applies intersect of the elements of the same type", () => {
      const original = composedKeySetFrom([a, a, b, c, d]);
      const expected = composedKeySetFrom([allExceptSome([1, 2, 3, 4]), c, d]);
      expect(original.compactIntersect()).toEqual(expected);
      expect(original.compactIntersect().isEqual(expected)).toBeTruthy();
    });

    it("intersect of some can end up removing them", () => {
      const original = composedKeySetFrom([a, b, c, d, e, f, g]);
      const expected = composedKeySetFrom([allExceptSome([1, 2, 3, 4]), c, d]);
      expect(original.compactIntersect()).toEqual(expected);
      expect(original.compactIntersect().isEqual(expected)).toBeTruthy();
    });
  });
});
