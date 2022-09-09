import React from 'react';
import NumberUtils from '../../utils/Number';

export type RingConfig = { color: string, value: number; }[];
type Props = {
  ringConfig: RingConfig;
}
export default function Ring({ ringConfig }: Props) {
  const allValues = NumberUtils.sum(...ringConfig.map(config => config.value));
  const backgroundStyle = ringConfig.reduce((
    [styleString, percentage], ring
  ) => {
    const { value, color } = ring;
    const newPercentage = percentage + value / allValues;
    const newStyleString = styleString +
      `${styleString ? ',' : ''}conic-gradient(transparent, ${percentage}turn, transparent, ${percentage}turn, ${color}, ${newPercentage}turn, ${color}, ${newPercentage}turn, transparent)`;
    return [
      newStyleString,
      newPercentage
    ] as [string, number];
  }, ["", 0] as [string, number]);
  return (
    <div className="rounded-full absolute bg-transparent inset-0 -z-10 flex items-center justify-center" style={{
      background: backgroundStyle[0],
    }}>
      <div className="rounded-full bg-gray-200 w-[80%] h-[80%]" />
    </div>
  )
}