import React from "react";
import { useRecoilState } from "recoil";
import { createMeasurementRecordAtom } from "../../atoms/CreateMeasurementAtom";
import MeasurementDatabase, {
  MeasurementRecord,
} from "../../database/MeasurementDatabase";
import { Measurement } from "../../types/Measurement";
import AutoCompleteInput from "../Input/AutoCompleteInput";
import Button from "../Input/Button";
import NumberInput from "../Input/NumberInput";
import TextInput from "../Input/TextInput";
import Modal from "../Modal";
import DateUtils from "../../utils/Date";
import toast from "react-hot-toast";
import DateInput, { DateInputType } from "../Input/DateInput";

export default function CreateMeasurementRecordModal() {
  const [createMeasurementRecord, setCreateMeasurementRecord] = useRecoilState(
    createMeasurementRecordAtom
  );

  const { modalOpened, record } = createMeasurementRecord;
  const isEditing = !!record.id;
  const isFormValid = !!record.name && record.value !== 0;

  const modalLabel = isEditing ? "Editing record" : "Record measurement";
  const setField =
    <T extends keyof Measurement>(field: T) =>
    (value: Measurement[T]) => {
      setCreateMeasurementRecord((atomValue) => ({
        ...atomValue,
        record: { ...atomValue.record, [field]: value },
      }));
    };
  const onClose = () =>
    setCreateMeasurementRecord((record) => ({
      ...record,
      modalOpened: false,
    }));

  const submitForm = async () => {
    if (!isFormValid) return;
    try {
      if (await MeasurementDatabase.isUnitMismatch(record)) {
        toast.error("Unit mismatch with existing record!");
        return;
      }
      await MeasurementDatabase.add(record);
      toast.success("Measurement recorded");
      onClose();
    } catch {
      toast.error("Failed to record measurement!");
    }
  };
  return (
    <Modal onClose={onClose} opened={modalOpened} label={modalLabel}>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid grid-cols-6 gap-2 py-4"
      >
        <AutoCompleteInput
          label="Measurement name"
          value={record.name}
          onChange={setField("name")}
          onSelectSearchResult={(result) =>
            setCreateMeasurementRecord((atomValue) => ({
              ...atomValue,
              record: result,
            }))
          }
          onSearch={(searchString) => MeasurementDatabase.search(searchString)}
          renderResult={(result: MeasurementRecord) => (
            <span className="text-xs font-bold">{result.name}</span>
          )}
          className="col-span-4"
        />
        <NumberInput
          label="value"
          className="col-span-2"
          value={record.value}
          onChange={setField("value")}
        />
        <TextInput
          label="Unit"
          value={record.unit}
          onChange={setField("unit")}
          className="col-span-1"
        />
        <DateInput
          label="Date"
          dateType={DateInputType.DateTime}
          value={record.date}
          onChange={(v) => setField("date")(v.getTime())}
          className="col-span-5"
        />
        <Button
          type="submit"
          disabled={!isFormValid}
          onClick={submitForm}
          text="Record"
          className="h-12 col-end-7 col-span-2"
        />
      </form>
    </Modal>
  );
}
