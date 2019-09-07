# key-set

KeySet with 4 classes to represent concepts of All, None, Some, and AllExceptSome, the last 2 with a sorted uniq list of keys, and all with intersection calculations.

(TypeScript port of <https://github.com/eturino/ruby_key_set>)

Library bootstrapped using [typescript-starter](https://github.com/bitjson/typescript-starter).

## Installation

`yarn add @eturino/key-set` or `npm install @eturino/key-set`.

## Usage

We have 4 classes:

- `KeySetAll`
- `KeySetNone`
- `KeySetSome`
- `KeySetAllExceptSome`

### Creation

Build your KeySets using the build functions

```ts
import { all, none, some, allExceptSome } from "@eturino/key-set"

all(); // => returns a new instance of KeySetAll
none(); // => returns a new instance of KeySetNone

some([1, 3, 2, 3]); // returns a new instance of KeySetSome with keys [1, 2, 3] (sorted, unique)
some([]); // returns a new instance of KeySetNone

allExceptSome([1, 3, 2, 3]); // returns a new instance of KeySetAllExceptSome with keys [1, 2, 3] (sorted, unique)
allExceptSome([]); // returnsa  new instance of KeySetAll
```

### `representsXXX()`

all KeySet expose 4 methods `representXXX()`. Each class return false for all except their own.

- `representsAll()`: `KeySetAll` returns `true`
- `representsNone()`: `KeySetNone` returns `true`
- `representsSome()`: `KeySetSome` returns `true`
- `representsAllExceptSome()`: `KeySetAllExceptSome` returns `true`

### `clone()`

all KeySet has a `clone()` method, which will return a new instance of the same class that represents the same KeySet.

If the KeySet is `KeySetSome` or `KeySetAllExceptSome`, they will have an array with the same keys.

### `invert()`

all KeySet has an `invert()` method that returns an instance of the opposite class, which represents the opposite KeySet.

`KeySetAll` <- -> `KeySetNone`
`KeySetSome` <- -> `KeySetAllExceptSome`

### `isEqual()`

all KeySet has an `isEqual(other)` method that returns true if the `other` keySet is of the same class and represents the same KeySet.

If the KeySet is `KeySetSome` or `KeySetAllExceptSome`, they will have to have an array with the same keys.
