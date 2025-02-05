# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [5.11.0](https://github.com/eturino/ts-key-set/compare/v5.11.0...v5.11.0) (2025-02-05)


### ⚠ BREAKING CHANGES

* `.keys` is removed. `.elements` is now the frozen Set. And the old utils `uniqueArray`, `uniqueKeyLabelArray` and `arraysEqual` are dropped.
* While KeySetAll and KeySetNone were before non typed, now they are. Most of the time no adaptation is needed but in some cases when using TypeScript it may be needed to specify the type of the universe when creating a desired All or None key sets.
* KeySetAll and KeySetNone will have now `keys` and `elements` methods (both the same) which return an EmptyArray of the type (Key by default). This is a different behaviour more than an addition, since before keyset type could be relied upon having or not those getters.
* `type` enum values change from camelCase to SCREAMING_SNAKE_CASE (`ALL`, `ALL_EXCEPT_SOME`, `NONE` and `SOME`)

### Features

* `ComposedKeySet.compactUnion` and `ComposedKeySet.compactIntersect` ([85f6c4b](https://github.com/eturino/ts-key-set/commit/85f6c4ba2d83d1d98e367a627d08c783d47bea57))
* `type` enum values in SCREAMING_SNAKE_CASE ([2a8d7bb](https://github.com/eturino/ts-key-set/commit/2a8d7bb9d8fb660bf04a49fd5c4a4a68fc9864f4)), closes [#53](https://github.com/eturino/ts-key-set/issues/53)
* add `.includes(element)` and alias `.contains(element)` (+ updated dependencies) ([233117d](https://github.com/eturino/ts-key-set/commit/233117db7c91c284d7109ace743dde2bf72bed6a))
* add `type` property ([753e1a7](https://github.com/eturino/ts-key-set/commit/753e1a7dd7d27d73cc7de3e44d93553f4b5cc9c0))
* add alias to build functions someKeySet() allExceptSomeKeySet() noneKeySet() and someKeySet() ([264fc34](https://github.com/eturino/ts-key-set/commit/264fc34d338e65dd724b71961eeb4fdbc86d64b5))
* add better types to `representsXXX()` functions ([6087634](https://github.com/eturino/ts-key-set/commit/6087634b6568c4d702b5c05ec2ae0e7f44cc4c38))
* add someForced() and allExceptSomeForced() ([f344f59](https://github.com/eturino/ts-key-set/commit/f344f593c21c893b4d49bb97e72e6544599fc7cf))
* added `ks.union(other)` ([cde30b5](https://github.com/eturino/ts-key-set/commit/cde30b512a91a21e199c743bcac4a04132743bae))
* added toString() and, only for node environments, also custom inspect for console.log() ([d8719b3](https://github.com/eturino/ts-key-set/commit/d8719b32795037fd573f8cf80a3efb99e36674ec))
* adding isComposedKeySet() function. Also upgrade dependencies ([b543221](https://github.com/eturino/ts-key-set/commit/b5432219c8719809e71bdcd05afbe0dac52d8c85))
* adding isComposedKeySetSerializedXXX for specific types (type predicates) ([dcb374d](https://github.com/eturino/ts-key-set/commit/dcb374d650407e17a03f10917a3c5135ec2ec9f8))
* better types serializeKeySet ([28ee65f](https://github.com/eturino/ts-key-set/commit/28ee65f0ebab40e8cf6a6dee775e844742573583))
* complex KeyLabel allowed as elemnets + extra types, utils and tests ([a3fdec3](https://github.com/eturino/ts-key-set/commit/a3fdec337b19604a270303bb038e2ae5bdbc0849))
* Composed KeyLabelSet parse and serialization ([8091558](https://github.com/eturino/ts-key-set/commit/809155817ed8a6ac766a2f1cd9ed767b9797aab2))
* ComposedKeyLabelSet and functions ([0a91908](https://github.com/eturino/ts-key-set/commit/0a919087f4dc93b95c5e4987ed817d9c8e5faa92))
* composedKeySet new methods addList and withoutList ([b4b2993](https://github.com/eturino/ts-key-set/commit/b4b29930ff4b979d73485895ca0cd45dca8161f2))
* composedKeySet that encompass a list of KeySets ([#220](https://github.com/eturino/ts-key-set/issues/220)) ([73de6f8](https://github.com/eturino/ts-key-set/commit/73de6f8e976322b4f7c4a914c013cd21f69fd0eb))
* composedKeySet to avoid duplicate key set (using ks.isEqual()) ([c03dd00](https://github.com/eturino/ts-key-set/commit/c03dd00b591ab1a88c75f0426b6fc2c9b7545630))
* composedKeySet.map() support ([4635e43](https://github.com/eturino/ts-key-set/commit/4635e43566272186368e821e8c1a334cdfddda43))
* elements as a public readonly frozen Set instead of internal array ([c5d492b](https://github.com/eturino/ts-key-set/commit/c5d492b9c4ba51255c764b44e0b59c8ba6bcaf90))
* exporting Key type, which was previously hidden ([7a3c511](https://github.com/eturino/ts-key-set/commit/7a3c51179bcf1b12bedac13aa247c5eb6f6c2c01))
* exporting types for KeyLabelSetSerialized and all individual types ([861e071](https://github.com/eturino/ts-key-set/commit/861e07136e601d45ba26d596cbb71e9e85874770))
* exposing KeySetTypes enum ([e1642dc](https://github.com/eturino/ts-key-set/commit/e1642dc980aaea3f14c0586191b3991ab652609b))
* exposing KeySetTypesEnumValues + deps upgrade ([4affd1d](https://github.com/eturino/ts-key-set/commit/4affd1d4d474fc1f5a950bc8bb2014165c1ccd0b))
* keyLabelSet type ([c1e5a4d](https://github.com/eturino/ts-key-set/commit/c1e5a4d45b11cc344784d1edf4597cde140b6bf7))
* keySetAll and KeySetNone with key type ([bb5b1c9](https://github.com/eturino/ts-key-set/commit/bb5b1c9cba1028d8ba2a63fc16ba920d6c029b7e))
* methods keys and elements in all KeySet, typings, and allow for typed KeySetAll and KeySetNone ([53265b9](https://github.com/eturino/ts-key-set/commit/53265b9b3e352322dd5fd40978333681a1e2eaab))
* Replace lodash with es-toolkit. Also moving to new project structure and tooling, vitest, and CI ([66c1b43](https://github.com/eturino/ts-key-set/commit/66c1b4354c1e77fadd024678e87dd89d73e42861))
* serialize and parse ComposedKeySet to allow for array of keySets as input ([5b0791b](https://github.com/eturino/ts-key-set/commit/5b0791b9abd7928166f188ef0575323bc66fdb00))
* supports ReadonlyArray&lt;T&gt; as keys type ([d878ac8](https://github.com/eturino/ts-key-set/commit/d878ac812e8d90c673be19bd3b2310b8fc809a94))
* toJSON() to be used in JSON.stringify(), stringify using the same as serialized() ([0183f4a](https://github.com/eturino/ts-key-set/commit/0183f4a1056f843f77b0969337027c63ed597f08))
* type predicates + serialize and parsing functions ([03f769d](https://github.com/eturino/ts-key-set/commit/03f769d719ee3b4782f9d3dc4c4610a320f9c948))
* type predicates based on the element type ([2f5c7e3](https://github.com/eturino/ts-key-set/commit/2f5c7e3557be062684e9d45fdb3b6db19b6ae141))


### Bug Fixes

* adds better types for the `isKeySet` `isKeySetXXX` functions ([1903e82](https://github.com/eturino/ts-key-set/commit/1903e820c0152cb82496b5ecb772fb5b5d129986))
* **deps:** [security] bump acorn from 6.4.0 to 6.4.1 ([#57](https://github.com/eturino/ts-key-set/issues/57)) ([df4f2fd](https://github.com/eturino/ts-key-set/commit/df4f2fd88b3fe6055fcf059e67b5657e0ff7125a))
* **deps:** [security] bump highlight.js from 10.3.1 to 10.4.1 ([#176](https://github.com/eturino/ts-key-set/issues/176)) ([a889746](https://github.com/eturino/ts-key-set/commit/a88974689fd3e34efacc25fb4f4c65f947fd58b5))
* **deps:** [security] bump ini from 1.3.5 to 1.3.8 ([#182](https://github.com/eturino/ts-key-set/issues/182)) ([e1dabfd](https://github.com/eturino/ts-key-set/commit/e1dabfddfc180e7c0f0dd14a6d9a8afef682db6f))
* **deps:** bump ansi-regex from 3.0.0 to 3.0.1 ([#437](https://github.com/eturino/ts-key-set/issues/437)) ([1dbe7b8](https://github.com/eturino/ts-key-set/commit/1dbe7b81ad4b86f9fa1d20188eea270719e6a79b))
* **deps:** bump async from 2.6.3 to 2.6.4 ([#449](https://github.com/eturino/ts-key-set/issues/449)) ([f921d47](https://github.com/eturino/ts-key-set/commit/f921d47259b216b516615a7d4211749267837f38))
* **deps:** bump es-toolkit from 1.26.1 to 1.27.0 ([#679](https://github.com/eturino/ts-key-set/issues/679)) ([338f7f7](https://github.com/eturino/ts-key-set/commit/338f7f7c4e8a3b984f1befe3373de4aa55a907c7))
* **deps:** bump es-toolkit from 1.27.0 to 1.29.0 ([#692](https://github.com/eturino/ts-key-set/issues/692)) ([5eca0a6](https://github.com/eturino/ts-key-set/commit/5eca0a6523ea584a4b342efbd444119f1a73b629))
* **deps:** bump es-toolkit from 1.29.0 to 1.30.1 ([#698](https://github.com/eturino/ts-key-set/issues/698)) ([70a57c1](https://github.com/eturino/ts-key-set/commit/70a57c152614dd40670053f39c37f447f8f1f209))
* **deps:** bump es-toolkit from 1.30.1 to 1.31.0 ([#700](https://github.com/eturino/ts-key-set/issues/700)) ([90e0ecf](https://github.com/eturino/ts-key-set/commit/90e0ecf3b4851186fe255f44b3288ad96a467835))
* **deps:** bump es-toolkit from 1.31.0 to 1.32.0 ([#720](https://github.com/eturino/ts-key-set/issues/720)) ([a464760](https://github.com/eturino/ts-key-set/commit/a464760eba89005b93cd30317765ce1f931c5e92))
* **deps:** bump tmpl from 1.0.4 to 1.0.5 ([#315](https://github.com/eturino/ts-key-set/issues/315)) ([1210cdf](https://github.com/eturino/ts-key-set/commit/1210cdfc159533565dacf990bab766d4d057de13))
* **deps:** bump trim-off-newlines from 1.0.1 to 1.0.3 ([#390](https://github.com/eturino/ts-key-set/issues/390)) ([46d00ca](https://github.com/eturino/ts-key-set/commit/46d00ca3639418873eaafcf35d4f1f83930d96bd))
* **deps:** bump vite from 5.4.11 to 5.4.14 ([#710](https://github.com/eturino/ts-key-set/issues/710)) ([b831210](https://github.com/eturino/ts-key-set/commit/b8312105c1b5c9b94516e015afadb85811699790))
* export predicate functions in root of package ([1c1f56d](https://github.com/eturino/ts-key-set/commit/1c1f56da31c39c7f12a268b71e91b2af566ab642))
* fixing overloads on remove() and intersect() (TypeScript) ([7ea0ff1](https://github.com/eturino/ts-key-set/commit/7ea0ff1aeeb0593153eb40f1eb0f5d7b74bd95ff))
* narrower types in the intersect and remove returns to avoid typing issues in clients ([d590fe2](https://github.com/eturino/ts-key-set/commit/d590fe2cdab4330cac4cf0e88445eded70754141))
* remove 'type module'. It broke the usage of this library as commonJS ([94a5965](https://github.com/eturino/ts-key-set/commit/94a5965f7efd73f8e0c29a07990c9ff4eb01f9e3))
* serializeComposedKeyLabelSet types ([2032b95](https://github.com/eturino/ts-key-set/commit/2032b95676aca3702da83284acf263451d5b2853))
* target ES2017 instead of esnext for module, and ES2015 for main ([8660d10](https://github.com/eturino/ts-key-set/commit/8660d10dd7cdeddd80ea1d0e43fd6e8eb2e2b1c6))
* upgrading dependencies and fixing types for them ([5ce2be0](https://github.com/eturino/ts-key-set/commit/5ce2be0f07a3f1b266bad4379514c32f9acaf68c))


### Performance Improvements

* deps upgrade ([#678](https://github.com/eturino/ts-key-set/issues/678)) ([d8c6090](https://github.com/eturino/ts-key-set/commit/d8c60903824ddae393cdfaf382a209bf06509f7d))


### Miscellaneous Chores

* release 5.11.0 ([8c8ac30](https://github.com/eturino/ts-key-set/commit/8c8ac301072f20b58d8ec57854cdb079faaa95f7))

## [5.11.0](https://github.com/eturino/ts-key-set/compare/v5.11.0...v5.11.0) (2025-02-05)


### Bug Fixes

* export predicate functions in root of package ([1c1f56d](https://github.com/eturino/ts-key-set/commit/1c1f56da31c39c7f12a268b71e91b2af566ab642))


### Miscellaneous Chores

* release 5.11.0 ([8c8ac30](https://github.com/eturino/ts-key-set/commit/8c8ac301072f20b58d8ec57854cdb079faaa95f7))

## [5.11.0](https://github.com/eturino/ts-key-set/compare/v5.10.0...v5.11.0) (2025-02-05)


### Features

* adding isComposedKeySetSerializedXXX for specific types (type predicates) ([dcb374d](https://github.com/eturino/ts-key-set/commit/dcb374d650407e17a03f10917a3c5135ec2ec9f8))
* serialize and parse ComposedKeySet to allow for array of keySets as input ([5b0791b](https://github.com/eturino/ts-key-set/commit/5b0791b9abd7928166f188ef0575323bc66fdb00))


### Bug Fixes

* **deps:** bump es-toolkit from 1.31.0 to 1.32.0 ([#720](https://github.com/eturino/ts-key-set/issues/720)) ([a464760](https://github.com/eturino/ts-key-set/commit/a464760eba89005b93cd30317765ce1f931c5e92))
* **deps:** bump vite from 5.4.11 to 5.4.14 ([#710](https://github.com/eturino/ts-key-set/issues/710)) ([b831210](https://github.com/eturino/ts-key-set/commit/b8312105c1b5c9b94516e015afadb85811699790))

## [5.10.0](https://github.com/eturino/ts-key-set/compare/v5.9.1...v5.10.0) (2025-01-09)


### Features

* serialize and parse ComposedKeySet to allow for array of keySets as input ([5b0791b](https://github.com/eturino/ts-key-set/commit/5b0791b9abd7928166f188ef0575323bc66fdb00))

### [5.9.1](https://github.com/eturino/ts-key-set/compare/v5.9.0...v5.9.1) (2025-01-08)


### Bug Fixes

* serializeComposedKeyLabelSet types ([2032b95](https://github.com/eturino/ts-key-set/commit/2032b95676aca3702da83284acf263451d5b2853))

## [5.9.0](https://github.com/eturino/ts-key-set/compare/v5.8.1...v5.9.0) (2025-01-08)


### Features

* ComposedKeyLabelSet and functions ([0a91908](https://github.com/eturino/ts-key-set/commit/0a919087f4dc93b95c5e4987ed817d9c8e5faa92))

## [5.8.1](https://github.com/eturino/ts-key-set/compare/v5.7.0...v5.8.1) (2025-01-08)


### Features

* Composed KeyLabelSet parse and serialization ([8091558](https://github.com/eturino/ts-key-set/commit/809155817ed8a6ac766a2f1cd9ed767b9797aab2))


### Bug Fixes

* **deps:** bump es-toolkit from 1.26.1 to 1.27.0 ([#679](https://github.com/eturino/ts-key-set/issues/679)) ([338f7f7](https://github.com/eturino/ts-key-set/commit/338f7f7c4e8a3b984f1befe3373de4aa55a907c7))
* **deps:** bump es-toolkit from 1.27.0 to 1.29.0 ([#692](https://github.com/eturino/ts-key-set/issues/692)) ([5eca0a6](https://github.com/eturino/ts-key-set/commit/5eca0a6523ea584a4b342efbd444119f1a73b629))
* **deps:** bump es-toolkit from 1.29.0 to 1.30.1 ([#698](https://github.com/eturino/ts-key-set/issues/698)) ([70a57c1](https://github.com/eturino/ts-key-set/commit/70a57c152614dd40670053f39c37f447f8f1f209))
* **deps:** bump es-toolkit from 1.30.1 to 1.31.0 ([#700](https://github.com/eturino/ts-key-set/issues/700)) ([90e0ecf](https://github.com/eturino/ts-key-set/commit/90e0ecf3b4851186fe255f44b3288ad96a467835))

## ~[5.8.0](https://github.com/eturino/ts-key-set/compare/v5.7.0...v5.8.0) (2025-01-08)~ YANKED!!

Version 5.8.0 was yanked because it was released with the old 5.7.0 compiled code.


## [5.7.0](https://github.com/eturino/ts-key-set/compare/v5.6.3...v5.7.0) (2024-11-05)


### Features

* Replace lodash with es-toolkit. Also moving to new project structure and tooling, vitest, and CI ([66c1b43](https://github.com/eturino/ts-key-set/commit/66c1b4354c1e77fadd024678e87dd89d73e42861))

### [5.6.3](https://github.com/eturino/ts-key-set/compare/v5.6.2...v5.6.3) (2024-09-25)


### Bug Fixes

* remove 'type module'. It broke the usage of this library as commonJS ([94a5965](https://github.com/eturino/ts-key-set/commit/94a5965f7efd73f8e0c29a07990c9ff4eb01f9e3))

### [5.6.2](https://github.com/eturino/ts-key-set/compare/v5.6.1...v5.6.2) (2024-09-18)

### [5.6.1](https://github.com/eturino/ts-key-set/compare/v5.6.0...v5.6.1) (2024-09-16)

## [5.6.0](https://github.com/eturino/ts-key-set/compare/v5.5.0...v5.6.0) (2023-08-30)


### Features

* added toString() and, only for node environments, also custom inspect for console.log() ([d8719b3](https://github.com/eturino/ts-key-set/commit/d8719b32795037fd573f8cf80a3efb99e36674ec))

## [5.5.0](https://github.com/eturino/ts-key-set/compare/v5.4.0...v5.5.0) (2023-06-29)


### Features

* add better types to `representsXXX()` functions ([6087634](https://github.com/eturino/ts-key-set/commit/6087634b6568c4d702b5c05ec2ae0e7f44cc4c38))

## [5.4.0](https://github.com/eturino/ts-key-set/compare/v5.3.0...v5.4.0) (2023-05-16)


### Features

* composedKeySet to avoid duplicate key set (using ks.isEqual()) ([c03dd00](https://github.com/eturino/ts-key-set/commit/c03dd00b591ab1a88c75f0426b6fc2c9b7545630))

## [5.3.0](https://github.com/eturino/ts-key-set/compare/v5.2.0...v5.3.0) (2023-05-16)


### Features

* composedKeySet new methods addList and withoutList ([b4b2993](https://github.com/eturino/ts-key-set/commit/b4b29930ff4b979d73485895ca0cd45dca8161f2))

## [5.2.0](https://github.com/eturino/ts-key-set/compare/v5.1.0...v5.2.0) (2023-05-16)


### Features

* adding isComposedKeySet() function. Also upgrade dependencies ([b543221](https://github.com/eturino/ts-key-set/commit/b5432219c8719809e71bdcd05afbe0dac52d8c85))

## [5.1.0](https://github.com/eturino/ts-key-set/compare/v5.0.0...v5.1.0) (2022-11-30)


### Features

* add alias to build functions someKeySet() allExceptSomeKeySet() noneKeySet() and someKeySet() ([264fc34](https://github.com/eturino/ts-key-set/commit/264fc34d338e65dd724b71961eeb4fdbc86d64b5))


### Bug Fixes

* adds better types for the `isKeySet` `isKeySetXXX` functions ([1903e82](https://github.com/eturino/ts-key-set/commit/1903e820c0152cb82496b5ecb772fb5b5d129986))
* **deps:** bump ansi-regex from 3.0.0 to 3.0.1 ([#437](https://github.com/eturino/ts-key-set/issues/437)) ([1dbe7b8](https://github.com/eturino/ts-key-set/commit/1dbe7b81ad4b86f9fa1d20188eea270719e6a79b))
* **deps:** bump async from 2.6.3 to 2.6.4 ([#449](https://github.com/eturino/ts-key-set/issues/449)) ([f921d47](https://github.com/eturino/ts-key-set/commit/f921d47259b216b516615a7d4211749267837f38))

## [5.0.0](https://github.com/eturino/ts-key-set/compare/v4.8.0...v5.0.0) (2022-03-18)


### ⚠ BREAKING CHANGES

* `.keys` is removed. `.elements` is now the frozen Set. And the old utils
`uniqueArray`, `uniqueKeyLabelArray` and `arraysEqual` are dropped.

### Features

* elements as a public readonly frozen Set instead of internal array ([c5d492b](https://github.com/eturino/ts-key-set/commit/c5d492b9c4ba51255c764b44e0b59c8ba6bcaf90))


### Bug Fixes

* **deps:** bump tmpl from 1.0.4 to 1.0.5 ([#315](https://github.com/eturino/ts-key-set/issues/315)) ([1210cdf](https://github.com/eturino/ts-key-set/commit/1210cdfc159533565dacf990bab766d4d057de13))
* **deps:** bump trim-off-newlines from 1.0.1 to 1.0.3 ([#390](https://github.com/eturino/ts-key-set/issues/390)) ([46d00ca](https://github.com/eturino/ts-key-set/commit/46d00ca3639418873eaafcf35d4f1f83930d96bd))

## [4.8.0](https://github.com/eturino/ts-key-set/compare/v4.7.0...v4.8.0) (2021-05-10)


### Features

* composedKeySet.map() support ([4635e43](https://github.com/eturino/ts-key-set/commit/4635e43566272186368e821e8c1a334cdfddda43))

## [4.7.0](https://github.com/eturino/ts-key-set/compare/v4.6.0...v4.7.0) (2021-04-29)


### Features

* `ComposedKeySet.compactUnion` and `ComposedKeySet.compactIntersect` ([85f6c4b](https://github.com/eturino/ts-key-set/commit/85f6c4ba2d83d1d98e367a627d08c783d47bea57))

## [4.6.0](https://github.com/eturino/ts-key-set/compare/v4.5.1...v4.6.0) (2021-04-29)


### Features

* composedKeySet that encompass a list of KeySets ([#220](https://github.com/eturino/ts-key-set/issues/220)) ([73de6f8](https://github.com/eturino/ts-key-set/commit/73de6f8e976322b4f7c4a914c013cd21f69fd0eb))

### [4.5.1](https://github.com/eturino/ts-key-set/compare/v4.5.0...v4.5.1) (2021-04-29)


### Bug Fixes

* upgrading dependencies and fixing types for them ([5ce2be0](https://github.com/eturino/ts-key-set/commit/5ce2be0f07a3f1b266bad4379514c32f9acaf68c))

## [4.5.0](https://github.com/eturino/ts-key-set/compare/v4.4.2...v4.5.0) (2021-02-04)


### Features

* added `ks.union(other)` ([cde30b5](https://github.com/eturino/ts-key-set/commit/cde30b512a91a21e199c743bcac4a04132743bae))

### [4.4.2](https://github.com/eturino/ts-key-set/compare/v4.4.1...v4.4.2) (2021-02-04)

### [4.4.1](https://github.com/eturino/ts-key-set/compare/v4.4.0...v4.4.1) (2021-01-26)


### Bug Fixes

* **deps:** [security] bump highlight.js from 10.3.1 to 10.4.1 ([#176](https://github.com/eturino/ts-key-set/issues/176)) ([a889746](https://github.com/eturino/ts-key-set/commit/a88974689fd3e34efacc25fb4f4c65f947fd58b5))
* **deps:** [security] bump ini from 1.3.5 to 1.3.8 ([#182](https://github.com/eturino/ts-key-set/issues/182)) ([e1dabfd](https://github.com/eturino/ts-key-set/commit/e1dabfddfc180e7c0f0dd14a6d9a8afef682db6f))

## [4.4.0](https://github.com/eturino/ts-key-set/compare/v4.3.1...v4.4.0) (2020-10-23)


### Features

* exposing KeySetTypesEnumValues + deps upgrade ([4affd1d](https://github.com/eturino/ts-key-set/commit/4affd1d4d474fc1f5a950bc8bb2014165c1ccd0b))

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
