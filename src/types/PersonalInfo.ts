export enum Gender {
  Male = "male",
  Female = "female",
}

export enum PhysicalActivityLevel {
  Sedentary = "Sedentary",
  LightlyActive = "Lightly active",
  ModeratelyActive = "Moderately active",
  VeryActive = "Very active",
  ExtremelyActive = "Extremely active",
}

export type PersonalInfo = {
  age: number;
  gender: Gender;
  height: number;
  pal: PhysicalActivityLevel;
};
