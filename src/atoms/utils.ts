import { atom } from "recoil";
import LocalStorage from "../utils/LocalStorage";

export const createLocalStoragePersistenceAtom = <T>(
  key: string,
  localStorageKey: string,
  defaultData?: T
) => {
  return atom<T>({
    key,
    default: LocalStorage.getFromStore(localStorageKey) ?? defaultData,
    effects: [
      ({ onSet, setSelf, trigger }) => {
        onSet((newInfo) => LocalStorage.setStore(localStorageKey, newInfo));
        if (trigger === "get") {
          const dataFromStore = LocalStorage.getFromStore(localStorageKey);
          if (!dataFromStore && defaultData !== undefined) {
            LocalStorage.setStore(localStorageKey, defaultData);
            setSelf(defaultData);
          } else {
            setSelf(dataFromStore);
          }
        }
      },
    ],
  });
};
