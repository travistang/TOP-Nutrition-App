import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FoodContainer } from '../../../types/FoodContainer';
import Section from '../../Section';
import FoodContainerOverview from '../FoodContainerOverview';

type Props = {
  foodContainers: FoodContainer[];
};
export default function FoodContainerList({ foodContainers }: Props) {
  const navigate = useNavigate();
  const goToFoodContainerDetailPage = (foodContainer: FoodContainer) => () => {
    navigate(`/containers/${foodContainer.identifier}`);
  }

  if (!foodContainers.length) return null;

  return (
    <Section className="col-span-full" label="Registered food containers">
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