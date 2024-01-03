import { format } from "date-fns";
import { useMemo } from "react";
import ExerciseDatabase from "../../database/ExerciseDatabase";
import { getTimeFromInterval } from "../../domain/Challenges/exerciseChallenge";
import useFetch from "../../hooks/useFetch";
import { ExerciseChallenge } from "../../types/ExerciseChallenge";
import Section from "../Section";

type Props = {
  date: number;
  challenge: ExerciseChallenge;
};

const fetchWorkoutSets = (fetchWorkoutProps: Props) =>
  ExerciseDatabase.getWorkoutsForChallenge(
    fetchWorkoutProps.challenge,
    fetchWorkoutProps.date
  );

const formatDate = (date: number) => format(date, "dd/MM/yyyy");

export default function ExerciseChallengePeriodSection(props: Props) {
  const { result: workouts, loading } = useFetch(props, fetchWorkoutSets);
  const sectionTitle = useMemo(() => {
    const [start, end] = getTimeFromInterval(
      props.challenge.interval,
      props.date
    );
    return `${formatDate(start)} - ${formatDate(end)}`;
  }, [props.challenge.interval, props.date]);

  return <Section label={sectionTitle}></Section>;
}
