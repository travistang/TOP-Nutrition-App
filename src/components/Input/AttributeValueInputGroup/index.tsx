import classNames from "classnames";
import { useState } from "react";
import AttributeValueDisplay from "./AttributeValueDisplay";
import AttributeValueInputWidget from "./AttributeValueInputWidget";

export enum InputWidget {
  DigitPad = "digit-pad",
  Ticker = "ticker",
}

export type InputConfig =
  | {
      widget: InputWidget.Ticker;
      min?: number;
      max?: number;
      unit?: string;
      integer?: boolean;
      step?: number;
      label: string;
    }
  | {
      widget: InputWidget.DigitPad;
      integer?: boolean;
      unit?: string;
      label: string;
    };

export type AttributeValueInputGroupConfig<T> = Record<keyof T, InputConfig>;

type Props<T> = {
  config: AttributeValueInputGroupConfig<T>;
  className?: string;
  value: T;
  onChange: (t: T) => void;
};
export default function AttributeValueInputGroup<
  T extends Record<string, number>
>({ config, className, value, onChange }: Props<T>) {
  const [selectedField, setSelectedField] = useState<keyof T>(
    Object.keys(config)[0] as keyof T
  );

  const onFieldChange = (field: keyof T) => (newValue: number) => {
    onChange({ ...value, [field]: newValue });
  };
  return (
    <div className={classNames("grid grid-cols-6 gap-2", className)}>
      {(Object.entries(config) as [keyof T, InputConfig][]).map(
        ([field, config]) => (
          <AttributeValueDisplay
            key={field.toString()}
            selected={selectedField === field}
            value={value[field as keyof T]}
            onSelect={() => setSelectedField(field as keyof T)}
            label={config.label}
            unit={config.unit ?? ""}
            integer={config.integer}
            className="col-span-3"
          />
        )
      )}
      <AttributeValueInputWidget
        key={selectedField.toString()}
        config={config[selectedField]}
        className="col-span-full"
        value={value[selectedField]}
        onChange={onFieldChange(selectedField)}
      />
    </div>
  );
}
