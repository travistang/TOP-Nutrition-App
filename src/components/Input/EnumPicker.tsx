import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import { useState } from "react";
import ArrayUtils from "../../utils/Array";
import StringUtils from "../../utils/String";
import Button, { ButtonStyle } from "./Button";
import PickerItem from "./Exercise/PickerItem";

type Props<T extends string> = {
  availableValues: T[];
  values: T[];
  single?: boolean;
  noText?: boolean;
  onChange: (values: T[]) => void;
  iconMapping?: Record<T, IconProp>;
  className?: string;
  label?: string;
};
export default function EnumPicker<T extends string>({
  values,
  onChange,
  single,
  noText,
  availableValues,
  iconMapping,
  className,
  label,
}: Props<T>) {
  const [collapsed, setCollapsed] = useState(false);
  const toggleMode = (value: T) => {
    if (!single) {
      const newSelected = ArrayUtils.toggleElement(values, value);
      onChange(newSelected);
      return;
    }
    onChange([value]);
  };
  return (
    <div
      className={classNames(
        "transition-all duration-300 overflow-y-hidden",
        collapsed ? "max-h-8" : "max-h-[100vh]",
        className
      )}
    >
      {label && (
        <div className="h-8 col-span-full text-xs flex items-center justify-between">
          {label}
          <Button
            buttonStyle={ButtonStyle.Clear}
            icon={collapsed ? "caret-down" : "caret-up"}
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>
      )}
      {availableValues.map((value) => (
        <PickerItem
          className="text-xs h-10"
          selected={values.includes(value)}
          onToggle={() => toggleMode(value)}
          label={noText ? undefined : StringUtils.normalizeSnakeCase(value)}
          key={value.toString()}
          icon={iconMapping?.[value]}
        />
      ))}
    </div>
  );
}
