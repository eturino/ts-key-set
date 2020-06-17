import { all, allExceptSome, KeySetAllExceptSome, KeySetSome, none, some } from "../..";

const element = "A";

describe("#contains(element) and #includes(element)", () => {
  describe("All", () => {
    const ksAll = all();
    it("ksAll.includes(element); // => true", () => {
      expect(ksAll.includes(element)).toBeTruthy();
    });
    it("ksAll.contains(element); // => true", () => {
      expect(ksAll.contains(element)).toBeTruthy();
    });
  });

  describe("None", () => {
    const ksNone = none();
    it("ksNone.includes(element); // => false", () => {
      expect(ksNone.includes(element)).toBeFalsy();
    });
    it("ksNone.contains(element); // => false", () => {
      expect(ksNone.contains(element)).toBeFalsy();
    });
  });

  describe("Some (including the element)", () => {
    const ksSome: KeySetSome<string> = some(["A", "B", "C"]);
    it("ksSome.includes(element); // => true", () => {
      expect(ksSome.includes(element)).toBeTruthy();
    });
    it("ksSome.contains(element); // => true", () => {
      expect(ksSome.contains(element)).toBeTruthy();
    });
  });

  describe("Some (not including the element)", () => {
    const ksSome: KeySetSome<string> = some(["X", "Y", "Z"]);
    it("ksSome.includes(element); // => false", () => {
      expect(ksSome.includes(element)).toBeFalsy();
    });
    it("ksSome.contains(element); // => false", () => {
      expect(ksSome.contains(element)).toBeFalsy();
    });
  });

  describe("AllExceptSome (including the element)", () => {
    const ksAllExceptSome: KeySetAllExceptSome<string> = allExceptSome(["A", "B", "C"]);
    it("ksAllExceptSome.includes(element); // => false", () => {
      expect(ksAllExceptSome.includes(element)).toBeFalsy();
    });
    it("ksAllExceptSome.contains(element); // => false", () => {
      expect(ksAllExceptSome.contains(element)).toBeFalsy();
    });
  });

  describe("AllExceptSome (not including the element)", () => {
    const ksAllExceptSome: KeySetAllExceptSome<string> = allExceptSome(["X", "Y", "Z"]);
    it("ksAllExceptSome.includes(element); // => true", () => {
      expect(ksAllExceptSome.includes(element)).toBeTruthy();
    });
    it("ksAllExceptSome.contains(element); // => true", () => {
      expect(ksAllExceptSome.contains(element)).toBeTruthy();
    });
  });
});
