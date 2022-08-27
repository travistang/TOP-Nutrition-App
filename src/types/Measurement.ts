export type Measurement = {
  value: number;
  date: number;
  name: string;
  unit: string;
};

export const DEFAULT_MEASUREMENT: Measurement = {
  value: 0,
  date: Date.now(),
  name: "",
  unit: "",
};
