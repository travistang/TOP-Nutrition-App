import { useState } from "react";
import {
  DEFAULT_EXERCISE_CHALLENGE,
  ExerciseConstraint,
} from "../../../../types/ExerciseChallenge";
import Button, { ButtonStyle } from "../../../Input/Button";
import Modal from "../../../Modal";
import Tab from "../../../Tab";
import ExerciseChallengeConstraintForm from "./ExerciseChallengeConstraintForm";
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
  opened?: boolean;
  onClose: () => void;
};

export default function CreateExerciseChallengeModal({
  onClose,
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
            onClick={console.log}
            buttonStyle={ButtonStyle.Block}
            text="Create"
            icon="plus"
          />
        </div>
      </div>
    </Modal>
  );
}