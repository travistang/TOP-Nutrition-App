import React from "react";
import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import { createEditRecordAtom } from "../../atoms/CreateEditRecordAtom";
import ConsumptionDatabase, {
  ConsumptionRecord,
} from "../../database/ConsumptionDatabase";
import { Consumption, DEFAULT_CONSUMPTION } from "../../types/Consumption";
import Button, { ButtonStyle } from "../Input/Button";

type Props = {
  isEditing: boolean;
  onClose: () => void;
  consumption: Consumption & Partial<ConsumptionRecord>;
};
export default function ButtonRow({ onClose, isEditing, consumption }: Props) {
  const setCreateEditRecord = useSetRecoilState(createEditRecordAtom);
  const reset = () => {
    setCreateEditRecord((atom) => ({
      ...atom,
      record: { ...DEFAULT_CONSUMPTION, date: Date.now() },
    }));
  };
  const deleteRecord = async () => {
    await ConsumptionDatabase.remove(consumption.id!);
    toast.success("Record deleted");
    onClose();
  };

  if (isEditing) {
    return (
      <Button
        text="Delete"
        buttonStyle={ButtonStyle.Clear}
        textClassName="text-red-500"
        onClick={deleteRecord}
      />
    );
  }

  return (
    <Button text="Reset" buttonStyle={ButtonStyle.Clear} onClick={reset} />
  );
}
