import { KeySetAll } from "../all";
import { KeySetNone } from "../none";

const keySet = new KeySetAll();

test("#clone()", () => {
  const result = keySet.clone();
  expect(result instanceof KeySetAll).toBeTruthy();
  expect(keySet === result).toBe(false);
});

test("#invert()", () => {
  const result = keySet.invert();
  expect(result instanceof KeySetNone).toBeTruthy();
});

test("#representsAll()", () => {
  expect(keySet.representsAll()).toBe(true);
});

test("#representsNone()", () => {
  expect(keySet.representsNone()).toBe(false);
});

test("#representsSome()", () => {
  expect(keySet.representsSome()).toBe(false);
});

test("#representsAllExceptSome()", () => {
  expect(keySet.representsAllExceptSome()).toBe(false);
});
