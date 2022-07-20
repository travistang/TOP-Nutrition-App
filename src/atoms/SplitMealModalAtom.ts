import { atom } from "recoil";
import { ConsumptionRecord } from "../database/ConsumptionDatabase";

export type SplitMealModalProps = {
  modalOpened: boolean;
  meal: ConsumptionRecord[];
};
export const splitMealModalAtom = atom<SplitMealModalProps>({
  key: "splitMealModal",
  default: {
    modalOpened: false,
    meal: [],
  },
});
