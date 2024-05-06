import { ExerciseSet } from "../../../../types/Exercise";
import {
  ExerciseChallenge,
  ExerciseChallengeType,
} from "../../../../types/ExerciseChallenge";
import { ExerciseChallengeDefinition } from "../types";

class SetOfWeights implements ExerciseChallengeDefinition {
  getTypeSpecificData(): { unit: string; description: string } {
    return {
      unit: "kg",
      description: "weight used in entitled sets",
    };
  }

  getSummary(challenge: ExerciseChallenge): string {
    const { target, typeSpecificValue } = challenge;
    return `${target} set(s) of eligible exercises with ${typeSpecificValue} kg or more`;
  }
  get description(): string {
    return "Target number of sets done using at least X kg of weights";
  }
  get name(): string {
    return "Number of sets";
  }
  get unit() {
    return "sets";
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

  get id() {
    return ExerciseChallengeType.NumberOfSets;
  }
}

const definition = new SetOfWeights();
export default definition;
