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

const isNumeric = (str: string) => {
  return !Number.isNaN(str) && !Number.isNaN(parseFloat(str));
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  nanToZero,
  sum,
  inputAsNumber,
  isNumeric,
};
