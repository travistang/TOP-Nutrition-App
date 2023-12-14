import classNames from "classnames";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import achievementDatabase from "../../../database/AchievementDatabase";
import { Challenge } from "../../../types/Achievement";
import ArrayUtils from "../../../utils/Array";
import EmptyNotice from "../../EmptyNotice";
import TextInput from "../../Input/TextInput";
import ChallengePickerResult from "./ChallengePickerResult";

type Props = {
  label?: string;
  challenges: Challenge[];
  onChange: (challenges: Challenge[]) => void;
  className?: string;
};

export default function AchievementPicker({
  className,
  challenges: selectedChallenges,
  onChange,
  label,
}: Props) {
  const [searchString, setSearchString] = useState("");
  const allChallenges = useLiveQuery(
    () => achievementDatabase.getAllChallenges(),
    []
  );

  if (!allChallenges) {
    return <span className={className}>Loading...</span>;
  }

  if (!allChallenges.length) {
    return (
      <EmptyNotice className={className} message="No challenges available" />
    );
  }

  const toggleSelectChallenge = (challenge: Challenge) => {
    const newChallenges = ArrayUtils.toggleElement(
      selectedChallenges,
      challenge,
      (ca, cb) => ca.id === cb.id
    );
    onChange(newChallenges);
  };

  return (
    <div className={classNames("flex flex-col gap-2 items-stretch", className)}>
      <TextInput
        label={label}
        placeholder="Search for challenges..."
        value={searchString}
        onChange={setSearchString}
      />
      <ChallengePickerResult
        allChallenges={allChallenges}
        searchString={searchString}
        selectedChallenges={selectedChallenges}
        toggleSelectChallenge={toggleSelectChallenge}
      />
    </div>
  );
}
