import React from "react";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "@sentry/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CreateRecordModal from "./components/CreateRecordModal";
import DailyNutritionGoalModal from "./components/DailyNutritionGoalModal";
import Header from "./components/Header";
import SplitMealModal from "./components/SplitMealModal";
import FabMenu from "./components/FabMenu";
import MainFabButton from "./components/FabMenu/MainFabButton";
import CreateExerciseSetModal from "./components/CreateExerciseSetModal";
import Footer from "./components/Footer";
import CreateMeasurementRecordModal from "./components/CreateMeasurementRecordModal";

import ConsumptionSummary from "./pages/ConsumptionSummary";
import PreviousStatistics from "./pages/PreviousStatistics";
import WorkoutListPage from "./pages/WorkoutListPage";
import WorkoutStatistics from "./pages/WorkoutStatistics";
import MeasurementListPage from "./pages/MeasurementListPage";
import SettingsPage from "./pages/SettingsPage";
import ConfirmationModal from "./components/ConfirmationModal";
import FoodContainerPage from "./pages/FoodContainerPage";
import FoodContainerDetailPage from "./pages/FoodContainerDetailPage";

import useSynchronizeDatabase from "./database/synchronize/useSynchronizeDatabase";

function App() {
  useSynchronizeDatabase();

  return (
    <ErrorBoundary>
      <BrowserRouter basename="/TOP-Nutrition-App">
        <div className="page bg-gray-200">
          <Toaster />
          <Header />
          <Routes>
            <Route
              path="/"
              element={<ConsumptionSummary date={new Date()} />}
            />
            <Route path="/stats" element={<PreviousStatistics />} />
            <Route path="/stats/workouts" element={<WorkoutStatistics />} />
            <Route
              path="/stats/measurements"
              element={<MeasurementListPage />}
            />
            <Route path="/workouts" element={<WorkoutListPage />} />
            <Route path="/containers" element={<FoodContainerPage />} />
            <Route
              path="/containers/:containerId"
              element={<FoodContainerDetailPage />}
            />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
          <MainFabButton />
          <FabMenu />
          <ConfirmationModal />
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
