const range = (n: number, step = 1) =>
  Array(n)
    .fill(0)
    .map((_, i) => i * step);

const toggleElement = <T>(arr: T[], value: T) =>
  arr.includes(value) ? arr.filter((el) => el !== value) : [...arr, value];

const isEqual = <T>(a: T[], b: T[]) => a.every((el) => b.includes(el));
const distinct = <T>(arr: T[], compareFn?: (a: T, b: T) => boolean): T[] => {
  const result: T[] = [];
  const usingCompareFn = compareFn ?? ((a, b) => a === b);
  arr.forEach((el) => {
    const hasExisting = result.find((returningEl) =>
      usingCompareFn(el, returningEl)
    );
    if (!hasExisting) result.push(el);
  });

  return result;
};

const uniqueBy = <T, U>(a: T[], featureFn: (a: T) => U): U[] => {
  const results = new Set<U>();
  a.forEach((item) => {
    results.add(featureFn(item));
  });
  return Array.from(results);
};

const unique = <T>(a: T[]): T[] => Array.from(new Set<T>(a));

const hasSome = <T>(a: T[], b: T[], compareFn?: (a: T, b: T) => boolean) => {
  if (!compareFn) return a.some((el) => b.includes(el));

  return a.some((el) => b.some((bEl) => compareFn(el, bEl)));
};
const zip = <T, U>(ts: T[], us: U[]): [T, U][] => {
  if (ts.length !== us.length) {
    throw new Error("Cannot zip arrays with different length");
  }
  return range(ts.length).reduce(
    (result, i) => [...result, [ts[i], us[i]]],
    [] as [T, U][]
  );
};

const zipBy = <T, U>(
  ts: T[],
  us: U[],
  zipFn: (t: T, u: U) => boolean
): [T, U[]][] => {
  return ts.reduce<[T, U[]][]>((result, t) => {
    const matchingUs = us.filter((u) => zipFn(t, u));
    return [...result, [t, matchingUs]];
  }, []);
};
const groupBy = <T>(
  ts: T[],
  groupFn: (t: T) => string
): Record<string, T[]> => {
  return ts.reduce((groups, t) => {
    const key = groupFn(t);
    return {
      ...groups,
      [key]: [...(groups[key] ?? []), t],
    };
  }, {} as Record<string, T[]>);
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  range,
  zip,
  toggleElement,
  isEqual,
  unique,
  uniqueBy,
  distinct,
  hasSome,
  zipBy,
  groupBy,
};
