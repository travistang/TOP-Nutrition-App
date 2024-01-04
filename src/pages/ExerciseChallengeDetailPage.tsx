import { useCallback, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ExerciseDatabase from "../database/ExerciseDatabase";
import useFetch from "../hooks/useFetch";
import { ExerciseChallenge } from "../types/ExerciseChallenge";
import Repeat from "../components/Repeat";
import SectionPlaceholder from "../components/Placeholders/SectionPlaceholder";
import Button, { ButtonStyle } from "../components/Input/Button";
import ExerciseChallengeSummarySection from "../components/ExerciseChallengeDetail/ExerciseChallengeSummarySection";
import ExerciseChallengePeriodSection from "../components/ExerciseChallengeDetail/ExerciseChallengePeriodSection";
import { getTimeInInterval } from "../domain/Challenges/exerciseChallenge";
import CreateExerciseChallengeModal from "../components/ChallengeSummaryPage/ExerciseChallengeSection/CreateExerciseChallengeModal";

const fetchChallenge = async (
  id?: string | null
): Promise<ExerciseChallenge | undefined> => {
  if (!id) return;
  return ExerciseDatabase.getChallengeById(id);
};

export default function ExerciseChallengeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const goBack = useCallback(() => navigate(-1), [navigate]);
  const [showEditModal, setShowEditModal] = useState(false);
  const toggleShowEditModal = useCallback(
    () => setShowEditModal((showing) => !showing),
    []
  );
  const {
    result: challenge,
    loading,
    refetch: refetchChallenge,
  } = useFetch(id, fetchChallenge);
  const timesInInterval = useMemo(() => {
    if (!challenge?.interval) return [];
    return getTimeInInterval(challenge.interval, Date.now(), 4);
  }, [challenge?.interval]);

  if (!id) return null;

  return (
    <div className="flex flex-col items-stretch gap-2">
      <div className="flex items-center justify-between">
        <Button
          className="w-min"
          onClick={goBack}
          buttonStyle={ButtonStyle.Clear}
          icon="arrow-left"
          text="Back"
        />
        <Button
          className="w-min text-xs"
          onClick={toggleShowEditModal}
          buttonStyle={ButtonStyle.Clear}
          icon="pen"
          text="Edit..."
        />
      </div>
      {challenge && (
        <CreateExerciseChallengeModal
          opened={showEditModal}
          onClose={toggleShowEditModal}
          onCreated={refetchChallenge}
          editingChallenge={challenge}
        />
      )}
      {loading && (
        <Repeat times={3}>
          <SectionPlaceholder />
        </Repeat>
      )}
      {!!challenge && (
        <>
          <ExerciseChallengeSummarySection challenge={challenge} />
          <span className="text-xs">Previous sections:</span>
          {timesInInterval.map((time) => (
            <ExerciseChallengePeriodSection
              challenge={challenge}
              date={time}
              key={time}
            />
          ))}
        </>
      )}
    </div>
  );
}
