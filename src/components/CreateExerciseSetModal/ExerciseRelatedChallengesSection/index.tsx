import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExerciseDatabase, {
  ExerciseSetRecord,
} from "../../../database/ExerciseDatabase";
import useFetch from "../../../hooks/useFetch";
import { ExerciseSet } from "../../../types/Exercise";
import { ExerciseChallenge } from "../../../types/ExerciseChallenge";
import ExerciseChallengeItem from "../../ChallengeSummaryPage/ExerciseChallengeSection/ExerciseChallengeItem";
import CollapsibleSection from "../../CollapsibleSection";
import List from "../../List";
import ItemPlaceholder from "../../Placeholders/ItemPlaceholder";
import Repeat from "../../Repeat";

const LoadingPlaceholder = () => (
  <Repeat times={3}>
    <ItemPlaceholder />
  </Repeat>
);

type RenderingProps = {
  item: {
    challenge: ExerciseChallenge;
    onClick: () => void;
  };
};
const challengeRenderer = ({
  item: { challenge, onClick },
}: RenderingProps) => {
  return (
    <ExerciseChallengeItem
      key={challenge.id}
      onClick={onClick}
      challenge={challenge}
    />
  );
};

type Props = {
  records: ExerciseSetRecord[];
};
const fetchExerciseRelatedChallenges = (records: ExerciseSet[]) => {
  if (records.length === 0) return Promise.resolve([]);
  const [{ exercise }] = records;
  return ExerciseDatabase.getChallengesByExercise(exercise);
};

export default function ExerciseRelatedChallengesSection({ records }: Props) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const toggleExpand = useCallback(() => setExpanded((e) => !e), []);
  const { result: challenges, loading } = useFetch(
    records ?? [],
    fetchExerciseRelatedChallenges
  );
  const challengesToMap = useMemo(
    () =>
      challenges?.map((challenge) => ({
        challenge,
        onClick: () => navigate(`/exercise-challenges/${challenge.id}`),
      })),
    [navigate, challenges]
  );
  return (
    <CollapsibleSection
      label="Related challenges"
      onToggleExpand={toggleExpand}
      expanded={expanded}
    >
      <List
        loading={loading}
        loadingPlaceholder={LoadingPlaceholder}
        items={challengesToMap ?? []}
      >
        {challengeRenderer}
      </List>
    </CollapsibleSection>
  );
}
