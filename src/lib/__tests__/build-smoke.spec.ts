import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const require = createRequire(import.meta.url);
const cjsPath = fileURLToPath(
  new URL("../../../build/main/index.js", import.meta.url),
);
const esmPath = fileURLToPath(
  new URL("../../../build/module/index.js", import.meta.url),
);

// ponytail: skipped when build/ is absent so `pnpm test:unit:watch` still runs;
// `pnpm test` always builds first, so CI never skips these.
const built = existsSync(cjsPath) && existsSync(esmPath);

describe.skipIf(!built)("the published build", () => {
  it("loads as cjs and keeps the wire format", () => {
    const mod = require(cjsPath);

    const set = mod.some([2, 1]);
    expect(set.serialized()).toEqual({ type: "SOME", elements: [1, 2] });
    expect(set.toString()).toEqual("KeySet<SOME[1,2]>");
    expect(set instanceof mod.KeySetSome).toBe(true);
    expect(() => mod.someForced([])).toThrow(mod.InvalidEmptySetError);
    expect(mod.some([]) instanceof mod.KeySetNone).toBe(true);
  });

  it("loads as esm and keeps the wire format", async () => {
    const mod = await import(esmPath);

    const set = mod.some([2, 1]);
    expect(set.serialized()).toEqual({ type: "SOME", elements: [1, 2] });
    expect(set.toString()).toEqual("KeySet<SOME[1,2]>");
    expect(set instanceof mod.KeySetSome).toBe(true);
    expect(() => mod.someForced([])).toThrow(mod.InvalidEmptySetError);
    expect(mod.some([]) instanceof mod.KeySetNone).toBe(true);
  });

  it("emits the literal wire values for every type", () => {
    const mod = require(cjsPath);

    expect(mod.KeySetTypes).toMatchObject({
      all: "ALL",
      none: "NONE",
      some: "SOME",
      allExceptSome: "ALL_EXCEPT_SOME",
    });
  });
});
