import type { Meta, StoryObj } from "@storybook/react";

import FoodContainerTrackingSummary from ".";
import { FoodAmountTrackingType } from "../../../../../../types/FoodAmountTracking";

const meta: Meta<typeof FoodContainerTrackingSummary> = {
  title: "FoodTrackingSection/FoodContainerTrackingSummary",
  component: FoodContainerTrackingSummary,
  tags: ["autodocs"],
  args: {
    tracking: {
      type: FoodAmountTrackingType.Container,
      containerCapacity: 500,
      containers: [
        {
          id: "1",
          capacity: 500,
          amount: 500,
        },
        {
          id: "2",
          capacity: 500,
          amount: 500,
        },
        {
          id: "3",
          capacity: 500,
          amount: 300,
        },
        {
          id: "4",
          capacity: 500,
          amount: 0,
        },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof FoodContainerTrackingSummary>;

export const EmptyState = () => {
  return (
    <FoodContainerTrackingSummary
      tracking={{
        type: FoodAmountTrackingType.Container,
        containerCapacity: 500,
        containers: [],
      }}
    />
  );
};
export const Main: Story = {};
