import type { Meta } from "@storybook/react";
import { useState } from "react";
import AttributeValueDisplay from ".";
import { InputWidget } from "../types";

const meta: Meta<typeof AttributeValueDisplay> = {
  title: "Input/AttributeValueGroup/AttributeValueDisplay",
  component: AttributeValueDisplay,
};

export default meta;

export const Number = () => {
  const [selected, setSelected] = useState(false);
  return (
    <AttributeValueDisplay
      config={{
        widget: InputWidget.Ticker,
        label: "Test value",
      }}
      selected={selected}
      onSelect={() => setSelected(!selected)}
      value={42}
    />
  );
};
export const Integer = () => {
  const [selected, setSelected] = useState(false);
  return (
    <AttributeValueDisplay
      config={{
        widget: InputWidget.Ticker,
        integer: true,
        label: "Test value",
      }}
      selected={selected}
      onSelect={() => setSelected(!selected)}
      value={42}
    />
  );
};

export const Datetime = () => {
  const [selected, setSelected] = useState(false);
  const [date, setDate] = useState<number | null>(null);
  const onToggleSelect = () => {
    const willSelect = !selected;
    setDate(willSelect ? Date.now() : null);
    setSelected(willSelect);
  };

  return (
    <AttributeValueDisplay
      config={{
        widget: InputWidget.Datetime,
        label: "Test value",
        nullable: true,
      }}
      onSelect={onToggleSelect}
      value={date}
    />
  );
};
