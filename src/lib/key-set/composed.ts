import { sortBy, uniqWith } from "lodash";
import { IKeyLabel } from "../util/object-utils";
import { Key, KeySet } from "./-base";
import { INSPECT } from "./-is-node-env";
import { KeySetAll, all } from "./all";
import { KeySetAllExceptSome } from "./all-except-some";
import { KeySetNone } from "./none";
import { KeySetSome } from "./some";

/**
 * Composition of a list of KeySets.
 *
 * On a normal use case, this is not needed and it can be solved with `first.intersect(second)`.
 * But there are other cases where we have to be explicit about the 2 sets that we are intersecting.
 *
 * e.g.
 * We have a list of items with labels, where an item can have multiple labels.
 * We need to filter the items with labels A, B and C but that do not have labels D.
 *
 * We cannot use `some(A, B, C).intersect(allExceptSome(D))` since that would end up with just `some(A, B, C)`.
 * So we use `composedKeySet([some(A, B, C), allExceptSome(D)])`.
 *
 * This way, if we have a search engine that translates key sets like this:
 *   - `All` => `WHERE 1=1`
 *   - `None` => `WHERE 1=0`
 *   - `Some` => `WHERE list.contains(elements)`
 *   - `AllExceptSome` => `WHERE not list.contains(elements)`
 *
 * then the composed key set above will end up with
 *   `WHERE items.labels.contains(A, B, or C) AND NOT items.labels.contains(D)`
 */
export class ComposedKeySet<T extends Key = Key> {
  constructor(readonly list: KeySet<T>[]) {}

  public toString(): string {
    return `ComposedKeySet<${this.list.map((x) => x.toString())}>`;
  }

  public [INSPECT]() {
    return this.toString();
  }

  clone(): ComposedKeySet<T> {
    return composedKeySetFrom(this.list.map((x) => x.clone()));
  }

  /**
   * equivalent to `list[0].union(list[1]).union(list[2])...
   */
  collapseUnion(): KeySet<T> {
    return this.list.reduce((acc, x) => acc.union(x), new KeySetNone<T>());
  }

  /**
   * equivalent to `list[0].intersect(list[1]).intersect(list[2])...
   */
  collapseIntersect(): KeySet<T> {
    return this.list.reduce((acc, x) => acc.intersect(x), new KeySetAll<T>());
  }

  /**
   * returns true if ALL the sets in the list return representsAll()
   */
  representsAll(): boolean {
    return this.list.every((x) => x.representsAll());
  }

  /**
   * returns true if ALL the sets in the list return representsNone()
   */
  representsNone(): boolean {
    return this.list.every((x) => x.representsNone());
  }

  /**
   * returns true if ALL the sets in the list return representsSome()
   */
  representsSome(): boolean {
    return this.list.every((x) => x.representsSome());
  }

  /**
   * returns true if ALL the sets in the list return representsAllExceptSome()
   */
  representsAllExceptSome(): boolean {
    return this.list.every((x) => x.representsAllExceptSome());
  }

  /**
   * returns true if the list is the same (not taking into account the order)
   *
   * @param other
   */
  isEqual(other: ComposedKeySet<T>): boolean {
    if (this.list.length !== other.list.length) return false;

    return (
      // every member of my list has an equivalent in the other list
      this.list.every((x) => other.list.some((y) => x.isEqual(y))) &&
      // every member of the other list has an equivalent on my list
      other.list.every((x) => this.list.some((y) => x.isEqual(y)))
    );
  }

  /**
   * returns the list of complementary KeySets, of the opposite type, representing the elements that this set does not include
   *
   * All -> None
   * None -> All
   * Some -> AllExceptSome
   * AllExceptSome -> Some
   */
  invert(): ComposedKeySet<T> {
    return composedKeySetFrom(this.list.map((x) => x.invert()));
  }

  /**
   * adds a new set to the composed key set
   *
   * @param other
   */
  add(other: KeySet<T>): ComposedKeySet<T> {
    return composedKeySetFrom([...this.list, other]);
  }

  /**
   * returns a new ComposedKeySet with the list of KeySets of the current one, plus the extra ones given
   *
   * @param others
   */
  addList(others: KeySet<T>[]): ComposedKeySet<T> {
    return composedKeySetFrom([...this.list, ...others]);
  }

  /**
   * removes the given key set from the list, if it exists (using isEqual)
   *
   * it returns a ComposedKeySet with a single ALL if the resulting list is empty
   *
   * @param other
   */
  without(other: KeySet<T>): ComposedKeySet<T> {
    return composedKeySetFrom(this.list.filter((x) => !x.isEqual(other)));
  }

