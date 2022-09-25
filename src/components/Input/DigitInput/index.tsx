import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import useInitialValue from "../../../hooks/useInitialValue";
import Tab from "../../Tab";
import TabSelectInput from "../TabSelectInput";
import InputModeToggle from "./InputModeToggle";
import Keypad from "./Keypad";
import {
  addDigit,
  removeDigit,
  numberToString,
  stringToNumber,
  displayValue,
  InputMode,
} from "./utils/digitLogic";

type Props = {
  defaultValue: number;
  onChange: (newValue: number) => void;
  unit?: string;
  className?: string;
  inputMode?: InputMode;
};

export default function DigitInput({
  inputMode,
  defaultValue,
  onChange,
  className,
  unit,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [digitString, setDigitString] = useState("");
  const initialValue = useInitialValue(defaultValue);
  const [usingMode, setUsingMode] = useState<InputMode>(
    inputMode ?? InputMode.Decimal
  );

  const canChangeMode = inputMode === undefined;

  useEffect(() => {
    if (initialValue !== null) {
      setDigitString(numberToString(initialValue, usingMode));
    }
  }, [initialValue, usingMode]);

  const inputDigit = (n: number) => {
    const newString = addDigit(digitString, n);
    setDigitString(newString);
    onChange(stringToNumber(newString, usingMode));
  };

  const deleteDigit = () => {
    const newString = removeDigit(digitString);
    setDigitString(newString);
    onChange(stringToNumber(newString, usingMode));
  };

  return (
    <div className={classNames("flex flex-col items-stretch gap-2", className)}>
      <div className="flex flex-row flex-nowrap items-center gap-4">
        {canChangeMode && (
          <InputModeToggle onChangeMode={setUsingMode} usingMode={usingMode} />
        )}
        <div
          onClick={() => inputRef.current?.focus()}
          className={classNames("rounded-lg p-2 flex flex-nowrap flex-1")}
        >
          <span className="text-4xl flex-1 text-right">
            {displayValue(digitString, usingMode)}
          </span>
        </div>
        {unit && <span className="text-2xl self-end">{unit}</span>}
      </div>
      <Keypad onDigitInput={inputDigit} onBackspace={deleteDigit} />
    </div>
  );
}
