import React from "react";
import { useRecoilState } from "recoil";
import { createMeasurementRecordAtom } from "../../atoms/CreateMeasurementAtom";
import MeasurementDatabase, {
  MeasurementRecord,
} from "../../database/MeasurementDatabase";
import AutoCompleteInput from "../Input/AutoCompleteInput";
import Button, { ButtonStyle } from "../Input/Button";
import NumberInput from "../Input/NumberInput";
import TextInput from "../Input/TextInput";
import Modal from "../Modal";
import MeasurementDomain from "../../domain/Measurement";
import DateInput, { DateInputType } from "../Input/DateInput";
import { DEFAULT_MEASUREMENT, Measurement } from "../../types/Measurement";

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
      record: DEFAULT_MEASUREMENT,
      modalOpened: false,
    }));

  const onRemove = async () => {
    if (await MeasurementDomain.removeRecord(record.id!)) {
      onClose();
    }
  };
  const submitForm = async () => {
    if (!isFormValid) return;
    if (await MeasurementDomain.createEditRecord(record)) {
      onClose();
    }
  };

  const onAutoSelectMeasurement = (measurement: MeasurementRecord) => {
    const { id: _, date: __, ...record } = measurement;
    setCreateMeasurementRecord((atomValue) => ({
      ...atomValue,
      record: {
        ...record,
        date: atomValue.record.date,
      },
    }))
  }

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
          onSelectSearchResult={onAutoSelectMeasurement}
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
        {isEditing && (
          <Button
            type="button"
            onClick={onRemove}
            text="Delete"
            textClassName="text-red-500"
            buttonStyle={ButtonStyle.Clear}
            className="h-12 col-start-1 col-span-2"
          />
        )}
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
