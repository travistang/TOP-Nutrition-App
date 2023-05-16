import React, { useCallback, useState } from "react";
import StatisticsNavigateTab from "../components/StatisticsNavigateTab";
import { Exercise } from "../types/Exercise";

export default function ExerciseDetailPage() {
  const [selectedRecord, setSelectedRecord] = useState<Exercise | null>(null);

  const clearRecord = useCallback(() => setSelectedRecord(null), []);

  return (
    <div className="flex flex-col overflow-y-auto overflow-x-hidden flex-1 items-stretch gap-2 pb-48 scroll-pb-12">
      <StatisticsNavigateTab />
      WIP
    </div>
  );
}
