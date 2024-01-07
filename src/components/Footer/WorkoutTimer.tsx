import { differenceInMinutes } from "date-fns";
import ExerciseDatabase from "../../database/ExerciseDatabase";
import { EventBusName } from "../../domain/EventBus";
import useEventBus from "../../hooks/useEventBus";
import useFetch from "../../hooks/useFetch";
import TimerText from "../TimerText";
import SetItem from "../WorkoutOfDayList/SetItem";

const getMostRecentExerciseOfDay = () =>
  ExerciseDatabase.exercisesOfDay().then((exercises) => {
    const lastSet = exercises.at(-1);
    if (!lastSet) return null;
    const isSetTooOld =
      Math.abs(differenceInMinutes(Date.now(), lastSet.date)) >= 20;
    if (isSetTooOld) return null;
    return lastSet;
  });

export default function WorkoutTimer() {
  const { result: lastSetOfToday, refetch } = useFetch(
    null,
    getMostRecentExerciseOfDay
  );
  useEventBus(EventBusName.Workouts, refetch);

  if (!lastSetOfToday) return null;

  return (
    <div className="flex items-center p-2 text-sm bg-blue-600 text-gray-200 absolute left-0 right-0 bottom-full z-50 h-16">
      <div className="flex flex-col gap-1 items-stretch justify-start border-r border-gray-200/50 pr-2 mr-2">
        <TimerText
          className="font-bold text-gray-200 text-3xl"
          time={lastSetOfToday.date}
        />
      </div>
      <SetItem
        set={lastSetOfToday}
        properties={[]}
        preview
        className="child:child:text-gray-200 child:child:child:child:fill-gray-200 child:child:child:fill-gray-200 child:child:whitespace-nowrap"
      />
    </div>
  );
}
