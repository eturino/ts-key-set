import { IKeyLabel } from "../util/object-utils";
import { Key, KeySet } from "./-base";
import { all, KeySetAll } from "./all";
import { KeySetNone } from "./none";

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

  return new ComposedKeySet<T>(list);
}
