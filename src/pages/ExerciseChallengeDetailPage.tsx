import { useParams } from "react-router-dom";
import ItemPlaceholder, {
  ItemPlaceholderType,
} from "../components/Placeholders/ItemPlaceholder";
import ExerciseDatabase, {
  ExerciseSetRecord,
} from "../database/ExerciseDatabase";
import useFetch from "../hooks/useFetch";
import { ExerciseChallenge } from "../types/ExerciseChallenge";

type FetchChallengeDetailResponse = {
  challenge: ExerciseChallenge;
  workouts: ExerciseSetRecord[];
};
const fetchChallenge = async (
  id: string | undefined
): Promise<FetchChallengeDetailResponse | undefined> => {
  if (!id) return;
  const challenge = await ExerciseDatabase.getChallengeById(id);
  if (!challenge) return;
  const workouts = await ExerciseDatabase.getWorkoutsForChallenge(
    challenge,
    Date.now()
  );
  return {
    challenge,
    workouts,
  };
};
export default function ExerciseChallengeDetailPage() {
  const { id } = useParams();
  const { result: challenge, loading } = useFetch(id ?? "", fetchChallenge);
  if (!id) return null;
  return (
    <div className="flex flex-col items-stretch gap-2">
      {loading && (
        <ItemPlaceholder type={ItemPlaceholderType.IconWithTwoLines} />
      )}
    </div>
  );
}
