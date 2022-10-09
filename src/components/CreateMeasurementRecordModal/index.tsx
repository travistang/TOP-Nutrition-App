import React from "react";
import { useRecoilValue } from "recoil";
import { createMeasurementRecordAtom } from "../../atoms/CreateMeasurementAtom";

import useMeasurementRecordMutation from "./useMeasurementRecordMutation";
import Modal from "../Modal";
import { featureToggleAtom } from "../../atoms/FeatureToggleAtom";
import CreateMeasurementForm from "./CreateMeasurementForm";
import StepCreateMeasurementRecordForm from "./StepCreateMeasurementRecordForm";

export default function CreateMeasurementRecordModal() {
  const createMeasurementRecord = useRecoilValue(createMeasurementRecordAtom);
  const featureToggle = useRecoilValue(featureToggleAtom);
  const { onClose } = useMeasurementRecordMutation();

  const { modalOpened, record } = createMeasurementRecord;
  const isEditing = !!record.id;
  const modalLabel = isEditing ? "Editing record" : "Record measurement";

  const Form = featureToggle.stepMeasurementForm ? CreateMeasurementForm : StepCreateMeasurementRecordForm;
  return (
    <Modal onClose={onClose} opened={modalOpened} label={modalLabel}>
      <Form />
    </Modal>
  );
}
