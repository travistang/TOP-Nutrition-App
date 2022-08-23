const searchCaseInsensitive = (str: string, searchString: string) => str.toLowerCase().includes(searchString.toLowerCase());
const normalizeSnakeCase = (snakeCaseString: string) => snakeCaseString.replace(/_/g, ' ');

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    searchCaseInsensitive,
    normalizeSnakeCase
};