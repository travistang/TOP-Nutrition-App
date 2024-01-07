import { withErrorBoundary } from "@sentry/react";
import { useCallback, useState } from "react";
import RecentExerciseRecord from "../components/CreateExerciseSetModal/RecentExerciseRecord";
import ExerciseSearchPanel from "../components/ExerciseDetailPage/ExerciseSearchPanel";
import ExerciseSearchResult from "../components/ExerciseDetailPage/ExerciseSearchResult";
import { Exercise } from "../types/Exercise";

function ExerciseDetailPage() {
  const [selectedRecord, setSelectedRecord] = useState<Exercise | null>(null);
  const clearRecord = useCallback(() => setSelectedRecord(null), []);

  return (
    <div className="flex flex-col overflow-y-auto overflow-x-hidden flex-1 items-stretch gap-2 pb-12 scroll-pb-12">
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

export default withErrorBoundary(ExerciseDetailPage, {
  beforeCapture: (scope) => {
    scope.setTag("component", "ExerciseDetailPage");
  },
});
