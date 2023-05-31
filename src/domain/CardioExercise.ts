import { CardioExercise, CardioExerciseType } from "../types/CardioExercise";

export const isValid = (cardio: CardioExercise) => {
  switch (cardio.type) {
    case CardioExerciseType.Bouldering:
      return cardio.durationMinutes > 0;
    case CardioExerciseType.Hiking:
      return (
        cardio.durationMinutes > 0 && !!cardio.tripName && cardio.elevation > 0
      );
    case CardioExerciseType.Running:
      return cardio.durationMinutes > 0 && cardio.distanceKm > 0;
    default:
      return false;
  }
};
