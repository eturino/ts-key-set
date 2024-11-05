/**
 * @internal
 * @hidden
 */
export function sizeOf(source: Set<unknown> | ReadonlyArray<unknown> | unknown[]): number {
  if (source instanceof Set) {
    return source.size;
  }

  return source.length;
}
