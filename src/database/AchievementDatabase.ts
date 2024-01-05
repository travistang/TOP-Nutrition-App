import { endOfDay, isAfter, startOfDay } from "date-fns";
import Dexie, { Table } from "dexie";
import { getChallengePeriodOnDay } from "../domain/Challenges";
import { Achievement, Challenge } from "../types/Achievement";
import NumberUtils from "../utils/Number";

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

  getChallengeByIds(ids: string[]) {
    return this.challenges
      .bulkGet(ids)
      .then(
        (challenges) =>
          challenges.filter((challenge) => !!challenge) as Challenge[]
      );
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

  getAchievementsByChallengeBetweenDates(id: string, from: number, to: number) {
    return this.achievements
      .where("completedChallengeIds")
      .equals(id)
      .filter((achievement) =>
        NumberUtils.isBetween(from, achievement.date, to)
      )
      .sortBy("date");
  }

  getAchievementsOfChallengeInPeriodAtDate(challenge: Challenge, date: number) {
    const [start, end] = getChallengePeriodOnDay(challenge.period, date);
    return this.achievements
      .where("completedChallengeIds")
      .equals(challenge.id)
      .filter((achievement) => {
        return NumberUtils.isBetween(start, achievement.date, end);
      })
      .toArray();
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

  updateAchievement(id: string, data: Omit<Achievement, "id">) {
    return this.achievements.update(id, data);
  }

  deleteAchievement(id: string) {
    return this.achievements.delete(id);
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
