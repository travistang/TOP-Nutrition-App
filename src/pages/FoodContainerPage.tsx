import { useLiveQuery } from 'dexie-react-hooks';
import React, { useState } from 'react';
import EmptyNotice from '../components/EmptyNotice';
import FoodContainerList from '../components/FoodContainers/FoodContainerList';
import RegisterFoodContainerModal from '../components/FoodContainers/RegisterFoodContainerModal';
import FoodContainerDatabase from '../database/FoodContainerDatabase';

export default function FoodContainerPage() {
  const allFoodContainers = useLiveQuery(() => FoodContainerDatabase.getAll(), []);
  const [registerFoodModalOpened, setRegisterFoodModalOpened] = useState(false);
  const hasRegisteredFoodContainers = allFoodContainers?.length !== 0;

  return (
    <div className="flex flex-col overflow-y-auto overflow-x-hidden flex-1 items-stretch gap-2 pb-12">
      <RegisterFoodContainerModal
        opened={registerFoodModalOpened}
        onClose={() => setRegisterFoodModalOpened(false)}
      />
      {!hasRegisteredFoodContainers && (
        <EmptyNotice
          icon="box"
          onClick={() => setRegisterFoodModalOpened(true)}
          message="You did not register any food containers. Click here to register one"
        />
      )}
      <FoodContainerList
        onRequestRegisterFoodContainer={() => setRegisterFoodModalOpened(true)}
        foodContainers={allFoodContainers ?? []}
      />
    </div>
  );
}