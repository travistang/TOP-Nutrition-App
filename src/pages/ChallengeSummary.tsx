import classNames from "classnames";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import ChallengeSummaryItemWithContext from "../components/ChallengeSummaryPage/ChallengeSummaryItem/ChallengeSummaryItemWithContext";
import CreateChallengeModal from "../components/ChallengeSummaryPage/CreateChallengeModal";
import EmptyNotice from "../components/EmptyNotice";
import Button, { ButtonStyle } from "../components/Input/Button";
import AchievementDatabase from "../database/AchievementDatabase";
import { Challenge } from "../types/Achievement";
type Props = {
  className?: string;
};
export default function ChallengeSummary({ className }: Props) {
  const challenges = useLiveQuery(() => AchievementDatabase.getAllChallenges());
  const [showCreateChallengeModal, setShowCreateChallengeModal] =
    useState(false);
  const navigate = useNavigate();

  const noChallenges = challenges && challenges.length === 0;
  const goToChallenge = (challenge: Challenge) => {
    navigate(`/challenges/${challenge.id}`);
  };
  return (
    <div className={classNames("flex flex-col items-stretch gap-2", className)}>
      <CreateChallengeModal
        opened={showCreateChallengeModal}
        onClose={() => setShowCreateChallengeModal(false)}
      />
      <Button
        onClick={() => setShowCreateChallengeModal(true)}
        className="self-end w-1/2"
        buttonStyle={ButtonStyle.Block}
        icon="plus"
        text="Create Challenge"
      />
      {noChallenges && (
        <EmptyNotice message="No challenges created" icon="trophy" />
      )}
      {challenges?.map((challenge) => (
        <ChallengeSummaryItemWithContext
          challenge={challenge}
          onClick={() => goToChallenge(challenge)}
        />
      ))}
    </div>
  );
}
