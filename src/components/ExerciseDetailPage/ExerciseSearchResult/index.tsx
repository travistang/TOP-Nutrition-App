import { Exercise } from "../../../types/Exercise";
import Section from "../../Section";

type Props = {
  exercise: Exercise;
};
export default function ExerciseSearchResult({ exercise }: Props) {
  return (
    <>
      <Section label="Exercise information" className="gap-2">
        <div className="flex justify-between items-center">
          <h3 className="font-bold flex-1">{exercise.name}</h3>
        </div>
      </Section>
    </>
  );
}
