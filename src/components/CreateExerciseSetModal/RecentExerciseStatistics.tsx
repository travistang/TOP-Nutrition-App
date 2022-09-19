import React from 'react';
import { ExerciseSetRecord } from '../../database/ExerciseDatabase';
import RepetitionUtils from '../../utils/Repetition';
import NumberUtils from '../../utils/Number';
import Button, { ButtonStyle } from '../Input/Button';
import ScalarWidget from '../Widgets/ScalarWidget';
import { useSetRecoilState } from 'recoil';
import { createEditExerciseRecordAtom } from '../../atoms/CreateEditExerciseRecordAtom';
import { DEFAULT_REPETITION } from '../../types/Exercise';

type Props = {
  recentExercises: ExerciseSetRecord[];
};
export default function RecentExerciseStatistics({ recentExercises }: Props) {
  const setExerciseAtom = useSetRecoilState(createEditExerciseRecordAtom);
  const addExercise = () => {
    if (recentExercises.length === 0) return;
    const { exercise, repetitions: recentRepetitions } = recentExercises[recentExercises.length - 1];
    setExerciseAtom(atom => ({
      ...atom,
      readonly: false,
      id: undefined,
      date: new Date(),
      exercise,
      repetitions: recentRepetitions,
    }));
  }
  const exerciseName = recentExercises[0]?.exercise.name ?? '--';
  const repetitions = recentExercises.map(e => e.repetitions);
  const volumes = repetitions.map(RepetitionUtils.volume);
  const weights = repetitions.map(r => r.weight);
  const [minVolume, maxVolume] = NumberUtils.range(...volumes);
  const [minWeight, maxWeight] = NumberUtils.range(...weights);

  return (
    <div className="grid grid-cols-6 gap-2 sticky top-0 bg-gray-200">
      <span className="col-span-4">{exerciseName}</span>
      <Button
        onClick={addExercise}
        className="col-span-2 h-8 gap-1"
        textClassName='child:fill-gray-50'
        buttonStyle={ButtonStyle.Block}
        text="Add"
        icon="plus"
      />
      <ScalarWidget className="col-span-3" value={minWeight} label="Min. weight" unit="kg" />
      <ScalarWidget className="col-span-3" value={maxWeight} label="Max weight" unit="kg" />
      <ScalarWidget className="col-span-3" value={minVolume} label="Min. volume" unit="kg x rep" />
      <ScalarWidget className="col-span-3" value={maxVolume} label="Max volume" unit="kg x rep" />
    </div>
  );
}