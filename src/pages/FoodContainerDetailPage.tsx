import { useLiveQuery } from 'dexie-react-hooks';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import FoodContentList from '../components/FoodContainers/FoodContainerDetailPage/FoodContentList';
import Button, { ButtonStyle } from '../components/Input/Button';
import TextInput from '../components/Input/TextInput';
import FoodContainerDatabase from '../database/FoodContainerDatabase';
import { FoodContainer } from '../types/FoodContainer';

export default function FoodContainerDetailPage() {
  const { containerId } = useParams();
  const navigate = useNavigate();
  const [foodContainerPlaceholder, setFoodContainerPlaceholder] = useState<FoodContainer | null>(null);

  const foodContainer = useLiveQuery(async () => {
    if (containerId) {
      const result = await FoodContainerDatabase.getFoodContainerById(containerId);
      if (!result) {
        toast.error("Food container not found");
        navigate(-1);
        return null;
      }
      return result;
    }
    return null;
  }, [containerId]);

  useEffect(() => {
    setFoodContainerPlaceholder(foodContainer ?? null);
  }, [foodContainer]);

  if (!foodContainerPlaceholder) return null;

  const updateName = (name: string) => {
    setFoodContainerPlaceholder({ ...foodContainerPlaceholder, name });
  }

  return (

    <div className="grid grid-cols-6 gap-2">
      <Button
        icon="arrow-left"
        text="Food container list"
        onClick={() => navigate(-1)}
        className="col-span-2 w-max self-center justify-self-start"
        buttonStyle={ButtonStyle.Clear}
      />
      <Button
        icon="hamburger"
        text="Consume content"
        onClick={() => navigate(-1)}
        className="col-span-2 col-start-5 h-10"
        textClassName='child:fill-gray-200'
        buttonStyle={ButtonStyle.Block}
      />
      <TextInput
        className="col-span-4 col-start-1"
        value={foodContainerPlaceholder.name}
        onChange={updateName}
        label="name" />
      <TextInput
        className="col-span-2"
        value={foodContainerPlaceholder.identifier}
        label="Identifier (Fixed)"
      />
      <FoodContentList foodContainer={foodContainerPlaceholder} />
    </div>

  )
}