import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  allExceptSome,
  composedKeySetFrom,
  InvalidEmptySetError,
  KeySetSome,
  parseKeySet,
  serializeKeySet,
  some,
  someForced,
} from "@eturino/key-set";

const set = some([3, 1, 2]);

assert.deepEqual(serializeKeySet(set), { type: "SOME", elements: [1, 2, 3] });
assert.equal(set.toString(), "KeySet<SOME[1,2,3]>");
assert.ok(set instanceof KeySetSome);
assert.ok(parseKeySet(serializeKeySet(set)).isEqual(set));
assert.throws(() => someForced([]), InvalidEmptySetError);

const composed = composedKeySetFrom([some([1, 2, 3]), allExceptSome([4])]);
assert.equal(composed.containsByUnion(3), true);
assert.equal(composed.containsByIntersection(3), true);
assert.equal(composed.containsByUnion(4), false);
assert.equal(composed.containsByIntersection(1), true);

// the exports map has to expose the schema subpath under ESM resolution too
const schemaPath = import.meta.resolve(
  "@eturino/key-set/schemas/v1/key-set.canonical.schema.json",
);
const canonical = JSON.parse(readFileSync(fileURLToPath(schemaPath), "utf8"));
assert.equal(canonical.title, "KeySetSerialized (canonical)");

console.log("node-esm ok");
