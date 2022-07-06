import React from 'react';
import toast from 'react-hot-toast';
import { Consumption, DEFAULT_CONSUMPTION } from '../../types/Consumption';
import TextInput from '../Input/TextInput';
import Modal from '../Modal';
import NutritionFacts from '../NutritionFacts';
import NutritionUtils from '../../utils/Nutrition';
import DateUtils from '../../utils/Date';
import Button from '../Input/Button';
import ConsumptionDatabase, { ConsumptionRecord } from '../../database/ConsumptionDatabase';
import { useRecoilState } from 'recoil';
import { createEditRecordAtom } from '../../atoms/CreateEditRecordAtom';

export default function CreateRecordModal() {
  const [createEditRecord, setCreateEditRecord] = useRecoilState(createEditRecordAtom);
  const { modalOpened, record: consumption } = createEditRecord;
  const isEditing = !!consumption.id;
  const setConsumption = (consumption: Consumption) => setCreateEditRecord({ ...createEditRecord, record: consumption });
  const reset = () => setConsumption(DEFAULT_CONSUMPTION);

  const onClose = () => {
    setCreateEditRecord({ modalOpened: false, record: DEFAULT_CONSUMPTION });
  }

  const deleteRecord = async () => {
    await ConsumptionDatabase.remove(consumption.id!);
    toast.success("Record deleted");
    onClose();
  }

  const updateField = (field: keyof Omit<Consumption, "nutritionPerHundred">) => (value: string | number) => {
    setConsumption({ ...consumption, [field]: value });
  };

  const updateAmount = (value: string) => {
    setConsumption({ ...consumption, amount: parseFloat(value) });
  }

  const updateDate = (dateString: string) => {
    setConsumption({ ...consumption, date: DateUtils.stringToDate(dateString) });
  };

  const applyChanges = async () => {
    try {
      if (!isEditing) {
        await ConsumptionDatabase.add(consumption);
        toast.success("Record created");
        onClose();
        return;
      }
      await ConsumptionDatabase.edit(
        consumption.id as string,
        consumption as ConsumptionRecord
      );
      toast.success("Record updated");
      onClose();
      return;
    } catch {
        toast.error("Something went wrong. Try again later!");
    };
  }

  const totalCaloriesByAmount = NutritionUtils.caloriesByAmount(consumption.nutritionPerHundred, consumption.amount);

  return (
    <Modal opened={modalOpened} onClose={onClose} label={isEditing ? "Edit record" : "Create nutrition record"}>
      <div className="grid grid-cols-6 gap-2 p-2">
        <TextInput
          label="Name"
          value={consumption.name}
          onChange={updateField('name')}
          className="col-span-3"
        />
        <TextInput
          label="Date"
          type="datetime-local"
          value={DateUtils.toInputFormat(consumption.date)}
          onChange={updateDate}
          className="col-span-3"
        />
        <NutritionFacts
          nutrition={consumption.nutritionPerHundred}
          onChange={updatedNutrition => setConsumption({ ...consumption, nutritionPerHundred: updatedNutrition })}
          className="col-span-full sm:col-span-3 md:col-span-2"
        />
        <TextInput
          type="number"
          label="Amount (g)"
          value={consumption.amount.toString()}
          onChange={updateAmount}
          className="col-span-2 col-start-1"
        />
        <div className="rounded-lg col-start-4 col-end-7 text-yellow-400 p-2 flex flex-col items-end justify-center text-sm">
          Total Calories:
          <span className="font-bold text-xl text-yellow-400 ml-2">
            {totalCaloriesByAmount.toFixed(2)} kcal
          </span>
        </div>
        {isEditing ?
          <Button text="Delete" textClassName='text-red-500' onClick={deleteRecord} /> :
          <Button text="Reset" onClick={reset} />
        }
        <Button text="Create" className="bg-violet-400 rounded-lg h-12 col-span-2 col-start-5" onClick={applyChanges} />
      </div>
    </Modal>
  );
}