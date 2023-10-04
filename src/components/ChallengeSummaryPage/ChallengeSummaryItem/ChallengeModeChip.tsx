import classNames from "classnames";
import { ChallengeMode } from "../../../types/Achievement";
import { MarcoNutritionColor } from "../../../types/Nutrition";
import Chip from "../../Chip";

type Props = {
  className?: string;
  mode: ChallengeMode;
};
export default function ChallengeModeChip({ mode, className }: Props) {
  return (
    <Chip
      iconClassName="child:fill-gray-300 text-xs"
      className={classNames(
        "w-6 flex items-center justify-center py-1",
        className
      )}
      color={
        mode === ChallengeMode.GreaterThanTarget
          ? MarcoNutritionColor.carbohydrates
          : MarcoNutritionColor.fat
      }
      icon={
        mode === ChallengeMode.GreaterThanTarget
          ? "greater-than-equal"
          : "less-than"
      }
    />
  );
}
