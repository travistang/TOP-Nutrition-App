import { addMonths, endOfDay } from "date-fns";
import { useState } from "react";
import { toast } from "react-hot-toast";
import achievementDatabase from "../../../database/AchievementDatabase";
import { isChallengeTargetUnitInteger } from "../../../domain/Challenges";
import {
  CHALLENGE_MODE_SETTINGS,
  Challenge,
  ChallengeMode,
  ChallengePeriod,
  ChallengeTargetUnit,
  DEFAULT_CHALLENGE,
} from "../../../types/Achievement";
import { Modifier } from "../../../types/utils";
import AttributeValueInputToggle from "../../Input/AttributeValueInputToggle";
import Button, { ButtonStyle } from "../../Input/Button";
import SelectInput from "../../Input/SelectInput";
import SplitDigitInput from "../../Input/SplitDigitInput";
import TabSelectInput from "../../Input/TabSelectInput";
import TextInput from "../../Input/TextInput";
import Modal from "../../Modal";

type Props = {
  opened: boolean;
  onClose: () => void;
};

type ChallengeForm = Omit<Challenge, "id"> & {
  hasEndDate: boolean;
};
const DEFAULT_CHALLENGE_FORM: ChallengeForm = {
  ...DEFAULT_CHALLENGE,
  hasEndDate: false,
  endsAt: endOfDay(addMonths(Date.now(), 1)).getTime(),
};

const INPUT_ID = "create-challenge-modal-input";

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

const CHALLENGE_PERIOD_OPTIONS = Object.values(ChallengePeriod).map(
  (period) => ({
    value: period,
    text: period,
  })
);
export default function CreateChallengeModal({ onClose, opened }: Props) {
  const [challenge, setChallenge] = useState<ChallengeForm>(
    DEFAULT_CHALLENGE_FORM
  );
  const [valueInputSelected, setValueInputSelected] = useState(false);

  const onCreateChallenge = async () => {
    if (!isFormValid(challenge)) {
      toast.error("Invalid form");
      return;
    }
    const challengeInput = formToChallengeInput(challenge);
    try {
      await achievementDatabase.createChallenge(challengeInput);
      toast.success("Challenge created");
      setChallenge(DEFAULT_CHALLENGE_FORM);
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
          label="Challenge description"
          className="col-span-full"
          onChange={changeField("description")}
          value={challenge.description}
        />
        <AttributeValueInputToggle
          label="Challenge mode"
          value={challenge.mode}
          options={CHALLENGE_MODE_SETTINGS}
          onToggle={() =>
            changeField("mode")(getNextToggledMode(challenge.mode))
          }
          className="col-span-2"
        />
        <SplitDigitInput
          className="col-span-4"
          keypadContainerId={INPUT_ID}
          selected={valueInputSelected}
          value={challenge.target}
          label="Target value"
          unit={challenge.unit}
          integer={isChallengeTargetUnitInteger(challenge.unit)}
          onChange={changeField("target")}
          onSelect={() => setValueInputSelected(!valueInputSelected)}
        />
        <SelectInput
          options={Object.values(ChallengeTargetUnit).map((unit) => ({
            value: unit,
            label: unit,
          }))}
          value={challenge.unit}
          label="Unit"
          onSelect={changeField("unit")}
          className="col-span-2 h-full"
        />
        <div className="col-span-full">
          <TabSelectInput
            label="Challenge period"
            className="col-span-full col-start-1"
            options={CHALLENGE_PERIOD_OPTIONS}
            selected={challenge.period}
            onSelect={changeField("period")}
          />
        </div>
        <div className="col-span-full overflow-hidden" id={INPUT_ID} />
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
