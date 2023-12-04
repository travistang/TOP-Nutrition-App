import { ErrorBoundary } from "@sentry/react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import useDatabaseSynchronization from "./domain/DatabaseSynchronization/hooks";

import ConfirmationModal from "./components/ConfirmationModal";
import CreateExerciseSetModal from "./components/CreateExerciseSetModal";
import CreateMeasurementRecordModal from "./components/CreateMeasurementRecordModal";
import CreateRecordModal from "./components/CreateRecordModal";
import DailyNutritionGoalModal from "./components/DailyNutritionGoalModal";
import FabMenu from "./components/FabMenu";
import MainFabButton from "./components/FabMenu/MainFabButton";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SplitMealModal from "./components/SplitMealModal";

import CreateCardioExerciseRecordModal from "./components/CreateCardioExerciseRecordModal";
import MealPrepModal from "./components/MealPrepModal";
import ExerciseDetailPage from "./pages/ExerciseDetailPage";
import FoodContainerDetailPage from "./pages/FoodContainerDetailPage";
import FoodContainerPage from "./pages/FoodContainerPage";
import FoodDetailPage from "./pages/FoodDetailPage";
import MainPage from "./pages/MainPage";
import MeasurementListPage from "./pages/MeasurementListPage";
import PreviousStatistics from "./pages/PreviousStatistics";
import SettingsPage from "./pages/SettingsPage";
import WorkoutListPage from "./pages/WorkoutListPage";
import WorkoutStatistics from "./pages/WorkoutStatistics";

function App() {
  useDatabaseSynchronization();

  return (
    <ErrorBoundary>
      <BrowserRouter basename="/TOP-Nutrition-App">
        <div className="page bg-gray-200">
          <Toaster />
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/stats" element={<PreviousStatistics />} />
            <Route path="/stats/food" element={<FoodDetailPage />} />
            <Route path="/stats/exercise" element={<ExerciseDetailPage />} />
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
          <CreateCardioExerciseRecordModal />
          <SplitMealModal />
          <MealPrepModal />
          <Footer />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
