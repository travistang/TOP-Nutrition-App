import React from "react";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "@sentry/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CreateRecordModal from "./components/CreateRecordModal";
import DailyNutritionGoalModal from "./components/DailyNutritionGoalModal";
import Header from "./components/Header";
import SplitMealModal from "./components/SplitMealModal";
import ConsumptionSummary from "./pages/ConsumptionSummary";
import PreviousStatistics from "./pages/PreviousStatistics";
import FabMenu from "./components/FabMenu";
import MainFabButton from "./components/FabMenu/MainFabButton";
import CreateExerciseSetModal from "./components/CreateExerciseSetModal";
import Footer from "./components/Footer";
import WorkoutListPage from "./pages/WorkoutListPage";
import WorkoutStatistics from "./pages/WorkoutStatistics";
import CreateMeasurementRecordModal from "./components/CreateMeasurementRecordModal";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter basename="/TOP-Nutrition-App">
        <div className="page bg-gray-200">
          <Toaster />
          <Header />
          <Routes>
            <Route path="/" element={<ConsumptionSummary />} />
            <Route path="/stats" element={<PreviousStatistics />} />
            <Route path="/stats/workouts" element={<WorkoutStatistics />} />
            <Route path="/workouts" element={<WorkoutListPage />} />
          </Routes>
          <MainFabButton />
          <FabMenu />
          <CreateRecordModal />
          <DailyNutritionGoalModal />
          <CreateExerciseSetModal />
          <CreateMeasurementRecordModal />
          <SplitMealModal />
          <Footer />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
