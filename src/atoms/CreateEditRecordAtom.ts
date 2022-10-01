import { atom} from 'recoil';
import { ConsumptionRecord } from '../database/ConsumptionDatabase';
import { DEFAULT_CONSUMPTION } from '../types/Consumption';
import { Optional } from '../types/utils';

export type CreateEditRecordProps = {
  record: Optional<ConsumptionRecord, "id">;
  openingSource: ModalOpenSource | null;
}

export enum ModalOpenSource {
  Cta = 'cta',
  MealHeader = 'mealHeader',
  ConsumptionItem = 'consumptionItem',
};

export const createEditRecordAtom = atom<CreateEditRecordProps>({
  key: "createEditRecord",
  default: {
    openingSource: null,
    record: DEFAULT_CONSUMPTION,
  },
});
