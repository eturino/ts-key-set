import { $enum } from "ts-enum-util";
import { expect, test } from "vitest";
import { KeySetTypes, type KeySetTypesEnumValues } from "../../..";

function acceptEnumValue(_x: KeySetTypesEnumValues): boolean {
  return true;
}

test("KeySetTypesEnumValues and KeySetTypes are compatible", () => {
  // if the types are not compatible TS will complain
  // biome-ignore lint/complexity/noForEach: this is using the `forEach` method of the ts-enum-util package
  $enum(KeySetTypes).forEach((value) => {
    expect(acceptEnumValue(value)).toBeTruthy();
  });
});
