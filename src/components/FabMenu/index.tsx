import { useRecoilState, useSetRecoilState } from "recoil";
import { createEditAchievementAtom } from "../../atoms/CreateEditAchievementAtom";
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
import { DEFAULT_ACHIEVEMENT } from "../../types/Achievement";
import { DEFAULT_MEAL_PREP, mealPrepAtom } from "../../atoms/MealPrepAtom";
import { DEFAULT_CONSUMPTION } from "../../types/Consumption";
import { DEFAULT_MEASUREMENT } from "../../types/Measurement";
import FabMenuItem, { FabMenuItemProps } from "./FabMenuItem";

enum FabItem {
  AddMealPrep = "add-meal-prep",
  AddAchievement = "add-achievement",
  AddMeasurement = "add-measurement",
  AddCardioExercise = "add-cardio",
  AddExercise = "add-exercise",
  AddConsumption = "add-consumption",
}

const FAB_HANDLERS: Record<FabItem, Omit<FabMenuItemProps, "onClick">> = {
  [FabItem.AddMealPrep]: {
    text: "MealPrep",
    icon: "boxes",
  },
  [FabItem.AddAchievement]: {
    text: "Add achievement",
    icon: "trophy",
  },
  [FabItem.AddMeasurement]: {
    text: "Add measurement",
    icon: "ruler-horizontal",
  },
  [FabItem.AddCardioExercise]: {
    text: "Add cardio exercise",
    icon: "person-running",
  },
  [FabItem.AddExercise]: {
    text: "Add exercise",
    icon: "dumbbell",
  },
  [FabItem.AddConsumption]: {
    text: "Add consumption",
    icon: "hamburger",
  },
};

export default function FabMenu() {
  const setCreateEditRecord = useSetRecoilState(createEditRecordAtom);
  const setMealPrepAtom = useSetRecoilState(mealPrepAtom);
  const setCreateMeasurementRecord = useSetRecoilState(
    createMeasurementRecordAtom
  );
  const setCreateAchievement = useSetRecoilState(createEditAchievementAtom);
  const setCreateExerciseRecord = useSetRecoilState(
    createEditExerciseRecordAtom
  );

  const { onOpen: onOpenCardioExerciseModal } = useCardioExerciseMutation();

  const [{ fabMenuOpened }, setFabMenuOpened] = useRecoilState(fabMenuAtom);
  if (!fabMenuOpened) return null;

  const closeFabMenu = () => setFabMenuOpened({ fabMenuOpened: false });

  const getHandlers = (item: FabItem) => () => {
    switch (item.toString() as unknown as FabItem) {
      case FabItem.AddMealPrep:
        setMealPrepAtom({
          mealPrep: DEFAULT_MEAL_PREP,
          modalOpened: true,
        });
        break;
      case FabItem.AddMeasurement:
        setCreateMeasurementRecord({
          record: DEFAULT_MEASUREMENT,
          modalOpened: true,
        });
        break;
      case FabItem.AddCardioExercise:
        onOpenCardioExerciseModal();
        break;
      case FabItem.AddExercise:
        setCreateExerciseRecord(() => ({
          ...DEFAULT_EXERCISE_RECORD,
          modalOpened: true,
          date: new Date(),
        }));
        break;
      case FabItem.AddConsumption:
        setCreateEditRecord(() => ({
          record: DEFAULT_CONSUMPTION,
          openingSource: ModalOpenSource.Cta,
        }));
        break;
      case FabItem.AddAchievement:
        setCreateAchievement({ achievement: DEFAULT_ACHIEVEMENT });
        break;
    }
  };

  return (
    <div
      onClick={closeFabMenu}
      className="animate-blur fixed inset-0 z-40 flex flex-col justify-end gap-2 pb-20"
    >
      {Object.entries(FAB_HANDLERS).map(([item, { text, icon }]) => (
        <FabMenuItem
          key={item}
          onClick={getHandlers(item as unknown as FabItem)}
          text={text}
          icon={icon}
        />
      ))}
    </div>
  );
}
