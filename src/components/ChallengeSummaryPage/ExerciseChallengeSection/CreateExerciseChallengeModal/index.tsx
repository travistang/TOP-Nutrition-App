import { useCallback, useEffect, useMemo, useState } from "react";
import useUpdater from "../../../../hooks/useUpdater";
import { ExerciseChallenge } from "../../../../types/ExerciseChallenge";
import { Optional } from "../../../../types/utils";
import Modal from "../../../Modal";
import Tab from "../../../Tab";
import CreateExerciseChallengeButtonRow from "./CreateExerciseChallengeButtonRow";
import ExerciseChallengeConstraintForm from "./ExerciseChallengeConstraintForm";
import ExerciseChallengeInfoForm from "./ExerciseChallengeInfoForm";
import ExerciseChallengeTargetForm from "./ExerciseChallengeTargetForm";
import {
  DEFAULT_FORM_PARTS,
  FormParts,
  challengeToFormPart,
  createChallenge,
  isFormValid,
  removeChallenge,
} from "./helpers";
import { FormTabs, getFormTabs } from "./types";

type FormSignal = "created" | "updated" | "deleted" | "close";
export type ExerciseChallengeModalHandlers = Optional<
  Record<FormSignal, () => void>,
  "updated" | "deleted"
>;
type Props = {
  editingChallenge?: ExerciseChallenge;
  opened?: boolean;
  onCreated?: () => void;
  on: ExerciseChallengeModalHandlers;
};

export default function CreateEditExerciseChallengeModal({
  editingChallenge,
  on,
  opened,
}: Props) {
  const [tab, setTab] = useState<FormTabs>(FormTabs.Info);
  const [form, setForm] = useState<FormParts>(
    editingChallenge
      ? challengeToFormPart(editingChallenge)
      : DEFAULT_FORM_PARTS
  );
  const formUpdater = useUpdater(form, setForm);
  const onCreateOrUpdate = useCallback(() => {
    createChallenge(form).then(on.created).then(on.close);
  }, [form, on.created, on.close]);

  const isEditing = useMemo(
    () => !!editingChallenge?.id,
    [editingChallenge?.id]
  );

  useEffect(() => {
    if (!editingChallenge) return;
    setForm(challengeToFormPart(editingChallenge));
  }, [editingChallenge]);

  const formValid = isFormValid(form);
  return (
    <Modal
      opened={!!opened}
      onClose={on.close}
      label={isEditing ? "Edit challenge" : "Create exercise challenge"}
    >
      <div className="flex flex-col items-stretch gap-2">
        <Tab
          selected={(config) => (config.id as string) === tab}
          options={getFormTabs(setTab)}
        />
        {tab === FormTabs.Info && (
          <ExerciseChallengeInfoForm
            info={form.info}
            onChange={formUpdater("info")}
          />
        )}
        {tab === FormTabs.Constraint && (
          <ExerciseChallengeConstraintForm
            constraint={form.constraint}
            onChange={formUpdater("constraint")}
          />
        )}
        {tab === FormTabs.Target && (
          <ExerciseChallengeTargetForm
            target={form.target}
            onChange={formUpdater("target")}
          />
        )}
        <CreateExerciseChallengeButtonRow
          isFormValid={formValid}
          onClose={on.close}
          onConfirm={onCreateOrUpdate}
          onRemove={
            editingChallenge?.id
              ? removeChallenge.bind(null, editingChallenge.id)
              : undefined
          }
        />
      </div>
    </Modal>
  );
}
