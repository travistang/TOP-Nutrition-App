import { atom } from "recoil";
import { Achievement } from "../types/Achievement";
import { Optional } from "../types/utils";

export type CreateEditAchievementProps = {
  achievement: Optional<Achievement, "id"> | null;
};

export const createEditAchievementAtom = atom<CreateEditAchievementProps>({
  key: "createEditAchievementRecord",
  default: {
    achievement: null,
  },
});
