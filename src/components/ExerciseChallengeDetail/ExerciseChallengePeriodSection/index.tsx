import { useCallback, useState } from "react";
import ExerciseDatabase from "../../../database/ExerciseDatabase";
import useFetch from "../../../hooks/useFetch";
import { ExerciseChallenge } from "../../../types/ExerciseChallenge";
import ItemPlaceholder, {
  ItemPlaceholderType,
} from "../../Placeholders/ItemPlaceholder";
import Repeat from "../../Repeat";
import SetItem from "../../WorkoutOfDayList/SetItem";
import CollapsibleSection from "../../CollapsibleSection";
import ExerciseChallengePeriodSectionHeader from "./ExerciseChallengePeriodSectionHeader";
import List from "../../List";
import { ExerciseSet } from "../../../types/Exercise";

type Props = {
  date: number;
  challenge: ExerciseChallenge;
};

const fetchWorkoutSets = (fetchWorkoutProps: Props) =>
  ExerciseDatabase.getWorkoutsForChallenge(
    fetchWorkoutProps.challenge,
    fetchWorkoutProps.date
  );

const workoutRenderer = ({
  item,
  index,
}: {
  item: ExerciseSet;
  index: number;
}) => {
  return <SetItem index={index} set={item} key={index} properties={[]} />;
};

export default function ExerciseChallengePeriodSection(props: Props) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = useCallback(() => setExpanded((exp) => !exp), []);
  const { result: workouts, loading } = useFetch(props, fetchWorkoutSets);

  return (
    <CollapsibleSection
      expanded={expanded}
      onToggleExpand={toggleExpand}
      label={
        <ExerciseChallengePeriodSectionHeader
          challenge={props.challenge}
          workouts={workouts ?? []}
          date={props.date}
        />
      }
    >
      {loading && (
        <Repeat times={3}>
          <ItemPlaceholder type={ItemPlaceholderType.IconWithOneLine} />
        </Repeat>
      )}
      <List
        emptyMessage="No workouts fulfills the challenge during this period"
        items={workouts ?? []}
      >
        {workoutRenderer}
      </List>
    </CollapsibleSection>
  );
}
