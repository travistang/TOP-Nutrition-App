import React from "react";
import TabSelectInput from "../TabSelectInput";
import { InputMode } from "./utils/digitLogic";

type Props = {
  usingMode: InputMode;
  onChangeMode: (mode: InputMode) => void;
};
export default function InputModeToggle({ usingMode, onChangeMode }: Props) {
  return (
    <TabSelectInput
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
