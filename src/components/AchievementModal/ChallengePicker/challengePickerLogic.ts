import { Challenge } from "../../../types/Achievement";

const computeDisabledChallengeIds = (
  allChallenges: Challenge[],
  selectedChallenges: Challenge[]
): string[] => {
  if (selectedChallenges.length === 0) return [];
  const selectedChallengeUnit = selectedChallenges[0].unit;
  return allChallenges
    .filter((c) => c.unit !== selectedChallengeUnit)
    .map((c) => c.id);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  computeDisabledChallengeIds,
};
