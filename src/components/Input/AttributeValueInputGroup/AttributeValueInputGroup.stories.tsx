import { useArgs } from "@storybook/client-api";
import type { Meta } from "@storybook/react";
import AttributeValueInputGroup from ".";
import { InputWidget } from "./types";

const meta: Meta<typeof AttributeValueInputGroup> = {
  title: "Input/AttributeValueInputGroup",
  component: AttributeValueInputGroup,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    selectedField: "config",
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
      date: {
        widget: InputWidget.Datetime,
        label: "Date",
        nullable: true,
      },
      updatedAt: {
        widget: InputWidget.Datetime,
        label: "Date",
        nullable: true,
      },
    },
    value: {
      weight: 40,
      repetitions: 0,
      date: new Date("2023-05-08").getTime(),
    },
  },
};

export default meta;

export const Main = (args: Meta<typeof AttributeValueInputGroup>["args"]) => {
  const [, updateArgs] = useArgs();

  return (
    <AttributeValueInputGroup
      {...(args as any)}
      onSelectField={(newField) =>
        updateArgs({ ...args, selectedField: newField })
      }
      onChange={(value) => updateArgs({ value })}
    />
  );
};
