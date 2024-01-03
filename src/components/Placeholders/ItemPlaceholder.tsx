import classNames from "classnames";
import CirclePlaceholder from "./CirclePlaceholder";
import LinePlaceholder from "./LinePlaceholder";

export enum ItemPlaceholderType {
  OneLine,
  TwoLines,
  IconWithOneLine,
  IconWithTwoLines,
}

type Props = {
  className?: string;
  type?: ItemPlaceholderType;
};
export default function ItemPlaceholder({
  className,
  type = ItemPlaceholderType.IconWithTwoLines,
}: Props) {
  const noIconType =
    type === ItemPlaceholderType.OneLine ||
    type === ItemPlaceholderType.TwoLines;
  const hasTwoLines =
    type === ItemPlaceholderType.IconWithTwoLines ||
    type === ItemPlaceholderType.TwoLines;
  return (
    <div
      className={classNames("grid grid-cols-6 grid-rows-2 gap-2", className)}
    >
      <CirclePlaceholder
        className={classNames(
          "row-span-full w-full col-span-1 row-start-1",
          noIconType && "hidden"
        )}
      />
      <LinePlaceholder
        className={classNames(
          "h-6 row-start-1 col-end-6",
          noIconType ? "col-start-1" : "col-start-2"
        )}
      />
      <LinePlaceholder
        className={classNames(
          "h-4 w-1/3 row-start-2 col-end-6",
          noIconType ? "col-start-1" : "col-start-2",
          !hasTwoLines && "hidden"
        )}
      />
    </div>
  );
}
