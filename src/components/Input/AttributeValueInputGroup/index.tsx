import classNames from "classnames";
import AttributeValueDisplay from "./AttributeValueDisplay";
import AttributeValueInputWidget from "./AttributeValueInputWidget";
import {
  AcceptableAttributes,
  AllConfig,
  AttributeValueInputGroupConfig,
} from "./types";

type Props<T> = {
  config: AttributeValueInputGroupConfig<T>;
  selectedField: keyof T;
  onSelectField?: (field: keyof T) => void;
  className?: string;
  value: T;
  onChange: (value: AcceptableAttributes) => void;
};
export default function AttributeValueInputGroup<
  T extends Record<string, AcceptableAttributes>
>({
  config,
  className,
  value,
  onChange,
  selectedField,
  onSelectField,
}: Props<T>) {
  return (
    <div className={classNames("grid grid-cols-6 gap-2", className)}>
      {(Object.entries(config) as [keyof T, AllConfig][]).map(
        ([field, config]) => (
          <AttributeValueDisplay
            value={value[field]}
            key={field.toString()}
            config={config}
            selected={selectedField === field}
            onSelect={() => onSelectField?.(field)}
          />
        )
      )}
      <AttributeValueInputWidget
        key={selectedField.toString()}
        config={config[selectedField]}
        className="col-span-full"
        value={value[selectedField]}
        onChange={onChange}
      />
    </div>
  );
}
