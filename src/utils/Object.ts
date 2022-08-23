const mapValues = <K extends string | number | symbol, T, R = T>(records: Record<K, T>, mapFn: (t: T) => R): Record<K, R> => {
    const entries = Object.entries(records) as [K, T][];
    const mappedEntries = entries.map(([key, value]) => [key, mapFn(value)]);
    return Object.fromEntries(mappedEntries);
};

const filterValues = <K extends string | number | symbol, T>(records: Record<K, T>, filterFn: (t: T) => boolean): Record<K, T> => {
    const entries = Object.entries(records) as [K, T][];
    const filteredEntries = entries.filter(([, value]) => filterFn(value));
    return Object.fromEntries(filteredEntries) as Record<K, T>;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    mapValues,
    filterValues
};