import React, { useContext, useState } from 'react';
import { useRecoilState } from 'recoil';
import { createEditRecordAtom } from '../../../../atoms/CreateEditRecordAtom';
import { MarcoNutrition } from '../../../../types/Nutrition';
import DigitInput from '../../../Input/DigitInput';
import { InputMode } from '../../../Input/DigitInput/utils/digitLogic';
import { progressiveFormContext } from '../../../ProgressiveForm/context';
import { useConsumptionMutation } from '../../utils/consumptionMutation';
import NutritionTooltip from './NutritionTooltip';

const allFields = [...Object.values(MarcoNutrition), "calories"] as const;
type SelectedNutritionField = typeof allFields[number];

export default function NutritionForm() {
  const { nextStep } = useContext(progressiveFormContext);
  const [consumptionRecord] = useRecoilState(createEditRecordAtom);
  const [selectedField, setSelectedField] = useState<SelectedNutritionField>(MarcoNutrition.carbohydrates);
  const { updateNutrition } = useConsumptionMutation();
  const { record } = consumptionRecord;

  const toNextField = () => {
    switch (selectedField) {
      case "calories":
        return nextStep();
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
            value={record.nutritionPerHundred[field]}
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
        onChange={updateNutrition(selectedField)}
        defaultValue={
          selectedField === 'calories' ?
            record.nutritionPerHundred.calories :
            record.nutritionPerHundred[selectedField]
        }
      />
    </div>
  )
}