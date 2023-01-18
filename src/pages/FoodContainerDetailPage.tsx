import { useLiveQuery } from 'dexie-react-hooks';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import FoodContentList from '../components/FoodContainers/FoodContainerDetailPage/FoodContentList';
import Button, { ButtonStyle } from '../components/Input/Button';
import FoodContainerDatabase from '../database/FoodContainerDatabase';
import FoodContainerSummarySection from '../components/FoodContainers/FoodContainerDetailPage/FoodContainerSummarySection';
import AddFoodContainerContentModal from '../components/FoodContainers/FoodContainerDetailPage/AddFoodContainerContentModal';
import EditFoodContainerModal from '../components/FoodContainers/EditFoodContainerModal';
import FoodContainerNutritionSummarySection from '../components/FoodContainers/FoodContainerDetailPage/FoodContainerNutritionSummarySection';

export default function FoodContainerDetailPage() {
  const { containerId } = useParams();
  const navigate = useNavigate();
  const [isAddingContent, setIsAddingContent] = useState(false);
  const [isEditingFoodContainer, setIsEditingFoodContainer] = useState(false);

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

  if (!foodContainer) return null;

  return (
    <div className="grid grid-cols-6 gap-2">
      <AddFoodContainerContentModal
        opened={isAddingContent}
        foodContainer={foodContainer}
        onClose={() => setIsAddingContent(false)}
      />
      <EditFoodContainerModal
        opened={isEditingFoodContainer}
        onClose={() => setIsEditingFoodContainer(false)}
        foodContainer={foodContainer}
      />
      <Button
        icon="arrow-left"
        text="Food container list"
        onClick={() => navigate(-1)}
        className="col-span-2 w-max self-center justify-self-start"
        buttonStyle={ButtonStyle.Clear}
      />
      <FoodContainerSummarySection
        onRequestEditFoodContainer={() => setIsEditingFoodContainer(true)}
        foodContainer={foodContainer}
      />
      <FoodContainerNutritionSummarySection foodContainer={foodContainer} />
      <div className='col-span-full my-2' />
      <Button
        icon="plus"
        text="Add content..."
        onClick={() => setIsAddingContent(true)}
        className="col-span-3 h-10"
        buttonStyle={ButtonStyle.Clear}
      />
      <Button
        icon="hamburger"
        text="Consume content"
        onClick={() => navigate(-1)}
        className="col-span-3 h-10"
        textClassName='child:fill-gray-200'
        buttonStyle={ButtonStyle.Block}
      />
      <FoodContentList
        onRequestAddFoodContent={() => setIsAddingContent(true)}
        foodContainer={foodContainer}
      />
    </div>

  )
}