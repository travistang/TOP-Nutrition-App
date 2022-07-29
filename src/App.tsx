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
          </Routes>
          <MainFabButton />
          <FabMenu />
          <CreateRecordModal />
          <DailyNutritionGoalModal />
          <SplitMealModal />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
