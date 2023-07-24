import classNames from "classnames";

type Props = {
  className?: string;
  label: string;
  color: string;
};
export default function Legend({ label, color, className }: Props) {
  return (
    <div className={classNames("flex flex-nowrap gap-2", className)}>
      <div
        className="rounded-full w-4 h-4"
        style={{ backgroundColor: color }}
      />
      <span className="text-xs capitalize">{label}</span>
    </div>
  );
}
