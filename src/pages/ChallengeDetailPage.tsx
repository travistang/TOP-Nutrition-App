import { endOfMonth, startOfMonth } from "date-fns";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ChallengeOverviewSection from "../components/ChallengeDetails/ChallengeOverviewSection";
import EmptyNotice from "../components/EmptyNotice";
import Button, { ButtonStyle } from "../components/Input/Button";
import achievementDatabase from "../database/AchievementDatabase";
import { Achievement, Challenge } from "../types/Achievement";

export default function ChallengeDetailPage() {
  const { id } = useParams();
  const challenge = useRef<Challenge | null>(null);
  const achievements = useRef<Achievement[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewDate] = useState(Date.now());
  const navigate = useNavigate();
  const goBack = useCallback(() => navigate(-1), [navigate]);

  useEffect(() => {
    if (!id) {
      return;
    }

    const getChallenge = achievementDatabase.getChallengeByIds([id]);
    const getAchievementOfMonth =
      achievementDatabase.getAchievementsByChallengeBetweenDates(
        id,
        startOfMonth(viewDate).getTime(),
        endOfMonth(viewDate).getTime()
      );
    Promise.all([getChallenge, getAchievementOfMonth])
      .then(([challengeResult, achievementResults]) => {
        challenge.current = challengeResult[0] ?? null;
        achievements.current = achievementResults;
        setLoading(false);
      })
      .catch((e) => {
        toast.error("Failed to load challenge details");
      })
      .finally(() => setLoading(false));
  }, [id, viewDate]);

  return (
    <div className="flex flex-col items-stretch gap-2">
      <Button
        className="justify-self-start w-fit"
        onClick={goBack}
        text="Back"
        buttonStyle={ButtonStyle.Clear}
        icon="arrow-left"
      />
      <Button
        className="justify-self-start w-fit"
        onClick={console.log}
        text="Edit challenge..."
        buttonStyle={ButtonStyle.Clear}
        icon="arrow-left"
      />
      {loading && (
        <EmptyNotice message="Loading data..." className="w-full h-full" />
      )}
      {challenge.current && (
        <ChallengeOverviewSection
          achievements={achievements.current ?? []}
          challenge={challenge.current}
        />
      )}
    </div>
  );
}
