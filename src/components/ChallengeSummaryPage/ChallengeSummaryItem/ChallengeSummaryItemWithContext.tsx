import { useContext } from "react";
import ChallengeSummaryItem from ".";
import { Challenge } from "../../../types/Achievement";
import ChallengeContextProvider, {
  challengeContext,
} from "../ChallengeContext";

type Props = {
  className?: string;
  challenge: Challenge;
};
function ChallengeSummaryItemWrapper({ className }: Pick<Props, "className">) {
  const { challenge, achievements } = useContext(challengeContext);
  return (
    <ChallengeSummaryItem
      challenge={challenge}
      achievements={achievements}
      className={className}
    />
  );
}

export default function ChallengeSummaryItemWithContext({
  className,
  challenge,
}: Props) {
  return (
    <ChallengeContextProvider challenge={challenge}>
      <ChallengeSummaryItemWrapper className={className} />
    </ChallengeContextProvider>
  );
}
