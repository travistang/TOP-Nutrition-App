import { useMemo } from "react";
import NumberUtils from "../utils/Number";

type Props = {
  times: number;
  children: React.ReactNode;
};
export default function Repeat({ times, children }: Props) {
  const repeatingTimes = useMemo(() => Math.max(1, times + 1), [times]);
  return (
    <>
      {NumberUtils.range(repeatingTimes).map((i) => (
        <div className="contents" key={i}>
          {children}
        </div>
      ))}
    </>
  );
}
