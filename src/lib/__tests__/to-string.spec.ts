import { allExceptSomeKeySetForced, allKeySet, composedKeySetFrom, noneKeySet, someKeySetForced } from "../key-set";

describe("toString KeySet", () => {
  it("KeySetAll", () => {
    const keySet = allKeySet();
    console.log("KeySetAll:", keySet);
    expect(keySet.toString()).toEqual("KeySet<ALL>");
  });

  it("KeySetNone", () => {
    const keySet = noneKeySet();
    console.log("KeySetNone:", keySet);
    expect(keySet.toString()).toEqual("KeySet<NONE>");
  });

  it("KeySetSome", () => {
    const keySet = someKeySetForced(["a", "c", "b"]);
    console.log("KeySetSome:", keySet);
    expect(keySet.toString()).toEqual("KeySet<SOME[a,b,c]>"); // elements are ordered
  });

  it("KeySetAllExceptSome", () => {
    const keySet = allExceptSomeKeySetForced([1, 3, 2]);
    console.log("KeySetAllExceptSome:", keySet);
    expect(keySet.toString()).toEqual("KeySet<ALL_EXCEPT_SOME[1,2,3]>"); // elements are ordered
  });

  it("ComposedKeySet", () => {
    const keySet = composedKeySetFrom([someKeySetForced([1, 2, 3]), allExceptSomeKeySetForced([1, 2, 3])]);
    console.log("ComposedKeySet:", keySet);
    expect(keySet.toString()).toEqual("ComposedKeySet<KeySet<ALL_EXCEPT_SOME[1,2,3]>,KeySet<SOME[1,2,3]>>");
  });
});
