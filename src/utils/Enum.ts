const numberEnumValues = <T>(enumDef: T) => {
  return Object.values(enumDef).filter((v) => !Number.isNaN(parseInt(v as string))) as number[];
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  numberEnumValues,
}