import ConsumptionDatabase from "../../database/ConsumptionDatabase";
import LocalStorage from "../../utils/LocalStorage";
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
  readonly LS_DATABASE_KEY = "@nutritionApp/remote_sync_url";
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

const databaseSynchronizer = new DatabaseSynchronizer();
export default databaseSynchronizer;
