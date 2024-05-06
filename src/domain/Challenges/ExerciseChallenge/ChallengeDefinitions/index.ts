import { ExerciseChallengeType } from "../../../../types/ExerciseChallenge";
import { ExerciseChallengeDefinition } from "../types";
import SetOfWeights from "./SetOfWeights";

const challengeDefinitions: Partial<
  Record<ExerciseChallengeType, ExerciseChallengeDefinition>
> = {
  [ExerciseChallengeType.SetsOfWeight]: SetOfWeights,
  [ExerciseChallengeType.NumberOfSets]: SetOfWeights,
  [ExerciseChallengeType.SetsOfRepetition]: SetOfWeights,
  [ExerciseChallengeType.TotalRepetitions]: SetOfWeights,
  [ExerciseChallengeType.TotalVolume]: SetOfWeights,
};

export default challengeDefinitions;
