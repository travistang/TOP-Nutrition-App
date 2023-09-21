import classNames from "classnames";
import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";

import StatisticsNavigateTab from "../components/StatisticsNavigateTab";
import Button, { ButtonStyle } from "../components/Input/Button";
import CreateChallengeModal from "../components/ChallengeSummaryPage/CreateChallengeModal";
import AchievementDatabase from "../database/AchievementDatabase";
import EmptyNotice from "../components/EmptyNotice";
type Props = {
  className?: string;
};
export default function ChallengeSummary({ className }: Props) {
  const challenges = useLiveQuery(() => AchievementDatabase.getAllChallenges());
  const [showCreateChallengeModal, setShowCreateChallengeModal] =
    useState(false);

  const noChallenges = challenges && challenges.length === 0;

  return (
    <div className={classNames("flex flex-col items-stretch gap-2", className)}>
      <CreateChallengeModal
        opened={showCreateChallengeModal}
        onClose={() => setShowCreateChallengeModal(false)}
      />
      <StatisticsNavigateTab />
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
    </div>
  );
}
