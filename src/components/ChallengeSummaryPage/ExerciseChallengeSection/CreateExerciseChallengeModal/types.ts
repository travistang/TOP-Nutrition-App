import { ExerciseChallenge } from "../../../../types/ExerciseChallenge";

export enum FormTabs {
  Info = "info",
  Constraint = "constraint",
  Target = "target",
}
export type ChallengeInfo = Pick<ExerciseChallenge, "name" | "interval">;

export type ExerciseChallengeTarget = Pick<
  ExerciseChallenge,
  "mode" | "type" | "target" | "typeSpecificValue"
>;

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
