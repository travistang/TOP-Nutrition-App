import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import useInitialValue from "../../../hooks/useInitialValue";
import Button, { ButtonStyle } from "../Button";
import InputModeToggle from "./InputModeToggle";
import Keypad, { KeypadConfig } from "./Keypad";
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
  keypadConfig?: KeypadConfig;
};

export default function DigitInput({
  inputMode,
  defaultValue,
  onChange,
  className,
  unit,
  keypadConfig,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [digitString, setDigitString] = useState("");
  const initialValue = useInitialValue(defaultValue);
  const [usingMode, setUsingMode] = useState<InputMode>(
    inputMode ?? InputMode.Integer
  );

  useEffect(() => {
    if (initialValue !== null) {
      setDigitString(numberToString(initialValue, usingMode));
    }
  }, [initialValue, usingMode]);

  const updateValue = (newString: string) => {
    setDigitString(newString);
    onChange(stringToNumber(newString, usingMode));
  };
  const inputDigit = (n: number) => {
    const newString = addDigit(digitString, n);
    updateValue(newString);
  };
  const deleteDigit = () => {
    const newString = removeDigit(digitString);
    updateValue(newString);
  };
  const reset = () => {
    updateValue('');
  };

  const canChangeMode = inputMode === undefined;
  return (
    <div className={classNames("flex flex-col items-stretch gap-2", className)}>
      <div className="flex flex-row flex-nowrap items-center gap-4">
        {canChangeMode && (
          <InputModeToggle className="min-w-[33%]" onChangeMode={setUsingMode} usingMode={usingMode} />
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
        <Button
          icon="delete-left"
          onClick={reset}
          className="ml-2"
          buttonStyle={ButtonStyle.Clear}
        />
      </div>
      <Keypad onDigitInput={inputDigit} onBackspace={deleteDigit} keypadConfig={keypadConfig} />
    </div>
  );
}
