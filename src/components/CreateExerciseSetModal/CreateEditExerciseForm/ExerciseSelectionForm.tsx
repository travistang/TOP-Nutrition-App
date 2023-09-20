import classNames from "classnames";
import { useState } from "react";
import { ExerciseDetail } from "../../../types/Exercise";
import EmptyNotice from "../../EmptyNotice";
import ImageViewer from "../../ImageViewer";

type Props = {
  className?: string;
  onSelect: (exercise?: ExerciseDetail) => void;
  exercise?: ExerciseDetail;
};
export default function ExerciseSelectionForm({
  onSelect,
  exercise,
  className,
}: Props) {
  const [editing, setEditing] = useState(false);

  if (!exercise) {
    return (
      <EmptyNotice
        message="Click to select exercise..."
        onClick={() => setEditing(true)}
      />
    );
  }
  return (
    <div className={classNames("grid grid-cols-6 gap-2", className)}>
      <ImageViewer
        className="row-span-full col-span-2"
        image={exercise.image ?? null}
      />
      <span className="font-bold text-sm col-span-4">{exercise.name}</span>
    </div>
  );
}
