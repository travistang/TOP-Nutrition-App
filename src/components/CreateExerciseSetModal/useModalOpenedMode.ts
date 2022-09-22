import { useRecoilValue } from "recoil";
import { createEditExerciseRecordAtom } from "../../atoms/CreateEditExerciseRecordAtom";

export enum ExerciseModalOpenMode {
  Adding,
  Editing,
  Viewing,
}

export default function useModalOpenedMode(): ExerciseModalOpenMode {
  const { id, readonly } = useRecoilValue(createEditExerciseRecordAtom);

  if (!id) return ExerciseModalOpenMode.Adding;

  return readonly
    ? ExerciseModalOpenMode.Viewing
    : ExerciseModalOpenMode.Editing;
}
