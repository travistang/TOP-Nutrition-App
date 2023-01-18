import React from 'react';
import { MarcoNutrition, MarcoNutritionColor, Nutrition } from '../types/Nutrition';
import ProgressBar from './ProgressBar';

type Props = {
  nutrition: Nutrition;
  className?: string;
}
export default function NutritionRatioBar({ nutrition, className}: Props) {
  const progressBarData = Object.values(MarcoNutrition).map(marco => ({
    value: nutrition[marco],
    color: MarcoNutritionColor[marco],
    name: marco,
  }))
  return (
    <ProgressBar data={progressBarData} className={className} />
  )
}