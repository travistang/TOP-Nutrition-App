import React from "react";
import { FoodContainer } from "../../../types/FoodContainer";
import ConsumptionItem from "../../ConsumptionItem";
import EmptyNotice from "../../EmptyNotice";
import Section from "../../Section";
import useFoodContentMutation from "./AddFoodContainerContentModal/useFoodContentMutation";

type Props = {
  foodContainer: FoodContainer;
  onRequestAddFoodContent: () => void;
};
export default function FoodContentList({
  onRequestAddFoodContent,
  foodContainer,
}: Props) {
  const { onRemoveFoodContent } = useFoodContentMutation(foodContainer);

  const isEmpty = foodContainer.content.length === 0;

  return (
    <>
      <Section
        className="col-span-full overflow-y-auto max-h-[50vh] pb-16"
        labelClassName="sticky -top-2 -mt-2 pt-2 bg-gray-300"
        label="Content"
      >
        {isEmpty && (
          <EmptyNotice
            icon="box"
            onClick={onRequestAddFoodContent}
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
