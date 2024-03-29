import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { differenceInDays } from "date-fns";

import { ExerciseSetRecord } from "../../database/ExerciseDatabase";
import { EquipmentIcon } from "../../types/Exercise";
import StringUtils from "../../utils/String";
import { useSetRecoilState } from "recoil";
import { createEditExerciseRecordAtom } from "../../atoms/CreateEditExerciseRecordAtom";
import classNames from "classnames";

type Props = {
  workouts: ExerciseSetRecord[];
  dateStringClassName?: string;
};

const getWorkoutDateString = (workoutDate: Date | number) => {
  const daysAgo = differenceInDays(Date.now(), workoutDate);
  if (daysAgo === 0) return "today";
  if (daysAgo < 15) return `${daysAgo} day(s) ago`;
  return `on ${format(workoutDate, "dd/MM")}`;
};
export default function PreviousWorkoutList({ workouts, dateStringClassName }: Props) {
  const setEditingExerciseItem = useSetRecoilState(
    createEditExerciseRecordAtom
  );

  if (workouts.length === 0) return null;
  const workoutDate = workouts[0].date;
  const editSet = (set: ExerciseSetRecord) => {
    setEditingExerciseItem({
      ...set,
      readonly: false,
      date: new Date(set.date),
      modalOpened: true,
    });
  };
  return (
    <>
      <div className={classNames(
        "flex items-center justify-center w-full text-xs sticky z-10 top-0 py-4 px-2 rounded-full text-opacity-75",
        dateStringClassName
      )}>
        <span className="w-[30vw] p-2 bg-gray-300 rounded-full font-bold text-center">
          {getWorkoutDateString(workoutDate)}
        </span>
      </div>
      {workouts.sort((a, b) => b.date - a.date).map((set) => (
        <div key={set.id} className="w-full py-2 grid grid-cols-12">
          <span className="h-full col-span-2 text-xs font-bold flex items-center justify-center text-gray-200 mx-2">
            <FontAwesomeIcon
              icon={EquipmentIcon[set.exercise.equipment]}
              className="w-4 h-4 mr-4"
            />
          </span>
          <div className="col-span-6 overflow-hidden flex flex-col items-stretch">
            <span className="text-sm font-bold flex items-center flex-nowrap text-ellipsis">
              {StringUtils.normalizeSnakeCase(set.exercise.exerciseMode)}
            </span>
            <span className="text-xs opacity-70">
              {format(set.date, "HH:mm")}
            </span>
          </div>
          <div className="col-span-2 flex text-right flex-col items-stretch">
            <span className="text-sm font-bold">
              {set.repetitions.weight} kg
            </span>
            <span className="opacity-75 text-xs">
              x {set.repetitions.count}
            </span>
          </div>
          <div
            onClick={() => editSet(set)}
            className="col-span-2 flex items-center justify-center"
          >
            <FontAwesomeIcon icon="pen" />
          </div>
        </div>
      ))}
    </>
  );
}
