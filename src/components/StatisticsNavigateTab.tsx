import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Tab, { TabConfig } from "./Tab";

const LabelPathMapping: Record<string, string>[] = [
  {
    Nutrition: "/stats",
    Workouts: "/stats/workouts",
    Measurements: "/stats/measurements",
  },
  {
    Food: "/stats/food",
    Exercise: "/stats/exercise",
  },
];
const flattenedLabelPathMapping = Object.assign({}, ...LabelPathMapping);
export default function StatisticsNavigateTab() {
  const navigate = useNavigate();
  const location = useLocation();
  const isTagSelected = (config: TabConfig) =>
    flattenedLabelPathMapping[config.label ?? ""] === location.pathname;
  return (
    <div className="flex flex-col items-stretch gap-2 sticky top-0 z-50 bg-gray-200 pb-2">
      {LabelPathMapping.map((tabRow) => (
        <Tab
          key={tabRow[0]}
          options={Object.entries(tabRow).map(([label, path]) => ({
            label,
            onClick: () => navigate(path),
          }))}
          selected={isTagSelected}
        />
      ))}
    </div>
  );
}
