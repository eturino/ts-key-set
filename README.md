# key-set

[![npm version](https://badge.fury.io/js/%40eturino%2Fkey-set.svg)](https://badge.fury.io/js/%40eturino%2Fkey-set)
[![Build Status](https://travis-ci.org/eturino/ts-key-set.svg?branch=master)](https://travis-ci.org/eturino/ts-key-set)
[![Maintainability](https://api.codeclimate.com/v1/badges/3b9c9332f98e9fdd30ac/maintainability)](https://codeclimate.com/github/eturino/ts-key-set/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3b9c9332f98e9fdd30ac/test_coverage)](https://codeclimate.com/github/eturino/ts-key-set/test_coverage)

[TypeDoc generated docs in here](https://eturino.github.io/ts-key-set)

[Github repo here](https://github.com/eturino/ts-key-set)

KeySet with 4 classes to represent concepts of All, None, Some, and AllExceptSome, the last 2 with a sorted uniq list of keys, and all with intersection calculations.

(TypeScript port of <https://github.com/eturino/ruby_key_set>)

Library bootstrapped using [typescript-starter](https://github.com/bitjson/typescript-starter).

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

### Creation: `all()`, `none()`, `some([...])`, `allExceptSome([...])`, `someForced([...])`, `allExceptSomeForced([...])`

Build your KeySets using the build functions

```ts
import {
  all,
  none,
  some,
  allExceptSome,
  someForced,
  allExceptSomeForced
} from "@eturino/key-set";

all(); // => returns a new instance of KeySetAll
none(); // => returns a new instance of KeySetNone

some([1, 3, 2, 3]); // returns a new instance of KeySetSome with keys [1, 2, 3] (sorted, unique)
some([]); // returns a new instance of KeySetNone

allExceptSome([1, 3, 2, 3]); // returns a new instance of KeySetAllExceptSome with keys [1, 2, 3] (sorted, unique)
allExceptSome([]); // returns a new instance of KeySetAll

someForced([1, 3, 2, 3]); // returns a new instance of KeySetSome with keys [1, 2, 3] (sorted, unique)
someForced([]); // throws an InvalidEmptySetError

allExceptSomeForced([1, 3, 2, 3]); // returns a new instance of KeySetAllExceptSome with keys [1, 2, 3] (sorted, unique)
allExceptSomeForced([]); // throws an InvalidEmptySetError
```

### `.elements` (aliased with `.keys`)

Both getters return a copy of the internal list of elements.

```
some([1, 3, 2, 3]).elements; // => [1, 2, 3]
some([1, 3, 2, 3]).keys; // => [1, 2, 3]
allExceptSome([1, 3, 2, 3]).elements; // => [1, 2, 3]
allExceptSome([1, 3, 2, 3]).keys; // => [1, 2, 3]
```

### `type`

All KeySet expose a `type` property that will return a member of the `KeySetTypes` enum.

- `KeySetAll` returns `ALL`
- `KeySetAllExceptSome` returns `ALL_EXCEPT_SOME`
- `KeySetNone` returns `NONE`
- `KeySetSome` returns `SOME`

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

```ts
if (keySet.isEqual(otherKeySet))
```

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

- `uniqueArray(list)`: returns another array with unique items
  - **adapted from <https://medium.com/@jakubsynowiec/unique-array-values-in-javascript-7c932682766c> (credit to Jakub Synowiec)**
- `arraysEqual(a, b)`: returns true if the 2 arrays have the same keys
  - **adapted from <https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript> (credit to [enyo](https://stackoverflow.com/users/170851/enyo))**

## Util array types

The lib also exports 2 util array types `EmptyArray<T>` and `NonEmptyArray<T>`, with their corresponding type predicates `isEmptyArray()`, and `isNonEmptyArray()`.

```ts
const lists: Array<NonEmptyArray<any>> = [
  [1], // ok
  [] // error
];

const lists2: Array<EmptyArray<any>> = [
  [], // ok
  [1] // error
];

const a: string[] = [];
isEmptyArray(a); // => true (also sets that a is EmptyArray<string>)
isNonEmptyArray(a); // => false

const b: string[] = ["something"];
isEmptyArray(b); // => false
isNonEmptyArray(b); // => true (also sets that a is NonEmptyArray<string>)
```
