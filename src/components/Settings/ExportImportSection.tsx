import { ExportProgress } from 'dexie-export-import/dist/export';
import { ImportProgress } from 'dexie-export-import/dist/import';
import React, { useRef, useState } from 'react';
import { exportDatabase, importDatabase } from '../../domain/ImportExport';
import { MarcoNutrition } from '../../types/Nutrition';
import Button, { ButtonStyle } from '../Input/Button';
import ProgressBar from '../ProgressBar';
import Section from '../Section';

export default function ExportImportSection() {
  const [progress, setProgress] = useState(0);
  const fileSelectRef = useRef<HTMLInputElement | null>(null);

  const selectImportFile = () => {
    fileSelectRef.current?.click();
  };

  const updateProgress = (importOrExportProgress: ImportProgress | ExportProgress) => {
    if (importOrExportProgress.done) {
      setProgress(0);
    } else {
      setProgress(importOrExportProgress.completedRows / (importOrExportProgress.totalRows ?? 1));
    }
    return true;
  }
  const exportConsumptionDatabase = () => {
    exportDatabase((exportProgress) => {
      return updateProgress(exportProgress);
    });
  };

  const importFile: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const blob = new Blob([file], { type: 'application/json' });
    // TODO: ask for confimration
    await importDatabase(blob, (importProgress) => {
      return updateProgress(importProgress);
    })

  }

  return (
    <Section label="Import / Export database">
      <div className="grid grid-cols-2 py-2">
        <input
          ref={fileSelectRef}
          accept=".json"
          className="hidden"
          type="file"
          onChange={importFile} />
        {!!progress && (
          <ProgressBar
            className="col-span-full h-2"
            data={[{ value: progress, color: MarcoNutrition.carbohydrates, name: 'progress' }]} totalValue={1} />
        )}
        <Button
          onClick={selectImportFile}
          type="button"
          buttonStyle={ButtonStyle.Block}
          icon="file-import"
          className="h-12 gap-1"
          textClassName='child:fill-gray-200'
          text="Import..." />
        <Button
          onClick={exportConsumptionDatabase}
          type="button"
          buttonStyle={ButtonStyle.Clear}
          icon="file-export"
          className="h-12 gap-1"
          text="Export..."
        />
      </div>
    </Section>
  )
}