export const numberToString = (num: number, integer = false) => {
  return integer ? Math.floor(num).toString() : Math.floor(num * 100).toString();
};

export const stringToNumber = (numberString: string, integer = false) => {
  const num = parseInt(numberString);
  if (!Number.isFinite(num)) return 0;
  if (integer) return num;

  const integerPart = Math.floor(num / 100);
  const decimalPart = num % 100;
  return integerPart + decimalPart / 100;
};

export const addDigit = (numberString: string, n: number): string => {
  const newNumberString = `${numberString}${n}`;
  return newNumberString;
};

export const removeDigit = (numberString: string): string => {
  const newNumberString = numberString.slice(0, -1);
  return newNumberString;
};

export const displayValue = (numberString: string, integer?: boolean) => {
  const numValue = parseInt(numberString);
  if (!Number.isFinite(numValue)) {
    return integer ? "0" : "0.00";
  }

  return integer ? numValue : (numValue / 100).toFixed(2);
}