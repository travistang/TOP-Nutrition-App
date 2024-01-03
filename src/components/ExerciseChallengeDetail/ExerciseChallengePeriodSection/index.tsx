import { format } from "date-fns";
import { useMemo } from "react";
import ExerciseDatabase from "../../../database/ExerciseDatabase";
import { getTimeFromInterval } from "../../../domain/Challenges/exerciseChallenge";
import useFetch from "../../../hooks/useFetch";
import { ExerciseChallenge } from "../../../types/ExerciseChallenge";
import Section from "../../Section";
import ItemPlaceholder, { ItemPlaceholderType } from "../../Placeholders/ItemPlaceholder";
import Repeat from "../../Repeat";
import WorkoutListPage from "../../../pages/WorkoutListPage";
import SetEntry from "../../WorkoutOfDayList/SetEntry";
import SetItem from "../../WorkoutOfDayList/SetItem";

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

  return <Section label={sectionTitle}>
    {loading &&
      <Repeat times={3}>
        <ItemPlaceholder type={ItemPlaceholderType.IconWithOneLine} />
      </Repeat>
    }
    {workouts?.map((workout, index) => <SetItem key={workout.id} set={workout} index={index} properties={[]} />)}
  </Section>;
}
