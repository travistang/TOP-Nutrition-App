import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import Dexie from "dexie";
import "dexie-observable";
import "dexie-syncable";

import { serverConnectionAtom } from "../../atoms/ServerConnectionAtom";
import StringUtils from "../../utils/String";
import ConsumptionDatabase from "../ConsumptionDatabase";
import ExerciseDatabase from "../ExerciseDatabase";
import FoodContainerDatabase from "../FoodContainerDatabase";
import MeasurementDatabase from "../MeasurementDatabase";
import { SyncImplementation } from ".";

const SYNC_PROTOCOL_NAME = "ajax";

Dexie.Syncable.registerSyncProtocol(
  SYNC_PROTOCOL_NAME,
  new SyncImplementation()
);

const synchronizingDatabases: Dexie[] = [
  ConsumptionDatabase,
  ExerciseDatabase,
  FoodContainerDatabase,
  MeasurementDatabase,
];

export default function useSynchronizeDatabase() {
  const connectionConfig = useRecoilValue(serverConnectionAtom);
  useEffect(() => {
    const remoteUrlBase = connectionConfig.topNutritionServiceUrl;
    if (!StringUtils.isUrl(remoteUrlBase)) return;

    synchronizingDatabases.forEach((database) => {
      const databaseSyncUrl = `${remoteUrlBase}/${database.name}`;
      console.log(`Synchronizing ${database.name} with url ${databaseSyncUrl}`);
      database.syncable.connect(SYNC_PROTOCOL_NAME, databaseSyncUrl);
    });
  }, [connectionConfig.topNutritionServiceUrl]);
  return null;
}
