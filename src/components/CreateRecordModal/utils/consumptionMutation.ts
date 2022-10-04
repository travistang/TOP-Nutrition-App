import { useSetRecoilState } from "recoil";
import { createEditRecordAtom } from "../../../atoms/CreateEditRecordAtom";
import { Nutrition } from "../../../types/Nutrition";
import NutritionUtils from '../../../utils/Nutrition';
import ObjectUtils from '../../../utils/Object';

export function useConsumptionMutation() {
  const setCreateEditRecordAtom = useSetRecoilState(createEditRecordAtom);

  const updateCalories = (value: number) => {
    setCreateEditRecordAtom((atom) =>
      ObjectUtils.deepUpdate(atom, 'record.nutritionPerHundred.calories', value)
    );
  }
  const updateNutrition = (marco: keyof Nutrition) => (value: number) => {
    if (marco === 'calories') {
      return updateCalories(value);
    }
    setCreateEditRecordAtom(atom => {
      const updatedNutrition = { ...atom.record.nutritionPerHundred, [marco]: value };
      const totalCalories = NutritionUtils.totalCalories(updatedNutrition);
      const finalNutrition: Nutrition = {
        ...updatedNutrition,
        calories: totalCalories
      };

      return ObjectUtils.deepUpdate(
        atom,
        "record.nutritionPerHundred",
        finalNutrition
      );
    })
  }

  return {
    updateNutrition,
  };
}