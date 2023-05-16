const nanToZero = (num: number) => {
  if (Number.isNaN(num)) {
    return 0;
  }
  return num;
};

const average = (...numbers: number[]) =>
  safeDivide(sum(...numbers), numbers.length);
const min = (...numbers: (number | null)[]) => {
  const numOrInfinity = numbers.map((n) => (n === null ? Infinity : n));
  return Math.min(...numOrInfinity);
};
const max = (...numbers: (number | null)[]) => {
  const numOrInfinity = numbers.map((n) => (n === null ? -Infinity : n));
  return Math.max(...numOrInfinity);
};

const range = (...numbers: (number | null)[]) => {
  const validNumbers = numbers.filter((n) => n !== null);
  return [min(...validNumbers), max(...validNumbers)];
};

const sum = (...numbers: number[]) => numbers.reduce((sum, n) => sum + n, 0);
const ratioToPercentageString = (num: number) =>
  !Number.isFinite(num) ? "--" : `${(num * 100).toFixed(1)}%`;

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

const isCloseTo = (valueToTest: number, target: number, tolerance = 0.0001) => {
  return Math.abs(valueToTest - target) <= tolerance;
};

const safeDivide = (a: number, b: number) => (b === 0 ? 0 : a / b);

const numberToFormattedDigit = (nInHundred: number, integer?: boolean) => {
  if (!Number.isFinite(nInHundred)) return "0,00";
  const integerPart = Math.floor(nInHundred / 100);
  const decimalPart = Math.floor(nInHundred % 100);
  return integer
    ? integerPart
    : `${integerPart},${decimalPart.toString().slice(0, 2).padStart(2, "0")}`;
};

const isNumericDigit = (str: string) => str.match(/^[0-9.,]$/);
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  nanToZero,
  average,
  min,
  max,
  range,
  sum,
  inputAsNumber,
  isNumeric,
  isCloseTo,
  isNumericDigit,
  stringToFloat,
  safeDivide,
  ratioToPercentageString,
  numberToFormattedDigit,
};
