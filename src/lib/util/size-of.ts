/**
 * @internal
 * @hidden
 */
export function sizeOf(source: Set<any> | ReadonlyArray<any> | any[]): number {
  if (source instanceof Set) {
    return source.size;
  }

  return source.length;
}
