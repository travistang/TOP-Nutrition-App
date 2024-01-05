import toast from "react-hot-toast";
import ExerciseDatabase from "../../../../database/ExerciseDatabase";
import {
  CHALLENGE_TYPE_CONFIG,
  DEFAULT_EXERCISE_CHALLENGE,
  ExerciseChallenge,
  ExerciseConstraint,
} from "../../../../types/ExerciseChallenge";
import { Optional } from "../../../../types/utils";
import { ChallengeInfo, ExerciseChallengeTarget } from "./types";

export type FormParts = {
  id?: string;
  info: ChallengeInfo;
  target: ExerciseChallengeTarget;
  constraint: ExerciseConstraint;
};
export const isFormValid = ({ constraint, info, target }: FormParts) => {
  if (!info.name) return false;
  if (!target.target) return false;
  if (
    CHALLENGE_TYPE_CONFIG[target.type].typeSpecificData &&
    !target.typeSpecificValue
  )
    return false;

  if (
    !constraint.name &&
    !constraint.equipments.length &&
    !constraint.modes.length &&
    !constraint.workingBodyParts.length
  )
    return false;
  return true;
};

export const challengeToFormPart = (
  challenge: ExerciseChallenge
): FormParts => {
  return {
    id: challenge.id,
    target: {
      mode: challenge.mode,
      type: challenge.type,
      target: challenge.target,
      typeSpecificValue: challenge.typeSpecificValue,
    },
    info: {
      name: challenge.name,
      interval: challenge.interval,
    },
    constraint: challenge.exerciseConstraint,
  };
};

export const formPartToChallenge = (
  form: FormParts
): Optional<ExerciseChallenge, "id"> => {
  return {
    id: form.id,
    target: form.target.target,
    mode: form.target.mode,
    type: form.target.type,
    typeSpecificValue: form.target.typeSpecificValue,
    name: form.info.name,
    interval: form.info.interval,
    exerciseConstraint: form.constraint,
  };
};

export const createChallenge = (form: FormParts) => {
  const { info, target, constraint } = form;
  const challenge: Omit<ExerciseChallenge, "id"> = {
    exerciseConstraint: constraint,
    ...info,
    ...target,
  };
  const challengeId = form.id;
  const mutatePromise = !challengeId
    ? ExerciseDatabase.createExerciseChallenge(challenge)
    : ExerciseDatabase.updateExerciseChallenge(challengeId, challenge);
  return mutatePromise
    .then(() => toast.success("Challenge created"))
    .catch(() => toast.error("Failed to create challenge"));
};

export const removeChallenge = (id: string) => {
  return ExerciseDatabase.removeExerciseChallenge(id)
    .then(() => toast.success("Challenge removed"))
    .catch(() => toast.error("Failed to remove challenge"));
};

export const DEFAULT_FORM_PARTS: FormParts = challengeToFormPart(
  DEFAULT_EXERCISE_CHALLENGE
);
