import React from "react";
import TabSelectInput from "../TabSelectInput";
import { InputMode } from "./utils/digitLogic";

type Props = {
  usingMode: InputMode;
  onChangeMode: (mode: InputMode) => void;
  className?: string;
};
export default function InputModeToggle({ className, usingMode, onChangeMode }: Props) {
  return (
    <TabSelectInput
      className={className}
      onSelect={onChangeMode}
      selected={usingMode}
      options={[
        { text: "Decimal", value: InputMode.Decimal },
        {
          text: "Integer",
          value: InputMode.Integer,
        },
      ]}
    />
  );
}
