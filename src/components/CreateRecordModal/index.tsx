import React from "react";
import { useRecoilState } from "recoil";
import { DEFAULT_CONSUMPTION } from "../../types/Consumption";
import { createEditRecordAtom } from "../../atoms/CreateEditRecordAtom";

import Modal from "../Modal";
import CreateRecordForm from "./CreateRecordForm";

export default function CreateRecordModal() {
  const [createEditRecord, setCreateEditRecord] =
    useRecoilState(createEditRecordAtom);
  const { modalOpened, record: consumption } = createEditRecord;
  const isEditing = !!consumption.id;

  const onClose = () => {
    setCreateEditRecord({
      modalOpened: false,
      record: { ...DEFAULT_CONSUMPTION, date: Date.now() },
    });
  };


  return (
    <Modal
      opened={modalOpened}
      onClose={onClose}
      label={isEditing ? "Edit record" : "Create nutrition record"}
    >
      <CreateRecordForm />
    </Modal>
  );
}
