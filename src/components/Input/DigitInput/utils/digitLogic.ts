export enum InputMode {
  Integer = "integer",
  Decimal = "decimal",
}
export const numberToString = (num: number, inputMode: InputMode) => {
  return inputMode === InputMode.Integer
    ? Math.floor(num).toString()
    : Math.floor(num * 100).toString();
};

export const stringToNumber = (numberString: string, inputMode: InputMode) => {
  const num = parseInt(numberString);
  if (!Number.isFinite(num)) return 0;
  if (inputMode === InputMode.Integer) return num;

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

export const displayValue = (numberString: string, inputMode: InputMode) => {
  const numValue = parseInt(numberString);
  const isIntegerMode = inputMode === InputMode.Integer;
  if (!Number.isFinite(numValue)) {
    return isIntegerMode ? "0" : "0.00";
  }

  return isIntegerMode ? numValue : (numValue / 100).toFixed(2);
};
