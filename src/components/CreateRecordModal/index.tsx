import React from "react";
import { useRecoilState } from "recoil";
import { DEFAULT_CONSUMPTION } from "../../types/Consumption";
import { createEditRecordAtom } from "../../atoms/CreateEditRecordAtom";

import Modal from "../Modal";
import StepCreateConsumptionRecordForm from "./StepCreateConsumptionRecordForm";

export default function CreateRecordModal() {
  const [createEditRecord, setCreateEditRecord] =
    useRecoilState(createEditRecordAtom);
  const { openingSource, record: consumption } = createEditRecord;
  const isEditing = !!consumption.id;

  const onClose = () => {
    setCreateEditRecord({
      openingSource: null,
      record: { ...DEFAULT_CONSUMPTION, date: Date.now() },
    });
  };


  return (
    <Modal
      opened={openingSource !== null}
      onClose={onClose}
      label={isEditing ? "Edit record" : "Create nutrition record"}
    >
      <StepCreateConsumptionRecordForm />
    </Modal>
  );
}
