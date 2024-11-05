import { describe, expect, it } from "vitest";

import {
  InvalidKeySetError,
  type KeySet,
  KeySetAll,
  KeySetAllExceptSome,
  type KeySetAllExceptSomeSerialized,
  type KeySetAllSerialized,
  KeySetNone,
  type KeySetNoneSerialized,
  type KeySetSerialized,
  KeySetSome,
  type KeySetSomeSerialized,
  KeySetTypes,
  all,
  allExceptSome,
  isKeySetAllExceptSomeSerialized,
  isKeySetAllSerialized,
  isKeySetNoneSerialized,
  isKeySetSerialized,
  isKeySetSomeSerialized,
  none,
  parseKeySet,
  serializeKeySet,
  some,
} from "../..";

const allSerialized: KeySetAllSerialized = { type: KeySetTypes.all };
const noneSerialized: KeySetNoneSerialized = { type: KeySetTypes.none };
const someNumberSerialized: KeySetSomeSerialized = {
  type: KeySetTypes.some,
  elements: [1, 2],
};
const someStringSerialized: KeySetSomeSerialized = {
  type: KeySetTypes.some,
  elements: ["a", "b"],
};
const allExceptSomeNumberSerialized: KeySetAllExceptSomeSerialized = {
  type: KeySetTypes.allExceptSome,
  elements: [1, 2],
};
const allExceptSomeStringSerialized: KeySetAllExceptSomeSerialized = {
  type: KeySetTypes.allExceptSome,
  elements: ["a", "b"],
};

const validSerialized: KeySetSerialized[] = [
  allSerialized,
  noneSerialized,
  someNumberSerialized,
  someStringSerialized,
  allExceptSomeNumberSerialized,
  allExceptSomeStringSerialized,
];

const invalidSerialized: unknown[] = [
  null,
  123,
  "what",
  [],
  {},
  { type: "what" },
  { type: KeySetTypes.all, elements: "what" },
  { type: KeySetTypes.none, elements: "what" },
  { type: KeySetTypes.some, elements: "what" },
  { type: KeySetTypes.allExceptSome, elements: "what" },
  { type: KeySetTypes.all, elements: [1, 2] },
  { type: KeySetTypes.none, elements: [1, 2] },
  { type: KeySetTypes.some, elements: [] },
  { type: KeySetTypes.allExceptSome, elements: [] },
  { type: KeySetTypes.some },
  { type: KeySetTypes.allExceptSome },
];

