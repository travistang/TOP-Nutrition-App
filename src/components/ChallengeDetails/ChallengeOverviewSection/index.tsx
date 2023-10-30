import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { Challenge, ChallengeMode } from "../../../types/Achievement";

type Props = {
  className?: string;
  challenge: Challenge;
};
export default function ChallengeOverviewSection({
  challenge,
  className,
}: Props) {
  const icon: IconProp =
    challenge.mode === ChallengeMode.GreaterThanTarget
      ? "greater-than-equal"
      : "less-than-equal";

  return (
    <div className={classNames("grid grid-cols-6 gap-2", className)}>
      <h3 className="col-span-4 whitespace-pre-wrap">{challenge.name}</h3>
      <div className="flex flex-col items-stretch col-span-2">
        <div className="flex gap-1 items-center text-lg">
          <FontAwesomeIcon icon={icon} />
          {challenge.target}
          <span className="text-xs">{challenge.unit}</span>
        </div>
      </div>
      <div className="text-xs text-gray-400">Reset {challenge.period}</div>
    </div>
  );
}
