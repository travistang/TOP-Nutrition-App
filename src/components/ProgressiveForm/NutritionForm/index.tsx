import React, { useState } from 'react';
import { MarcoNutrition, Nutrition } from '../../../types/Nutrition';
import DigitInput from '../../Input/DigitInput';
import { InputMode } from '../../Input/DigitInput/utils/digitLogic';
import NutritionTooltip from './NutritionTooltip';

const allFields = [...Object.values(MarcoNutrition), "calories"] as const;
type SelectedNutritionField = typeof allFields[number];

type Props = {
  nutrition: Nutrition;
  onProceed: () => void;
  onUpdate: (nutrition: SelectedNutritionField) => (value: number) => void;
}
export default function NutritionForm({ nutrition, onProceed, onUpdate }: Props) {
  const [selectedField, setSelectedField] = useState<SelectedNutritionField>(MarcoNutrition.carbohydrates);
  const toNextField = () => {
    switch (selectedField) {
      case "calories":
        return onProceed();
      case MarcoNutrition.carbohydrates:
        return setSelectedField(MarcoNutrition.fat);
      case MarcoNutrition.fat:
        return setSelectedField(MarcoNutrition.protein);
      case MarcoNutrition.protein:
        return setSelectedField("calories");
    }
  }

  return (
    <div className="flex flex-col items-stretch">
      <div className="flex flex-nowrap justify-between py-2">
        {allFields.map(field => (
          <NutritionTooltip
            field={field}
            onSelect={() => setSelectedField(field)}
            value={nutrition[field]}
            selected={selectedField === field}
          />
        ))}
      </div>
      <DigitInput
        key={selectedField}
        inputMode={InputMode.Decimal}
        unit={selectedField === 'calories' ? 'kcal' : 'g'}
        keypadConfig={{
          right: {
            icon: "arrow-right",
            onClick: toNextField,
            className: "bg-transparent",
            textClassName: "child:fill-blue-500"
          }
        }}
        onChange={onUpdate(selectedField)}
        defaultValue={nutrition[selectedField]}
      />
    </div>
  )
}