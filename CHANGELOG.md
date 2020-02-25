# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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