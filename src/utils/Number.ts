const nanToZero = (num: number) => {
  if (Number.isNaN(num)) {
    return 0;
  }
  return num;
};

const sum = (...numbers: number[]) => numbers.reduce((sum, n) => sum + n, 0);

const inputAsNumber = (numString: string) => {
  const recognizedNonNumericSymbol = [",", "."];
  if (recognizedNonNumericSymbol.includes(numString[numString.length - 1])) {
    return numString as unknown as number;
  }
  return parseFloat(numString);
};

const stringToFloat = (str: string) => {
  return parseFloat(str.replace(/,/g, "."));
};

const isNumeric = (str: string) => {
  return /^\d*((\.|,)\d*)?$/.test(str);
};

const isNumericDigit = (str: string) => str.match(/^[0-9.,]$/);
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  nanToZero,
  sum,
  inputAsNumber,
  isNumeric,
  isNumericDigit,
  stringToFloat,
};
