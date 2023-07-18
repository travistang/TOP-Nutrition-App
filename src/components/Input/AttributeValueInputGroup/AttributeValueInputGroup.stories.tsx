import { useArgs } from "@storybook/client-api";
import type { Meta } from "@storybook/react";
import AttributeValueInputGroup, { InputWidget } from ".";

const meta: Meta<typeof AttributeValueInputGroup> = {
  title: "Input/AttributeValueInputGroup",
  component: AttributeValueInputGroup,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    config: {
      weight: {
        widget: InputWidget.DigitPad,
        unit: "kg",
        label: "weight",
      },
      repetitions: {
        widget: InputWidget.Ticker,
        label: "repetitions",
        min: 0,
        max: 100,
        integer: true,
      },
    },
    value: {
      weight: 40,
      repetitions: 0,
    },
  },
};

export default meta;

export const Main = (args: Meta<typeof AttributeValueInputGroup>["args"]) => {
  const [, updateArgs] = useArgs();

  return (
    <AttributeValueInputGroup
      {...(args as any)}
      onChange={(value) => updateArgs({ value })}
    />
  );
};
