import { useLocation, useNavigate } from "react-router-dom";
import Tab, { TabConfig } from "./Tab";

const LabelPathMapping: Record<string, string>[] = [
  {
    Nutrition: "/stats/nutrition",
    Workouts: "/stats/workouts",
    Measurements: "/stats/measurements",
  },
  {
    Food: "/stats/food",
    Exercise: "/stats/exercise",
    Challenges: "/challenges",
  },
];
const flattenedLabelPathMapping = Object.assign({}, ...LabelPathMapping);
export default function StatisticsNavigateTab() {
  const navigate = useNavigate();
  const location = useLocation();
  const isTagSelected = (config: TabConfig) =>
    location.pathname.startsWith(flattenedLabelPathMapping[config.label ?? ""]);
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
