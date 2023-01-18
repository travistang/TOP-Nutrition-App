import React from 'react';
import { FoodContainer } from '../../../../types/FoodContainer';
import TextSection from '../../../TextSection';
import Button, { ButtonStyle } from '../../../Input/Button';

type Props = {
  foodContainer: FoodContainer;
  onRequestEditFoodContainer: () => void;
};
export default function FoodContainerSummarySection({ foodContainer, onRequestEditFoodContainer }: Props) {

  return (
    <>
      <TextSection className="col-span-3 col-start-1" title="Container name" text={foodContainer.name} />
      <TextSection className="col-span-2" title="Identifier" text={foodContainer.identifier} />
      <Button
        icon="pen"
        onClick={onRequestEditFoodContainer}
        className="col-span-1 col-start-6 h-10 w-min px-4 bg-gray-200 self-center justify-self-center"
        buttonStyle={ButtonStyle.Clear}
      />
    </>
  );
}