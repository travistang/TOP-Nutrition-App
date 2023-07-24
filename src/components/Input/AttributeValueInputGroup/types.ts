export enum InputWidget {
  DigitPad = "digit-pad",
  Ticker = "ticker",
  Datetime = "datetime",
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

export type InputConfig =
  | TickerInputConfig
  | DigitPadInputConfig
  | DatetimeInputConfig;

export type AttributeValueInputGroupConfig<T> = Record<keyof T, InputConfig>;
export type AllConfig = {
  label: string;
  widget: InputWidget;
  className?: string;
  min?: number;
  max?: number;
  unit?: string;
  integer?: boolean;
  nullable?: boolean;
  step?: number;
};

export type AcceptableAttributes = string | number | null;
