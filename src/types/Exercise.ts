import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { CreateEditType } from "./utils";

export enum BodyPart {
  Legs = "legs",
  Biceps = "biceps",
  Triceps = "triceps",
  Shoulders = "shoulders",
  Chest = "chest",
  Back = "back",
  Abs = "abs",
  Traps = "traps",
}

export enum ExerciseSetType {
  Dropset = "drop_set",
  Warmup = "warmup",
  Superset = "superset",
  SetEnd = "set_end",
}

export enum ExerciseDayType {
  Mixed = 'mixed',
  Push = 'push',
  Pull = 'pull',
  Leg = 'leg',
  Arm = 'arm',
}

export enum Equipment {
  Barbell = "barbell",
  Dumbbell = "dumbbell",
  Machine = "machine",
  Cable = "cable",
  BodyWeight = "body_weight",
}

export enum ExerciseMode {
  BothSides = "both_sides",
  AlternateSides = "alternate_sides",
  Left = 'left',
  Right = 'right'
}

export type Exercise = {
  name: string;
  workingBodyParts: BodyPart[];
  equipment: Equipment;
  exerciseMode: ExerciseMode;
};

export type Repetition = {
  count: number;
  weight: number;
};

export type ExerciseSet = {
  id: string;
  exercise: Exercise;
  date: number;
  repetitions: Repetition;
};

export const DEFAULT_EXERCISE: Exercise = {
  name: "",
  workingBodyParts: [],
  equipment: Equipment.Barbell,
  exerciseMode: ExerciseMode.BothSides,
};

export const DEFAULT_REPETITION: Repetition = {
  count: 0,
  weight: 0,
};

export const DEFAULT_EXERCISE_SET: CreateEditType<ExerciseSet> = {
  exercise: DEFAULT_EXERCISE,
  date: Date.now(),
  repetitions: DEFAULT_REPETITION,
};

export const EquipmentIcon: Record<Equipment, IconProp> = {
  [Equipment.Barbell]: "grip-lines",
  [Equipment.Dumbbell]: "dumbbell",
  [Equipment.Cable]: "bezier-curve",
  [Equipment.Machine]: "robot",
  [Equipment.BodyWeight]: "person-walking",
};

export const ExerciseModeIcon: Record<ExerciseMode, IconProp> = {
  [ExerciseMode.AlternateSides]: "arrow-right-arrow-left",
  [ExerciseMode.BothSides]: "arrows-up-to-line",
  [ExerciseMode.Left]: "arrow-left",
  [ExerciseMode.Right]: "arrow-right",
}

export const ExerciseDayTypeColorMap: Record<ExerciseDayType, string> = {
  [ExerciseDayType.Leg]: 'rgb(228, 177, 0)',
  [ExerciseDayType.Push]: 'rgb(198, 95, 84)',
  [ExerciseDayType.Pull]: 'rgb(76, 184, 154)',
  [ExerciseDayType.Mixed]: 'rgb(150, 150, 150)',
  [ExerciseDayType.Arm]: 'rgb(100, 100, 250)',
};

export const OneSidedExerciseMode = [ExerciseMode.Left, ExerciseMode.Right];