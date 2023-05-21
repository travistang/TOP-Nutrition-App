import React, { useState } from "react";
import StatisticsNavigateTab from "../components/StatisticsNavigateTab";
import { Exercise } from "../types/Exercise";
import ExerciseSearchPanel from "../components/ExerciseDetailPage/ExerciseSearchPanel";
import ExerciseSearchResult from "../components/ExerciseDetailPage/ExerciseSearchResult";
import RecentExerciseRecord from "../components/CreateExerciseSetModal/RecentExerciseRecord";

export default function ExerciseDetailPage() {
  const [selectedRecord, setSelectedRecord] = useState<Exercise | null>(null);
  const clearRecord = () => setSelectedRecord(null);

  return (
    <div className="flex flex-col overflow-y-auto overflow-x-hidden flex-1 items-stretch gap-2 pb-48 scroll-pb-12">
      <StatisticsNavigateTab />
      <ExerciseSearchPanel
        onClear={clearRecord}
        onRecordSelected={setSelectedRecord}
      />
      {selectedRecord && <ExerciseSearchResult exercise={selectedRecord} />}
      {selectedRecord && (
        <RecentExerciseRecord inline exerciseName={selectedRecord.name} />
      )}
    </div>
  );
}
