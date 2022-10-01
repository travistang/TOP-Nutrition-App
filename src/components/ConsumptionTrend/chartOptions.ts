import { Measurement } from "../../types/Measurement";

const getChartOptions = (
  measurementAxisRange: {
    min: number;
    max: number;
  } | null,
  sampleMeasurement?: Measurement
) => ({
  plugins: { tooltip: { enabled: false }, legend: { display: false } },
  animation: { duration: 0 },
  scales: {
    x: {
      grid: {
        color: "rgba(0,0,0,0)",
      },
      stacked: true,
    },
    calories: {
      type: "linear" as const,
      position: "left" as const,
      title: {
        display: true,
        text: "calories (kcal)",
      },
      grid: {
        color: "rgba(0,0,0,0)",
      },
      stacked: true,
    },
    measurements: {
      type: "linear" as const,
      position: "right" as const,
      ...measurementAxisRange,
      grid: {
        color: "rgba(0,0,0,0)",
      },
      ...(sampleMeasurement && {
        title: {
          display: true,
          text: `${sampleMeasurement.name} (${sampleMeasurement.unit})`,
        },
      }),
    },
  },
});

export default getChartOptions;