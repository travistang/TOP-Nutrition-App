import { Gender, PersonalInfo } from "../types/PersonalInfo";

export const LS_PERSONAL_INFO_KEY = '@nutritionApp/personalInfo';
const validate = (obj: { [key: string]: any; }) => {
  if (!Object.values(Gender).includes(obj.gender)) return false;
  if (!obj.height) return false;
  if (!obj.age) return false;
  return true;
}

export const DEFAULT_PERSONAL_INFO: PersonalInfo = {
  age: 25,
  gender: Gender.Male,
  height: 170,
};

export const get = () => {
  const personalInfoString = localStorage.getItem(LS_PERSONAL_INFO_KEY) ?? '';
  try {
    const personalInfo = JSON.parse(personalInfoString) as PersonalInfo;
    if (!validate(personalInfo)) return null;
    return personalInfo;
  } catch {
    return null;
  }
};

export const set = (personalInfo: PersonalInfo) => {
  localStorage.setItem(LS_PERSONAL_INFO_KEY, JSON.stringify(personalInfo));
}