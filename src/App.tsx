import React from "react";
import { Toaster } from "react-hot-toast";
import { useRecoilState } from "recoil";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CreateRecordModal from './components/CreateRecordModal';
import DailyNutritionGoalModal from './components/DailyNutritionGoalModal';
import Fab from './components/Fab';
import Header from './components/Header';
import SplitMealModal from './components/SplitMealModal';
import ConsumptionSummary from './pages/ConsumptionSummary';
import { DEFAULT_CONSUMPTION } from './types/Consumption';
import { createEditRecordAtom } from "./atoms/CreateEditRecordAtom";
import PreviousStatistics from "./pages/PreviousStatistics";

function App() {
  const [createEditRecord, setCreatEditRecord] =
    useRecoilState(createEditRecordAtom);

  return (
    <BrowserRouter basename="/TOP-Nutrition-App">
      <div className="page bg-gray-200">
        <Toaster />
        <Header />

        <Routes>
          <Route path="/" element={<ConsumptionSummary />} />
          <Route path="/stats" element={<PreviousStatistics />} />
        </Routes>
        {!createEditRecord.modalOpened && (
          <Fab
            icon="pen"
            onClick={() =>
              setCreatEditRecord({
                modalOpened: true,
                record: { ...DEFAULT_CONSUMPTION, date: Date.now() },
              })
            }
          />
        )}
        <CreateRecordModal />
        <DailyNutritionGoalModal />
        <SplitMealModal />

      </div>
    </BrowserRouter>
  );
}

export default App;
