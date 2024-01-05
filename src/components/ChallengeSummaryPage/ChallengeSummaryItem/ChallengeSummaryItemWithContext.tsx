import { useContext } from "react";
import ChallengeSummaryItem from ".";
import { Challenge } from "../../../types/Achievement";
import ChallengeContextProvider, {
  challengeContext,
} from "../ChallengeContext";

type Props = {
  className?: string;
  challenge: Challenge;
  onClick?: () => void;
};
function ChallengeSummaryItemWrapper({
  className,
  onClick,
}: Pick<Props, "className" | "onClick">) {
  const { challenge, achievements } = useContext(challengeContext);
  return (
    <ChallengeSummaryItem
      onClick={onClick}
      challenge={challenge}
      achievements={achievements}
      className={className}
    />
  );
}

export default function ChallengeSummaryItemWithContext({
  className,
  challenge,
  onClick,
}: Props) {
  return (
    <ChallengeContextProvider challenge={challenge}>
      <ChallengeSummaryItemWrapper onClick={onClick} className={className} />
    </ChallengeContextProvider>
  );
}
