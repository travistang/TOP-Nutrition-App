import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import FoodContainerDatabase from '../../../database/FoodContainerDatabase';
import { FoodContainer } from '../../../types/FoodContainer';
import Button, { ButtonStyle } from '../../Input/Button';
import TextInput from '../../Input/TextInput';
import Modal from '../../Modal';

type Props = {
  opened: boolean;
  onClose: () => void;
  onDelete: () => void;
  foodContainer: FoodContainer;
}
export default function EditFoodContainerModal({ opened, onClose, foodContainer, onDelete }: Props) {
  const [foodContainerPlaceholder, setFoodContainerPlaceholder] = useState(foodContainer);

  useEffect(() => {
    setFoodContainerPlaceholder(foodContainer);
  }, [foodContainer]);

  const onSaveChanges = async () => {
    try {
      await FoodContainerDatabase.updateFoodContainerInfo(foodContainer.identifier, { name: foodContainerPlaceholder.name });
      toast.success("Food container info updated");
      onClose();
    } catch {
      toast.error("Error saving update");
    }
  }


  return (
    <Modal opened={opened} onClose={onClose} label="Edit food container info">
      <div className="grid grid-cols-6 gap-2">
        <TextInput
          label="Food container name"
          className="col-span-4"
          value={foodContainerPlaceholder.name}
          onChange={name => setFoodContainerPlaceholder({...foodContainerPlaceholder, name })}
        />
        <TextInput
          label="Identifier"
          className="col-span-2"
          value={foodContainerPlaceholder.identifier}
        />
        <Button
          className="col-start-1 col-span-2 h-10"
          icon="trash"
          text="Remove"
          buttonStyle={ButtonStyle.BlockDanger}
          onClick={onDelete}
        />
        <Button
          className="col-start-5 col-span-2 h-10"
          icon="save"
          text="Save"
          onClick={onSaveChanges}
        />
      </div>
    </Modal>
  )
}