describe("serialize KeySet", () => {
  describe("isKeySetAllSerialized()", () => {
    it("isKeySetAllSerialized(allSerialized): true", () => {
      expect(isKeySetAllSerialized(allSerialized)).toBeTruthy();
    });

    it("isKeySetAllSerialized(noneSerialized): false", () => {
      expect(isKeySetAllSerialized(noneSerialized)).toBeFalsy();
    });

    it("isKeySetAllSerialized(someNumberSerialized): false", () => {
      expect(isKeySetAllSerialized(someNumberSerialized)).toBeFalsy();
    });

    it("isKeySetAllSerialized(someStringSerialized): false", () => {
      expect(isKeySetAllSerialized(someStringSerialized)).toBeFalsy();
    });

    it("isKeySetAllSerialized(allExceptSomeNumberSerialized): false", () => {
      expect(isKeySetAllSerialized(allExceptSomeNumberSerialized)).toBeFalsy();
    });

    it("isKeySetAllSerialized(allExceptSomeStringSerialized): false", () => {
      expect(isKeySetAllSerialized(allExceptSomeStringSerialized)).toBeFalsy();
    });

    for (const x of invalidSerialized) {
      it(`isKeySetAllSerialized(${JSON.stringify(x)}) returns false`, () => {
        expect(isKeySetAllSerialized(x)).toBeFalsy();
      });
    }
  });

  describe("isKeySetNoneSerialized()", () => {
    it("isKeySetNoneSerialized(allSerialized): false", () => {
      expect(isKeySetNoneSerialized(allSerialized)).toBeFalsy();
    });

    it("isKeySetNoneSerialized(noneSerialized): true", () => {
      expect(isKeySetNoneSerialized(noneSerialized)).toBeTruthy();
    });

    it("isKeySetNoneSerialized(someNumberSerialized): false", () => {
      expect(isKeySetNoneSerialized(someNumberSerialized)).toBeFalsy();
    });

    it("isKeySetNoneSerialized(someStringSerialized): false", () => {
      expect(isKeySetNoneSerialized(someStringSerialized)).toBeFalsy();
    });

    it("isKeySetNoneSerialized(allExceptSomeNumberSerialized): false", () => {
      expect(isKeySetNoneSerialized(allExceptSomeNumberSerialized)).toBeFalsy();
    });

    it("isKeySetNoneSerialized(allExceptSomeStringSerialized): false", () => {
      expect(isKeySetNoneSerialized(allExceptSomeStringSerialized)).toBeFalsy();
    });

    for (const x of invalidSerialized) {
      it(`isKeySetNoneSerialized(${JSON.stringify(x)}) returns false`, () => {
        expect(isKeySetNoneSerialized(x)).toBeFalsy();
      });
    }
  });

  describe("isKeySetSomeSerialized()", () => {
    it("isKeySetSomeSerialized(allSerialized): false", () => {
      expect(isKeySetSomeSerialized(allSerialized)).toBeFalsy();
    });

    it("isKeySetSomeSerialized(noneSerialized): false", () => {
      expect(isKeySetSomeSerialized(noneSerialized)).toBeFalsy();
    });

    it("isKeySetSomeSerialized(someNumberSerialized): true", () => {
      expect(isKeySetSomeSerialized(someNumberSerialized)).toBeTruthy();
    });

    it("isKeySetSomeSerialized(someStringSerialized): true", () => {
      expect(isKeySetSomeSerialized(someStringSerialized)).toBeTruthy();
    });

    it("isKeySetSomeSerialized(allExceptSomeNumberSerialized): false", () => {
      expect(isKeySetSomeSerialized(allExceptSomeNumberSerialized)).toBeFalsy();
    });

    it("isKeySetSomeSerialized(allExceptSomeStringSerialized): false", () => {
      expect(isKeySetSomeSerialized(allExceptSomeStringSerialized)).toBeFalsy();
    });
    for (const x of invalidSerialized) {
      it(`isKeySetSomeSerialized(${JSON.stringify(x)}) returns false`, () => {
        expect(isKeySetSomeSerialized(x)).toBeFalsy();
      });
    }
  });

  describe("isKeySetAllExceptSomeSerialized()", () => {
    it("isKeySetAllExceptSomeSerialized(allSerialized): false", () => {
      expect(isKeySetAllExceptSomeSerialized(allSerialized)).toBeFalsy();
    });

    it("isKeySetAllExceptSomeSerialized(noneSerialized): false", () => {
      expect(isKeySetAllExceptSomeSerialized(noneSerialized)).toBeFalsy();
    });

    it("isKeySetAllExceptSomeSerialized(someNumberSerialized): false", () => {
      expect(isKeySetAllExceptSomeSerialized(someNumberSerialized)).toBeFalsy();
    });

    it("isKeySetAllExceptSomeSerialized(someStringSerialized): false", () => {
      expect(isKeySetAllExceptSomeSerialized(someStringSerialized)).toBeFalsy();
    });

    it("isKeySetAllExceptSomeSerialized(allExceptSomeNumberSerialized): true", () => {
      expect(isKeySetAllExceptSomeSerialized(allExceptSomeNumberSerialized)).toBeTruthy();
    });

    it("isKeySetAllExceptSomeSerialized(allExceptSomeStringSerialized): true", () => {
      expect(isKeySetAllExceptSomeSerialized(allExceptSomeStringSerialized)).toBeTruthy();
    });

    for (const x of invalidSerialized) {
      it(`isKeySetAllExceptSomeSerialized(${JSON.stringify(x)}) returns false`, () => {
        expect(isKeySetAllExceptSomeSerialized(x)).toBeFalsy();
      });
    }
  });

  describe("isKeySetSerialized()", () => {
    for (const x of validSerialized) {
      it(`isKeySetSerialized(${JSON.stringify(x)}) returns true (and is a type predicate)`, () => {
        expect(isKeySetSerialized(x)).toBeTruthy();
      });
    }

    for (const x of invalidSerialized) {
      it(`isKeySetSerialized(${JSON.stringify(x)}) returns false`, () => {
        expect(isKeySetSerialized(x)).toBeFalsy();
      });
    }
  });

  describe("parseKeySet(invalidKeySetSerialized) throws error", () => {
    for (const x of invalidSerialized) {
      it(`${JSON.stringify(x)}`, () => {
        expect(() => parseKeySet(x as unknown as KeySetSerialized)).toThrowError(InvalidKeySetError);
      });
    }
  });

  it("parseKeySet(keySet): returns same keySet", () => {
    const x = some([1, 2]);
    expect(parseKeySet(x)).toBe(x);
  });

  describe("parseKeySet(validKeySetSerialized) throws error", () => {
    it("parseKeySet(allSerialized) => KeySetAll", () => {
      const x = parseKeySet(allSerialized);
      expect(x).toBeInstanceOf(KeySetAll);
    });

    it("parseKeySet(noneSerialized) => KeySetNone", () => {
      const x = parseKeySet(noneSerialized);
      expect(x).toBeInstanceOf(KeySetNone);
    });

    it("parseKeySet(someSerialized) => KeySetSome", () => {
      const x = parseKeySet(someNumberSerialized);
      expect(x).toBeInstanceOf(KeySetSome);
      expect(x.elementsSorted).toEqual(someNumberSerialized.elements);

      const y = parseKeySet(someStringSerialized);
      expect(y).toBeInstanceOf(KeySetSome);
      expect(y.elementsSorted).toEqual(someStringSerialized.elements);
    });

    it("parseKeySet(allExceptSomeSerialized) => KeySetSome", () => {
      const x = parseKeySet(allExceptSomeNumberSerialized);
      expect(x).toBeInstanceOf(KeySetAllExceptSome);
      expect(x.elementsSorted).toEqual(allExceptSomeNumberSerialized.elements);

      const y = parseKeySet(allExceptSomeStringSerialized);
      expect(y).toBeInstanceOf(KeySetAllExceptSome);
      expect(y.elementsSorted).toEqual(allExceptSomeStringSerialized.elements);
    });
  });

  describe("serializeKeySet(nonKeySetAndNotValidKeySetSerialized) throws error", () => {
    for (const x of invalidSerialized) {
      it(`${JSON.stringify(x)}`, () => {
        expect(() => serializeKeySet(x as unknown as KeySet)).toThrowError(InvalidKeySetError);
      });
    }
  });

  it("serializeKeySet(keySetSerialized) returns the same", () => {
    const s = { type: KeySetTypes.all };
    expect(serializeKeySet(s)).toEqual(s);
  });

  describe("all", () => {
    const keySet = all();
    const expected = {
      type: KeySetTypes.all,
    };

    it("keySet.serialized()", () => {
      expect(keySet.serialized()).toEqual(expected);
    });

    it("keySet.toJSON()", () => {
      expect(keySet.toJSON()).toEqual(expected);
    });

    it("serializeKeySet(keySet)", () => {
      expect(serializeKeySet(keySet)).toEqual(expected);
    });

    it("JSON.stringify(keySet) === JSON.stringify(keySetSerialized)", () => {
      expect(JSON.stringify(keySet)).toEqual(JSON.stringify(expected));
    });
  });

  describe("none", () => {
    const keySet = none();
    const expected = {
      type: KeySetTypes.none,
    };

    it("keySet.serialized()", () => {
      expect(keySet.serialized()).toEqual(expected);
    });

    it("keySet.toJSON()", () => {
      expect(keySet.toJSON()).toEqual(expected);
    });

    it("serializeKeySet(keySet)", () => {
      expect(serializeKeySet(keySet)).toEqual(expected);
    });

    it("JSON.stringify(keySet) === JSON.stringify(keySetSerialized)", () => {
      expect(JSON.stringify(keySet)).toEqual(JSON.stringify(expected));
    });
  });

  describe("some(['1', '2'])", () => {
    const keySet = some(["1", "2"]);
    const expected = {
      type: KeySetTypes.some,
      elements: ["1", "2"],
    };

    it("keySet.serialized()", () => {
      expect(keySet.serialized()).toEqual(expected);
    });

    it("keySet.toJSON()", () => {
      expect(keySet.toJSON()).toEqual(expected);
    });

    it("serializeKeySet(keySet)", () => {
      expect(serializeKeySet(keySet)).toEqual(expected);
    });

    it("JSON.stringify(keySet) === JSON.stringify(keySetSerialized)", () => {
      expect(JSON.stringify(keySet)).toEqual(JSON.stringify(expected));
    });
  });

  describe("some([1, 2])", () => {
    const keySet = some([1, 2]);
    const expected = {
      type: KeySetTypes.some,
      elements: [1, 2],
    };

    it("keySet.serialized()", () => {
      expect(keySet.serialized()).toEqual(expected);
    });

    it("keySet.toJSON()", () => {
      expect(keySet.toJSON()).toEqual(expected);
    });

    it("serializeKeySet(keySet)", () => {
      expect(serializeKeySet(keySet)).toEqual(expected);
    });

    it("JSON.stringify(keySet) === JSON.stringify(keySetSerialized)", () => {
      expect(JSON.stringify(keySet)).toEqual(JSON.stringify(expected));
    });
  });

  describe("some([{ key: 'a', label: 'A' }, { key: 'b', label: 'B' }])", () => {
    const keySet = some([
      { key: "a", label: "A" },
      { key: "b", label: "B" },
    ]);
    const expected = {
      type: KeySetTypes.some,
      elements: [
        { key: "a", label: "A" },
        { key: "b", label: "B" },
      ],
    };

    it("keySet.serialized()", () => {
      expect(keySet.serialized()).toEqual(expected);
    });

    it("keySet.toJSON()", () => {
      expect(keySet.toJSON()).toEqual(expected);
    });

    it("serializeKeySet(keySet)", () => {
      expect(serializeKeySet(keySet)).toEqual(expected);
    });

    it("JSON.stringify(keySet) === JSON.stringify(keySetSerialized)", () => {
      expect(JSON.stringify(keySet)).toEqual(JSON.stringify(expected));
    });
  });

  describe("allExceptSome(['1', '2'])", () => {
    const keySet = allExceptSome(["1", "2"]);
    const expected = {
      type: KeySetTypes.allExceptSome,
      elements: ["1", "2"],
    };

    it("keySet.serialized()", () => {
      expect(keySet.serialized()).toEqual(expected);
    });

    it("keySet.toJSON()", () => {
      expect(keySet.toJSON()).toEqual(expected);
    });

    it("serializeKeySet(keySet)", () => {
      expect(serializeKeySet(keySet)).toEqual(expected);
    });

    it("JSON.stringify(keySet) === JSON.stringify(keySetSerialized)", () => {
      expect(JSON.stringify(keySet)).toEqual(JSON.stringify(expected));
    });
  });

  describe("allExceptSome([1, 2])", () => {
    const keySet = allExceptSome([1, 2]);
    const expected = {
      type: KeySetTypes.allExceptSome,
      elements: [1, 2],
    };

    it("keySet.serialized()", () => {
      expect(keySet.serialized()).toEqual(expected);
    });

    it("keySet.toJSON()", () => {
      expect(keySet.toJSON()).toEqual(expected);
    });

    it("serializeKeySet(keySet)", () => {
      expect(serializeKeySet(keySet)).toEqual(expected);
    });

    it("JSON.stringify(keySet) === JSON.stringify(keySetSerialized)", () => {
      expect(JSON.stringify(keySet)).toEqual(JSON.stringify(expected));
    });
  });

  describe("allExceptSome([{ key: 'a', label: 'A' }, { key: 'b', label: 'B' }])", () => {
    const keySet = allExceptSome([
      { key: "a", label: "A" },
      { key: "b", label: "B" },
    ]);
    const expected = {
      type: KeySetTypes.allExceptSome,
      elements: [
        { key: "a", label: "A" },
        { key: "b", label: "B" },
      ],
    };

    it("keySet.serialized()", () => {
      expect(keySet.serialized()).toEqual(expected);
    });

    it("keySet.toJSON()", () => {
      expect(keySet.toJSON()).toEqual(expected);
    });

    it("serializeKeySet(keySet)", () => {
      expect(serializeKeySet(keySet)).toEqual(expected);
    });

    it("JSON.stringify(keySet) === JSON.stringify(keySetSerialized)", () => {
      expect(JSON.stringify(keySet)).toEqual(JSON.stringify(expected));
    });
  });
});
