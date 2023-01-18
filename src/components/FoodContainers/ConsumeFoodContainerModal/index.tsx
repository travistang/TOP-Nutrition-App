import { useLiveQuery } from 'dexie-react-hooks';
import React, { useState } from 'react';
import ConsumptionDatabase from '../../../database/ConsumptionDatabase';
import { FoodContainer } from '../../../types/FoodContainer';
import Modal from '../../Modal';
import TimeForm from '../../ProgressiveForm/TimeForm';
import NutritionUtils from '../../../utils/Nutrition';
import FoodContainerUtils from '../../../utils/FoodContainer';
import ScalarWidget from '../../Widgets/ScalarWidget';
import { format } from 'date-fns';
import Button from '../../Input/Button';
import FoodContainerDatabase from '../../../database/FoodContainerDatabase';
import toast from 'react-hot-toast';

type Props = {
  opened: boolean;
  onClose: () => void;
  foodContainer: FoodContainer;
}
export default function ConsumeFoodContainerModal({ onClose, opened, foodContainer }: Props) {
  const [consumptionTime, setConsumptionTime] = useState(new Date());
  const caloriesFromFoodContainer = FoodContainerUtils.nutritionInContainer(foodContainer).calories;
  const currentCaloriesIntakeOnDate = useLiveQuery(
    async () => {
      const consumptionsOfDay = await ConsumptionDatabase.consumptionsOfDay(consumptionTime.getTime());
      return NutritionUtils.total(...consumptionsOfDay.map(NutritionUtils.nutritionFromConsumption) ?? []).calories;
    },
    [consumptionTime]
  );

  const estimatedCalorieIntakeOnDate = (currentCaloriesIntakeOnDate ?? 0) + caloriesFromFoodContainer;

  const onConfirmConsumptionTime = async () => {
    try {
      await FoodContainerDatabase.consumeFoodContainer(
        foodContainer.identifier,
        consumptionTime.getTime(),
      );
      toast.success('Records added');
      onClose();
    } catch {
      toast.error('Failed to register record');
    }
  }

  return (
    <Modal label="Consume food container content" opened={opened} onClose={onClose}>
      <div className="grid grid-cols-2 gap-2">
        <ScalarWidget
          label={`Estimated calories intake on ${format(consumptionTime, 'dd.MM')}`}
          unit="kcal"
          value={estimatedCalorieIntakeOnDate}
        />
        <TimeForm
          className='col-span-full'
          useCurrentTimeByDefault
          setDate={setConsumptionTime}
          date={consumptionTime}
          title=""
        />
        <Button onClick={onConfirmConsumptionTime} icon="check-circle" text="Confirm" className="h-10 col-start-2" />
      </div>
    </Modal>
  )
}