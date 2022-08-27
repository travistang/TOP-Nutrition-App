export enum Duration {
  OneMonth = "1 month",
  ThreeMonths = "3 months",
  HalfYear = "6 months",
  Year = "1 year",
}

export const DurationToMonthMap: Record<Duration, number> = {
  [Duration.OneMonth]: 1,
  [Duration.ThreeMonths]: 3,
  [Duration.HalfYear]: 6,
  [Duration.Year]: 12,
};
