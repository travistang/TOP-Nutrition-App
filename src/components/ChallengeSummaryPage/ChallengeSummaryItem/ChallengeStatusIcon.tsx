import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { ChallengeStatus } from "../../../types/Achievement";

type Props = {
  status: ChallengeStatus;
  className?: string;
};
const ICON_MAPPING: Record<ChallengeStatus, IconProp> = {
  [ChallengeStatus.Completed]: "check",
  [ChallengeStatus.Failed]: "times",
  [ChallengeStatus.Ongoing]: "running",
  [ChallengeStatus.NotStarted]: "hourglass-half",
};
const COLOR_MAPPING: Record<ChallengeStatus, string> = {
  [ChallengeStatus.Completed]: "border-carbohydrates text-carbohydrates",
  [ChallengeStatus.Failed]: "border-fat text-fat",
  [ChallengeStatus.Ongoing]: "border-protein text-protein",
  [ChallengeStatus.NotStarted]: "border-grey text-grey",
};

export default function ChallengeStatusIcon({ status, className }: Props) {
  const icon = ICON_MAPPING[status];
  return (
    <div
      className={classNames(
        "rounded-full flex items-center justify-center text-lg border-2",
        COLOR_MAPPING[status],
        className
      )}
    >
      <FontAwesomeIcon icon={icon} className={COLOR_MAPPING[status]} />
    </div>
  );
}
