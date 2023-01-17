import React, { useState } from 'react';
import toast from 'react-hot-toast';
import FoodContainerDatabase from '../../../database/FoodContainerDatabase';
import { Food } from '../../../types/Food';
import { FoodContainer } from '../../../types/FoodContainer';
import ConsumptionItem from '../../ConsumptionItem';
import EmptyNotice from '../../EmptyNotice';
import Button, { ButtonStyle } from '../../Input/Button';
import Section from '../../Section';
import AddFoodContainerContentModal from './AddFoodContainerContentModal';
import useFoodContentMutation from './AddFoodContainerContentModal/useFoodContentMutation';

type Props = {
  foodContainer: FoodContainer;
};
export default function FoodContentList({ foodContainer }: Props) {
  const [isAddingContent, setIsAddingContent] = useState(false);
  const { onRemoveFoodContent } = useFoodContentMutation(foodContainer);

  const isEmpty = foodContainer.content.length === 0;

  return (
    <>
      <AddFoodContainerContentModal
        opened={isAddingContent}
        foodContainer={foodContainer}
        onClose={() => setIsAddingContent(false)}
      />
      <Section className='col-span-full' label="Content">
        <div className="w-full flex items-center justify-end my-2">
          {!isEmpty && (<Button
            className="h-10 px-2 text-sm"
            textClassName=''
            text="Add content..."
            icon="plus"
            buttonStyle={ButtonStyle.Clear}
            onClick={console.log}
          />)}
        </div>
        {isEmpty && (
          <EmptyNotice
            icon="box"
            onClick={() => setIsAddingContent(true)}
            message="This food container has no content. Click here to create one"
            className="my-4 cursor-pointer"
          />
        )}
        {foodContainer.content.map((food) => (
          <ConsumptionItem
            onRemove={() => onRemoveFoodContent(food)}
            key={food.name}
            consumption={food}
          />
        ))}
      </Section>
    </>
  );
}