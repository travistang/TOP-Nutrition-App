import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import { createEditRecordAtom } from './atoms/CreateEditRecordAtom';

import CreateRecordModal from './components/CreateRecordModal';
import DailyNutritionGoalModal from './components/DailyNutritionGoalModal';
import Fab from './components/Fab';
import Header from './components/Header';
import ConsumptionSummary from './pages/ConsumptionSummary';
import { DEFAULT_CONSUMPTION } from './types/Consumption';

function App() {
  const [createEditRecord, setCreatEditRecord] = useRecoilState(createEditRecordAtom);

  return (
    <div className="page bg-gray-200">
      <Toaster />
      <Header />
      <ConsumptionSummary />
      {!createEditRecord.modalOpened && (
          <Fab icon="pen" onClick={() => setCreatEditRecord({ modalOpened: true, record: DEFAULT_CONSUMPTION })} />
      )}
      <CreateRecordModal />
      <DailyNutritionGoalModal />
    </div>
  );
}

export default App;
