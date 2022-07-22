import React from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import classNames from "classnames";
import { Consumption, DEFAULT_CONSUMPTION } from "../../types/Consumption";
import TextInput from "../Input/TextInput";
import Modal from "../Modal";
import NutritionFacts from "../NutritionFacts";
import NutritionUtils from "../../utils/Nutrition";
import DateUtils from "../../utils/Date";
import Button from "../Input/Button";
import ConsumptionDatabase, {
  ConsumptionRecord,
} from "../../database/ConsumptionDatabase";
import { createEditRecordAtom } from "../../atoms/CreateEditRecordAtom";
import AutoCompleteInput from "../Input/AutoCompleteInput";
import ConsumptionAutocompleteResult from "../Input/ConsumptionAutocompleteResult";
import NumberInput from "../Input/NumberInput";
import NumberSummary from "../NumberSummary";

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

  const updateDate = (dateString: string) => {
    setConsumption({
      ...consumption,
      date: DateUtils.stringToDate(dateString),
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
        <TextInput
          label="Date"
          type="datetime-local"
          value={DateUtils.toInputFormat(consumption.date)}
          onChange={updateDate}
          className="col-span-full"
        />
        <NutritionFacts
          nutrition={consumption.nutritionPerHundred}
          onChange={(updatedNutrition) =>
            setConsumption({
              ...consumption,
              nutritionPerHundred: updatedNutrition,
            })
          }
          className="col-span-full sm:col-span-3 md:col-span-2"
        />
        <NumberSummary
          label="Total Calories:"
          value={`${totalCaloriesByAmount.toFixed(2)} kcal`}
          className="col-start-4 col-end-7"
        />
        {isEditing ? (
          <Button
            text="Delete"
            textClassName="text-red-500"
            onClick={deleteRecord}
          />
        ) : (
          <Button text="Reset" onClick={reset} />
        )}
        <Button
          text={isEditing ? "Update" : "Record"}
          className={classNames(
            "rounded-lg h-12 col-span-2 col-start-5",
            isFormValid ? "bg-blue-900" : "bg-blue-400 cursor-not-allowed"
          )}
          onClick={applyChanges}
          textClassName={isFormValid ? "text-gray-200" : ""}
        />
      </form>
    </Modal>
  );
}
