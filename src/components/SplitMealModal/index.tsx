import React from 'react';
import Modal from '../Modal';

export default function SplitMealModal() {
  return (
    <Modal opened={false} label="Splitting meal for later time" onClose={console.log}>
      <div className="grid grid-cols-6 gap-2">
        WIP
      </div>
    </Modal>
  )
}