import { format } from 'date-fns';
import { ExportProgress } from 'dexie-export-import/dist/export';
import { ImportProgress } from 'dexie-export-import/dist/import';
import React, { useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { confirmationAtom } from '../../atoms/ConfirmationAtom';
import { downloadBlob, exportDatabase, importDatabase } from '../../domain/ImportExport';
import { MarcoNutrition } from '../../types/Nutrition';
import Button, { ButtonStyle } from '../Input/Button';
import ProgressBar from '../ProgressBar';
import Section from '../Section';

export default function ExportImportSection() {
  const [progress, setProgress] = useState(0);
  const setConfimationConfig = useSetRecoilState(confirmationAtom);
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
    },
    async (blob: Blob) => {
      const fileName = `TOP-Nutrition-App-export-${format(
        Date.now(),
        "yyyy-MM-dd-HH-mm"
      )}.json`;
      downloadBlob(blob, fileName);
    }
    );
  };

  const importFile: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    alert("importing file");
    const file = e.target.files?.[0];
    if (!file) return;
    alert("opening file");
    const blob = new Blob([file], { type: 'application/json' });
    setConfimationConfig({
      modalOpened: true,
      description: "This will erase ALL your consumption records. Are you sure to proceed?",
      onConfirm: () => {
        importDatabase(blob, (importProgress) => {
          return updateProgress(importProgress);
        });
      }
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