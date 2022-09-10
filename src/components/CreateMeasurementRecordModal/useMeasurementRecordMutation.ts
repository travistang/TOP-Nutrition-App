import { useSetRecoilState } from "recoil";
import { createMeasurementRecordAtom } from "../../atoms/CreateMeasurementAtom";
import { MeasurementRecord } from "../../database/MeasurementDatabase";
import { DEFAULT_MEASUREMENT, Measurement } from "../../types/Measurement";
import ObjectUtils from '../../utils/Object';

export default function useMeasurementRecordMutation() {
  const setCreateMeasurementRecord = useSetRecoilState(createMeasurementRecordAtom);

    const setField =
      <T extends keyof Measurement>(field: T) =>
      (value: Measurement[T]) => {
        setCreateMeasurementRecord((atomValue) => ({
          ...atomValue,
          record: { ...atomValue.record, [field]: value },
        }));
      };
    const onClose = () =>
      setCreateMeasurementRecord(() => ({
        record: DEFAULT_MEASUREMENT,
        modalOpened: false,
      }));

  const onAutoSelectMeasurement = (measurement: MeasurementRecord) => {
    const record = ObjectUtils.filterKeys(measurement, ["unit", "name"]);
    setCreateMeasurementRecord((atomValue) => ({
      ...atomValue,
      record: {
        ...record,
        value: 0,
        date: atomValue.record.date,
      },
    }));
  };

  return { setField, onClose, onAutoSelectMeasurement };

}