const searchCaseInsensitive = (str: string, searchString: string) => str.toLowerCase().includes(searchString.toLowerCase());
const normalizeSnakeCase = (snakeCaseString: string) => snakeCaseString.replace(/_/g, ' ');
const caseInsensitiveEqual = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  searchCaseInsensitive,
  normalizeSnakeCase,
  caseInsensitiveEqual,
};