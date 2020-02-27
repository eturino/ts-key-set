import {
  isKeySet,
  isKeySetAll,
  isKeySetAllExceptSome,
  isKeySetNone,
  isKeySetSome,
  Key,
  KeySet,
  KeySetAllExceptSomeSerialized,
  KeySetAllSerialized,
  KeySetNoneSerialized,
  KeySetSerialized,
  KeySetSomeSerialized,
  KeySetTypes
} from "./key-set/-base";
import { all, KeySetAll } from "./key-set/all";
import {
  allExceptSome,
  allExceptSomeForced,
  KeySetAllExceptSome
} from "./key-set/all-except-some";
import { InvalidEmptySetError } from "./key-set/invalid-empty-set-error";
import { InvalidKeySetError } from "./key-set/invalid-key-set-error";
import { KeySetNone, none } from "./key-set/none";
import {
  isKeySetAllExceptSomeSerialized,
  isKeySetAllSerialized,
  isKeySetNoneSerialized,
  isKeySetSerialized,
  isKeySetSomeSerialized,
  parseKeySet,
  serializeKeySet
} from "./key-set/serialize";
import { KeySetSome, some, someForced } from "./key-set/some";
import {
  EmptyArray,
  isEmptyArray,
  isNonEmptyArray,
  NonEmptyArray
} from "./util/array-types";
import { arraysEqual } from "./util/arrays-equal";
import { uniqueArray } from "./util/unique-array";

export {
  // builders
  all,
  allExceptSome,
  allExceptSomeForced,
  none,
  some,
  someForced,
  // types and classes
  Key,
  KeySet,
  KeySetAll,
  KeySetAllExceptSome,
  KeySetNone,
  KeySetSome,
  KeySetSerialized,
  KeySetAllExceptSomeSerialized,
  KeySetAllSerialized,
  KeySetNoneSerialized,
  KeySetSomeSerialized,
  InvalidKeySetError,
  InvalidEmptySetError,
  // enums
  KeySetTypes,
  // serialize functions
  serializeKeySet,
  parseKeySet,
  // util functions
  uniqueArray,
  arraysEqual,
  // util types
  EmptyArray,
  NonEmptyArray,
  // predicates
  isEmptyArray,
  isNonEmptyArray,
  isKeySet,
  isKeySetAll,
  isKeySetNone,
  isKeySetSome,
  isKeySetAllExceptSome,
  isKeySetSerialized,
  isKeySetAllSerialized,
  isKeySetNoneSerialized,
  isKeySetSomeSerialized,
  isKeySetAllExceptSomeSerialized
};
