const range = (n: number) =>
  Array(n)
    .fill(0)
    .map((_, i) => i);

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

const hasSome = <T>(a: T[], b: T[]) => a.some((el) => b.includes(el));
const zipBy = <T, U>(ts: T[], us: U[], zipFn: (t: T, u: U) => boolean): [T, U[]][] => {
  return ts.reduce<[T, U[]][]>((result, t) => {
    const matchingUs = us.filter(u => zipFn(t, u));
    return [
      ...result,
      [t, matchingUs]
    ]
  }, []);
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  range,
  toggleElement,
  isEqual,
  distinct,
  hasSome,
  zipBy,
};
