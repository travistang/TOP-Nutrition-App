const nanToZero = (num: number) => {
  if (Number.isNaN(num)) {
    return 0;
  }
  return num;
};

const sum = (...numbers: number[]) => numbers.reduce((sum, n) => sum + n, 0);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  nanToZero,
  sum,
};