# key-set

[![npm version](https://badge.fury.io/js/%40eturino%2Fkey-set.svg)](https://badge.fury.io/js/%40eturino%2Fkey-set)
[![CI](https://github.com/eturino/ts-key-set/actions/workflows/ci.yml/badge.svg)](https://github.com/eturino/ts-key-set/actions/workflows/ci.yml)


[Github repo here](https://github.com/eturino/ts-key-set)

KeySet with 4 classes to represent concepts of `All`, `None`, `Some`, and `AllExceptSome`, the last 2 with an internal `Set` of keys, and all with intersection calculations.

It also has the concept of a `ComposedKeySet` which encapsulates a list of KeySets that can be acted upon, and finally collapsed with `collapseUnion()` or `collapseIntersect()`

(Originally, a TypeScript port of <https://github.com/eturino/ruby_key_set>)

## Breaking changes in v6

- `new ComposedKeySet([])` now normalises the empty list to a single `all()`, the way `composedKeySetFrom([])` always did. Previously the constructor kept the empty list, where `contains()` answered `true` (vacuously) while the new `containsByUnion()` would answer `false`.
- The published entry points moved from `dist/` to `build/`, behind an `exports` map: `import` resolves `build/module/index.js` (ES modules) and `require` resolves `build/main/index.js` (CommonJS), each with its own `.d.ts`. `main`, `module` and `types` are still declared for older bundlers. Importing the package by name is unaffected; a deep import of a `dist/...` path is not, and the `exports` map now allows only `@eturino/key-set/schemas/*` and `@eturino/key-set/package.json` as subpaths.
- The ES module build is no longer a single bundled file, and it now works under native Node ESM: relative specifiers carry their `.js` extension and `build/module/package.json` marks the directory as `type: module`. Before v6 the `module` build was only resolvable by a bundler.
- `KEY_SET_TYPES`, `_IS_NODE_ENVIRONMENT` and `isKeyLabelBase` are no longer exported from their modules. None of them was ever re-exported from the package entry point, so only a deep import into `src/` could have reached them.
- `allExceptSomeForced([])` now throws an error whose message names `allExceptSomeForced`. It used to say `someForced`.

Also new in v6: `ComposedKeySet.containsByUnion()` / `containsByIntersection()`, and a published [JSON Schema](#json-schema) for the serialized format.

Fixed in v6: the ES module build threw `Dynamic require of "util" is not supported` on import. See the yanked versions section.

## Breaking changes in v5

Since v5, the `KeySet` elements are encoded in a frozen `Set` instead of an array. It is exposed as `keySet.elements`.
The `keySet.keys` alias has been dropped.

For a list of elements as an array use `keySet.elementsList`, and for a sorted version of that use `keySet.elementsSorted`.

You can have more [info in the elements section of the readme](#elements-elementslist-and-elementssorted).

## Installation

`pnpm add @eturino/key-set`, `yarn add @eturino/key-set` or `npm install @eturino/key-set`.

## Usage

We have 4 classes:

- `KeySetAll`: represents the entirety of possible keys (`𝕌`)
- `KeySetNone`: represents an empty set (`∅`)
- `KeySetSome`: represents a concrete set (`A ⊂ 𝕌`)
- `KeySetAllExceptSome`: represents the complementary of a set, all the elements except the given ones (`A' = {x ∈ 𝕌 | x ∉ A}`) _(see [Complement in Wikipedia](<https://en.wikipedia.org/wiki/Complement_(set_theory)>))_

We can have a KeySet of:

- `string`s
- `number`s
- objects with `key` (`string` or `number`) and `label` (`string`)

All elements have to be of the same type.

### Creation: `all()`, `none()`, `some([...])`, `allExceptSome([...])`, `allKeySet()`, `noneKeySet()`, `someKeySet([...])`, `allExceptSomeKeySet([...])`, `someForced([...])`, `allExceptSomeForced([...])`

Build your KeySets using the build functions

```ts
import { all, allKeySet, none, noneKeySet, some, someKeySet, allExceptSome, allExceptSomeKeySet, someForced, allExceptSomeForced } from "@eturino/key-set";

all(); // => returns a new instance of KeySetAll
allKeySet(); // => returns a new instance of KeySetAll
none(); // => returns a new instance of KeySetNone
noneKeySet(); // => returns a new instance of KeySetNone

some([1, 3, 2, 3]); // returns a new instance of KeySetSome with keys Set<1, 3, 2>
someKeySet([1, 3, 2, 3]); // returns a new instance of KeySetSome with keys Set<1, 3, 2>
some([]); // returns a new instance of KeySetNone
someKeySet([]); // returns a new instance of KeySetNone

allExceptSome([1, 3, 2, 3]); // returns a new instance of KeySetAllExceptSome with keys Set<1, 3, 2>
allExceptSomeKeySet([1, 3, 2, 3]); // returns a new instance of KeySetAllExceptSome with keys Set<1, 3, 2>
allExceptSome([]); // returns a new instance of KeySetAll
allExceptSomeKeySet([]); // returns a new instance of KeySetAll

someForced([1, 3, 2, 3]); // returns a new instance of KeySetSome with keys Set<1, 3, 2>
someForced([]); // throws an InvalidEmptySetError

allExceptSomeForced([1, 3, 2, 3]); // returns a new instance of KeySetAllExceptSome with keys Set<1, 3, 2>
allExceptSomeForced([]); // throws an InvalidEmptySetError
```

### `.elements`, `.elementsList` and `elementsSorted`

- `.elements` returns the internal `Set` with the keys. The KeySet never mutates it, and it is passed through `Object.freeze()`, but note that freezing a `Set` does not stop `.add()`/`.delete()` - treat it as read-only by convention, and use `.elementsList` if you need an array you can own.
- `.elementsList` returns a new array with the elements of the internal set, as is.
- `.elementsSorted` returns a new array with the elements of the internal set, sorted.

```
some([1, 3, 2, 3]).elements; // => Set<1, 3, 2>
some([1, 3, 2, 3]).elementsList; // => [1, 3, 2]
some([1, 3, 2, 3]).elementsSorted; // => [1, 2, 3]

allExceptSome([1, 3, 2, 3]).elements; // => Set<1, 3, 2>
allExceptSome([1, 3, 2, 3]).elementsList; // => [1, 3, 2]
allExceptSome([1, 3, 2, 3]).elementsSorted; // => [1, 2, 3]
```

### `type`

All KeySet expose a `type` property that will return a member of the `KeySetTypes` enum.

- `KeySetAll` returns `ALL`
- `KeySetAllExceptSome` returns `ALL_EXCEPT_SOME`
- `KeySetNone` returns `NONE`
- `KeySetSome` returns `SOME`

The types are also exposed as a union of strings TypeScript type `KeySetTypesEnumValues`.

#### `type` in v1.x vs v2.x

`v2.0` changed the values returned by `type`, make them SCREAMING_SNAKE_CASE, which allows for easier integration with GraphQL enums.

In v1.x, the values were `all`, `allExceptSome`, `none` and `some`.

### `representsXXX()`

All KeySet expose 4 methods `representXXX()`. Each class return false for all except their own.

- `representsAll()`: `KeySetAll` returns `true`
- `representsNone()`: `KeySetNone` returns `true`
- `representsSome()`: `KeySetSome` returns `true`
- `representsAllExceptSome()`: `KeySetAllExceptSome` returns `true`

### `clone()`

All KeySet has a `clone()` method, which will return a new instance of the same class that represents the same KeySet.

If the KeySet is `KeySetSome` or `KeySetAllExceptSome`, they will have an array with the same keys.

```ts
const newKeySet = keySet.clone();
```

### `isEqual(other)`

All KeySet has an `isEqual(other)` method that returns true if the `other` keySet is of the same class and represents the same KeySet.

If the KeySet is `KeySetSome` or `KeySetAllExceptSome`, they will have to have an array with the same keys.

### `invert()`

All KeySet has an `invert()` method that returns an instance of the opposite class, which represents the complementary KeySet. _(see [Complement in Wikipedia](<https://en.wikipedia.org/wiki/Complement_(set_theory)>))_

- `KeySetAll` ⟷ `KeySetNone`
- `KeySetSome` ⟷ `KeySetAllExceptSome`

```ts
const complementaryKeySet = keySet.invert();
```

### `remove(other)`

Returns a new KeySet with the difference between ThisSet - OtherSet `(A - B)`

```ts
const diffKeySet = keySet.remove(other);
```

### `intersect(other)`

Returns a new KeySet with the intersection of both Sets `(A ∩ B)`, representing the elements present in both sets

```ts
const diffKeySet = keySet.intersect(other);
```

### `union(other)`

Returns a new KeySet with the union of both Sets `(A U B)`, representing the elements present in either A or B

```ts
const unionKeySet = keySet.union(other);
```

### `includes(element)`

alias `contains(element)`.

Returns a boolean defining if the KeySet includes the given element.

```ts
const element = "A";

const ksAll: KeySetAll<string> = all<string>();
ksAll.includes(element); // => true
ksAll.contains(element); // => true

const ksNone: KeySetNone<string> = none<string>();
ksNone.includes(element); // => false
ksNone.contains(element); // => false

const ksSome: KeySetSome<string> = some(["A", "B", "C"]);
ksSome.includes(element); // => true
ksSome.contains(element); // => true

const ksSome2: KeySetSome<string> = some(["X", "Y", "Z"]);
ksSome2.includes(element); // => false
ksSome2.contains(element); // => false

const ksAllExceptSome: KeySetAllExceptSome<string> = allExceptSome(["A", "B", "C"]);
ksAllExceptSome.includes(element); // => false
ksAllExceptSome.contains(element); // => false

const ksAllExceptSome2: KeySetAllExceptSome<string> = allExceptSome(["X", "Y", "Z"]);
ksAllExceptSome2.includes(element); // => true
ksAllExceptSome2.contains(element); // => true
```

## Serialization

The Serialized representation of the KeySet (`KeySetSerialized`) is a plain object with `type` and optionally `elements`.

- `{ type: "ALL" }`
- `{ type: "NONE" }`
- `{ type: "SOME", elements: [1, 2, 3] }`
- `{ type: "ALL_EXCEPT_SOME", elements: [1, 2, 3] }`

There are 2 ways of getting the serialized representation of the keySet

- `keySet.serialized()`
- `serializeKeySet(keySet)`

For KeyLabel sets and for composed sets there are dedicated functions with narrower types:

- `serializeKeyLabelSet(keyLabelSet)`
- `serializeComposedKeySet(comp)`
- `serializeComposedKeyLabelSet(comp)`

## Parsing

We can create a KeySet from the serialized representation

- `parseKeySet(serialized)`
- `parseKeyLabelSet(serialized)`
- `parseComposedKeySet(serialized)`
- `parseComposedKeyLabelSet(serialized)`

we can also pass the actual KeySet to the `parseKeySet`, which will return the given KeySet without touching it.

An invalid serialized value throws `InvalidKeySetError`.

## JSON Schema

The serialized wire format is published as a JSON Schema (draft 2020-12) so that clients in other languages can validate it without depending on this library.

Two profiles of the same `v1` format, same `$defs` names, so switching between them costs one `$id`:

| file | describes | use it to |
| --- | --- | --- |
| [`key-set.schema.json`](./schemas/v1/key-set.schema.json) | what `parseKeySet()` **accepts** | validate a payload written by another client of this library |
| [`key-set.canonical.schema.json`](./schemas/v1/key-set.canonical.schema.json) | what `serialized()` **emits** | validate a hand-edited file that embeds a key set |

Both are shipped inside the npm package under `schemas/v1/`, and available by URL pinned to a tag for immutability:

```
https://raw.githubusercontent.com/eturino/ts-key-set/v6.0.0-beta.0/schemas/v1/key-set.schema.json
https://raw.githubusercontent.com/eturino/ts-key-set/v6.0.0-beta.0/schemas/v1/key-set.canonical.schema.json
```

Pick the permissive one when you are on the reading side of Postel's law, the canonical one when a human types the file. The canonical profile forbids `elements` on `ALL`/`NONE` (the permissive one tolerates an empty array), forbids unknown properties, and requires `uniqueItems`. None of the three is a shape this library ever emits, so on a hand-edited file each one is a typo worth an error rather than a value that quietly does not mean what it looks like.

The root schema describes a single serialized KeySet. The other shapes are addressable as `$defs`:

| pointer | shape |
| --- | --- |
| `#/$defs/keySet` | `KeySetSerialized` (the root), any `Key` element |
| `#/$defs/keyLabelSet` | `KeyLabelSetSerialized`, `IKeyLabel` elements only |
| `#/$defs/stringKeySet` | string elements only (canonical profile only) |
| `#/$defs/composedKeySet` | `ComposedKeySetSerialized` |
| `#/$defs/composedKeyLabelSet` | `ComposedKeyLabelSetSerialized` |
| `#/$defs/composedStringKeySet` | composed, string elements only (canonical profile only) |
| `#/$defs/key` | a single `Key` |
| `#/$defs/keyLabel` | a single `IKeyLabel` |
| `#/$defs/keySetType` | the `type` discriminator |

If your file format keys on plain string ids, point at `key-set.canonical.schema.json#/$defs/stringKeySet`: same canonical rules, with `elements` restricted to strings, so a number or an `IKeyLabel` is an error rather than a valid key set of a kind you never meant to accept.

The `v1` in the path is the version of the **wire format**, not of the package, and it covers both profiles: two `$id`s, one format. It only changes if the serialized shape changes in a way existing documents would fail. Both schemas are checked against the library's real output on every test run, and against each form that parses but is never emitted.

To narrow further than that - a pattern, an enum of known ids - `allOf` the profile you want with your own `items`. The narrowing only tightens; the canonical branch keeps its own `additionalProperties: false`:

```json
{
  "allOf": [
    { "$ref": "https://raw.githubusercontent.com/eturino/ts-key-set/v6.0.0-beta.0/schemas/v1/key-set.canonical.schema.json" },
    { "properties": { "elements": { "items": { "$ref": "#/$defs/myItemKey" } } } }
  ]
}
```

Two things neither schema can express: elements are **sorted** on emit, and `IKeyLabel` elements are deduplicated **by key**, so two entries sharing a `key` with different labels are not emitted either - `uniqueItems` does not catch that pair.

Both schemas are stricter than the runtime parser in two places: they validate that every element is a valid `Key`, which `parseKeySet` does not check, and they refuse a falsy non-array `elements` (`null`, `0`, `""`, `false`) on `ALL`/`NONE`, which the parser reads as an absent `elements`. Unknown properties are allowed by the parser and by the permissive profile; the canonical profile refuses them, except on an `IKeyLabel`, where the library emits back whatever object it was handed.

## Type Predicates

There are type predicates exposed, one for each KeySet type and the other for each KeySetSerialized.

- `isKeySet(x): x is KeySet`
- `isKeySetAll(x): x is KeySetAll`
- `isKeySetAllExceptSome(x): x is KeySetAllExceptSome`
- `isKeySetNone(x): x is KeySetNone`
- `isKeySetSome(x): x is KeySetSome`
- `isKeySetSerialized(x): x is KeySetSerialized`
- `isKeySetAllSerialized(x): x is KeySetAllSerialized`
- `isKeySetAllExceptSomeSerialized(x): x is KeySetAllExceptSomeSerialized`
- `isKeySetNoneSerialized(x): x is KeySetNoneSerialized`
- `isKeySetSomeSerialized(x): x is KeySetSomeSerialized`

We also have type predicates based on the type of the elements, for serialized and KeySet.

- `isKeySetOfNumbers`
- `isKeySetOfStrings`
- `isKeySetOfNumberKeyLabels`
- `isKeySetOfStringKeyLabels`
- `isKeySetSerializedOfNumbers`
- `isKeySetSerializedOfStrings`
- `isKeySetSerializedOfNumberKeyLabels`
- `isKeySetSerializedOfStringKeyLabels`

## Util functions

The lib also exports the 2 util functions used in the code

- `setByKeys(listOrSet)`: Returns a new Set containing the unique elements of the source list. If the elements given are KeyLabel, they are compared by key.
- `sortKeys(iterableOfKeys)`: Sorts a list of keys. If the keys are actually KeyLabel objects, they are sorted by key. Otherwise, they are naturally sorted. Returns a new array with the sorted keys.

## Util array types

The lib also exports 2 util array types `EmptyArray<T>` and `NonEmptyArray<T>`, with their corresponding type predicates `isEmptyArray()`, and `isNonEmptyArray()`.

```ts
const lists: Array<NonEmptyArray<any>> = [
  [1], // ok
  [], // error
];

const lists2: Array<EmptyArray<any>> = [
  [], // ok
  [1], // error
];

const a: string[] = [];
isEmptyArray(a); // => true (also sets that a is EmptyArray<string>)
isNonEmptyArray(a); // => false

const b: string[] = ["something"];
isEmptyArray(b); // => false
isNonEmptyArray(b); // => true (also sets that a is NonEmptyArray<string>)
```

## `ComposedKeySet`

Composition of a list of KeySets.

On a normal use case, this is not needed and it can be solved with `first.intersect(second)` or `first.union(second)`.

But there are other cases where we have to be explicit about the 2 sets that we are intersecting.

e.g.
We have a list of items with labels, where an item can have multiple labels.
We need to filter the items with labels A, B and C but that do not have labels D.

We cannot use `some(A, B, C).intersect(allExceptSome(D))` since that would end up with just `some(A, B, C)`.
So we use `composedKeySetFrom([some(A, B, C), allExceptSome(D)])`.

This way, if we have a search engine that translates key sets like this:

- `All` => `WHERE 1=1`
- `None` => `WHERE 1=0`
- `Some` => `WHERE list.contains(elements)`
- `AllExceptSome` => `WHERE not list.contains(elements)`

then the composed key set above will end up with
`WHERE items.labels.contains(A, B, or C) AND NOT items.labels.contains(D)`

For this case, we have the `ComposedKeySet`

```ts
const comp = composedKeySetFrom([some(A, B, C), allExceptSome(D)]);
```

### Checking elements on a `ComposedKeySet`

Two semantics, four method names:

- `containsByIntersection(element)`: true only if **every** key set in the list contains it. `contains(element)` and its alias `includes(element)` are the same check.
- `containsByUnion(element)`: true if **any** key set in the list contains it.

```ts
const comp = composedKeySetFrom([some([1, 2, 3]), some([1, 4])]);

comp.containsByIntersection(1); // => true  (in both)
comp.containsByIntersection(3); // => false (only in the first)
comp.contains(3); // => false (alias of containsByIntersection)

comp.containsByUnion(3); // => true  (in the first)
comp.containsByUnion(5); // => false (in neither)
```

### Other `ComposedKeySet` methods

- `collapseUnion()` / `collapseIntersect()`: reduce the list to a single KeySet.
- `add(keySet)` / `addList(keySets)`: a new ComposedKeySet with the given sets added.
- `without(keySet)` / `withoutList(keySets)`: a new ComposedKeySet without the given sets (compared with `isEqual`).
- `filter(predicate)` / `map(fn)`: a new ComposedKeySet from the surviving / mapped members.
- `compactUnion()` / `compactIntersect()`: merge the members of the same type into one, by union or by intersection.
- `invert()`, `clone()`, `isEqual(other)`, `toString()`, and `representsAll()` / `representsNone()` / `representsSome()` / `representsAllExceptSome()`.
- `list`: the underlying array of KeySets. An empty list is normalised to a single `all()`.

### Serializing a `ComposedKeySet`

Serialized as the internal list (array) of serialized KeySets.

- `comp.serialized()` or `serializeComposedKeySet(comp)`, and `serializeComposedKeyLabelSet(comp)` for KeyLabel sets.
- `parseComposedKeySet(serialized)`, and `parseComposedKeyLabelSet(serialized)` for KeyLabel sets.

We have also a function to check type:

- `isComposedKeySet(x): x is ComposedKeySet`
- `isComposedKeyLabelSet(x): x is ComposedKeyLabelSet`
- `isComposedKeySetSerialized(x): x is ComposedKeySetSerialized`
- `isComposedKeyLabelSetSerialized(x): x is ComposedKeyLabelSetSerialized`
- `isComposedKeySetSerializedRepresentsAll(x): x is ComposedKeySetAllSerialized`
- `isComposedKeySetSerializedRepresentsNone(x): x is ComposedKeySetNoneSerialized`
- `isComposedKeySetSerializedRepresentsSome(x): x is ComposedKeySetSomeSerialized`
- `isComposedKeySetSerializedRepresentsAllExceptSome(x): x is ComposedKeySetAllExceptSomeSerialized`

# Yanked versions

- `5.11.0` had some functions missing from the main package export.
- `5.11.1` is not yanked, but its ES module build (`dist/index.mjs`) throws `Dynamic require of "util" is not supported` at import time. Use v6 or the CommonJS entry point.
