import { atom } from "recoil";

export type FabMenuAtomProps = {
  fabMenuOpened: boolean;
};

export const fabMenuAtom = atom<FabMenuAtomProps>({
  key: 'fabMenu',
  default: {
    fabMenuOpened: false,
  },
});
