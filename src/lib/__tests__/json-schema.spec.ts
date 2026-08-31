import { readFileSync } from "node:fs";
import { join } from "node:path";
import Ajv2020, {
  type AnySchemaObject,
  type ValidateFunction,
} from "ajv/dist/2020";
import { describe, expect, it } from "vitest";
import {
  all,
  allExceptSome,
  composedKeySetFrom,
  type KeySetAllSerialized,
  none,
  parseKeySet,
  serializeComposedKeySet,
  serializeKeySet,
  some,
} from "../../index.ts";

function readSchema(file: string): AnySchemaObject {
  return JSON.parse(
    readFileSync(join(__dirname, "../../../schemas/v1", file), "utf8"),
  ) as AnySchemaObject;
}

// no allowUnionTypes: both schemas must compile under ajv's own strict mode,
// which is what a consumer validating its files is most likely to run
const ajv = new Ajv2020({ strict: true });
ajv.addSchema(readSchema("key-set.schema.json"), "key-set");
ajv.addSchema(readSchema("key-set.canonical.schema.json"), "canonical");

function validator(schema: string, pointer: string): ValidateFunction {
  const found = ajv.getSchema(`${schema}#/$defs/${pointer}`);
  if (!found) throw new Error(`no schema at ${schema}#/$defs/${pointer}`);
  return found;
}

const keySet = validator("key-set", "keySet");
const keyLabelSet = validator("key-set", "keyLabelSet");
const composedKeySet = validator("key-set", "composedKeySet");

const canonicalKeySet = validator("canonical", "keySet");
const canonicalKeyLabelSet = validator("canonical", "keyLabelSet");
const canonicalComposedKeySet = validator("canonical", "composedKeySet");

const keyLabels = [
  { key: 2, label: "b" },
  { key: 1, label: "a" },
];

describe("schemas/v1/key-set.schema.json", () => {
  describe("accepts what the library actually serializes", () => {
    it.each([
      ["all", all<number>()],
      ["none", none<number>()],
      ["some numbers", some([3, 1, 2])],
      ["some strings", some(["b", "a"])],
      ["allExceptSome numbers", allExceptSome([3, 1])],
      ["allExceptSome strings", allExceptSome(["b", "a"])],
    ])("%s", (_name, ks) => {
      expect(keySet(serializeKeySet(ks))).toBe(true);
    });

    it("key label sets", () => {
      const ks = some(keyLabels);

      expect(keySet(serializeKeySet(ks))).toBe(true);
      expect(keyLabelSet(serializeKeySet(ks))).toBe(true);
    });

    it("composed sets", () => {
      const comp = composedKeySetFrom([some([1, 2]), allExceptSome([3])]);

      expect(composedKeySet(serializeComposedKeySet(comp))).toBe(true);
    });

    it("a composed set built from an empty list", () => {
      expect(
        composedKeySet(serializeComposedKeySet(composedKeySetFrom([]))),
      ).toBe(true);
    });
  });

  describe("rejects what the parser rejects", () => {
    it.each([
      ["SOME with no elements", { type: "SOME", elements: [] }],
      ["SOME without the elements key", { type: "SOME" }],
      [
        "ALL_EXCEPT_SOME with no elements",
        { type: "ALL_EXCEPT_SOME", elements: [] },
      ],
      ["ALL with elements", { type: "ALL", elements: [1] }],
      ["NONE with elements", { type: "NONE", elements: [1] }],
      ["an unknown type", { type: "WAT" }],
      ["no type at all", { elements: [1] }],
      ["a null element", { type: "SOME", elements: [null] }],
      ["a key label with no label", { type: "SOME", elements: [{ key: 1 }] }],
      ["not an object", "ALL"],
    ])("%s", (_name, given) => {
      expect(keySet(given)).toBe(false);
    });

    it("an empty composed list", () => {
      expect(composedKeySet([])).toBe(false);
    });

    it("a key label set holding raw keys", () => {
      expect(keyLabelSet({ type: "SOME", elements: [1] })).toBe(false);
    });
  });

  it("tolerates unknown properties, as the parser does", () => {
    expect(keySet({ type: "SOME", elements: [1], extra: "ignored" })).toBe(
      true,
    );
  });

  // the guards in serialize.ts read a falsy `elements` as an absent one, so the
  // parser is laxer here than either schema. Pinned rather than fixed: tightening
  // it is a behaviour change. See BACKLOG.md.
  it.each([
    ["zero", 0],
    ["an empty string", ""],
    ["null", null],
    ["false", false],
  ])("is stricter than the parser about %s as `elements`", (_name, given) => {
    const serialized = { type: "ALL", elements: given };
    // the input is ill-typed on purpose: the test is about what the runtime
    // guards tolerate, which the types already forbid
    const parsed = parseKeySet(serialized as unknown as KeySetAllSerialized);

    expect(parsed.representsAll()).toBe(true);
    expect(keySet(serialized)).toBe(false);
    expect(canonicalKeySet(serialized)).toBe(false);
  });
});

