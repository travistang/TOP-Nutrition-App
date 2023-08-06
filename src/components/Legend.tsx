import classNames from "classnames";

export enum LegendType {
  Circle = "circle",
  HollowCircle = "hollow-circle",
  Dot = "dot",
}
type Props = {
  legendType?: LegendType;
  className?: string;
  label: string;
  color: string;
};
const LEGEND_TYPE_CLASSNAMES: Record<LegendType, string> = {
  [LegendType.Circle]: "",
  [LegendType.Dot]: "",
  [LegendType.HollowCircle]: "",
};

const getLegendStyles = (type: LegendType, color: string) => {
  switch (type) {
    case LegendType.Dot:
      return {};
    case LegendType.HollowCircle:
      return { border: `1px solid ${color}` };
    case LegendType.Circle:
      return { backgroundColor: color };
  }
};
export default function Legend({
  legendType = LegendType.Circle,
  label,
  color,
  className,
}: Props) {
  return (
    <div className={classNames("flex flex-nowrap gap-2", className)}>
      <div
        className="rounded-full w-4 h-4 flex items-center justify-center"
        style={getLegendStyles(legendType, color)}
      >
        {legendType === LegendType.Dot && (
          <div
            className="rounded-full w-2 h-2"
            style={{ backgroundColor: color }}
          />
        )}
      </div>
      <span className="text-xs capitalize">{label}</span>
    </div>
  );
}
