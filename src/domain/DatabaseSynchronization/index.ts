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
  readonly LS_LAST_UPDATE_TIME = "@nutritionApp/last_sync";
  readonly databaseMapping: Record<string, Dexie> = {
    consumptionDatabase: ConsumptionDatabase,
    measurementDatabase: MeasurementDatabase,
    foodContainerDatabase: FoodContainerDatabase,
    exerciseDatabase: ExerciseDatabase,
  };

  setRemoteUrl(url: string) {
    LocalStorage.setStore(this.LS_DATABASE_KEY, url);
  }

  get remoteUrl() {
    return LocalStorage.getFromStore(this.LS_DATABASE_KEY) ?? "";
  }

  get lastUpdateTime() {
    return +LocalStorage.getFromStore(this.LS_LAST_UPDATE_TIME) || 0;
  }

  updateLastUpdateTime() {
    return LocalStorage.setStore(this.LS_LAST_UPDATE_TIME, Date.now());
  }

  async reportToRemote<T>(
    databaseName: string,
    updateType: UpdateType,
    data: T
  ) {
    const url = this.remoteUrl;
    if (!url) return;

    const postBody: Changes<T> = {
      data,
      type: updateType,
    };

    const finalUrl = `url/${databaseName}`;
    return fetch(finalUrl, {
      method: "post",
      body: JSON.stringify(postBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async fetchUpdatesFromRemote() {
    const baseUrl = this.remoteUrl;
    if (!baseUrl) return;
    const url = `${baseUrl}?since=${this.lastUpdateTime}`;
    const response = await fetch(url, {
      method: "get",
    });
    const newData = (await response.json()) as Promise<{
      consumptionDatabase: Changes<ConsumptionRecord>[];
      measurementDatabase: Changes<MeasurementRecord>[];
      foodContainerDatabase: Changes<FoodContainer>[];
      exerciseDatabase: Changes<ExerciseSetRecord>[];
    }>;

    // TODO: insert new data?
    for (const [databaseName, changes] of Object.entries(newData)) {
    }

    this.updateLastUpdateTime();
  }
}

export default new DatabaseSynchronizer();
