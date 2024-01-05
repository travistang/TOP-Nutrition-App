import classNames from "classnames";

type Props = {
  className?: string;
};
export default function CirclePlaceholder({ className }: Props) {
  return (
    <div
      className={classNames(
        "animate-pulse aspect-square rounded-full",
        className
      )}
    />
  );
}
