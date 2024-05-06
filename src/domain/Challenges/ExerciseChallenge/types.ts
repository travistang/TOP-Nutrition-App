import { ExerciseSet } from "../../../types/Exercise";
import {
  ExerciseChallenge,
  ExerciseChallengeType,
} from "../../../types/ExerciseChallenge";

export abstract class ExerciseChallengeDefinition {
  abstract get id(): ExerciseChallengeType;
  abstract get name(): string;
  abstract get unit(): string;
  abstract get description(): string;
  abstract getSummary(challenge: ExerciseChallenge): string;
  abstract get explanation(): string;
  abstract getTypeSpecificData?(): { unit: string; description: string };
  abstract isSetFulfilledChallenge(
    set: ExerciseSet,
    challenge: ExerciseChallenge
  ): boolean;
  abstract achievedValueFromSet(set: ExerciseSet): number;
}
