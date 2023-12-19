import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import ExerciseDatabase from "../../../database/ExerciseDatabase";
import EmptyNotice from "../../EmptyNotice";
import Button, { ButtonStyle } from "../../Input/Button";
import Section from "../../Section";
import CreateExerciseChallengeModal from "./CreateExerciseChallengeModal";

export default function ExerciseChallengeSection() {
  const challenges = useLiveQuery(
    () => ExerciseDatabase.getAllExerciseChallenges(),
    []
  );
  const noChallenges = challenges?.length === 0;
  const [creatingChallenge, setCreatingChallenge] = useState(false);

  return (
    <>
      <CreateExerciseChallengeModal
        opened={creatingChallenge}
        onClose={() => setCreatingChallenge(false)}
      />
      <Section icon="dumbbell" label="Exercise challenges">
        {noChallenges && (
          <EmptyNotice className="pt-4 pb-2" message="No challenges" />
        )}
        <div className="flex items-center justify-end">
          <Button
            onClick={() => setCreatingChallenge(true)}
            buttonStyle={ButtonStyle.Clear}
            className="text-sm"
            text="Create"
            icon="plus"
          />
        </div>
      </Section>
    </>
  );
}