describe("schemas/v1/key-set.canonical.schema.json", () => {
  describe("accepts every serialized() output", () => {
    it.each([
      ["all", all<number>()],
      ["none", none<number>()],
      ["some numbers", some([3, 1, 2])],
      ["some strings", some(["b", "a"])],
      ["allExceptSome numbers", allExceptSome([3, 1])],
      ["allExceptSome strings", allExceptSome(["b", "a"])],
    ])("%s", (_name, ks) => {
      expect(canonicalKeySet(serializeKeySet(ks))).toBe(true);
    });

    it("key label sets", () => {
      const serialized = serializeKeySet(some(keyLabels));

      expect(canonicalKeySet(serialized)).toBe(true);
      expect(canonicalKeyLabelSet(serialized)).toBe(true);
    });

    it("composed sets", () => {
      const comp = composedKeySetFrom([some([1, 2]), allExceptSome([3])]);

      expect(canonicalComposedKeySet(serializeComposedKeySet(comp))).toBe(true);
    });

    it("a composed set built from an empty list", () => {
      expect(
        canonicalComposedKeySet(
          serializeComposedKeySet(composedKeySetFrom([])),
        ),
      ).toBe(true);
    });

    // the library stores the element object it is handed and emits it back
    // unchanged, so extra properties on a key label are part of the emit
    it("key labels carrying extra properties", () => {
      const serialized = serializeKeySet(some([{ key: 1, label: "a", i: 3 }]));

      expect(serialized).toEqual({
        type: "SOME",
        elements: [{ key: 1, label: "a", i: 3 }],
      });
      expect(keySet(serialized)).toBe(true);
      expect(canonicalKeySet(serialized)).toBe(true);
    });
  });

  // the pair of assertions is the point of having two files: each of these
  // parses, none of them is ever emitted
  describe("refuses what parses but is never emitted", () => {
    it.each([
      ["ALL with an empty elements array", { type: "ALL", elements: [] }],
      ["NONE with an empty elements array", { type: "NONE", elements: [] }],
      ["an unknown property", { type: "SOME", elements: [1], extra: 1 }],
      ["a duplicate element", { type: "SOME", elements: ["a", "a"] }],
      [
        "a duplicate key label",
        { type: "SOME", elements: [keyLabels[0], keyLabels[0]] },
      ],
    ])("%s", (_name, given) => {
      expect(keySet(given)).toBe(true);
      expect(canonicalKeySet(given)).toBe(false);
    });
  });

  it("rejects everything the permissive profile rejects", () => {
    expect(canonicalKeySet({ type: "WAT" })).toBe(false);
    expect(canonicalKeySet({ type: "SOME", elements: [] })).toBe(false);
    expect(canonicalKeySet({ type: "SOME", elements: [null] })).toBe(false);
    expect(canonicalComposedKeySet([])).toBe(false);
  });
});
