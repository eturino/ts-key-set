import {
  isKeySet,
  isKeySetAll,
  isKeySetAllExceptSome,
  isKeySetNone,
  isKeySetSome,
  isValidKey,
  Key,
  KeyLabelSet,
  KeyLabelSetAllExceptSomeSerialized,
  KeyLabelSetAllSerialized,
  KeyLabelSetNoneSerialized,
  KeyLabelSetSerialized,
  KeyLabelSetSomeSerialized,
  KeySet,
  KeySetAllExceptSomeSerialized,
  KeySetAllSerialized,
  KeySetNoneSerialized,
  KeySetSerialized,
  KeySetSomeSerialized,
  KeySetTypes,
  KeySetTypesEnumValues,
} from "./key-set/-base";
import { all, KeySetAll } from "./key-set/all";
import { allExceptSome, allExceptSomeForced, KeySetAllExceptSome } from "./key-set/all-except-some";
import {
  isKeySetOfNumberKeyLabels,
  isKeySetOfNumbers,
  isKeySetOfStringKeyLabels,
  isKeySetOfStrings,
} from "./key-set/check-element-type";
import {
  isKeySetSerializedOfNumberKeyLabels,
  isKeySetSerializedOfNumbers,
  isKeySetSerializedOfStringKeyLabels,
  isKeySetSerializedOfStrings,
} from "./key-set/check-serialized-element-type";
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
  serializeKeySet,
} from "./key-set/serialize";
import { KeySetSome, some, someForced } from "./key-set/some";
import { ComposedKeySet, ComposedKeyLabelSet, composedKeySetFrom } from "./key-set/composed";

import { EmptyArray, isEmptyArray, isNonEmptyArray, NonEmptyArray } from "./util/array-types";
import { arraysEqual } from "./util/arrays-equal";
import { IKeyLabel, isKeyLabel, isObject } from "./util/object-utils";
import { uniqueArray, uniqueKeyLabelArray } from "./util/unique-array";

export {
  // builders
  all,
  allExceptSome,
  allExceptSomeForced,
  none,
  some,
  someForced,
  // composed
  composedKeySetFrom,
  // types and classes
  ComposedKeySet,
  ComposedKeyLabelSet,
  Key,
  KeySet,
  KeyLabelSet,
  KeySetAll,
  KeySetAllExceptSome,
  KeySetNone,
  KeySetSome,
  KeySetSerialized,
  KeySetAllExceptSomeSerialized,
  KeySetAllSerialized,
  KeySetNoneSerialized,
  KeySetSomeSerialized,
  KeyLabelSetAllSerialized,
  KeyLabelSetNoneSerialized,
  KeyLabelSetSomeSerialized,
  KeyLabelSetAllExceptSomeSerialized,
  KeyLabelSetSerialized,
  IKeyLabel,
  InvalidKeySetError,
  InvalidEmptySetError,
  // enums
  KeySetTypes,
  KeySetTypesEnumValues,
  // serialize functions
  serializeKeySet,
  parseKeySet,
  // util functions
  uniqueArray,
  uniqueKeyLabelArray,
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
  isKeySetAllExceptSomeSerialized,
  // utils
  isValidKey,
  isKeyLabel,
  isObject,
  // check elements
  isKeySetOfStrings,
  isKeySetOfNumbers,
  isKeySetOfStringKeyLabels,
  isKeySetOfNumberKeyLabels,
  isKeySetSerializedOfNumberKeyLabels,
  isKeySetSerializedOfNumbers,
  isKeySetSerializedOfStringKeyLabels,
  isKeySetSerializedOfStrings,
};
