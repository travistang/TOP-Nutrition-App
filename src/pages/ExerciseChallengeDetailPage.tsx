import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ExerciseDatabase from "../database/ExerciseDatabase";
import useFetch from "../hooks/useFetch";
import { ExerciseChallenge } from "../types/ExerciseChallenge";
import Repeat from "../components/Repeat";
import SectionPlaceholder from "../components/Placeholders/SectionPlaceholder";
import Button, { ButtonStyle } from "../components/Input/Button";
import ExerciseChallengeSummarySection from "../components/ExerciseChallengeDetail/ExerciseChallengeSummarySection";
import ExerciseChallengePeriodSection from "../components/ExerciseChallengeDetail/ExerciseChallengePeriodSection";
import { getChallengeIntervals } from "../domain/Challenges/exerciseChallenge";

const fetchChallenge = async (id?: string | null): Promise<ExerciseChallenge | undefined> => {
  if (!id) return;
  return ExerciseDatabase.getChallengeById(id);
};

export default function ExerciseChallengeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { result: challenge, loading } = useFetch(id, fetchChallenge);
  const intervals = useMemo(() => {
    if (!challenge?.interval) return [];
    return getChallengeIntervals(challenge.interval, Date.now(), 4);
  }, [challenge?.interval]);

  if (!id) return null;
  // TODO: Something is wrong here?
  console.log({ intervals });
  return (
    <div className="flex flex-col items-stretch gap-2">
      <Button className="w-min" onClick={navigate.bind(null, -1)} buttonStyle={ButtonStyle.Clear} icon="arrow-left" text="Back" />
      {loading && (
        <Repeat times={3}>
          <SectionPlaceholder />
        </Repeat>
      )}
      {!!challenge && (
        <>
          <ExerciseChallengeSummarySection challenge={challenge} />
          <span className="text-xs">Previous sections:</span>
          {intervals.map(([start, end]) => (
            <ExerciseChallengePeriodSection challenge={challenge} date={(start + end) / 2} key={((start + end) / 2).toString()} />
          ))}
        </>
      )}
    </div>
  );
}
