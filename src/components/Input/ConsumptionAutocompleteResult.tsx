import { FoodDetails } from "../../database/ConsumptionDatabase";
import { MarcoNutrition, MarcoNutritionColor } from "../../types/Nutrition";
import Chip from "../Chip";
import ImageViewer from "../ImageViewer";

type Props = {
  record: FoodDetails;
};
export default function ConsumptionAutocompleteResult({ record }: Props) {
  return (
    <div className="flex gap-2 self-center">
      <ImageViewer className="h-10" image={record.image ?? null} />
      <div className="flex flex-col self-center flex-1">
        <div className="flex w-full items-center justify-between">
          <div className="font-bold text-gray200 text-sm">{record.name}</div>
          <div className="font-bold text-xs self-end text-gray200">
            {record.nutritionPerHundred.calories.toFixed(1)}kcal
          </div>
        </div>
        <div className="flex-1 flex flex-row gap-1 flex-wrap">
          {Object.values(MarcoNutrition).map((marco) => (
            <Chip
              key={marco}
              className="px-2 text-blue-100 items-center text-xs capitalize"
              color={MarcoNutritionColor[marco]}
              text={`${record.nutritionPerHundred[marco].toFixed(0)}g`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
