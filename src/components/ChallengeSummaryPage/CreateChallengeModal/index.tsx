import React, { useState } from "react";
import Modal from "../../Modal";
import {
  Challenge,
  ChallengeMode,
  ChallengePeriod,
} from "../../../types/Achievement";
import TextInput from "../../Input/TextInput";
import { addMonths, endOfDay } from "date-fns";
import achievementDatabase from "../../../database/AchievementDatabase";
import { toast } from "react-hot-toast";
import { Modifier } from "../../../types/utils";
import Button, { ButtonStyle } from "../../Input/Button";

type Props = {
  opened: boolean;
  onClose: () => void;
};

type ChallengeForm = Omit<Challenge, "id"> & {
  hasEndDate: boolean;
};
const DEFAULT_CHALLENGE: ChallengeForm = {
  name: "",
  description: "",
  mode: ChallengeMode.GreaterThanTarget,
  target: 0,
  period: ChallengePeriod.Weekly,
  hasEndDate: false,
  endsAt: endOfDay(addMonths(Date.now(), 1)).getTime(),
};

const isFormValid = (form: ChallengeForm) => {
  if (!form.name || !form.description || !form.target) return false;
  return true;
};

const formToChallengeInput = (form: ChallengeForm): Omit<Challenge, "id"> => {
  const { endsAt, hasEndDate, ...data } = form;
  return {
    ...data,
    endsAt: hasEndDate ? endsAt : undefined,
  };
};

const getNextToggledMode = (currentMode: ChallengeMode): ChallengeMode => {
  if (currentMode === ChallengeMode.GreaterThanTarget)
    return ChallengeMode.LessThanTarget;
  return ChallengeMode.GreaterThanTarget;
};
export default function CreateChallengeModal({ onClose, opened }: Props) {
  const [challenge, setChallenge] = useState<ChallengeForm>(DEFAULT_CHALLENGE);
  const onCreateChallenge = async () => {
    if (!isFormValid(challenge)) {
      toast.error("Invalid form");
      return;
    }
    const challengeInput = formToChallengeInput(challenge);
    try {
      await achievementDatabase.createChallenge(challengeInput);
      toast.success("Challenge created");
      setChallenge(DEFAULT_CHALLENGE);
      onClose();
    } catch {
      toast.error("Failed to create challenge");
    }
  };

  const changeField: Modifier<ChallengeForm> = (field) => (value) => {
    setChallenge({ ...challenge, [field]: value });
  };
  return (
    <Modal label="Create challenge" opened={opened} onClose={onClose}>
      <div className="grid grid-cols-6 gap-2">
        <TextInput
          label="Challenge name"
          className="col-span-4"
          onChange={changeField("name")}
          value={challenge.name}
        />
        <TextInput
          label="Challenge name"
          className="col-span-full"
          onChange={changeField("description")}
          value={challenge.description}
        />
        <Button
          buttonStyle={ButtonStyle.Block}
          onClick={onCreateChallenge}
          text="Create"
          icon="plus"
          className="col-start-4 col-span-3"
        />
      </div>
    </Modal>
  );
}
