import useUpdater from "../../../../hooks/useUpdater";
import {
  CHALLENGE_MODE_DETAILS,
  CHALLENGE_TYPE_CONFIG,
  ExerciseChallengeMode,
  ExerciseChallengeType,
} from "../../../../types/ExerciseChallenge";
import ExercisePicker from "../../../Input/Exercise/ExercisePicker";
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
  const { description, hasTypeSpecificValue } =
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
      <ExercisePicker
        single
        label="Challenge type"
        className="col-span-full grid grid-cols-2 gap-2"
        values={[target.type]}
        onChange={(types) => {
          updater("type")(types[0]);
        }}
        availableValues={Object.values(ExerciseChallengeType)}
      />
      <ExercisePicker
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
    </div>
  );
}
