import { useLiveQuery } from "dexie-react-hooks";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import FoodContentList from "../components/FoodContainers/FoodContainerDetailPage/FoodContentList";
import Button, { ButtonStyle } from "../components/Input/Button";
import FoodContainerDatabase from "../database/FoodContainerDatabase";
import FoodContainerSummarySection from "../components/FoodContainers/FoodContainerDetailPage/FoodContainerSummarySection";
import AddFoodContainerContentModal from "../components/FoodContainers/FoodContainerDetailPage/AddFoodContainerContentModal";
import EditFoodContainerModal from "../components/FoodContainers/EditFoodContainerModal";
import FoodContainerNutritionSummarySection from "../components/FoodContainers/FoodContainerDetailPage/FoodContainerNutritionSummarySection";
import ConsumeFoodContainerModal from "../components/FoodContainers/ConsumeFoodContainerModal";

export default function FoodContainerDetailPage() {
  const { containerId } = useParams();
  const navigate = useNavigate();
  const [isAddingContent, setIsAddingContent] = useState(false);
  const [deletingContainer, setDeletingContainer] = useState(false);
  const [isConsumeFoodContainerModalOpen, setIsConsumeFoodContainerModalOpen] =
    useState(false);
  const [isEditingFoodContainer, setIsEditingFoodContainer] = useState(false);

  const foodContainer = useLiveQuery(async () => {
    if (deletingContainer) return null;
    if (containerId) {
      const result = await FoodContainerDatabase.getFoodContainerById(
        containerId
      );
      if (!result && !deletingContainer) {
        toast.error("Food container not found");
        navigate(-1);
        return null;
      }
      return result;
    }
    return null;
  }, [containerId, deletingContainer]);

  const onRemoveContainer = useCallback(async () => {
    if (!foodContainer) return;
    try {
      await FoodContainerDatabase.removeFoodContainer(foodContainer.identifier);
      toast.success("Food container removed");
      navigate(-1);
    } catch {
      toast.error("Failed to remove food container");
    }
  }, [foodContainer, navigate]);

  useEffect(() => {
    if (deletingContainer) {
      onRemoveContainer();
    }
  }, [deletingContainer, onRemoveContainer]);

  if (!foodContainer) return null;

  return (
    <div className="grid grid-cols-6 gap-2 pb-16 overflow-hidden">
      <AddFoodContainerContentModal
        opened={isAddingContent}
        foodContainer={foodContainer}
        onClose={() => setIsAddingContent(false)}
      />
      <EditFoodContainerModal
        opened={isEditingFoodContainer}
        onDelete={() => setDeletingContainer(true)}
        onClose={() => setIsEditingFoodContainer(false)}
        foodContainer={foodContainer}
      />
      <ConsumeFoodContainerModal
        opened={isConsumeFoodContainerModalOpen}
        onClose={() => setIsConsumeFoodContainerModalOpen(false)}
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
      <div className="col-span-full my-2" />
      <Button
        icon="plus"
        text="Add content..."
        onClick={() => setIsAddingContent(true)}
        className="col-span-3 h-10"
        buttonStyle={ButtonStyle.Clear}
      />
      <Button
        icon="hamburger"
        disabled={foodContainer.content.length === 0}
        text="Consume content"
        onClick={() => setIsConsumeFoodContainerModalOpen(true)}
        className="col-span-3 h-10"
        buttonStyle={ButtonStyle.Block}
      />
      <FoodContentList
        onRequestAddFoodContent={() => setIsAddingContent(true)}
        foodContainer={foodContainer}
      />
    </div>
  );
}
