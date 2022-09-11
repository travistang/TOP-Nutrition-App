import { atom } from "recoil";

export type ConfirmationConfig = {
  modalOpened: boolean;
  description?: string;
  onConfirm: () => void;
}

export const DEFAULT_CONFIRMATION_CONFIG: ConfirmationConfig = {
  modalOpened: false,
  onConfirm: () => { },
}

export const confirmationAtom = atom<ConfirmationConfig>({
  key: "confirmation",
  default: DEFAULT_CONFIRMATION_CONFIG
});