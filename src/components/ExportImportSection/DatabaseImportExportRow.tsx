import Dexie from "dexie";
import React, { useRef, useState } from "react";

import StringUtils from "../../utils/String";
import { useSetRecoilState } from "recoil";
import { confirmationAtom } from "../../atoms/ConfirmationAtom";
import { ExportProgress } from "dexie-export-import/dist/export";
import { ImportProgress } from "dexie-export-import/dist/import";
import {
  downloadBlob,
  exportDatabase,
  importDatabase,
} from "../../domain/ImportExport";
import { format } from "date-fns";
import ProgressBar from "../ProgressBar";
import { MarcoNutrition } from "../../types/Nutrition";
import Button, { ButtonStyle } from "../Input/Button";

type Props = {
  database: Dexie;
};
export default function DatabaseImportExportRow({ database }: Props) {
  const [progress, setProgress] = useState(0);
  const setConfirmationConfig = useSetRecoilState(confirmationAtom);
  const fileSelectRef = useRef<HTMLInputElement | null>(null);

  const selectImportFile = () => {
    fileSelectRef.current?.click();
  };

  const updateProgress = (
    importOrExportProgress: ImportProgress | ExportProgress
  ) => {
    if (importOrExportProgress.done) {
      setProgress(0);
    } else {
      setProgress(
        importOrExportProgress.completedRows /
          (importOrExportProgress.totalRows ?? 1)
      );
    }
    return true;
  };

  const exportSelectedDatabase = (database: Dexie) => {
    exportDatabase(database)(
      (exportProgress) => {
        return updateProgress(exportProgress);
      },
      async (blob: Blob) => {
        const fileName = `TOP-Nutrition-App-export-${database.name}-${format(
          Date.now(),
          "yyyy-MM-dd-HH-mm"
        )}.json`;
        downloadBlob(blob, fileName);
      }
    );
  };

  const importFile: (
    database: Dexie
  ) => React.ChangeEventHandler<HTMLInputElement> = (database) => async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const blob = new Blob([file], { type: "application/json" });
    setConfirmationConfig({
      modalOpened: true,
      description:
        "This will erase ALL your consumption records. Are you sure to proceed?",
      onConfirm: () => {
        importDatabase(database)(blob, (importProgress) => {
          return updateProgress(importProgress);
        });
      },
    });
  };
  return (
    <>
      <span className="text-xs capitalize font-bold">
        {StringUtils.normalizeCamelCase(database.name)}
      </span>
      <input
        ref={fileSelectRef}
        accept=".json"
        className="hidden"
        type="file"
        onChange={importFile(database)}
      />
      {!!progress && (
        <ProgressBar
          className="col-span-full h-2"
          data={[
            {
              value: progress,
              color: MarcoNutrition.carbohydrates,
              name: "progress",
            },
          ]}
          totalValue={1}
        />
      )}
      <div className="grid grid-cols-2 gap-2 items-center">
        <Button
          onClick={selectImportFile}
          type="button"
          buttonStyle={ButtonStyle.Block}
          icon="file-import"
          className="h-8 gap-1 px-2 text-xs"
          text="Import..."
        />
        <Button
          onClick={() => exportSelectedDatabase(database)}
          type="button"
          buttonStyle={ButtonStyle.Clear}
          icon="file-export"
          className="h-12 gap-1 px-2 text-xs"
          text="Export..."
        />
      </div>
    </>
  );
}
