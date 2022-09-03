import { atom } from "recoil";
import * as PersonalInfoDomain from "../domain/PersonalInfo";
import { PersonalInfo } from "../types/PersonalInfo";

export const personalInfoAtom = atom<PersonalInfo>({
  key: "personalInfo",
  default: PersonalInfoDomain.get(),
  effects: [
    ({ onSet, setSelf, trigger }) => {
      onSet((newInfo) => PersonalInfoDomain.set(newInfo));
      if (trigger === "get") {
        setSelf(PersonalInfoDomain.get());
      }
    },
  ],
});
