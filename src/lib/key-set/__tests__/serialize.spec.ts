import { describe, expect, it } from "vitest";

import {
  type ComposedKeyLabelSetSerialized,
  type ComposedKeySetSerialized,
  type IKeyLabel,
  InvalidKeySetError,
  type KeyLabelSet,
  type KeyLabelSetAll,
  type KeyLabelSetAllExceptSome,
  type KeyLabelSetAllExceptSomeSerialized,
  type KeyLabelSetAllSerialized,
  type KeyLabelSetNone,
  type KeyLabelSetNoneSerialized,
  type KeyLabelSetSerialized,
  type KeyLabelSetSome,
  type KeyLabelSetSomeSerialized,
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
  composedKeySetFrom,
  isComposedKeyLabelSetSerialized,
  isComposedKeySetSerialized,
  isComposedKeySetSerializedRepresentsAll,
  isComposedKeySetSerializedRepresentsAllExceptSome,
  isComposedKeySetSerializedRepresentsNone,
  isComposedKeySetSerializedRepresentsSome,
  isKeyLabelSetSerialized,
  isKeySetAllExceptSomeSerialized,
  isKeySetAllSerialized,
  isKeySetNoneSerialized,
  isKeySetSerialized,
  isKeySetSomeSerialized,
  none,
  parseComposedKeyLabelSet,
  parseComposedKeySet,
  parseKeyLabelSet,
  parseKeySet,
  serializeComposedKeyLabelSet,
  serializeComposedKeySet,
  serializeKeyLabelSet,
  serializeKeySet,
  some,
} from "../../..";

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

  describe("composed serialized predicates", () => {
    describe("composedKeySetSerializedRepresentsAll", () => {
      it("valid", () => {
        expect(isComposedKeySetSerializedRepresentsAll([allSerialized])).toBeTruthy();
        expect(isComposedKeySetSerializedRepresentsAll([allSerialized, allSerialized])).toBeTruthy();
      });

      it("invalid: not everyone is of the same type", () => {
        expect(isComposedKeySetSerializedRepresentsAll([noneSerialized])).toBeFalsy();
        expect(isComposedKeySetSerializedRepresentsAll([allSerialized, noneSerialized])).toBeFalsy();
      });
    });

    describe("composedKeySetSerializedRepresentsNone", () => {
      it("valid", () => {
        expect(isComposedKeySetSerializedRepresentsNone([noneSerialized])).toBeTruthy();
        expect(isComposedKeySetSerializedRepresentsNone([noneSerialized, noneSerialized])).toBeTruthy();
      });

      it("invalid: not everyone is of the same type", () => {
        expect(isComposedKeySetSerializedRepresentsNone([allSerialized])).toBeFalsy();
        expect(isComposedKeySetSerializedRepresentsNone([noneSerialized, allSerialized])).toBeFalsy();
      });
    });

    describe("composedKeySetSerializedRepresentsSome", () => {
      it("valid", () => {
        expect(isComposedKeySetSerializedRepresentsSome([someStringSerialized])).toBeTruthy();
        expect(isComposedKeySetSerializedRepresentsSome([someStringSerialized, someStringSerialized])).toBeTruthy();
        expect(isComposedKeySetSerializedRepresentsSome([someNumberSerialized, someNumberSerialized])).toBeTruthy();
      });

      it("invalid: not everyone is of the same type", () => {
        expect(isComposedKeySetSerializedRepresentsSome([noneSerialized])).toBeFalsy();
        expect(isComposedKeySetSerializedRepresentsSome([someStringSerialized, allSerialized])).toBeFalsy();
        expect(isComposedKeySetSerializedRepresentsSome([someNumberSerialized, allSerialized])).toBeFalsy();
      });
    });

    describe("composedKeySetSerializedRepresentsAllExceptSome", () => {
      it("valid", () => {
        expect(isComposedKeySetSerializedRepresentsAllExceptSome([allExceptSomeStringSerialized])).toBeTruthy();
        expect(
          isComposedKeySetSerializedRepresentsAllExceptSome([
            allExceptSomeStringSerialized,
            allExceptSomeStringSerialized,
          ]),
        ).toBeTruthy();
        expect(
          isComposedKeySetSerializedRepresentsAllExceptSome([
            allExceptSomeNumberSerialized,
            allExceptSomeNumberSerialized,
          ]),
        ).toBeTruthy();
      });

      it("invalid: not everyone is of the same type", () => {
        expect(isComposedKeySetSerializedRepresentsAllExceptSome([noneSerialized])).toBeFalsy();
        expect(
          isComposedKeySetSerializedRepresentsAllExceptSome([allExceptSomeStringSerialized, allSerialized]),
        ).toBeFalsy();
        expect(
          isComposedKeySetSerializedRepresentsAllExceptSome([allExceptSomeNumberSerialized, allSerialized]),
        ).toBeFalsy();
      });
    });
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

  describe("KeyLabelSet", () => {
    const allKS: KeyLabelSetAll<string> = all<IKeyLabel<string>>();
    const allSerialized: KeyLabelSetAllSerialized<string> = {
      type: KeySetTypes.all,
    };

    const noneKS: KeyLabelSetNone<string> = none<IKeyLabel<string>>();
    const noneSerialized: KeyLabelSetNoneSerialized<string> = {
      type: KeySetTypes.none,
    };

    const aesKS: KeyLabelSetAllExceptSome = allExceptSome([
      { key: "a", label: "A" },
      { key: "b", label: "B" },
    ]);
    const aesSerialized: KeyLabelSetAllExceptSomeSerialized = {
      type: KeySetTypes.allExceptSome,
      elements: [
        { key: "a", label: "A" },
        { key: "b", label: "B" },
      ],
    };
    const someKS: KeyLabelSetSome = some([
      { key: "a", label: "A" },
      { key: "b", label: "B" },
    ]);
    const someSerialized: KeyLabelSetSomeSerialized = {
      type: KeySetTypes.some,
      elements: [
        { key: "a", label: "A" },
        { key: "b", label: "B" },
      ],
    };

    const aesKeySetSerialized = {
      type: KeySetTypes.allExceptSome,
      elements: [1, 2],
    };

    const someKeySetSerialized = {
      type: KeySetTypes.some,
      elements: [1, 2],
    };

    describe("isKeyLabelSetSerialized()", () => {
      it("isKeyLabelSetSerialized(keyLabelSetSerialized) -> true", () => {
        expect(isKeyLabelSetSerialized(aesSerialized)).toBeTruthy();
        expect(isKeyLabelSetSerialized(someSerialized)).toBeTruthy();
        expect(isKeyLabelSetSerialized(allSerialized)).toBeTruthy();
        expect(isKeyLabelSetSerialized(noneSerialized)).toBeTruthy();
      });
      it("isKeyLabelSetSerialized(normalKeySetSerialized some or AES) -> false", () => {
        expect(isKeyLabelSetSerialized(aesKeySetSerialized)).toBeFalsy();
        expect(isKeyLabelSetSerialized(someKeySetSerialized)).toBeFalsy();
      });
      it("isKeyLabelSetSerialized(keySet) -> false", () => {
        expect(isKeyLabelSetSerialized(allKS)).toBeFalsy();
        expect(isKeyLabelSetSerialized(noneKS)).toBeFalsy();
        expect(isKeyLabelSetSerialized(someKS)).toBeFalsy();
        expect(isKeyLabelSetSerialized(aesKS)).toBeFalsy();
      });
    });

    describe("serializeKeyLabelSet()", () => {
      it("serializeKeyLabelSet(keyLabelSetSerialized) -> return same", () => {
        expect(serializeKeyLabelSet(aesSerialized)).toBe(aesSerialized);
        expect(serializeKeyLabelSet(someSerialized)).toBe(someSerialized);
        expect(serializeKeyLabelSet(allSerialized)).toBe(allSerialized);
        expect(serializeKeyLabelSet(noneSerialized)).toBe(noneSerialized);
      });
      it("serializeKeyLabelSet(ks) -> serialize", () => {
        expect(serializeKeyLabelSet(aesKS)).toEqual(aesSerialized);
        expect(serializeKeyLabelSet(someKS)).toEqual(someSerialized);
        expect(serializeKeyLabelSet(allKS)).toEqual(allSerialized);
        expect(serializeKeyLabelSet(noneKS)).toEqual(noneSerialized);
      });
      it("serializeKeyLabelSet(invalid) -> throws", () => {
        expect(() => serializeKeyLabelSet("whatever" as unknown as KeySet)).toThrow();
      });
    });

    describe("parseKeyLabelSet()", () => {
      it("parseKeyLabelSet(keyLabelSetSerialized) -> return same", () => {
        expect(parseKeyLabelSet(aesSerialized)).toEqual(aesKS);
        expect(parseKeyLabelSet(someSerialized)).toEqual(someKS);
        expect(parseKeyLabelSet(allSerialized)).toEqual(allKS);
        expect(parseKeyLabelSet(noneSerialized)).toEqual(noneKS);
      });
      it("parseKeyLabelSet(ks) -> parse", () => {
        expect(parseKeyLabelSet(aesKS)).toBe(aesKS);
        expect(parseKeyLabelSet(someKS)).toBe(someKS);
        expect(parseKeyLabelSet(allKS)).toBe(allKS);
        expect(parseKeyLabelSet(noneKS)).toBe(noneKS);
      });
      it("parseKeyLabelSet(invalid) -> throws", () => {
        expect(() => parseKeyLabelSet("whatever" as unknown as KeySet)).toThrow();
      });
    });
  });

  describe("composedKeySet", () => {
    const keySet1 = allExceptSome([1, 2]);
    const keySetSerialized1 = {
      type: KeySetTypes.allExceptSome,
      elements: [1, 2],
    };
    const keySet2 = some([1, 2, 3, 4]);
    const keySetSerialized2 = {
      type: KeySetTypes.some,
      elements: [1, 2, 3, 4],
    };

    const composedSerialized: KeySetSerialized[] = [keySetSerialized1, keySetSerialized2];
    const arrayKeySets: KeySet[] = [keySet1, keySet2];
    const composedKeySet = composedKeySetFrom([keySet1, keySet2]);

    describe("isComposedKeySetSerialized()", () => {
      it("isComposedKeySetSerialized(composedSerialized) -> OK", () => {
        expect(isComposedKeySetSerialized(composedSerialized)).toBeTruthy();
      });
      it("isComposedKeySetSerialized([]) -> OK", () => {
        expect(isComposedKeySetSerialized([])).toBeTruthy();
      });
      it("isComposedKeySetSerialized(keySet) -> NOPE", () => {
        expect(isComposedKeySetSerialized(keySet1)).toBeFalsy();
      });
      it("isComposedKeySetSerialized(arrayKeySets) -> NOPE", () => {
        expect(isComposedKeySetSerialized(arrayKeySets)).toBeFalsy();
      });
      it("isComposedKeySetSerialized(keySetSerialized) -> NOPE", () => {
        expect(isComposedKeySetSerialized(keySetSerialized1)).toBeFalsy();
      });
      it("isComposedKeySetSerialized(composedKeySet) -> NOPE", () => {
        expect(isComposedKeySetSerialized(composedKeySet)).toBeFalsy();
      });
      it("isComposedKeySetSerialized(composedKeySet) -> NOPE", () => {
        expect(isComposedKeySetSerialized(keySet1)).toBeFalsy();
      });
    });

    describe("serializeComposedKeySet()", () => {
      it("serializeComposedKeySet(composedSerialized) -> return same", () => {
        expect(serializeComposedKeySet(composedSerialized)).toBe(composedSerialized);
      });
      it("serializeComposedKeySet(arrayKeySets) -> serialize each", () => {
        expect(serializeComposedKeySet(arrayKeySets)).toEqual(composedSerialized);
      });
      it("serializeComposedKeySet(composedKeySet) -> serialize each", () => {
        expect(serializeComposedKeySet(composedKeySet)).toEqual(composedSerialized);
      });
      it("serializeComposedKeySet(invalid) -> throw", () => {
        expect(() => serializeComposedKeySet(new Date() as unknown as ComposedKeySetSerialized)).toThrow();
      });
      it("serializeComposedKeySet(invalid element in array) -> throw", () => {
        expect(() =>
          serializeComposedKeySet([keySet1, new Date(), keySet2] as unknown as ComposedKeySetSerialized),
        ).toThrow();
      });
      it("composedKeySet.serialized() -> serialize each", () => {
        expect(composedKeySet.serialized()).toEqual(composedSerialized);
      });
    });

    describe("parseComposedKeySet()", () => {
      it("parseComposedKeySet() with composedKeySetSerialized", () => {
        expect(parseComposedKeySet(composedSerialized)).toEqual(composedKeySet);
      });
      it("parseComposedKeySet() with a list of keySets", () => {
        expect(parseComposedKeySet(arrayKeySets)).toEqual(composedKeySet);
      });
      it("parseComposedKeySet() with empty list", () => {
        expect(parseComposedKeySet([])).toEqual(composedKeySetFrom([]));
      });
      it("parseComposedKeySet() with an already composedKeySet", () => {
        expect(parseComposedKeySet(composedKeySet)).toBe(composedKeySet);
      });
      it("parseComposedKeySet() with invalid argument", () => {
        expect(() => parseComposedKeySet({ invalid: "stuff" } as unknown as ComposedKeySetSerialized)).toThrow();
      });
      it("parseComposedKeySet() with invalid elements", () => {
        expect(() => parseComposedKeySet([{ invalid: "stuff" }] as unknown as ComposedKeySetSerialized)).toThrow();
      });
    });
  });

  describe("composedKeyLabelSet", () => {
    const keySet1 = allExceptSome([
      { key: "a", label: "A" },
      { key: "b", label: "B" },
    ]);
    const keySetSerialized1 = {
      type: KeySetTypes.allExceptSome,
      elements: [
        { key: "a", label: "A" },
        { key: "b", label: "B" },
      ],
    };
    const keySet2 = some([
      { key: "a", label: "A" },
      { key: "b", label: "B" },
      { key: "c", label: "C" },
    ]);
    const keySetSerialized2 = {
      type: KeySetTypes.some,
      elements: [
        { key: "a", label: "A" },
        { key: "b", label: "B" },
        { key: "c", label: "C" },
      ],
    };

    const composedSerialized: KeyLabelSetSerialized[] = [keySetSerialized1, keySetSerialized2];
    const arrayKeySets: KeyLabelSet[] = [keySet1, keySet2];
    const composedKeyLabelSet = composedKeySetFrom([keySet1, keySet2]);

    describe("isComposedKeyLabelSetSerialized()", () => {
      it("isComposedKeyLabelSetSerialized(composedSerialized) -> OK", () => {
        expect(isComposedKeyLabelSetSerialized(composedSerialized)).toBeTruthy();
      });
      it("isComposedKeyLabelSetSerialized([]) -> OK", () => {
        expect(isComposedKeyLabelSetSerialized([])).toBeTruthy();
      });
      it("isComposedKeyLabelSetSerialized(keySet) -> NOPE", () => {
        expect(isComposedKeyLabelSetSerialized(keySet1)).toBeFalsy();
      });
      it("isComposedKeyLabelSetSerialized(arrayKeySets) -> NOPE", () => {
        expect(isComposedKeyLabelSetSerialized(arrayKeySets)).toBeFalsy();
      });
      it("isComposedKeyLabelSetSerialized(keySetSerialized) -> NOPE", () => {
        expect(isComposedKeyLabelSetSerialized(keySetSerialized1)).toBeFalsy();
      });
      it("isComposedKeyLabelSetSerialized(composedKeyLabelSet) -> NOPE", () => {
        expect(isComposedKeyLabelSetSerialized(composedKeyLabelSet)).toBeFalsy();
      });
      it("isComposedKeyLabelSetSerialized(composedKeyLabelSet) -> NOPE", () => {
        expect(isComposedKeyLabelSetSerialized(keySet1)).toBeFalsy();
      });
      it("isComposedKeyLabelSetSerialized(invalid) -> NOPE", () => {
        expect(isComposedKeyLabelSetSerialized(new Date())).toBeFalsy();
      });
    });

    describe("serializeComposedKeyLabelSet()", () => {
      it("serializeComposedKeyLabelSet(composedSerialized) -> return same", () => {
        expect(serializeComposedKeyLabelSet(composedSerialized)).toBe(composedSerialized);
      });
      it("serializeComposedKeyLabelSet(composedKeyLabelSet) -> serialize each", () => {
        expect(serializeComposedKeyLabelSet(composedKeyLabelSet)).toEqual(composedSerialized);
      });
      it("serializeComposedKeyLabelSet(arrayKeySets) -> serialize each", () => {
        expect(serializeComposedKeyLabelSet(arrayKeySets)).toEqual(composedSerialized);
      });
      it("serializeComposedKeyLabelSet(invalid) -> throw", () => {
        expect(() => serializeComposedKeyLabelSet(new Date() as unknown as KeyLabelSetSerialized[])).toThrow();
      });
      it("serializeComposedKeyLabelSet(invalid) -> throw", () => {
        expect(() =>
          serializeComposedKeyLabelSet([keySet1, new Date(), keySetSerialized2] as unknown as KeyLabelSetSerialized[]),
        ).toThrow();
      });
      it("serializeComposedKeyLabelSet(composedKeySet not of KeyLabels) -> throw", () => {
        expect(() =>
          serializeComposedKeyLabelSet(
            composedKeySetFrom([allExceptSome([1, 2]), some([1, 2])]) as unknown as KeyLabelSetSerialized[],
          ),
        ).toThrow();
      });
      it("serializeComposedKeyLabelSet(array not of KeyLabels) -> throw", () => {
        expect(() =>
          serializeComposedKeyLabelSet([allExceptSome([1, 2]), some([1, 2])] as unknown as KeyLabelSetSerialized[]),
        ).toThrow();
      });
      it("serializeComposedKeyLabelSet(array not of KeyLabel serialized) -> throw", () => {
        expect(() =>
          serializeComposedKeyLabelSet([
            allExceptSome([1, 2]).serialized(),
            some([1, 2]).serialized(),
          ] as unknown as KeyLabelSetSerialized[]),
        ).toThrow();
      });
      it("composedKeyLabelSet.serialized() -> serialize each", () => {
        expect(composedKeyLabelSet.serialized()).toEqual(composedSerialized);
      });
    });

    describe("parseComposedKeyLabelSet()", () => {
      it("parseComposedKeyLabelSet() with key sets", () => {
        expect(parseComposedKeyLabelSet(composedSerialized)).toEqual(composedKeyLabelSet);
      });
      it("parseComposedKeyLabelSet() with arrayKeySets", () => {
        expect(parseComposedKeyLabelSet(arrayKeySets)).toEqual(composedKeyLabelSet);
      });
      it("parseComposedKeyLabelSet() with empty list", () => {
        expect(parseComposedKeyLabelSet([])).toEqual(composedKeySetFrom([]));
      });
      it("parseComposedKeyLabelSet() with an already composedKeyLabelSet", () => {
        expect(parseComposedKeyLabelSet(composedKeyLabelSet)).toBe(composedKeyLabelSet);
      });

      it("parseComposedKeyLabelSet() with key set not keyLabelSet", () => {
        expect(() =>
          parseComposedKeyLabelSet([allExceptSome([1, 2])] as unknown as ComposedKeyLabelSetSerialized),
        ).toThrow();
      });
      it("parseComposedKeyLabelSet() with composedKeySet not keyLabelSet", () => {
        expect(() =>
          parseComposedKeyLabelSet(
            composedKeySetFrom([allExceptSome([1, 2])]) as unknown as ComposedKeyLabelSetSerialized,
          ),
        ).toThrow();
      });
      it("parseComposedKeyLabelSet() with key set not keyLabelSet serialized", () => {
        expect(() =>
          parseComposedKeyLabelSet([allExceptSome([1, 2]).serialized()] as unknown as ComposedKeyLabelSetSerialized),
        ).toThrow();
      });
      it("parseComposedKeyLabelSet() with invalid element", () => {
        expect(() =>
          parseComposedKeyLabelSet([{ invalid: "stuff" }] as unknown as ComposedKeyLabelSetSerialized),
        ).toThrow();
      });
      it("parseComposedKeyLabelSet() with invalid", () => {
        expect(() =>
          parseComposedKeyLabelSet({ invalid: "stuff" } as unknown as ComposedKeyLabelSetSerialized),
        ).toThrow();
      });
    });
  });
});
