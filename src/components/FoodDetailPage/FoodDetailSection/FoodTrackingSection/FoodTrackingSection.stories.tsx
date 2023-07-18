import type { Meta, StoryObj } from "@storybook/react";

import FoodTrackingSection from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FoodTrackingSection> = {
  title: "FoodTrackingSection/FoodTrackingSection",
  component: FoodTrackingSection,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  args: {
    foodDetails: {
      name: "Test food",
      nutritionPerHundred: {
        carbohydrates: 42,
        calories: 1000,
        fat: 42,
        protein: 10,
      },
      id: "123",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FoodTrackingSection>;

export const Main: Story = {};
