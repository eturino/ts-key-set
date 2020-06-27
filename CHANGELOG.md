# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [4.3.1](https://github.com/eturino/ts-key-set/compare/v4.3.0...v4.3.1) (2020-06-27)

## [4.3.0](https://github.com/eturino/ts-key-set/compare/v4.2.2...v4.3.0) (2020-06-17)


### Features

* add `.includes(element)` and alias `.contains(element)` (+ updated dependencies) ([233117d](https://github.com/eturino/ts-key-set/commit/233117db7c91c284d7109ace743dde2bf72bed6a))

### [4.2.2](https://github.com/eturino/ts-key-set/compare/v4.2.1...v4.2.2) (2020-05-12)


### Bug Fixes

* target ES2017 instead of esnext for module, and ES2015 for main ([8660d10](https://github.com/eturino/ts-key-set/commit/8660d10dd7cdeddd80ea1d0e43fd6e8eb2e2b1c6))

### [4.2.1](https://github.com/eturino/ts-key-set/compare/v4.2.0...v4.2.1) (2020-04-14)


### Bug Fixes

* **deps:** [security] bump acorn from 6.4.0 to 6.4.1 ([#57](https://github.com/eturino/ts-key-set/issues/57)) ([df4f2fd](https://github.com/eturino/ts-key-set/commit/df4f2fd88b3fe6055fcf059e67b5657e0ff7125a))

## [4.2.0](https://github.com/eturino/ts-key-set/compare/v4.1.1...v4.2.0) (2020-03-11)


### Features

* exporting types for KeyLabelSetSerialized and all individual types ([861e071](https://github.com/eturino/ts-key-set/commit/861e07136e601d45ba26d596cbb71e9e85874770))

### [4.1.1](https://github.com/eturino/ts-key-set/compare/v4.1.0...v4.1.1) (2020-02-29)


### Bug Fixes

* fixing overloads on remove() and intersect() (TypeScript) ([7ea0ff1](https://github.com/eturino/ts-key-set/commit/7ea0ff1aeeb0593153eb40f1eb0f5d7b74bd95ff))

## [4.1.0](https://github.com/eturino/ts-key-set/compare/v4.0.0...v4.1.0) (2020-02-29)


### Features

* toJSON() to be used in JSON.stringify(), stringify using the same as serialized() ([0183f4a](https://github.com/eturino/ts-key-set/commit/0183f4a1056f843f77b0969337027c63ed597f08))

## [4.0.0](https://github.com/eturino/ts-key-set/compare/v3.1.0...v4.0.0) (2020-02-29)


### ⚠ BREAKING CHANGES

* While KeySetAll and KeySetNone were before non typed, now they are. Most of the
time no adaptation is needed but in some cases when using TypeScript it may be needed to specify the
type of the universe when creating a desired All or None key sets.

### Features

* keySetAll and KeySetNone with key type ([bb5b1c9](https://github.com/eturino/ts-key-set/commit/bb5b1c9cba1028d8ba2a63fc16ba920d6c029b7e))

## [3.1.0](https://github.com/eturino/ts-key-set/compare/v3.0.0...v3.1.0) (2020-02-29)


### Features

* keyLabelSet type ([c1e5a4d](https://github.com/eturino/ts-key-set/commit/c1e5a4d45b11cc344784d1edf4597cde140b6bf7))

## [3.0.0](https://github.com/eturino/ts-key-set/compare/v2.4.0...v3.0.0) (2020-02-29)


### ⚠ BREAKING CHANGES

* KeySetAll and KeySetNone will have now `keys` and `elements` methods (both the
same) which return an EmptyArray of the type (Key by default). This is a different behaviour more
than an addition, since before keyset type could be relied upon having or not those getters.

### Features

* methods keys and elements in all KeySet, typings, and allow for typed KeySetAll and KeySetNone ([53265b9](https://github.com/eturino/ts-key-set/commit/53265b9b3e352322dd5fd40978333681a1e2eaab))

## [2.4.0](https://github.com/eturino/ts-key-set/compare/v2.3.0...v2.4.0) (2020-02-28)


### Features

* type predicates based on the element type ([2f5c7e3](https://github.com/eturino/ts-key-set/commit/2f5c7e3557be062684e9d45fdb3b6db19b6ae141))

## [2.3.0](https://github.com/eturino/ts-key-set/compare/v2.2.0...v2.3.0) (2020-02-28)


### Features

* complex KeyLabel allowed as elemnets + extra types, utils and tests ([a3fdec3](https://github.com/eturino/ts-key-set/commit/a3fdec337b19604a270303bb038e2ae5bdbc0849))

## [2.2.0](https://github.com/eturino/ts-key-set/compare/v2.1.0...v2.2.0) (2020-02-28)


### Features

* better types serializeKeySet ([28ee65f](https://github.com/eturino/ts-key-set/commit/28ee65f0ebab40e8cf6a6dee775e844742573583))

## [2.1.0](https://github.com/eturino/ts-key-set/compare/v2.0.0...v2.1.0) (2020-02-27)


### Features

* type predicates + serialize and parsing functions ([03f769d](https://github.com/eturino/ts-key-set/commit/03f769d719ee3b4782f9d3dc4c4610a320f9c948))

## [2.0.0](https://github.com/eturino/ts-key-set/compare/v1.5.1...v2.0.0) (2020-02-25)


### ⚠ BREAKING CHANGES

* `type` enum values change from camelCase to SCREAMING_SNAKE_CASE (`ALL`,
`ALL_EXCEPT_SOME`, `NONE` and `SOME`)

### Features

* `type` enum values in SCREAMING_SNAKE_CASE ([2a8d7bb](https://github.com/eturino/ts-key-set/commit/2a8d7bb9d8fb660bf04a49fd5c4a4a68fc9864f4)), closes [#53](https://github.com/eturino/ts-key-set/issues/53)

### [1.5.1](https://github.com/eturino/ts-key-set/compare/v1.5.0...v1.5.1) (2020-02-13)


### Bug Fixes

* narrower types in the intersect and remove returns to avoid typing issues in clients ([d590fe2](https://github.com/eturino/ts-key-set/commit/d590fe2cdab4330cac4cf0e88445eded70754141))

## [1.5.0](https://github.com/eturino/ts-key-set/compare/v1.4.0...v1.5.0) (2020-02-13)


### Features

* add someForced() and allExceptSomeForced() ([f344f59](https://github.com/eturino/ts-key-set/commit/f344f593c21c893b4d49bb97e72e6544599fc7cf))

## [1.4.0](https://github.com/eturino/ts-key-set/compare/v1.3.0...v1.4.0) (2020-02-13)


### Features

* exposing KeySetTypes enum ([e1642dc](https://github.com/eturino/ts-key-set/commit/e1642dc980aaea3f14c0586191b3991ab652609b))

## [1.3.0](https://github.com/eturino/ts-key-set/compare/v1.2.0...v1.3.0) (2020-02-13)


### Features

* add `type` property ([753e1a7](https://github.com/eturino/ts-key-set/commit/753e1a7dd7d27d73cc7de3e44d93553f4b5cc9c0))

## [1.2.0](https://github.com/eturino/ts-key-set/compare/v1.1.0...v1.2.0) (2019-12-03)


### Features

* supports ReadonlyArray<T> as keys type ([d878ac8](https://github.com/eturino/ts-key-set/commit/d878ac812e8d90c673be19bd3b2310b8fc809a94))

## [1.1.0](https://github.com/eturino/ts-key-set/compare/v1.0.0...v1.1.0) (2019-09-09)


### Features

* exporting Key type, which was previously hidden ([7a3c511](https://github.com/eturino/ts-key-set/commit/7a3c511))

## 1.0.0 (2019-09-07)
