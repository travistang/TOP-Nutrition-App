const searchCaseInsensitive = (str: string, searchString: string) =>
  str.toLowerCase().includes(searchString.toLowerCase());
const normalizeSnakeCase = (snakeCaseString: string) =>
  snakeCaseString.replace(/_/g, " ");
const normalizeCamelCase = (camelCaseString: string) =>
  camelCaseString.replace(/(.)([A-Z])/g, "$1 $2").toLowerCase();
const caseInsensitiveEqual = (a: string, b: string) =>
  a.toLowerCase() === b.toLowerCase();
const isUrl = (str: string) => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  searchCaseInsensitive,
  normalizeSnakeCase,
  normalizeCamelCase,
  caseInsensitiveEqual,
  isUrl,
};
