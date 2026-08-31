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
  none,
  serializeComposedKeySet,
  serializeKeySet,
  some,
} from "../../index.ts";

const schema = JSON.parse(
  readFileSync(
    join(__dirname, "../../../schemas/v1/key-set.schema.json"),
    "utf8",
  ),
) as AnySchemaObject;

// the wire format genuinely allows `key` to be a string or a number
const ajv = new Ajv2020({ strict: true, allowUnionTypes: true });
ajv.addSchema(schema, "key-set");

function validator(pointer: string): ValidateFunction {
  const found = ajv.getSchema(`key-set#/$defs/${pointer}`);
  if (!found) throw new Error(`no schema at #/$defs/${pointer}`);
  return found;
}

const keySet = validator("keySet");
const keyLabelSet = validator("keyLabelSet");
const composedKeySet = validator("composedKeySet");

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
      const ks = some([
        { key: 2, label: "b" },
        { key: 1, label: "a" },
      ]);

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
});
