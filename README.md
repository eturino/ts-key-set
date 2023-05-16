# key-set

[![npm version](https://badge.fury.io/js/%40eturino%2Fkey-set.svg)](https://badge.fury.io/js/%40eturino%2Fkey-set)
[![Build Status](https://travis-ci.org/eturino/ts-key-set.svg?branch=master)](https://travis-ci.org/eturino/ts-key-set)
[![Maintainability](https://api.codeclimate.com/v1/badges/3b9c9332f98e9fdd30ac/maintainability)](https://codeclimate.com/github/eturino/ts-key-set/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3b9c9332f98e9fdd30ac/test_coverage)](https://codeclimate.com/github/eturino/ts-key-set/test_coverage)

[TypeDoc generated docs in here](https://eturino.github.io/ts-key-set)

[Github repo here](https://github.com/eturino/ts-key-set)

KeySet with 4 classes to represent concepts of `All`, `None`, `Some`, and `AllExceptSome`, the last 2 with an internal `Set` of keys, and all with intersection calculations.

It also has the concept of a `ComposedKeySet` which encapsulates a list of KeySets that can be act upon, and finally collapse using `union` or `intersect`

(Originally, a TypeScript port of <https://github.com/eturino/ruby_key_set>)

Library bootstrapped using [typescript-starter](https://github.com/bitjson/typescript-starter).

## Breaking changes in v5

Since v5, the `KeySet` elements are encoded in a frozen `Set` instead of an array. It is exposed as `keySet.elements`.
The `keySet.keys` alias has been dropped.

For a list of elements as an array use `keySet.elementsList`, and for a sorted version of that use `keySet.elementsSorted`.

You can have more [info in the elements section of the readme](#elements-elementslist-and-elementssorted).

## Installation

`yarn add @eturino/key-set` or `npm install @eturino/key-set`.

## Usage

We have 4 classes:

- `KeySetAll`: represents the entirety of possible keys (`𝕌`)
- `KeySetNone`: represents an empty set (`∅`)
- `KeySetSome`: represents a concrete set (`A ⊂ 𝕌`)
- `KeySetAllExceptSome`: represents the complementary of a set, all the elements except the given ones (`A' = {x ∈ 𝕌 | x ∉ A}`) _(see [Complement in Wikipedia](https://en.wikipedia.org/wiki/Complement_\(set*theory\)))*

We can have a KeySet of:

- `string`s
- `number`s
- objects with `key` (`string` or `number`) and `label` (`string`)

All elements have to have be of the same type.

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

- `.elements` returns the internal `Set` with the keys. It is frozen (`Object.freeze()`)
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

All KeySet has an `invert()` method that returns an instance of the opposite class, which represents the complementary KeySet. _(see [Complement in Wikipedia](https://en.wikipedia.org/wiki/Complement_\(set*theory\)))*

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
const diffKeySet = keySet.intersect(other);
```

### `includes(element)`

alias `contains(element)`.

Returns a boolean defining if the KeySet includes the given element. a new KeySet with the intersection of both Sets `(A ∩ B)`, representing the elements present in both sets

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

## Parsing

We can create a KeySet from the serialized representation

- `parseKeySet(serialized)`

we can also pass the actual KeySet to the `parseKeySet`, which will return the given KeySet without touching it.

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
So we use `composedKeySet([some(A, B, C), allExceptSome(D)])`.

This way, if we have a search engine that translates key sets like this:

- `All` => `WHERE 1=1`
- `None` => `WHERE 1=0`
- `Some` => `WHERE list.contains(elements)`
- `AllExceptSome` => `WHERE not list.contains(elements)`

then the composed key set above will end up with
`WHERE items.labels.contains(A, B, or C) AND NOT items.labels.contains(D)`

For this case, we have the `ComposedKeySet`

```ts
const comp = composedKeySet([some(A, B, C), allExceptSome(D)]);
```

It can be serialized and parsed as the internal list (array) of KeySets.

We have also a function to check type:

- `isComposedKeySet(x): x is ComposedKeySet`
