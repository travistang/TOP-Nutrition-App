import ScalarWidget from "../Widgets/ScalarWidget";

type Props = {
  maintenanceCalories: number | null;
  caloriesConsumed: number;
};
export default function TodayDeficitWidget({
  maintenanceCalories,
  caloriesConsumed,
}: Props) {
  return (
    <ScalarWidget
      value={
        maintenanceCalories
          ? Math.round(maintenanceCalories - caloriesConsumed)
          : null
      }
      label="Calories deficit today"
      className="col-span-3 row-span-1"
      extraInfo={
        maintenanceCalories
          ? `Maintenance: ${Math.round(maintenanceCalories)} kcal`
          : "no weight measurement"
      }
      unit="kcal"
    />
  );
}
