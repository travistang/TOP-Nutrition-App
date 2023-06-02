import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useRecoilState, useSetRecoilState } from "recoil";
import { fabMenuAtom } from "../../atoms/FabMenuAtom";
import {
  createEditRecordAtom,
  ModalOpenSource,
} from "../../atoms/CreateEditRecordAtom";
import {
  createEditExerciseRecordAtom,
  DEFAULT_EXERCISE_RECORD,
} from "../../atoms/CreateEditExerciseRecordAtom";
import { createMeasurementRecordAtom } from "../../atoms/CreateMeasurementAtom";
import { DEFAULT_MEASUREMENT } from "../../types/Measurement";
import { DEFAULT_CONSUMPTION } from "../../types/Consumption";
import useCardioExerciseMutation from "../../atoms/CreateEditCardioExerciseRecordAtom";

type Props = {
  text: string;
  icon: IconProp;
  onClick: () => void;
};
function FabMenuItem({ text, icon, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="flex flex-row justify-end items-center gap-2 flex-nowrap px-4 text-sm font-bold"
    >
      {text}
      <FontAwesomeIcon
        icon={icon}
        className="rounded-full bg-blue-500 child:fill-gray-200 p-2 h-8 w-8 items-center justify-center"
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
      className="backdrop-blur-sm fixed inset-0 z-40 flex flex-col justify-end gap-2 pb-20"
    >
      <FabMenuItem
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
        onClick={onOpenCardioExerciseModal}
        text="Add cardio exercise"
        icon="person-running"
      />
      <FabMenuItem
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
