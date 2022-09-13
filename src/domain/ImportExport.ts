import { useRecoilValue } from "recoil";
import { ExportProgress } from "dexie-export-import/dist/export";
import { ImportProgress } from "dexie-export-import/dist/import";

import { serverConnectionAtom } from "../atoms/ServerConnectionAtom";
import ConsumptionDatabase from "../database/ConsumptionDatabase";

export const downloadBlob = (blob: Blob, fileName: string) => {
  // https://mindsers.blog/post/force-download-using-javascript/
  const anchor = document.createElement("a");
  anchor.href = window.URL.createObjectURL(blob);
  anchor.download = fileName;
  anchor.click();
}

export const exportDatabase = async (
  onExportProgress: (progress: ExportProgress) => boolean,
  onComplete: (blob: Blob) => Promise<void>
) => {
  const exportedFile = await ConsumptionDatabase.export({
    progressCallback: onExportProgress,
  });
  onComplete(exportedFile);
};

export const importDatabase = async (
  blob: Blob,
  onImportProgress: (progress: ImportProgress) => boolean
) => {
  return ConsumptionDatabase.import(blob, {
    progressCallback: onImportProgress,
  });
};

export const useSynchronizeData = () => {
  const connectionConfig = useRecoilValue(serverConnectionAtom);
  return async () => exportDatabase(
    () => true,
    async (blob) => {
      const formData = new FormData();
      formData.append('data', blob);
      fetch(connectionConfig.topDwhUrl, {
        method: 'post',
        body: formData
      });
    },
  );
}