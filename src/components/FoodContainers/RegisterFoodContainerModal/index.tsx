import React, { useState } from 'react';
import toast from 'react-hot-toast';
import FoodContainerDatabase from '../../../database/FoodContainerDatabase';
import { DEFAULT_FOOD_CONTAINER, FoodContainer } from '../../../types/FoodContainer';
import { Modifier } from '../../../types/utils';
import Button, { ButtonStyle } from '../../Input/Button';
import TextInput from '../../Input/TextInput';
import Modal from '../../Modal';
import QRScanner from '../../QRScanner';
import SmallNotice from '../../SmallNotice';

type Props = {
  opened: boolean;
  onClose: () => void;
}
export default function RegisterFoodContainerModal({ opened, onClose }: Props) {
  const [foodContainer, setFoodContainer] = useState<FoodContainer>(DEFAULT_FOOD_CONTAINER);
  const updateFoodContainer: Modifier<FoodContainer> = (field) => (value) => {
    setFoodContainer({ ...foodContainer, [field]: value });
  }

  const isInputValid = !!foodContainer.identifier;

  const registerContainer = async () => {
    try {
      await FoodContainerDatabase.createFoodContainer(foodContainer.name, foodContainer.identifier);
      toast.success("Food container created");
      onClose();
    } catch {
      toast.error("Failed to register food container. Check if identifier is unique!");
    }
  }
  return (
    <Modal opened={opened} onClose={onClose} label="Register a food container">
      <div className="grid grid-cols-6 gap-2">
        <TextInput
          className="col-span-2"
          label="Container name (optional)"
          value={foodContainer.name}
          onChange={updateFoodContainer('name')}
          />
        <TextInput
          className="col-span-5"
          label="Identifier"
          placeholder='Must be unique'
          value={foodContainer.identifier}
          onChange={updateFoodContainer('identifier')}
        />
        <QRScanner
          modalLabel='Scanning for QR Code'
          modalMessage='Put a QR Code with an unique identifier on your food container, and scan it with your camera to register it.'
          className="pt-4"
          onQrCodeDetected={updateFoodContainer('identifier')}
        />
        <SmallNotice
          className="col-span-full "
          icon="info-circle"
        >
          Identifier must be unique and is supposed to be acquired by scanning a QR Code
        </SmallNotice>

        <Button
          text="Register"
          icon="box"
          disabled={!isInputValid}
          onClick={registerContainer}
          buttonStyle={ButtonStyle.Block}
          className="col-span-2 col-start-5 h-10 mt-10"
          textClassName="child:fill-gray-200"
        />
      </div>
    </Modal>
  )
}

