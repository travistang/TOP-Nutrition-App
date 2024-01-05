import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import { useCallback, useMemo, useState } from "react";
import EmptyNotice from "../EmptyNotice";
import Button, { ButtonStyle } from "../Input/Button";

type RenderProps<V> = {
  item: V;
  index: number;
};
type Props<V> = {
  items: V[];
  loading?: boolean;
  loadingPlaceholder?: React.FC;
  className?: string;
  pageSize?: number;
  emptyMessage?: string;
  emptyIcon?: IconProp;
  children: (renderProps: RenderProps<V>) => React.ReactNode;
};
export default function List<V>({
  className,
  items,
  loading,
  loadingPlaceholder: Placeholder,
  pageSize,
  emptyIcon,
  emptyMessage,
  children: renderer,
}: Props<V>) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = useCallback(() => setExpanded((e) => !e), []);
  const expandable = useMemo(() => !!pageSize, [pageSize]);
  const displayingItems = useMemo(() => {
    if (pageSize && !expanded) {
      return items.slice(pageSize);
    }
    return items;
  }, [pageSize, expanded, items]);
  const isEmpty = useMemo(
    () => displayingItems.length === 0,
    [displayingItems]
  );

  return (
    <div className={classNames("flex flex-col items-stretch gap-2", className)}>
      {displayingItems.map((item, index) => renderer({ item, index }))}
      {loading && Placeholder && <Placeholder />}
      {!loading && isEmpty && (
        <EmptyNotice
          className="text-xs font-bold py-4"
          message={emptyMessage ?? ""}
          icon={emptyIcon}
        />
      )}
      {expandable && (
        <Button
          onClick={toggleExpand}
          buttonStyle={ButtonStyle.Clear}
          icon={expandable ? "arrow-up" : "arrow-down"}
          text={expanded ? "Show less" : "Show more"}
        />
      )}
    </div>
  );
}
