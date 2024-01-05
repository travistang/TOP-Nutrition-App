import {
  DEFAULT_EXERCISE_CHALLENGE,
  ExerciseChallenge,
} from "../../../../types/ExerciseChallenge";
import ObjectUtils from "../../../../utils/Object";

export enum FormTabs {
  Info = "info",
  Constraint = "constraint",
  Target = "target",
}
export type ChallengeInfo = Pick<ExerciseChallenge, "name" | "interval">;
export const DEFAULT_CHALLENGE_INFO = ObjectUtils.filterKeys(
  DEFAULT_EXERCISE_CHALLENGE,
  ["name", "interval"]
);

export type ExerciseChallengeTarget = Pick<
  ExerciseChallenge,
  "mode" | "type" | "target" | "typeSpecificValue"
>;
export const DEFAULT_CHALLENGE_TARGET = ObjectUtils.filterKeys(
  DEFAULT_EXERCISE_CHALLENGE,
  ["mode", "target", "typeSpecificValue", "type"]
);

export const getFormTabs = (setTab: (t: FormTabs) => void) => [
  {
    id: FormTabs.Info,
    label: "Challenge Info",
    onClick: () => setTab(FormTabs.Info),
  },
  {
    id: FormTabs.Constraint,
    label: "Constraints",
    onClick: () => setTab(FormTabs.Constraint),
  },
  {
    id: FormTabs.Target,
    label: "Targets",
    onClick: () => setTab(FormTabs.Target),
  },
];
