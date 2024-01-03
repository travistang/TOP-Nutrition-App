import { useState } from "react";
import useUpdater from "../../../../hooks/useUpdater";
import {
  BodyPart,
  Equipment,
  EquipmentIcon,
  Exercise,
  ExerciseMode,
  ExerciseModeIcon,
} from "../../../../types/Exercise";
import { ExerciseConstraint } from "../../../../types/ExerciseChallenge";
import EnumPicker from "../../../Input/EnumPicker";
import ExerciseSearchInput from "../../../Input/Exercise/ExerciseSearchInput";

type Props = {
  constraint: ExerciseConstraint;
  onChange: (c: ExerciseConstraint) => void;
};
const ALL_EXERCISE_MODES = Object.values(ExerciseMode);
const ALL_EQUIPMENTS = Object.values(Equipment);
const ALL_BODY_PARTS = Object.values(BodyPart);

export default function ExerciseChallengeConstraintForm({
  constraint,
  onChange,
}: Props) {
  const updater = useUpdater(constraint, onChange);
  const [selectedExercise, setSelectedExercise] = useState<
    Exercise | undefined
  >(undefined);

  const onExerciseSelected = (exercise?: Exercise) => {
    setSelectedExercise(exercise);

    if (!exercise) return;
    onChange({
      ...constraint,
      name: exercise.name,
      modes: ALL_EXERCISE_MODES,
      workingBodyParts: exercise.workingBodyParts,
    });
  };
  return (
    <div className="flex-1 flex flex-col items-stretch gap-2">
      <ExerciseSearchInput
        selectedExercise={selectedExercise}
        onSelectExercise={onExerciseSelected}
      />
      <EnumPicker
        label="Exercise mode(s)"
        className="grid grid-cols-2 gap-2"
        availableValues={ALL_EXERCISE_MODES}
        values={constraint.modes}
        iconMapping={ExerciseModeIcon}
        onChange={updater("modes")}
      />
      <EnumPicker
        label="Exercise equipment(s)"
        className="grid grid-cols-3 gap-2"
        availableValues={ALL_EQUIPMENTS}
        values={constraint.equipments}
        iconMapping={EquipmentIcon}
        onChange={updater("equipments")}
      />
      <EnumPicker
        label="Body part(s)"
        className="grid grid-cols-4 gap-2"
        availableValues={ALL_BODY_PARTS}
        values={constraint.workingBodyParts}
        onChange={updater("workingBodyParts")}
      />
    </div>
  );
}
