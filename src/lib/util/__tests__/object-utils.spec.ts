import { describe, expect, it } from "vitest";

import { isKeyLabel } from "../../..";

describe("isKeyLabel()", () => {
  it("isKeyLabel({ key: 'a', label: 'b', otherStuff: 'whatever' }): true", () => {
    expect(
      isKeyLabel({ key: "a", label: "b", otherStuff: "whatever" }),
    ).toBeTruthy();
  });

  it("isKeyLabel('a'): false", () => {
    expect(isKeyLabel("a")).toBeFalsy();
  });

  it("isKeyLabel({ key: { nested: 1 }, label: 'b', otherStuff: 'whatever' }): false", () => {
    expect(
      isKeyLabel({ key: { nested: 1 }, label: "b", otherStuff: "whatever" }),
    ).toBeFalsy();
  });
});
