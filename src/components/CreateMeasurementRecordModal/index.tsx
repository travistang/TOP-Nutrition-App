import React from "react";
import { useRecoilState } from "recoil";
import { createMeasurementRecordAtom } from "../../atoms/CreateMeasurementAtom";
import Modal from "../Modal";

export default function CreateMeasurementRecordModal() {
  const [createMeasurementRecord, setCreateMeasurementRecord] = useRecoilState(
    createMeasurementRecordAtom
  );

  const { modalOpened, record } = createMeasurementRecord;
  const isEditing = !!record.id;
  const modalLabel = isEditing ? "Editing record" : "Record measurement";
  return (
    <Modal
      onClose={() =>
        setCreateMeasurementRecord((record) => ({
          ...record,
          modalOpened: false,
        }))
      }
      opened={modalOpened}
      label={modalLabel}
    >
      WIP
    </Modal>
  );
}
