import { useLiveQuery } from 'dexie-react-hooks';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import EmptyNotice from '../components/EmptyNotice';
import FoodContainerList from '../components/FoodContainers/FoodContainerList';
import RegisterFoodContainerModal from '../components/FoodContainers/RegisterFoodContainerModal';
import Button, { ButtonStyle } from '../components/Input/Button';
import QRScanner from '../components/QRScanner';
import FoodContainerDatabase from '../database/FoodContainerDatabase';

export default function FoodContainerPage() {
  const navigate = useNavigate();
  const allFoodContainers = useLiveQuery(() => FoodContainerDatabase.getAll(), []);
  const [registerFoodModalOpened, setRegisterFoodModalOpened] = useState(false);
  const hasRegisteredFoodContainers = allFoodContainers?.length !== 0;

  const checkScannedQRCode = async (code: string) => {
    const foodContainerFound = await FoodContainerDatabase.getFoodContainerById(code);
    if (!foodContainerFound) {
      toast.error("You do not have a food container registered with the scanned code");
      return;
    }
    toast.success("Food container found!");
    navigate(`/containers/${code}`);
  };

  return (
    <div className="grid grid-cols-2 justify-between overflow-y-auto overflow-x-hidden gap-2 pb-12">
      <RegisterFoodContainerModal
        opened={registerFoodModalOpened}
        onClose={() => setRegisterFoodModalOpened(false)}
      />
      {!hasRegisteredFoodContainers ? (
        <EmptyNotice
          icon="box"
          className="col-span-full"
          onClick={() => setRegisterFoodModalOpened(true)}
          message="You did not register any food containers. Click here to register one"
        />
      ) : (
      <>
        <Button
          className="h-10 px-2 w-1/3 self-end min-w-fit"
          icon='plus'
          text='Register...'
          buttonStyle={hasRegisteredFoodContainers ? ButtonStyle.Clear : ButtonStyle.Block}
          onClick={() => setRegisterFoodModalOpened(true)}
        />
        <QRScanner
          modalLabel="Scan food container QR Code"
          modalMessage="If you have registered a food container with QR code containing its identifier, you can scan it with your camera to view its details"
          className="h-10 px-2 self-end"
          buttonText='Scan'
          buttonStyle={ButtonStyle.Block}
          onQrCodeDetected={checkScannedQRCode}
        />
      </>
      )}
      <FoodContainerList
        foodContainers={allFoodContainers ?? []}
      />
    </div>
  );
}