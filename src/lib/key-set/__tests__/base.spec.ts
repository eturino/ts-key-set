import { $enum } from "ts-enum-util";
import { KeySetTypes, KeySetTypesEnumValues } from "../../..";

function acceptEnumValue(_x: KeySetTypesEnumValues): boolean {
  return true;
}

test("KeySetTypesEnumValues and KeySetTypes are compatible", () => {
  // if the types are not compatible TS will complain
  $enum(KeySetTypes).forEach((value) => {
    expect(acceptEnumValue(value)).toBeTruthy();
  });
});
