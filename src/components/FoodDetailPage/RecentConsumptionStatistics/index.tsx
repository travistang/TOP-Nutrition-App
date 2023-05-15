import React from "react";
import Section from "../../Section";
import ScalarWidget from "../../Widgets/ScalarWidget";
import { ConsumptionRecord } from "../../../database/ConsumptionDatabase";
import NutritionUtils from "../../../utils/Nutrition";
import NumberUtils from "../../../utils/Number";

type Props = {
  records: ConsumptionRecord[];
};
export default function RecentConsumptionStatistics({ records }: Props) {
  const caloriesByConsumptions = records.map(
    (record) => NutritionUtils.nutritionFromConsumption(record).calories
  );
  return (
    <Section label="Statistics">
      <ScalarWidget
        label="Average calories"
        value={NumberUtils.average(...caloriesByConsumptions)}
      />
    </Section>
  );
}