  /**
   * removes all the given key sets from the list, if any exists (using isEqual)
   *
   * it returns a ComposedKeySet with a single ALL if the resulting list is empty
   *
   * @param others
   */
  withoutList(others: KeySet<T>[]): ComposedKeySet<T> {
    return composedKeySetFrom(this.list.filter((x) => !others.some((y) => x.isEqual(y))));
  }

  /**
   * returns a ComposedKeySet with the list of sets that survive the given filter
   *
   * it returns a ComposedKeySet with a single ALL if the resulting list is empty
   *
   * @param predicate
   */
  filter(predicate: (x: KeySet<T>) => boolean): ComposedKeySet<T> {
    const list = this.list.filter(predicate);
    return composedKeySetFrom(list);
  }

  /**
   * returns a ComposedKeySet with the result of mapping each current set of the list with the given function
   *
   * @param mapFn
   */
  map<TNew extends Key>(mapFn: (x: KeySet<T>) => KeySet<TNew>): ComposedKeySet<TNew> {
    const list = this.list.map(mapFn);
    return composedKeySetFrom(list);
  }

  /**
   * true if ALL sets contain the element
   * @param element
   */
  contains(element: T): boolean {
    return this.list.every((x) => x.contains(element));
  }

  /**
   * alias of `contains`
   * @param element
   * @see contains()
   */
  includes(element: T): boolean {
    return this.contains(element);
  }

  /**
   * returns a new one with all the elements of the same type as union
   *
   * eg
   *
   * Compacted(ALL, ALL, SOME(1, 2), ALL, ALL_EXCEPT_SOME(3, 4), NONE, SOME(3), ALL_EXCEPT_SOME(3, 4, 5))
   * =>
   * Compacted(ALL, SOME(1, 2, 3), ALL_EXCEPT_SOME(3, 4), NONE)
   */
  compactUnion(): ComposedKeySet<T> {
    return compactWith(this.list, (list) => list.reduce((acc, x) => acc.union(x), new KeySetNone<T>()));
  }

  /**
   * returns a new one with all the elements of the same type as union
   *
   * eg
   *
   * Compacted(ALL, ALL, SOME(1, 2), ALL, ALL_EXCEPT_SOME(3, 4), NONE, SOME(3), ALL_EXCEPT_SOME(3, 4, 5))
   * =>
   * Compacted(ALL, ALL_EXCEPT_SOME(3, 4, 5), NONE)
   */
  compactIntersect(): ComposedKeySet<T> {
    return compactWith(this.list, (list) => list.reduce((acc, x) => acc.intersect(x), new KeySetAll<T>()));
  }
}

export function isComposedKeySet<T extends Key>(x: ComposedKeySet<T>): x is ComposedKeySet<T>;
export function isComposedKeySet(x: unknown): x is ComposedKeySet;
export function isComposedKeySet(x: unknown): x is ComposedKeySet {
  return x instanceof ComposedKeySet;
}

export type ComposedKeyLabelSet<T extends string | number> = ComposedKeySet<IKeyLabel<T>>;

/**
 * creates a new ComposedKeySet with the given list
 *
 * if trying to compose with an empty list of KeySet, it will compose with a single `all`
 *
 * @param list
 */
export function composedKeySetFrom<T extends Key>(list: KeySet<T>[]): ComposedKeySet<T> {
  if (!list.length) return new ComposedKeySet<T>([all<T>()]);

  const uniqList = uniqWith(list, (a, b) => a.isEqual(b));
  const sorted = sortBy(uniqList, (x) => [x.type, x.elementsSorted]);
  return new ComposedKeySet<T>(sorted);
}

function compactWith<T extends Key>(
  list: KeySet<T>[],
  reducerFn: (sublist: KeySet<T>[]) => KeySet<T>
): ComposedKeySet<T> {
  const somes = list.filter((x) => x instanceof KeySetSome);
  const aesms = list.filter((x) => x instanceof KeySetAllExceptSome);

  const compacted: KeySet<T>[] = [...list.filter((x) => x instanceof KeySetNone || x instanceof KeySetAll)];
  if (somes.length > 0) {
    compacted.push(reducerFn(somes));
  }
  if (aesms.length > 0) {
    compacted.push(reducerFn(aesms));
  }

  return composedKeySetFrom(uniqWith(compacted, (a, b) => a.isEqual(b)));
}
