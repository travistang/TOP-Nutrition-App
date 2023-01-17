import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FoodContainer } from '../../../types/FoodContainer';
import Button, { ButtonStyle } from '../../Input/Button';
import Section from '../../Section';
import FoodContainerOverview from '../FoodContainerOverview';

type Props = {
  foodContainers: FoodContainer[];
  onRequestRegisterFoodContainer: () => void;
};
export default function FoodContainerList({ foodContainers, onRequestRegisterFoodContainer }: Props) {
  const navigate = useNavigate();
  const goToFoodContainerDetailPage = (foodContainer: FoodContainer) => () => {
    navigate(`/containers/${foodContainer.identifier}`);
  }

  if (!foodContainers.length) return null;

  return (
    <Section label="Registered food containers">
      <div className="w-full py-2 flex items-center justify-end">
        <Button
          className="h-10 px-2"
          buttonStyle={ButtonStyle.Block}
          icon='plus'
          textClassName="child:fill-gray-200"
          text='Register...'
          onClick={onRequestRegisterFoodContainer}
        />
      </div>
      {foodContainers.map((foodContainer) => (
        <FoodContainerOverview
          key={foodContainer.identifier}
          onSelect={goToFoodContainerDetailPage(foodContainer)}
          foodContainer={foodContainer}
        />
      ))}
    </Section>
  );
}