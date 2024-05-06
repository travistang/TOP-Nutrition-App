import { ExerciseSet } from "../../../../types/Exercise";
import {
  ExerciseChallenge,
  ExerciseChallengeType,
} from "../../../../types/ExerciseChallenge";
import { ExerciseChallengeDefinition } from "../types";

class NumberOfSets implements ExerciseChallengeDefinition {
  get id(): ExerciseChallengeType {
    return ExerciseChallengeType.NumberOfSets;
  }
  get name(): string {
    return "Number of sets";
  }
  get unit(): string {
    return "sets";
  }
  get description(): string {
    return "Target number of sets done within given interval";
  }
  getSummary(challenge: ExerciseChallenge): string {
    return `${challenge.target} set(s) of eligible exercises`;
  }
  get explanation(): string {
    throw new Error("Method not implemented.");
  }

  isSetFulfilledChallenge(
    set: ExerciseSet,
    challenge: ExerciseChallenge
  ): boolean {
    return true;
  }
  achievedValueFromSet(set: ExerciseSet): number {
    return 1;
  }
}

const definition = new NumberOfSets();
export default definition;
