import { ExportProgress } from "dexie-export-import/dist/export";
import { ImportProgress } from "dexie-export-import/dist/import";

import Dexie from "dexie";

export const downloadBlob = (blob: Blob, fileName: string) => {
  // https://mindsers.blog/post/force-download-using-javascript/
  const anchor = document.createElement("a");
  anchor.href = window.URL.createObjectURL(blob);
  anchor.download = fileName;
  anchor.click();
};

export const exportDatabase =
  (database: Dexie) =>
  async (
    onExportProgress: (progress: ExportProgress) => boolean,
    onComplete: (blob: Blob) => Promise<void>
  ) => {
    const exportedFile = await database.export({
      progressCallback: onExportProgress,
    });
    onComplete(exportedFile);
  };

export const importDatabase =
  (database: Dexie) =>
  async (
    blob: Blob,
    onImportProgress: (progress: ImportProgress) => boolean
  ) => {
    return database.import(blob, {
      progressCallback: onImportProgress,
    });
  };
