import React, { useState } from 'react';
import CreateRecordModal from './components/CreateRecordModal';
import Fab from './components/Fab';
import Header from './components/Header';

function App() {
  const [creatingRecord, setCreatingRecord] = useState(false);
  return (
    <div className="page bg-gray-200">
      <Header />
      {!creatingRecord && (
          <Fab icon="pen" onClick={() => setCreatingRecord(true)} />
      )}
      <CreateRecordModal onClose={() => setCreatingRecord(false)} opened={creatingRecord} />
    </div>
  );
}

export default App;
