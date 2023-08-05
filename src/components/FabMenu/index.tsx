import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState, useSetRecoilState } from "recoil";
import useCardioExerciseMutation from "../../atoms/CreateEditCardioExerciseRecordAtom";
import {
  DEFAULT_EXERCISE_RECORD,
  createEditExerciseRecordAtom,
} from "../../atoms/CreateEditExerciseRecordAtom";
import {
  ModalOpenSource,
  createEditRecordAtom,
} from "../../atoms/CreateEditRecordAtom";
import { createMeasurementRecordAtom } from "../../atoms/CreateMeasurementAtom";
import { fabMenuAtom } from "../../atoms/FabMenuAtom";
import { DEFAULT_CONSUMPTION } from "../../types/Consumption";
import { DEFAULT_MEASUREMENT } from "../../types/Measurement";

type Props = {
  text: string;
  icon: IconProp;
  onClick: () => void;
  index: number;
};
function FabMenuItem({ index, text, icon, onClick }: Props) {
  const animationStyle = { animationDelay: `${index * 100}ms` };
  return (
    <div
      onClick={onClick}
      className=" flex flex-row justify-end items-center gap-2 flex-nowrap px-4 text-sm font-bold"
    >
      <span
        className="text-sm font-bold animate-move-in opacity-0"
        style={animationStyle}
      >
        {text}
      </span>
      <FontAwesomeIcon
        icon={icon}
        style={animationStyle}
        className="translate-y-[50vw] animate-move-up opacity-0 rounded-full bg-blue-500 child:fill-gray-200 p-2 h-8 w-8 items-center justify-center"
      />
    </div>
  );
}

export default function FabMenu() {
  const setCreateEditRecord = useSetRecoilState(createEditRecordAtom);
  const setCreateMeasurementRecord = useSetRecoilState(
    createMeasurementRecordAtom
  );
  const setCreateExerciseRecord = useSetRecoilState(
    createEditExerciseRecordAtom
  );

  const { onOpen: onOpenCardioExerciseModal } = useCardioExerciseMutation();

  const [{ fabMenuOpened }, setFabMenuOpened] = useRecoilState(fabMenuAtom);
  if (!fabMenuOpened) return null;

  const closeFabMenu = () => setFabMenuOpened({ fabMenuOpened: false });
  return (
    <div
      onClick={closeFabMenu}
      className="animate-blur fixed inset-0 z-40 flex flex-col justify-end gap-2 pb-20"
    >
      <FabMenuItem
        index={0}
        onClick={() =>
          setCreateMeasurementRecord({
            record: DEFAULT_MEASUREMENT,
            modalOpened: true,
          })
        }
        text="Add measurement"
        icon="ruler-horizontal"
      />
      <FabMenuItem
        index={1}
        onClick={onOpenCardioExerciseModal}
        text="Add cardio exercise"
        icon="person-running"
      />
      <FabMenuItem
        index={2}
        onClick={() =>
          setCreateExerciseRecord(() => ({
            ...DEFAULT_EXERCISE_RECORD,
            modalOpened: true,
            date: new Date(),
          }))
        }
        text="Add exercise"
        icon="dumbbell"
      />
      <FabMenuItem
        index={3}
        onClick={() =>
          setCreateEditRecord(() => ({
            record: DEFAULT_CONSUMPTION,
            openingSource: ModalOpenSource.Cta,
          }))
        }
        text="Add consumption"
        icon="hamburger"
      />
    </div>
  );
}
