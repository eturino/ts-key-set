/**
 * @hidden
 * @internal
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  const type = typeof value;
  return !!value && type === "object";
}

export interface IKeyLabel<K extends string | number> {
  key: K;
  label: string;
}

/**
 * @internal
 * @hidden
 */
export function isKeyLabelBase(
  x: unknown,
): x is Record<string, unknown> & { label: string } {
  if (!isObject(x)) return false;
  return "label" in x && typeof x.label === "string";
}

export function isKeyLabel(
  x: unknown,
): x is IKeyLabel<string> | IKeyLabel<number> {
  if (!isKeyLabelBase(x)) return false;
  return typeof x.key === "string" || typeof x.key === "number";
}
