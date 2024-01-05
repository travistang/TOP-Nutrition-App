import { addDays, subDays } from "date-fns";
import { computeChallengeStatus } from ".";
import {
  Achievement,
  Challenge,
  ChallengeMode,
  ChallengePeriod,
  ChallengeStatus,
  ChallengeTargetUnit,
} from "../../types/Achievement";

type TestTableRow = {
  mode: ChallengeMode;
  achievedMoreThanTarget: boolean;
  challengeTimeFrame: "past" | "present" | "future";
  expectedStatus: ChallengeStatus;
};
type TestTableRowFlattened = [
  TestTableRow["mode"],
  TestTableRow["achievedMoreThanTarget"],
  TestTableRow["challengeTimeFrame"],
  TestTableRow["expectedStatus"]
];

const MOCK_CHALLENGE: Challenge = {
  mode: ChallengeMode.GreaterThanTarget,
  description: "",
  name: "",
  period: ChallengePeriod.Daily,
  id: "",
  target: 42,
  unit: ChallengeTargetUnit.Person,
};
const MOCK_CHALLENGE_DATE_MAPPING: Record<
  TestTableRow["challengeTimeFrame"],
  number
> = {
  past: subDays(Date.now(), 7).getTime(),
  present: Date.now(),
  future: addDays(Date.now(), 7).getTime(),
};

describe("Challenges domain", () => {
  describe("computeChallengeStatus", () => {
    const testCases: TestTableRowFlattened[] = [
      [
        ChallengeMode.GreaterThanTarget,
        true,
        "past",
        ChallengeStatus.Completed,
      ],
      [
        ChallengeMode.GreaterThanTarget,
        true,
        "present",
        ChallengeStatus.Completed,
      ],
      [
        ChallengeMode.GreaterThanTarget,
        true,
        "future",
        ChallengeStatus.NotStarted,
      ],

      [ChallengeMode.GreaterThanTarget, false, "past", ChallengeStatus.Failed],
      [
        ChallengeMode.GreaterThanTarget,
        false,
        "present",
        ChallengeStatus.Ongoing,
      ],
      [
        ChallengeMode.GreaterThanTarget,
        false,
        "future",
        ChallengeStatus.NotStarted,
      ],

      [ChallengeMode.LessThanTarget, true, "past", ChallengeStatus.Failed],
      [ChallengeMode.LessThanTarget, true, "present", ChallengeStatus.Failed],
      [
        ChallengeMode.LessThanTarget,
        true,
        "future",
        ChallengeStatus.NotStarted,
      ],

      [ChallengeMode.LessThanTarget, false, "past", ChallengeStatus.Completed],
      [ChallengeMode.LessThanTarget, false, "present", ChallengeStatus.Ongoing],
      [
        ChallengeMode.LessThanTarget,
        false,
        "future",
        ChallengeStatus.NotStarted,
      ],
    ];

    const testCasesFormatted = testCases.map<TestTableRow>((row) => ({
      mode: row[0],
      achievedMoreThanTarget: row[1],
      challengeTimeFrame: row[2],
      expectedStatus: row[3],
    }));

    it.each(testCasesFormatted)(
      "When challenge mode is $mode and achieved more is $achievedMoreThanTarget and the challenge period is in the $challengeTimeFrame, then the expected status should be $expectedStatus",
      ({
        mode,
        achievedMoreThanTarget,
        challengeTimeFrame,
        expectedStatus,
      }: TestTableRow) => {
        const mockChallenge: Challenge = {
          ...MOCK_CHALLENGE,
          mode,
        };
        const mockAchievements: Achievement[] = [
          {
            id: "",
            date: Date.now(),
            value: achievedMoreThanTarget ? 424 : 1,
            details: "",
            completedChallengeIds: [],
          },
        ];
        expect(
          computeChallengeStatus(
            mockChallenge,
            mockAchievements,
            MOCK_CHALLENGE_DATE_MAPPING[challengeTimeFrame]
          )
        ).toEqual(expectedStatus);
      }
    );
  });
});
