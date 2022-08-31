import React from "react";
import classNames from "classnames";
import { useRecoilState } from "recoil";
import { createEditExerciseRecordAtom } from "../../atoms/CreateEditExerciseRecordAtom";
import { BodyPart } from "../../types/Exercise";
import ArrayUtils from "../../utils/Array";
import InputBase from "../Input/InputBase";

type Props = {
  className?: string;
};
export default function WorkingBodyPartInput({ className }: Props) {
  const [{ exercise }, setCreateEditRecordAtom] = useRecoilState(
    createEditExerciseRecordAtom
  );

  const { workingBodyParts } = exercise;
  const isPartSelected = (part: BodyPart) => workingBodyParts.includes(part);
  const onToggleBodyPart = (part: BodyPart) => () => {
    const updatedBodyParts = ArrayUtils.toggleElement(workingBodyParts, part);
    setCreateEditRecordAtom((record) => ({
      ...record,
      exercise: { ...exercise, workingBodyParts: updatedBodyParts },
    }));
  };
  return (
    <InputBase label="Body part(s)" className="col-span-full">
      <div
        className={classNames(
          "grid grid-cols-4 rounded-lg border-2 border-gray-500 p-2 gap-1",
          className
        )}
      >
        {Object.values(BodyPart).map((part) => (
          <div
            className={classNames(
              "text-sm flex items-center capitalize cursor-pointer h-12 rounded-lg px-2",
              isPartSelected(part) ? "bg-gray-600 text-gray-200" : 'text-gray-500'
            )}
            key={part}
            onClick={onToggleBodyPart(part)}
          >
            {part}
          </div>
        ))}
      </div>
    </InputBase>
  );
}
