import useUpdater from "../../../../hooks/useUpdater";
import { ExerciseChallengeInterval } from "../../../../types/ExerciseChallenge";
import EnumPicker from "../../../Input/EnumPicker";
import TextInput from "../../../Input/TextInput";
import { ChallengeInfo } from "./types";

type Props = {
  info: ChallengeInfo;
  onChange: (info: ChallengeInfo) => void;
};
export default function ExerciseChallengeInfoForm({ onChange, info }: Props) {
  const updater = useUpdater(info, onChange);
  return (
    <div className="flex-1 flex flex-col items-stretch">
      <TextInput
        label="Challenge name"
        value={info.name}
        onChange={updater("name")}
      />
      <EnumPicker
        single
        values={[info.interval]}
        label="Challenge resets..."
        className="grid grid-cols-3 gap-2"
        onChange={(interval) => updater("interval")(interval[0])}
        availableValues={Object.values(ExerciseChallengeInterval)}
      />
    </div>
  );
}
