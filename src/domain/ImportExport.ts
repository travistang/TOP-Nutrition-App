import { format } from "date-fns";
import { ExportProgress } from "dexie-export-import/dist/export";
import { ImportProgress } from "dexie-export-import/dist/import";
import ConsumptionDatabase from "../database/ConsumptionDatabase";

export const exportDatabase = async (onExportProgress: (progress: ExportProgress) => boolean) => {
  const exportedFile = await ConsumptionDatabase.export({
    progressCallback: onExportProgress,
  });

  const fileName = `TOP-Nutrition-App-export-${format(
    Date.now(),
    "yyyy-MM-dd-HH-mm"
  )}.json`;

  // https://mindsers.blog/post/force-download-using-javascript/
  const anchor = document.createElement("a");
  anchor.href = window.URL.createObjectURL(exportedFile);
  anchor.download = fileName;
  anchor.click();
};

export const importDatabase = async (
  blob: Blob,
  onImportProgress: (progress: ImportProgress) => boolean
) => {
  return ConsumptionDatabase.import(blob, {
    progressCallback: onImportProgress,
  });
}