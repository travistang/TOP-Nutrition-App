import { atom} from 'recoil';
import { ConsumptionRecord } from '../database/ConsumptionDatabase';
import { Consumption, DEFAULT_CONSUMPTION } from '../types/Consumption';

export type CreateEditRecordProps = {
  record: Consumption & Partial<ConsumptionRecord>;
  modalOpened: boolean;
}
export const createEditRecordAtom = atom<CreateEditRecordProps>({
  key: 'createEditRecord',
  default: {
    modalOpened: false,
    record: DEFAULT_CONSUMPTION,
  },
});
