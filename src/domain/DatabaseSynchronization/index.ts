import Dexie from "dexie";
import ConsumptionDatabase, {
  ConsumptionRecord,
} from "../../database/ConsumptionDatabase";
import ExerciseDatabase, {
  ExerciseSetRecord,
} from "../../database/ExerciseDatabase";
import MeasurementDatabase, {
  MeasurementRecord,
} from "../../database/MeasurementDatabase";
import { FoodContainer } from "../../types/FoodContainer";
import LocalStorage from "../../utils/LocalStorage";
import FoodContainerDatabase from "../../database/FoodContainerDatabase";
import { SynchronizableDatabase } from "../../database/BaseDatabase";

export enum UpdateType {
  Created = "CREATED",
  Removed = "REMOVED",
  Updated = "UPDATED",
}

export type Changes<T> = {
  type: UpdateType;
  data: T;
};

class DatabaseSynchronizer {
  readonly LS_DATABASE_KEY = "@nutritionApp/server_connection";
  readonly databaseMapping: Record<string, SynchronizableDatabase<any>> = {
    consumptionDatabase: ConsumptionDatabase,
    // measurementDatabase: MeasurementDatabase,
    // foodContainerDatabase: FoodContainerDatabase,
    // exerciseDatabase: ExerciseDatabase,
  };

  setRemoteUrl(url: string) {
    LocalStorage.setStore(this.LS_DATABASE_KEY, url);
  }

  get remoteUrl() {
    return LocalStorage.getFromStore(this.LS_DATABASE_KEY) ?? "";
  }

  async reportToRemote<T extends string | object>(
    databaseName: string,
    updateType: UpdateType,
    data: T[]
  ) {
    const url = this.remoteUrl;
    if (!url) return;

    const postBody: Changes<T[]> = {
      data,
      type: updateType,
    };

    const finalUrl = `${url}/${databaseName}`;
    return fetch(finalUrl, {
      method: "post",
      body: JSON.stringify(postBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async synchronizeWithRemote() {
    const baseUrl = this.remoteUrl;
    if (!baseUrl) return;
    await Promise.all(
      Object.values(this.databaseMapping).map((db) =>
        db.synchronizeWithRemote(baseUrl)
      )
    );
  }
}

export default new DatabaseSynchronizer();
