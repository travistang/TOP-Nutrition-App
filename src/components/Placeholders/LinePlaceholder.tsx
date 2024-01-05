import classNames from "classnames";

type Props = {
  className?: string;
};
export default function LinePlaceholder({ className }: Props) {
  return (
    <div className={classNames("animate-pulse rounded-full", className)} />
  );
}
