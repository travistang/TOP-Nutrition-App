import { IconProp } from "@fortawesome/fontawesome-svg-core";

export enum InputWidget {
  DigitPad = "digit-pad",
  Ticker = "ticker",
  Datetime = "datetime",
  ToggleSelect = "toggle-select",
}

export type TickerInputConfig = {
  widget: InputWidget.Ticker;
  className?: string;
  min?: number;
  max?: number;
  unit?: string;
  integer?: boolean;
  step?: number;
  label: string;
};

export type DigitPadInputConfig = {
  widget: InputWidget.DigitPad;
  className?: string;
  integer?: boolean;
  unit?: string;
  label: string;
};

export type DatetimeInputConfig = {
  widget: InputWidget.Datetime;
  className?: string;
  label: string;
  nullable?: boolean;
};

type ToggleConfigOption = { label: string; icon: IconProp; value: string };
export type ToggleConfig = {
  widget: InputWidget.ToggleSelect;
  className?: string;
  label: string;
  options: ToggleConfigOption[];
};

export type InputConfig =
  | TickerInputConfig
  | DigitPadInputConfig
  | ToggleConfig
  | DatetimeInputConfig;

export type AttributeValueInputGroupConfig<T> = Record<keyof T, InputConfig>;

export type AcceptableAttributes = string | number | null;
