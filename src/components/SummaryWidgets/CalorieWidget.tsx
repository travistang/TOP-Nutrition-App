import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import { MarcoNutrition, MarcoNutritionColor, NutritionCalories } from '../../types/Nutrition';

type Props = {
  caloriesByNutrition: NutritionCalories;
  remainingCalories: number;
}
export default function CalorieWidget({ caloriesByNutrition, remainingCalories}: Props) {

  const doughnutChartData: ChartData<"doughnut", number[], MarcoNutrition | 'Remaining nutrition'> = {
    labels: [...Object.values(MarcoNutrition), 'Remaining nutrition'],
    datasets: [{
      label: 'Daily nutrition',
      data: [...Object.values(MarcoNutrition).map(marco => caloriesByNutrition[marco]), remainingCalories],
      backgroundColor: [...Object.values(MarcoNutrition).map(marco => MarcoNutritionColor[marco]), 'rgb(200, 200, 200)'],
      borderWidth: 0,
      borderRadius: 1,
    }],
  };

  const options = { plugins: { legend: { display: false } } };

  return (
    <div className="relative overflow-hidden w-1/3 self-center">
      <Doughnut data={doughnutChartData} options={options} />
    </div>
  );
}