import { endOfDay, isAfter, startOfDay } from "date-fns";
import Dexie, { Table } from "dexie";
import { Achievement, Challenge } from "../types/Achievement";

class AchievementDatabase extends Dexie {
  challenges!: Table<Challenge>;
  achievements!: Table<Achievement>;

  constructor() {
    super("achievementDatabase");

    this.version(1).stores({
      challenges: "++id,name,description,mode,target,period,unit",
      achievements: "++id,details,value,date, *completedChallengeIds",
    });
  }

  async getRegisteredChallengeUnits() {
    let units: Record<string, true> = {};
    await this.challenges.each((challenge) => {
      units[challenge.unit] = true;
    });

    return Object.keys(units);
  }
  getAllChallenges() {
    return this.challenges
      .filter((challenge) => {
        if (!challenge.endsAt) return true;
        return isAfter(challenge.endsAt, Date.now());
      })
      .toArray();
  }

  getAllAchievementsOfDay(day: number) {
    return this.achievements
      .where("date")
      .between(startOfDay(day), endOfDay(day), true)
      .sortBy("date");
  }

  getAllAchievementsByChallenge(id: string) {
    return this.achievements
      .where("completedChallengeIds")
      .equals(id)
      .sortBy("date");
  }

  createChallenge(data: Omit<Challenge, "id">) {
    return this.challenges.add({
      ...data,
      id: window.crypto.randomUUID(),
    });
  }

  recordAchievement(data: Omit<Achievement, "id">) {
    return this.achievements.add({
      ...data,
      id: window.crypto.randomUUID(),
    });
  }

  async removeChallenges(id: string) {
    await this.challenges.delete(id);
    await this.achievements.toCollection().modify((achievement) => {
      achievement.completedChallengeIds =
        achievement.completedChallengeIds.filter(
          (challengeId) => challengeId !== id
        );
    });
  }
}

const achievementDatabase = new AchievementDatabase();
export default achievementDatabase;
