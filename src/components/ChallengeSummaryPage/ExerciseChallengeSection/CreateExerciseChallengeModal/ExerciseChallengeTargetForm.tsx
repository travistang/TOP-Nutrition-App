import useUpdater from "../../../../hooks/useUpdater";
import {
  CHALLENGE_MODE_DETAILS,
  CHALLENGE_TYPE_CONFIG,
  ExerciseChallengeMode,
  ExerciseChallengeType,
} from "../../../../types/ExerciseChallenge";
import EnumPicker from "../../../Input/EnumPicker";
import NumberInput from "../../../Input/NumberInput";
import Section from "../../../Section";
import { ExerciseChallengeTarget } from "./types";

type Props = {
  target: ExerciseChallengeTarget;
  onChange: (t: ExerciseChallengeTarget) => void;
};
export default function ExerciseChallengeTargetForm({
  target,
  onChange,
}: Props) {
  const updater = useUpdater(target, onChange);
  const { description, typeSpecificData, unit } =
    CHALLENGE_TYPE_CONFIG[target.type];

  return (
    <div className="grid grid-cols-12 gap-2">
      <Section
        icon="info-circle"
        label="Challenge mode description"
        className="text-xs col-span-full"
      >
        {description}
      </Section>
      <EnumPicker
        single
        label="Challenge type"
        className="col-span-full grid grid-cols-2 gap-2"
        values={[target.type]}
        onChange={(types) => {
          updater("type")(types[0]);
        }}
        availableValues={Object.values(ExerciseChallengeType)}
      />
      <EnumPicker
        single
        noText
        label="Challenge mode"
        iconMapping={CHALLENGE_MODE_DETAILS}
        className="col-span-full grid grid-cols-4 gap-2"
        values={[target.mode]}
        onChange={(modes) => {
          updater("mode")(modes[modes.length - 1]);
        }}
        availableValues={Object.values(ExerciseChallengeMode)}
      />
      <NumberInput
        label={`Target value (${unit})`}
        className="col-span-6"
        value={target.target}
        onChange={updater("target")}
      />
      {typeSpecificData && (
        <NumberInput
          label={`${typeSpecificData.description} (${typeSpecificData.unit})`}
          className="col-span-6"
          value={target.typeSpecificValue || 0}
          onChange={updater("typeSpecificValue")}
        />
      )}
    </div>
  );
}
