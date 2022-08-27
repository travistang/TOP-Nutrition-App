import { atom } from "recoil";
import { MeasurementRecord } from "../database/MeasurementDatabase";
import { Measurement, DEFAULT_MEASUREMENT } from "../types/Measurement";

export type CreateMeasurementRecordProps = {
  record: Measurement & Partial<MeasurementRecord>;
  modalOpened: boolean;
};
export const createMeasurementRecordAtom = atom<CreateMeasurementRecordProps>({
  key: "createMeasurementRecord",
  default: {
    modalOpened: false,
    record: DEFAULT_MEASUREMENT,
  },
});
