import React from 'react';
import { FoodContainer } from '../../../../types/FoodContainer';
import Modal from '../../../Modal';
import StepAddFoodContentForm from './StepAddFoodContentForm';
import useFoodContentMutation from './useFoodContentMutation';

type Props = {
  opened: boolean;
  onClose: () => void;
  foodContainer: FoodContainer,
};
export default function AddFoodContainerContentModal({ foodContainer, opened, onClose }: Props) {
  const { onAddFoodContent } = useFoodContentMutation(foodContainer);
  return (
    <Modal opened={opened} onClose={onClose} label="Add food to food container">
      <StepAddFoodContentForm onClose={onClose} onAddFoodContent={onAddFoodContent} />
    </Modal>
  );
}