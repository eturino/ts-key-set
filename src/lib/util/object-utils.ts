/**
 * @hidden
 * @internal
 */
export function isObject(value: any) {
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
function isKeyLabelBase(x: any): boolean {
  if (!isObject(x)) return false;
  return typeof x.label === "string";
}

export function isKeyLabel(x: any): x is IKeyLabel<string> | IKeyLabel<number> {
  if (!isKeyLabelBase(x)) return false;
  return typeof x.key === "string" || typeof x.key === "number";
}
