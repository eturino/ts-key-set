# Backlog

Deferred work, newest first. Each entry says what, why it was deferred, and how to verify it is done.

## Drop `src/types/.keep` from the published package

`npm pack` ships 118 files, one of which is `src/types/.keep` (0 bytes). It rides along because `files` includes `"src"`, and the directory exists only because git cannot track an empty one.

Nothing references `src/types`: no `typeRoots`, no tsconfig `include` reaches it (`src/**/*.ts` does not match `.keep`), and the folder holds nothing else. It is a leftover from the typescript-starter template.

Either delete the directory outright, or add `"!src/types/**"` to `files` if something still wants it in the repo. The `build-smoke.spec.ts` pack assertion is the place to pin whichever is chosen.

**Done when:** `npm pack --dry-run` lists no `.keep`.

## Settle the falsy `elements` tolerance in the parser

`parseKeySet({ type: "ALL", elements: null })` returns `all()`, and so do `0`, `""` and `false`, because both guards in `serialize.ts` (`hasShapeOfSerialized` line 52, `isValidKeySetAllNone` line 64) read a falsy non-array as an absent `elements`. Both published schemas refuse all four, so the parser is laxer than its own contract.

Pinned rather than fixed: `json-schema.spec.ts` asserts the current behaviour and the divergence. Tightening the guards to `elements !== undefined && !Array.isArray(elements)` is a behaviour change, so it belongs in a major.

**Done when:** the guards are tightened and the pinning test is inverted, or the tolerance is documented as deliberate in the schema descriptions.

## Break the circular imports in the KeySet hierarchy

`pnpm check:cycles` (dpdm) reports **19 circular import chains**, all inside `src/lib/key-set/`:

```
-base.ts -> all.ts -> -global.ts -> all-except-some.ts -> -by-keys.ts -> none.ts -> some.ts
```

The base module imports its own subclasses (for `represents*` / factory helpers), and the subclasses import the base. It works today because every cross-reference is used at call time rather than at module-evaluation time, but circular `extends` across an ESM boundary is a temporal-dead-zone hazard: reorder a top-level statement and `build/module` throws on import with no test catching it.

Deferred because it needs a real refactor (likely a `-types.ts` / registry split so `-base.ts` stops importing concrete classes), not a config change.

**Done when:** `pnpm check:cycles` exits 0 and it is back in the `test` script chain (`run-s build check:biome test:unit check:cycles check:dead-code type-check`).

## Revisit the knip exceptions

`knip.json` currently turns two rules off:

- `duplicates: "off"` - the public API deliberately exposes alias pairs (`all`/`allKeySet`, `some`/`someKeySet`, `someForced`/`someKeySetForced`, `serializeKeySet`/`serializeKeyLabelSet`, ...). Decide whether both spellings stay supported forever, or one set gets deprecated and eventually dropped; then re-enable the rule.
- `unresolved: "off"` - inherited from the apollo-link-scalars config, never diagnosed here. Turn it back on, see what it reports, and fix or document the finding.

Also worth a second look: `KEY_SET_TYPES` (`src/lib/key-set/-base.ts`), `_IS_NODE_ENVIRONMENT` (`src/lib/key-set/-is-node-env.ts`) and `isKeyLabelBase` (`src/lib/util/object-utils.ts`) were exported but only ever used inside their own file, so they are now module-private. If any of them should be public API instead, export them from `src/lib/key-set.ts` and add tests.

Related contradiction to settle at the same time: `isObject` is marked `@internal @hidden` in its JSDoc yet is re-exported publicly from `src/lib/key-set.ts`. Either drop the tags or drop the export.

**Done when:** both rules are on and `pnpm check:dead-code` passes.

## Harden the test suite

612 tests at 100% statement/line/function coverage. `src/lib/__tests__/build-smoke.spec.ts` now covers the build (cjs + esm load, wire format, literal `KeySetTypes` values), so the toolchain-level blind spot is closed. What is left, ranked by value per effort:

