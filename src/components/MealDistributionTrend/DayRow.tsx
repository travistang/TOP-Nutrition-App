import React from 'react';
import classNames from 'classnames';
import ArrayUtils from '../../utils/Array';

type Props = {
  data?: boolean[];
  intervalCount: number;
};
export default function DayRow({ intervalCount, data }: Props) {
  const usingData = data ?? ArrayUtils.range(intervalCount).map(_ => false);
  return (
    <div className="flex flex-col flex-nowrap flex-1 items-stretch">
      {usingData.map((hasDataInInterval, index) => (
          <div
            key={`${hasDataInInterval}-${index}`}
          className={classNames(
            "h-8 flex-1 flex-shrink-0 border-gray-400 border-opacity-50",
            hasDataInInterval ? "bg-highlight" : '',
          )}
          />
      ))}
    </div>
  );
}