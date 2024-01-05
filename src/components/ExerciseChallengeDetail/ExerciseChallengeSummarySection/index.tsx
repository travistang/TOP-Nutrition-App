import { challengeComparisonText, challengeConstraintText, createChallengeTypeText } from "../../../domain/Challenges/exerciseChallenge";
import { ExerciseChallenge } from "../../../types/ExerciseChallenge"
import { MarcoNutritionColor } from "../../../types/Nutrition";
import Chip from "../../Chip";
import Section from "../../Section";

type Props = {
    challenge: ExerciseChallenge;
}
export default function ExerciseChallengeSummarySection({ challenge }: Props) {
    const { name, interval, mode, exerciseConstraint } = challenge;
    return (
        <div className="grid grid-cols-6 gap-2">
            <span className="col-span-4 line-clamp-2 text-eliipsis overflow-hidden font-bold text-sm">
                {name}
            </span>
            <Chip
                color={MarcoNutritionColor.protein}
                text={challenge.interval.toString()}
                className="h-min self-center col-span-2 font-bold text-xs px-2 flex items-center justify-center"
            />
            <Section label="Explanation" icon="info-circle" className="text-xs col-span-full">
                <div className="py-1">
                    Complete the challenge by doing <b>{challengeComparisonText(mode)} {createChallengeTypeText(challenge)}</b>.
                    This challenge resets <b>{interval.toString()}</b>.
                    <br />
                    <br />
                    <p>
                        {challengeConstraintText(exerciseConstraint)} are eligible for completing this challenge.
                    </p>
                </div>
            </Section>
        </div>
    )
}