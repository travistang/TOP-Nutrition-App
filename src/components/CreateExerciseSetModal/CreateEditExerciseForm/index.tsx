import { useEffect, useState } from "react";
import { DEFAULT_EXERCISE_RECORD } from "../../../atoms/CreateEditExerciseRecordAtom";
import { ExerciseSetRecord } from "../../../database/ExerciseDatabase";
import {
  Equipment,
  EquipmentIcon,
  ExerciseMode,
  ExerciseModeIcon,
} from "../../../types/Exercise";
import StringUtils from "../../../utils/String";
import AttributeValueInputGroup from "../../Input/AttributeValueInputGroup";
import {
  AcceptableAttributes,
  AttributeValueInputGroupConfig,
  InputWidget,
} from "../../Input/AttributeValueInputGroup/types";

type ExerciseSetFormValue = {
  repetitionCount: number;
  weight: number;
  equipment: Equipment;
  exerciseMode: ExerciseMode;
  date: number;
};

const FORM_CONFIG: AttributeValueInputGroupConfig<ExerciseSetFormValue> = {
  exerciseMode: {
    widget: InputWidget.ToggleSelect,
    label: "Exercise Mode",
    className: "col-span-2",
    options: Object.values(ExerciseMode).map((mode) => ({
      label: StringUtils.normalizeSnakeCase(mode),
      value: mode,
      icon: ExerciseModeIcon[mode],
    })),
  },
  equipment: {
    widget: InputWidget.ToggleSelect,
    label: "Equipment",
    className: "col-span-2",
    options: Object.values(Equipment).map((equipment) => ({
      label: StringUtils.normalizeSnakeCase(equipment),
      value: equipment,
      icon: EquipmentIcon[equipment],
    })),
  },
  date: {
    widget: InputWidget.Datetime,
    label: "Date",
    className: "col-span-2",
    nullable: true,
  },
  repetitionCount: {
    widget: InputWidget.Ticker,
    label: "repetitions",
    min: 1,
    integer: true,
  },
  weight: {
    widget: InputWidget.DigitPad,
    label: "Weight",
    unit: "kg",
  },
};
const setRecordToFormValue = (
  record?: ExerciseSetRecord
): ExerciseSetFormValue => {
  const { exercise, repetitions, date } = record ?? DEFAULT_EXERCISE_RECORD;
  return {
    weight: repetitions.weight,
    repetitionCount: repetitions.count,
    exerciseMode: exercise.exerciseMode,
    equipment: exercise.equipment,
    date: new Date(date).getTime(),
  };
};

type Props = {
  initialSetData?: ExerciseSetRecord;
  className?: string;
};
export default function CreateEditExerciseForm({
  className,
  initialSetData,
}: Props) {
  const [selectedField, setSelectedField] =
    useState<keyof ExerciseSetFormValue>("exerciseMode");
  const [formValue, setFormValue] = useState<ExerciseSetFormValue>(
    setRecordToFormValue(initialSetData)
  );

  useEffect(() => {
    setFormValue(setRecordToFormValue(initialSetData));
  }, [initialSetData]);

  const onFieldChange = (value: AcceptableAttributes) => {
    setFormValue({ ...formValue, [selectedField]: value });
  };

  return (
    <AttributeValueInputGroup
      className={className}
      value={formValue}
      selectedField={selectedField}
      onSelectField={setSelectedField}
      onChange={onFieldChange}
      config={FORM_CONFIG}
    />
  );
}
