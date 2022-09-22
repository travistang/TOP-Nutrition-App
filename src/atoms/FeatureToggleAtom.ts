import { createLocalStoragePersistenceAtom } from "./utils";

export const LS_FEATURE_TOGGLE = '@nutritionApp/feature_toggle';
export type FeatureToggle = {
  stepExerciseWorkoutForm: boolean;
}
export const DEFAULT_FEATURE_TOGGLE: FeatureToggle = {
  stepExerciseWorkoutForm: false,
};

export const featureToggleAtom = createLocalStoragePersistenceAtom<FeatureToggle>(
  "featureToggle",
  LS_FEATURE_TOGGLE,
  DEFAULT_FEATURE_TOGGLE
);