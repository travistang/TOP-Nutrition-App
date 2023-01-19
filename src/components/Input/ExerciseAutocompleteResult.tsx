import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EquipmentIcon, Exercise } from "../../types/Exercise";
import StringUtils from '../../utils/String';

type Props = {
    exercise: Exercise;
};

export default function ExerciseAutocompleteResult({ exercise }: Props) {
    return (
        <div className="grid grid-cols-6 self-center items-center">
            <div className="font-bold  text-sm col-span-5">{exercise.name}</div>
            <FontAwesomeIcon
                icon={EquipmentIcon[exercise.equipment]}
                className="col-span-1 col-start-6"
            />
            <span className="text-xs col-span-full leading-4">{StringUtils.normalizeSnakeCase(exercise.exerciseMode)}</span>
        </div>
    );
}