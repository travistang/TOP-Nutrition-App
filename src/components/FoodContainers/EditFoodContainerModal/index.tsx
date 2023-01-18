import React, { useEffect, useState } from 'react';
import { FoodContainer } from '../../../types/FoodContainer';
import Modal from '../../Modal';

type Props = {
  opened: boolean;
  onClose: () => void;
  foodContainer: FoodContainer
}
export default function EditFoodContainerModal({ opened, onClose, foodContainer }: Props) {
  const [foodContainerPlaceholder, setFoodContainerPlaceholder] = useState(foodContainer);

  useEffect(() => {
    setFoodContainerPlaceholder(foodContainer);
  }, [foodContainer]);

  return (
    <Modal opened={opened} onClose={onClose} label="Edit food container info">
      WIP
    </Modal>
  )
}