import { ChallengeMode, ChallengeStatus } from "../../types/Achievement";
import ArrayUtils from "../../utils/Array";

type TestTableRow = {
  mode: ChallengeMode;
  achievedMoreThanTarget: boolean;
  challengeTimeFrame: "past" | "present" | "future";
  expectedStatus: ChallengeStatus;
};
describe("Challenges domain", () => {
  describe("hasFailedChallenges", () => {
    const modes = [
      ChallengeMode.GreaterThanTarget,
      ChallengeMode.LessThanTarget,
    ];
    const testCases = ArrayUtils.permute([
      Object.values(ChallengeMode),
      [true, false],
      ["past", "present", "future"] as const,
      Object.values(ChallengeStatus),
    ]) as [
      ChallengeMode,
      boolean,
      TestTableRow["challengeTimeFrame"],
      ChallengeStatus
    ][];
  });
});
