import React from "react";
import { useRecoilState } from "recoil";
import { createEditExerciseRecordAtom } from "../../atoms/CreateEditExerciseRecordAtom";
import { Repetition } from "../../types/Exercise";
import NumberInput from "../Input/NumberInput";
import NumberSummary from "../NumberSummary";

export default function RepetitionForm() {
  const [{ repetition }, setCreateEditRecordAtom] = useRecoilState(
    createEditExerciseRecordAtom
  );

  const volume = repetition.count * repetition.weight;
  const updateRepetitionData = (field: keyof Repetition) => (value: number) =>
    setCreateEditRecordAtom((record) => ({
      ...record,
      repetition: { ...repetition, [field]: value },
    }));
  return (
    <div className="col-span-full grid grid-cols-2 gap-2 p-4 pb-2 rounded-lg bg-blue-800">
      <NumberInput
        value={repetition.weight}
        label="Weight (kg)"
        onChange={updateRepetitionData("weight")}
      />
      <NumberInput
        value={repetition.count}
        label="Repetitions"
        onChange={updateRepetitionData("count")}
      />
      <NumberSummary
        className="col-start-2"
        label="Volume (kg x rep)"
        value={volume.toFixed(1)}
      />
    </div>
  );
}
