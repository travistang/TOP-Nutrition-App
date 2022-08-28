import { v4 as uuid } from "uuid";
import { ExerciseSetRecord } from "../database/ExerciseDatabase";
import { Equipment, Exercise, ExerciseMode } from "../types/Exercise";
import ExerciseDomain from "./Exercise";

const DUMMY_EXERCISE_1: Exercise = {
  name: "dummy1",
  workingBodyParts: [],
  equipment: Equipment.Barbell,
  exerciseMode: ExerciseMode.AlternateSides,
};
const DUMMY_EXERCISE_2: Exercise = {
  name: "dummy1",
  workingBodyParts: [],
  equipment: Equipment.Dumbbell,
  exerciseMode: ExerciseMode.AlternateSides,
};

const generateDummySet = (
  generatingDummy1: boolean,
  weight: number,
  date: number
): ExerciseSetRecord => ({
  exercise: generatingDummy1 ? DUMMY_EXERCISE_1 : DUMMY_EXERCISE_2,
  id: uuid(),
  repetitions: { weight, count: 10 },
  date,
});

describe("Exercise domain", () => {
  describe("detectDropSets", () => {
    it("should return empty array when given empty array", () => {
      expect(ExerciseDomain.detectDropSets([])).toEqual([]);
    });

    it("should return empty array when given one set only", () => {
      expect(
        ExerciseDomain.detectDropSets([generateDummySet(true, 20, 123)])
      ).toEqual([]);
    });

    test.each([
      [
        "Detect dropset with one kind of exercise only",
        [
          generateDummySet(true, 20, 123),
          generateDummySet(true, 10, 125),
          generateDummySet(true, 5, 127),
        ],
        [1, 2],
      ],
      [
        "Detect dropset with multiple exercises: foreign exercises before",
        [
          generateDummySet(true, 20, 123),
          generateDummySet(false, 10, 125),
          generateDummySet(false, 5, 127),
        ],
        [2],
      ],
      [
        "Detect dropset with multiple exercises: foreign exercises after",
        [
          generateDummySet(false, 20, 123),
          generateDummySet(false, 10, 125),
          generateDummySet(true, 5, 127),
        ],
        [1],
      ],
      [
        "Detect dropset with multiple exercises: combined",
        [
          generateDummySet(false, 20, 123),
          generateDummySet(false, 10, 125),
          generateDummySet(true, 5, 127),
          generateDummySet(true, 3, 127000000),
          generateDummySet(true, 5, 127001000),
          generateDummySet(true, 3, 127002000),
          generateDummySet(false, 2, 127003000),
        ],
        [1, 5],
      ],
    ])("detecting dropset: %s", (_, sets, expectedIndices) => {
      expect(ExerciseDomain.detectDropSets(sets)).toEqual(expectedIndices);
    });
  });

  describe("detectSuperSets", () => {
    it("should return empty array when given empty array", () => {
      expect(ExerciseDomain.detectSuperSets([])).toEqual([]);
    });

    it("should return empty array when given one set only", () => {
      expect(
        ExerciseDomain.detectSuperSets([generateDummySet(true, 20, 123)])
      ).toEqual([]);
    });
    test.each([
      [
        "Detect NO superset with one kind of exercise only",
        [
          generateDummySet(true, 20, 123),
          generateDummySet(true, 10, 125),
          generateDummySet(true, 5, 127),
        ],
        [],
      ],
      [
        "Detect superset 1",
        [
          generateDummySet(true, 20, 123),
          generateDummySet(false, 10, 125),
          generateDummySet(false, 5, 127),
        ],
        [1],
      ],
      [
        "Detect superset 2",
        [
          generateDummySet(false, 20, 123),
          generateDummySet(false, 10, 125),
          generateDummySet(true, 5, 127),
        ],
        [2],
      ],
      [
        "Detect superset with multiple exercises: combined",
        [
          generateDummySet(false, 20, 123),
          generateDummySet(false, 10, 125),
          generateDummySet(true, 5, 127),
          generateDummySet(true, 3, 127000000),
          generateDummySet(true, 5, 127001000),
          generateDummySet(true, 3, 127002000),
          generateDummySet(false, 2, 127003000),
        ],
        [2, 6],
      ],
    ])("detecting dropset: %s", (_, sets, expectedIndices) => {
      expect(ExerciseDomain.detectSuperSets(sets)).toEqual(expectedIndices);
    });
  });

  describe("detectWarmupSets", () => {
    it("should return empty array when given empty array", () => {
      expect(ExerciseDomain.detectWarmupSets([])).toEqual([]);
    });

    it("should return empty array when given one set only", () => {
      expect(
        ExerciseDomain.detectWarmupSets([generateDummySet(true, 20, 123)])
      ).toEqual([]);
    });

    test.each([
      [
        "Detect warmup set  with one kind of exercise only",
        [
          generateDummySet(true, 10, 123),
          generateDummySet(true, 50, 125),
          generateDummySet(true, 5, 127),
        ],
        [0],
      ],
      [
        "Detect warmup set with multiple exercises: foreign exercises before",
        [
          generateDummySet(true, 20, 123),
          generateDummySet(false, 10, 125),
          generateDummySet(false, 20, 127),
        ],
        [1],
      ],
      [
        "Detect warmup set with multiple exercises: foreign exercises after",
        [
          generateDummySet(false, 10, 123),
          generateDummySet(false, 20, 125),
          generateDummySet(true, 5, 127),
        ],
        [0],
      ],
      [
        "Detect warmup set with multiple exercises: combined",
        [
          generateDummySet(false, 10, 123),
          generateDummySet(false, 10, 123),
          generateDummySet(false, 30, 125),
          generateDummySet(true, 5, 127),
          generateDummySet(true, 3, 127000000),
          generateDummySet(true, 5, 127001000),
          generateDummySet(true, 3, 127002000),
          generateDummySet(false, 2, 127003000),
        ],
        [0, 1],
      ],
      [
        "Evade different exercises",
        [
          generateDummySet(false, 10, 123),
          generateDummySet(false, 10, 123),
          generateDummySet(true, 30, 125),
        ],
        [],
      ],
    ])("detecting warmup set: %s", (_, sets, expectedIndices) => {
      expect(ExerciseDomain.detectWarmupSets(sets).sort()).toEqual(
        expectedIndices
      );
    });
  });

  describe("detectWorkoutEnd", () => {
    it("should return empty array when given empty array", () => {
      expect(ExerciseDomain.detectWorkoutEnd([])).toEqual([]);
    });

    it("should return last set as workout end", () => {
      expect(
        ExerciseDomain.detectWorkoutEnd([generateDummySet(true, 20, 123)])
      ).toEqual([0]);
    });

    test.each([
      [
        "Detect workout end with one kind of exercise only",
        [
          generateDummySet(true, 10, 123),
          generateDummySet(true, 50, 125),
          generateDummySet(true, 5, 127),
        ],
        [2],
      ],
      [
        "Detect workout end with multiple exercises: foreign exercises before",
        [
          generateDummySet(true, 20, 123),
          generateDummySet(false, 10, 125),
          generateDummySet(false, 20, 127),
        ],
        [2],
      ],
      [
        "Detect workout end with multiple exercises: foreign exercises after",
        [
          generateDummySet(false, 10, 123),
          generateDummySet(false, 20, 125),
          generateDummySet(true, 5, 127),
        ],
        [2],
      ],
      [
        "Detect workout end with multiple exercises: combined",
        [
          generateDummySet(false, 10, 123),
          generateDummySet(false, 10, 123),
          generateDummySet(false, 30, 125),
          generateDummySet(true, 5, 127),
          generateDummySet(true, 3, 127000000),
          generateDummySet(true, 5, 127001000),
          generateDummySet(true, 3, 127002000),
          generateDummySet(false, 2, 127023000),
        ],
        [7],
      ],
    ])("detecting workout end: %s", (_, sets, expectedIndices) => {
      expect(ExerciseDomain.detectWorkoutEnd(sets).sort()).toEqual(
        expectedIndices
      );
    });
  });
});
