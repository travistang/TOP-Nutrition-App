import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExerciseDatabase from "../../../database/ExerciseDatabase";
import useFetch from "../../../hooks/useFetch";
import { ExerciseChallenge } from "../../../types/ExerciseChallenge";
import EmptyNotice from "../../EmptyNotice";
import Button, { ButtonStyle } from "../../Input/Button";
import Section from "../../Section";
import CreateExerciseChallengeModal, {
  ExerciseChallengeModalHandlers,
} from "./CreateExerciseChallengeModal";
import ExerciseChallengeItem from "./ExerciseChallengeItem";

const fetchChallenges = () => ExerciseDatabase.getAllExerciseChallenges();
export default function ExerciseChallengeSection() {
  const {
    result: challenges,
    loading,
    refetch,
  } = useFetch(null, fetchChallenges);
  const [creatingChallenge, setCreatingChallenge] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const toChallengeDetails = useCallback(
    (challenge: ExerciseChallenge) => () =>
      navigate(`/exercise-challenges/${challenge.id}`),
    [navigate]
  );
  const displayingChallenges = useMemo(
    () => (showAll ? challenges : challenges?.slice(0, 5)),
    [challenges, showAll]
  );
  const modalHandlers = useMemo<ExerciseChallengeModalHandlers>(
    () => ({
      created: refetch,
      close: () => setCreatingChallenge(false),
    }),
    [refetch]
  );

  const noChallenges = challenges?.length === 0;
  return (
    <>
      <CreateExerciseChallengeModal
        opened={creatingChallenge}
        on={modalHandlers}
      />
      <Section icon="dumbbell" label="Exercise challenges">
        {!loading && noChallenges && (
          <EmptyNotice className="pt-4 pb-2" message="No challenges" />
        )}
        {displayingChallenges?.map((challenge) => (
          <ExerciseChallengeItem
            onClick={toChallengeDetails(challenge)}
            key={challenge.id}
            challenge={challenge}
          />
        ))}
        <div className="flex items-center justify-between">
          <Button
            onClick={() => setShowAll(!showAll)}
            buttonStyle={ButtonStyle.Clear}
            className="text-sm"
            text={showAll ? "Show less" : "Show more"}
          />
          <Button
            onClick={() => setCreatingChallenge(true)}
            buttonStyle={ButtonStyle.Clear}
            className="text-sm"
            text="Create"
            icon="plus"
          />
        </div>
      </Section>
    </>
  );
}
