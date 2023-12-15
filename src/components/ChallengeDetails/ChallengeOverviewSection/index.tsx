import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import {
  Achievement,
  Challenge,
  ChallengeMode,
} from "../../../types/Achievement";
import Section from "../../Section";
import ChallengeModeChip from "../../ChallengeSummaryPage/ChallengeSummaryItem/ChallengeModeChip";

type Props = {
  className?: string;
  challenge: Challenge;
  achievements: Achievement[];
};
export default function ChallengeOverviewSection({
  challenge,
  achievements,
  className,
}: Props) {
  return (
    <div className={classNames("grid grid-cols-6 gap-2", className)}>
      <h3 className="col-span-4 whitespace-pre-wrap">{challenge.name}</h3>
      <div className="flex flex-col items-stretch col-span-2">
        <div className="flex gap-1 items-center text-lg">
          <ChallengeModeChip mode={challenge.mode} />

          {challenge.target}
          <span className="text-xs">{challenge.unit}</span>
        </div>
      </div>
      <div className="col-span-full text-xs text-gray-600">
        Resets <b>{challenge.period}</b>
      </div>
      <Section label="Description" className="col-span-full">
        <div className="text-sm">{challenge.description}</div>
      </Section>
    </div>
  );
}
