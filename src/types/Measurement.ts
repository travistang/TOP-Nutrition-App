export type Measurement = {
  value: number;
  date: number;
  name: string;
};

export const DEFAULT_MEASUREMENT: Measurement = {
  value: 0,
  date: Date.now(),
  name: "",
};
