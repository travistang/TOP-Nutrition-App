import { Challenge } from "../../../types/Achievement";
import StringUtils from "../../../utils/String";
import EmptyNotice from "../../EmptyNotice";
import ChallengePickerItem from "./ChallengePickerItem";
import ChallengePickerLogic from "./challengePickerLogic";

type Props = {
  allChallenges: Challenge[];
  searchString: string;
  selectedChallenges: Challenge[];
  toggleSelectChallenge: (c: Challenge) => void;
};

export default function ChallengePickerResult({
  allChallenges,
  searchString,
  selectedChallenges,
  toggleSelectChallenge,
}: Props) {
  const itemsToShow = searchString
    ? allChallenges.filter((challenge) =>
        StringUtils.searchCaseInsensitive(challenge.name, searchString)
      )
    : allChallenges;
  const disabledIds = ChallengePickerLogic.computeDisabledChallengeIds(
    allChallenges,
    selectedChallenges
  );
  const selectedIds = selectedChallenges.map((c) => c.id);

  const noSearchResults = allChallenges.length > 0 && itemsToShow.length === 0;

  return (
    <div className="p-2 flex flex-col max-h-72 rounded-lg shadow-inner overflow-y-auto bg-gray-200 gap-2">
      {noSearchResults && (
        <EmptyNotice message="No results" icon="search" className="h-32" />
      )}
      {itemsToShow.map((challenge) => (
        <ChallengePickerItem
          key={challenge.id}
          onClick={() => toggleSelectChallenge(challenge)}
          challenge={challenge}
          selected={selectedIds.includes(challenge.id)}
          disabled={disabledIds.includes(challenge.id)}
        />
      ))}
    </div>
  );
}
