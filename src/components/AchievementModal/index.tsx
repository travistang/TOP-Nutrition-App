import classNames from "classnames";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { createEditAchievementAtom } from "../../atoms/CreateEditAchievementAtom";
import achievementDatabase from "../../database/AchievementDatabase";
import { isChallengeTargetUnitInteger } from "../../domain/Challenges";
import { Achievement, Challenge } from "../../types/Achievement";
import { Modifier, Optional } from "../../types/utils";
import Button, { ButtonStyle } from "../Input/Button";
import DateInput from "../Input/DateInput";
import { DateInputType } from "../Input/DateInput/types";
import SplitDigitInput from "../Input/SplitDigitInput";
import TextInput from "../Input/TextInput";
import Modal from "../Modal";
import ChallengePicker from "./ChallengePicker";

type AchievementForm = {
  id?: string;
  solvingChallenges: Challenge[];
  details: string;
  date: number;
  value: number;
};

const isFormValid = (form: AchievementForm) => {
  return form.solvingChallenges.length > 0 && form.value > 0;
};

const DEFAULT_ACHIEVEMENT_FORM: AchievementForm = {
  id: "",
  solvingChallenges: [],
  details: "",
  date: Date.now(),
  value: 0,
};

const achievementToForm = async (
  achievement: Optional<Achievement, "id">
): Promise<AchievementForm> => {
  const { id, details, date, value, completedChallengeIds } = achievement;
  const solvingChallenges = await achievementDatabase.getChallengeByIds(
    completedChallengeIds
  );
  return {
    solvingChallenges,
    id,
    details,
    date,
    value,
  };
};

const formToAchievement = (
  form: AchievementForm
): Optional<Achievement, "id"> => {
  const { id, solvingChallenges, details, date, value } = form;
  return {
    id,
    details,
    date,
    value,
    completedChallengeIds: solvingChallenges.map((c) => c.id),
  };
};

const handleFormSubmit = async (
  formValue: AchievementForm,
  closeModal: () => void
) => {
  const data = formToAchievement(formValue);
  if (!data.id) {
    await achievementDatabase.recordAchievement(data);
    toast.success("Recorded");
  } else {
    const { id, ...updatedData } = data;
    await achievementDatabase.updateAchievement(id, updatedData);
  }
  closeModal();
};

const KEYPAD_ID = "achievement-value";

export default function AchievementModal() {
  const [{ achievement }, setState] = useRecoilState(createEditAchievementAtom);
  const closeModal = () => setState({ achievement: null });
  const [formValue, setFormValue] = useState<AchievementForm>(
    DEFAULT_ACHIEVEMENT_FORM
  );
  useEffect(() => {
    if (!achievement) {
      setFormValue(DEFAULT_ACHIEVEMENT_FORM);
      return;
    }
    achievementToForm(achievement).then(setFormValue);
  }, [achievement]);
  const isEditing = !!achievement?.id;
  const changeForm: Modifier<AchievementForm> = (field) => (value) =>
    setFormValue({ ...formValue, [field]: value });

  if (!achievement) return null;
  const isIntegerValue = formValue.solvingChallenges.every((c) =>
    isChallengeTargetUnitInteger(c.unit)
  );

  return (
    <Modal
      opened={!!achievement}
      onClose={closeModal}
      label={isEditing ? "Edit achievement" : "Create achievement"}
    >
      <div className="grid grid-cols-6 gap-2">
        <SplitDigitInput
          selected
          value={formValue.value}
          onChange={changeForm("value")}
          integer={isIntegerValue}
          label="Achieved value"
          keypadContainerId={KEYPAD_ID}
          className="col-span-2"
          unit={formValue.solvingChallenges[0]?.unit}
        />
        <DateInput
          label="Achieved at"
          dateType={DateInputType.DateTime}
          value={formValue.date}
          onChange={(date) => changeForm("date")(date.getTime())}
          className="col-span-4"
        />

        <ChallengePicker
          className="col-span-full"
          challenges={formValue.solvingChallenges}
          onChange={changeForm("solvingChallenges")}
          label={`Solving challenges (${formValue.solvingChallenges.length})`}
        />

        <TextInput
          textarea
          className="col-span-full"
          label="Details"
          value={formValue.details}
          onChange={changeForm("details")}
        />
        <div id={KEYPAD_ID} className={classNames("col-span-full")} />
        <Button
          buttonStyle={ButtonStyle.Block}
          text="Save"
          icon="save"
          disabled={!isFormValid(formValue)}
          className="col-span-2 col-end-7"
          onClick={() => handleFormSubmit(formValue, closeModal)}
        />
      </div>
    </Modal>
  );
}
