import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ExerciseDatabase from "../../../../database/ExerciseDatabase";
import {
  CHALLENGE_TYPE_CONFIG,
  DEFAULT_EXERCISE_CHALLENGE,
  ExerciseChallenge,
  ExerciseConstraint,
} from "../../../../types/ExerciseChallenge";
import Button, { ButtonStyle } from "../../../Input/Button";
import Modal from "../../../Modal";
import Tab from "../../../Tab";
import ExerciseChallengeConstraintForm from "./ExerciseChallengeConstraintForm";
import ExerciseChallengeInfoForm from "./ExerciseChallengeInfoForm";
import ExerciseChallengeTargetForm from "./ExerciseChallengeTargetForm";
import {
  ChallengeInfo,
  DEFAULT_CHALLENGE_INFO,
  DEFAULT_CHALLENGE_TARGET,
  ExerciseChallengeTarget,
  FormTabs,
  getFormTabs,
} from "./types";

type Props = {
  editingChallenge?: ExerciseChallenge;
  opened?: boolean;
  onCreated?: () => void;
  onClose: () => void;
};
type FormParts = {
  id?: string;
  info: ChallengeInfo;
  target: ExerciseChallengeTarget;
  constraint: ExerciseConstraint;
};
const isFormValid = ({ constraint, info, target }: FormParts) => {
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

const createChallenge = (form: FormParts) => {
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

export default function CreateExerciseChallengeModal({
  editingChallenge,
  onClose,
  onCreated,
  opened,
}: Props) {
  const [tab, setTab] = useState<FormTabs>(FormTabs.Constraint);
  const [info, setInfo] = useState<ChallengeInfo>(DEFAULT_CHALLENGE_INFO);
  const [target, setTarget] = useState<ExerciseChallengeTarget>(
    DEFAULT_CHALLENGE_TARGET
  );
  const [constraint, setConstraint] = useState<ExerciseConstraint>(
    DEFAULT_EXERCISE_CHALLENGE.exerciseConstraint
  );
  const onCreate = useCallback(() => {
    createChallenge({ id: editingChallenge?.id, info, target, constraint })
      .then(onCreated)
      .then(onClose);
  }, [editingChallenge?.id, onClose, onCreated, info, target, constraint]);

  useEffect(() => {
    if (!editingChallenge) return;
    const { name, interval, mode, type, target, exerciseConstraint } =
      editingChallenge;
    setInfo({ name, interval });
    setTarget({ type, mode, target });
    setConstraint(exerciseConstraint);
  }, [editingChallenge]);

  const canSubmit = isFormValid({ info, target, constraint });

  return (
    <Modal
      opened={!!opened}
      onClose={onClose}
      label="Create exercise challenge"
    >
      <div className="flex flex-col items-stretch gap-2">
        <Tab
          selected={(config) => (config.id as string) === tab}
          options={getFormTabs(setTab)}
        />
        {tab === FormTabs.Info && (
          <ExerciseChallengeInfoForm info={info} onChange={setInfo} />
        )}
        {tab === FormTabs.Constraint && (
          <ExerciseChallengeConstraintForm
            constraint={constraint}
            onChange={setConstraint}
          />
        )}
        {tab === FormTabs.Target && (
          <ExerciseChallengeTargetForm target={target} onChange={setTarget} />
        )}
        <div className="flex items-center justify-end gap-2 col-span-full">
          <Button
            onClick={onClose}
            buttonStyle={ButtonStyle.Clear}
            text="Cancel"
            icon="times"
          />
          <Button
            disabled={!canSubmit}
            onClick={onCreate}
            buttonStyle={ButtonStyle.Block}
            text="Create"
            icon="plus"
          />
        </div>
      </div>
    </Modal>
  );
}
