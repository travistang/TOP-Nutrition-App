import React from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import classNames from "classnames";
import { Consumption, DEFAULT_CONSUMPTION } from "../../types/Consumption";
import Modal from "../Modal";
import NutritionFacts from "../NutritionFacts";
import NutritionUtils from "../../utils/Nutrition";
import Button, { ButtonStyle } from "../Input/Button";
import ConsumptionDatabase, {
  ConsumptionRecord,
} from "../../database/ConsumptionDatabase";
import { createEditRecordAtom } from "../../atoms/CreateEditRecordAtom";
import AutoCompleteInput from "../Input/AutoCompleteInput";
import ConsumptionAutocompleteResult from "../Input/ConsumptionAutocompleteResult";
import NumberInput from "../Input/NumberInput";
import NumberSummary from "../NumberSummary";
import DateInput, { DateInputType } from "../Input/DateInput";

export default function CreateRecordModal() {
  const [createEditRecord, setCreateEditRecord] =
    useRecoilState(createEditRecordAtom);
  const { modalOpened, record: consumption } = createEditRecord;
  const isEditing = !!consumption.id;
  const isFormValid = !!consumption.name && consumption.amount > 0;

  const setConsumption = (consumption: Consumption) =>
    setCreateEditRecord({ ...createEditRecord, record: consumption });

  const reset = () =>
    setConsumption({ ...DEFAULT_CONSUMPTION, date: Date.now() });

  const onClose = () => {
    setCreateEditRecord({
      modalOpened: false,
      record: { ...DEFAULT_CONSUMPTION, date: Date.now() },
    });
  };

  const deleteRecord = async () => {
    await ConsumptionDatabase.remove(consumption.id!);
    toast.success("Record deleted");
    onClose();
  };

  const useAutoCompleteResult = (record: ConsumptionRecord) => {
    setConsumption({
      ...consumption,
      nutritionPerHundred: record.nutritionPerHundred,
      name: record.name,
    });
  };

  const updateField =
    (field: keyof Omit<Consumption, "nutritionPerHundred">) =>
    (value: string | number) => {
      setConsumption({ ...consumption, [field]: value });
    };

  const updateAmount = (value: number) => {
    setConsumption({
      ...consumption,
      amount: value,
    });
  };

  const updateDate = (date: Date) => {
    setConsumption({
      ...consumption,
      date: date.getTime(),
    });
  };

  const applyChanges = async () => {
    if (!isFormValid) return;
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
    }
  };

  const totalCaloriesByAmount = NutritionUtils.caloriesByAmount(
    consumption.nutritionPerHundred,
    consumption.amount
  );

  return (
    <Modal
      opened={modalOpened}
      onClose={onClose}
      label={isEditing ? "Edit record" : "Create nutrition record"}
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid grid-cols-6 gap-2 p-2"
      >
        <AutoCompleteInput
          label="Name"
          value={consumption.name}
          onChange={updateField("name")}
          className="col-span-4"
          onSearch={ConsumptionDatabase.search.bind(ConsumptionDatabase)}
          onSelectSearchResult={useAutoCompleteResult}
          renderResult={(record) => (
            <ConsumptionAutocompleteResult record={record} key={record.id} />
          )}
        />
        <NumberInput
          label="Amount (g)"
          value={consumption.amount}
          onChange={updateAmount}
          className="col-span-2"
        />
        <DateInput
          label="Date"
          dateType={DateInputType.DateTime}
          value={consumption.date}
          onChange={updateDate}
          className="col-span-4"
        />
        <Button
          className="col-span-2 self-end h-12 gap-1"
          onClick={() => updateDate(new Date())}
          textClassName="text-xs gap-1 child:fill-gray-200"
          text="Now"
          icon="clock"
        />
        <NutritionFacts
          nutrition={consumption.nutritionPerHundred}
          servingNutrition={{
            amount: consumption.amount,
            ...NutritionUtils.nutritionFromConsumption(consumption),
          }}
          onChange={(updatedNutrition) =>
            setConsumption({
              ...consumption,
              nutritionPerHundred: updatedNutrition,
            })
          }
          className="col-span-full sm:col-span-3 md:col-span-2"
        />
        <div className="grid grid-cols-6 col-span-full gap-2 bg-blue-500 sticky bottom-0">
          <NumberSummary
            label="Total Calories:"
            value={`${totalCaloriesByAmount.toFixed(2)} kcal`}
            className="col-start-4 col-end-7 sticky bottom-12"
          />
          {isEditing ? (
            <Button
              text="Delete"
              buttonStyle={ButtonStyle.Clear}
              textClassName="text-red-500"
              onClick={deleteRecord}
            />
          ) : (
            <Button
              text="Reset"
              buttonStyle={ButtonStyle.Clear}
              onClick={reset}
            />
          )}
          <Button
            text={isEditing ? "Update" : "Record"}
            disabled={!isFormValid}
            className={classNames("rounded-lg h-12 col-span-2 col-start-5")}
            onClick={applyChanges}
          />
        </div>
      </form>
    </Modal>
  );
}
