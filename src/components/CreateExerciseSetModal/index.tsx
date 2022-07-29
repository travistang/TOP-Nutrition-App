import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { createEditExerciseRecordAtom } from "../../atoms/CreatedEditExerciseRecordAtom";
import Modal from "../Modal";

export default function CreateExerciseSetModal() {
  const [createEditRecordAtom, setCreateEditRecordAtom] = useRecoilState(createEditExerciseRecordAtom);
  const { modalOpened } = createEditRecordAtom;

  const closeModal = () => {
    setCreateEditRecordAtom({ ...createEditRecordAtom, modalOpened: false });
  }

  return (
    <Modal
      onClose={closeModal}
      opened={modalOpened}
      label="Add new workout set"
    >
      WIP
    </Modal>
  )
}