1. **Sort order.** `sortKeys` and `elementsSorted` call `.sort()` with no comparator, so `[1, 2, 10]` sorts to `[1, 10, 2]`, and that feeds `serialized()` and `toString()`. Pin the current behavior (or fix it, if it is a bug - that is a breaking change).
2. **The type-guard exports.** `isKeySet`, `isKeySetAll`, `isKeySetNone`, `isKeySetSome`, `isKeySetAllExceptSome`, `isKeySetType`, `isObject` have no direct tests. All are `instanceof`-based - the first thing a dual cjs+esm packaging change breaks.
3. **Round-trip property.** Loop `{all, none, some, allExceptSome} x {number, string, KeyLabel}` asserting `parseKeySet(serializeKeySet(ks)).isEqual(ks)` and `JSON.parse(JSON.stringify(ks))` deep-equals `ks.serialized()`. One loop covers enum emit, sort order, and parse/serialize symmetry at once.
4. **KeyLabel set operations.** The whole 4x4 intersect/union/remove/isEqual matrix uses number keys. `setByKeys` dedupes KeyLabels *by key* while `Set.has`/`setsEqual` compare *by reference*, so `some([{key:1,label:'a'}]).intersect(some([{key:1,label:'a'}]))` is empty. Real, load-bearing, unasserted.
5. **`-is-node-env.ts` browser branch.** The only uncovered branch in the repo. `vi.stubGlobal("process", undefined)` + `vi.resetModules()`, then assert `typeof INSPECT === "symbol"` and that `toString()` still works.
6. **Element-type predicate symmetry.** `check-element-type.spec.ts` and `check-serialized-element-type.spec.ts` never pass an `allExceptSome(...)` input. ~30 mechanical lines.
7. **Immutability claims.** `Object.freeze` on a `Set` does not block `.add()`/`.delete()`. Assert what `elements` actually guarantees.

Weak tests worth replacing while in there:

- `src/lib/key-set/__tests__/base.spec.ts` - `acceptEnumValue` returns `true` unconditionally, so `toBeTruthy()` can never fail. Its real content is a compile-time check, which only became meaningful now that specs are type-checked.
- `src/lib/__tests__/to-string.spec.ts` - `console.log(keySet)` runs `[INSPECT]()` with no assertion.
- The `expect(keySet === rest).toBe(false)` lines across the matrix specs assert non-identity on paths that visibly construct new objects.
- `src/lib/util/__tests__/array-types.spec.ts` - test names contradict their assertions (`it("isEmptyArray([1, 2]): true")` asserts falsy).
- `src/lib/util/__tests__/native-helpers.spec.ts` - spends half its `sortBy` cases on `null`/`undefined` orderings the library cannot produce, while the reachable path (comparing KeyLabel objects, which falls through to `0`) is untested.

## Adopt eslint + prettier

The sibling repo (`eturino/apollo-link-scalars`) lints with eslint 10 + `typescript-eslint` (`strictTypeChecked` + `stylisticTypeChecked`) + prettier. This repo stays on biome because `typescript-eslint` peer-caps TypeScript at `<6.1.0` and this repo builds with 7.0.2.

**Done when:** `typescript-eslint` supports TypeScript 7 - then either migrate to match the sibling repo, or decide biome is the better fit and record that decision.

## Docs

The typedoc site (`https://eturino.github.io/ts-key-set`, gh-pages branch) was removed rather than left to rot: no typedoc release supports the TypeScript 7 compiler this repo builds with (peer range stops at `6.0.x`), so the docs could only be produced through a pinned-TS-6 `pnpm dlx` workaround.

**If docs come back:** wait for typedoc to support TS 7, add it as a plain devDep, restore the `doc:*` scripts and the gh-pages publish step.

## Promote v6 to `latest`

`6.0.0-beta.0` is on npm under the `beta` dist-tag; `latest` is still **5.11.1**. A local `v5.12.0` tag and CHANGELOG entry exist but were never published, so there is no fixed 5.x on the registry.

5.11.1 itself is usable: `require()`, `import` by package name and browser bundles all work. Only its `module` build (`dist/index.mjs`) throws, and only when evaluated as real ESM in a Node-like runtime (fixed in `0a77b3b`). No deprecation planned - the narrow break does not justify warning every install.

**Done when:** a v6 release is on npm as `latest`.

## Write or delete .github/CONTRIBUTING.md

It is still the verbatim typescript-starter placeholder ("This is an example of GitHub's contributing guidelines file"). It mentions none of the actual workflow: pnpm, mise, Conventional Commits (enforced by commitlint + husky), `pnpm test`.

## Tighten the CI trigger

`.github/workflows/ci.yml` uses a bare `on: push:` with no branch filter, so every branch push and every release tag runs the full suite, and dependabot PRs run it twice (push + pull_request). The `automerge` job also fires on non-PR events; the pinned action returns without failing, so it is noise rather than breakage.

## Reconsider `reset` inside `prepare-release`

`prepare-release` chains `reset`, which is `git clean -dfx -e .idea && git reset --hard && pnpm install`. That permanently discards all uncommitted changes and every untracked or ignored file, with no confirmation. RELEASING.md flags it in one line while presenting the chain as the convenient path. Either drop `reset` from the chain or gate it behind a prompt.
