import { DeepValue, KeyPaths } from "../types/utils";

type KeyType = string | number | symbol;
const mapValues = <K extends KeyType, T, R = T>(records: Record<K, T>, mapFn: (t: T) => R): Record<K, R> => {
    const entries = Object.entries(records) as [K, T][];
    const mappedEntries = entries.map(([key, value]) => [key, mapFn(value)]);
    return Object.fromEntries(mappedEntries);
};

const filterValues = <K extends KeyType, T>(records: Record<K, T>, filterFn: (t: T) => boolean): Record<K, T> => {
    const entries = Object.entries(records) as [K, T][];
    const filteredEntries = entries.filter(([, value]) => filterFn(value));
    return Object.fromEntries(filteredEntries) as Record<K, T>;
};

const filterKeys = <T extends {[key: string]: any}, Ks extends keyof T>(record: T, filteringKeys: Ks[]): Pick<T, Ks> => {
    const entries = Object.entries(record) as [Ks, T[Ks]][];
    const filteredEntries = entries.filter(([key]) => filteringKeys.includes(key));
    return Object.fromEntries(filteredEntries) as Pick<T, Ks>;
}

const findByKey = <K extends KeyType, T>(records: Record<K, T>, predicate: (key: K) => boolean): T | undefined => {
    const matchingPair = Object.entries(records).find(([k]) => predicate(k as K));
    if (!matchingPair) return;
    return matchingPair[1] as T;
}

const valueBySortedKey = <K extends KeyType, T>(records: Record<K, T>, sortFn: (a: K, b: K) => number): T[] => {
    const sortedPair = Object.entries<T>(records).sort(([a], [b]) => sortFn(a as K, b as K));
    return sortedPair.map(([, v]) => v);
}

const deepUpdate = <T>(record: T, key: KeyPaths<T>, value: DeepValue<T>): T => {
  if (!key) return record;
  if (key.endsWith('.')) return deepUpdate(record, key.slice(0, -1) as KeyPaths<T>, value);
  const [queryKey, ...rest] = key.split(".");
  const usingKey = queryKey as keyof T;
  if (rest.length === 0) {
    return { ...record, [usingKey]: value };
  }
  return {
    ...record,
    [usingKey]: deepUpdate(
      record[usingKey],
      rest.join(".") as KeyPaths<T[keyof T]>,
      value as DeepValue<T[keyof T]>,
    ),
  };
};

const multiDeepUpdate = <T>(
  record: T,
  updateMapping: Partial<
    Record<KeyPaths<T>, DeepValue<T>>
  >
) => {
  return Object.entries(updateMapping).reduce<T>(
    (result, [keyPath, value]) =>
      deepUpdate(
        result,
        keyPath as KeyPaths<T>,
        value as DeepValue<T>
      ),
    record
  );
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  mapValues,
  filterValues,
  findByKey,
  valueBySortedKey,
  filterKeys,
  deepUpdate,
  multiDeepUpdate,
};