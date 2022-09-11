import React from 'react';
import { useRecoilState } from 'recoil';
import { confirmationAtom } from '../atoms/ConfirmationAtom';
import { MarcoNutritionColor } from '../types/Nutrition';
import Button, { ButtonStyle } from './Input/Button';
import Modal from './Modal';

export default function ConfirmationModal() {
  const [confirmationConfig, setConfirmationConfig] = useRecoilState(confirmationAtom);
  const { modalOpened, description, onConfirm } = confirmationConfig;
  const closeModal = () => setConfirmationConfig(config => ({ ...config, modalOpened: false }));
  const proceed = () => {
    onConfirm();
    closeModal();
  }
  return (
    <Modal opened={modalOpened} label="Are you sure?" onClose={closeModal}>
      <span className="font-bold text-sm">
        {description ?? "This action cannot be undone. Are you sure to proceed?"}
      </span>
      <div className="flex items-center justify-between">
        <Button buttonStyle={ButtonStyle.Clear} text='Cancel' onClick={closeModal}  />
        <Button
          buttonStyle={ButtonStyle.Block}
          className={`h-12 bg-[${MarcoNutritionColor.fat}]`}
          text='Confirm'
          onClick={proceed}
        />
      </div>
    </Modal>
  )
}