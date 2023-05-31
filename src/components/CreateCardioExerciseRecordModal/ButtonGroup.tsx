import React from "react";
import Button, { ButtonStyle } from "../Input/Button";

type Props = {
  selectingExerciseType: boolean;
  onSelectExerciseType: (willSelectExercise: boolean) => void;
  onSave: () => void;
  canSave: boolean;
};
export default function ButtonGroup({
  selectingExerciseType,
  onSelectExerciseType,
  onSave,
  canSave,
}: Props) {
  const onProceed = () => {
    onSelectExerciseType(false);
  };

  const onBack = () => {
    onSelectExerciseType(true);
  };

  return (
    <div className="flex items-center justify-between flex-row-reverse">
      {selectingExerciseType ? (
        <Button
          buttonStyle={ButtonStyle.Clear}
          text="Next"
          className="h-10 px-2 self-end"
          icon="arrow-right"
          onClick={onProceed}
        />
      ) : (
        <>
          <Button
            buttonStyle={ButtonStyle.Block}
            text="Save"
            className="h-10 px-2 self-end"
            icon="check"
            disabled={!canSave}
            onClick={onSave}
          />
          <Button
            buttonStyle={ButtonStyle.Clear}
            text="Back"
            className="h-10 px-2"
            icon="arrow-left"
            onClick={onBack}
          />
        </>
      )}
    </div>
  );
}
