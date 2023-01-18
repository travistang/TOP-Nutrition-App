import React, { useContext } from 'react';
import { useRecoilState } from 'recoil';
import { createEditRecordAtom } from '../../../../atoms/CreateEditRecordAtom';
import { progressiveFormContext } from '../../../ProgressiveForm/context';
import { useConsumptionMutation } from '../../utils/consumptionMutation';
import PureNutritionForm from '../../../ProgressiveForm/NutritionForm';


export default function NutritionForm() {
  const { nextStep } = useContext(progressiveFormContext);
  const [consumptionRecord] = useRecoilState(createEditRecordAtom);
  const { updateNutrition } = useConsumptionMutation();
  const { record } = consumptionRecord;

  return (
    <PureNutritionForm
      nutrition={record.nutritionPerHundred}
      onProceed={nextStep}
      onUpdate={updateNutrition}
    />
  )
}