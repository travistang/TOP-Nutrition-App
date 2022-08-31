import React from "react";
import { useRecoilState } from "recoil";
import { createEditExerciseRecordAtom } from "../../atoms/CreateEditExerciseRecordAtom";
import { Repetition } from "../../types/Exercise";
import NumberInput from "../Input/NumberInput";
import NumberSummary from "../NumberSummary";

export default function RepetitionForm() {
  const [{ repetitions }, setCreateEditRecordAtom] = useRecoilState(
    createEditExerciseRecordAtom
  );

  const volume = repetitions.count * repetitions.weight;
  const updateRepetitionData = (field: keyof Repetition) => (value: number) =>
    setCreateEditRecordAtom((record) => ({
      ...record,
      repetitions: { ...repetitions, [field]: value },
    }));
  return (
    <div className="col-span-full grid grid-cols-2 gap-2">
      <NumberInput
        value={repetitions.weight}
        label="Weight (kg)"
        onChange={updateRepetitionData("weight")}
      />
      <NumberInput
        value={repetitions.count}
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
