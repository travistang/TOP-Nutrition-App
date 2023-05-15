import { endOfDay, endOfMonth, startOfDay, startOfMonth } from "date-fns";
import Dexie, { Table } from "dexie";
import { v4 as uuid } from "uuid";
import LocalStorageUtils from "../utils/LocalStorage";

export enum QueryTimeRange {
  Month,
  Day,
}

const getTimeRange = (range: QueryTimeRange) => {
  switch (range) {
    case QueryTimeRange.Day:
      return [startOfDay, endOfDay] as const;
    case QueryTimeRange.Month:
      return [startOfMonth, endOfMonth] as const;
  }
};
export default abstract class BaseDatabase<T> extends Dexie {
  getRecords(
    table: Table<T>,
    { date = Date.now(), dateField = "date", timeRange = QueryTimeRange.Month }
  ) {
    const [getStartTime, getEndTime] = getTimeRange(timeRange);
    const start = getStartTime(date);
    const end = getEndTime(date);

    return table
      .where(dateField)
      .between(start.getTime(), end.getTime())
      .sortBy(dateField);
  }

  abstract search(searchString: string): Promise<T[]>;
}

export type Changes<T> = {
  id: string;
  type: "updated" | "deleted" | "created";
  data: T;
  time: number;
};

export abstract class SynchronizableDatabase<
  T extends { id: string }
> extends Dexie {
  changes!: Table<Changes<T>>;
  abstract readonly LS_LAST_SYNC_AT_KEY: string;

  get changeDatabaseSchema() {
    return {
      changes: "++id,type,data,time",
    };
  }

  get lastSyncedAt() {
    return +LocalStorageUtils.getFromStore(this.LS_LAST_SYNC_AT_KEY) || 0;
  }

  set lastSyncedAt(time: number) {
    LocalStorageUtils.setStore(this.LS_LAST_SYNC_AT_KEY, time);
  }

  abstract get tableToSync(): Table<T>;

  async getUnsynchronizedChanges() {
    return this.changes
      .filter((change) => change.time >= this.lastSyncedAt)
      .toArray();
  }

  protected async registerChange(type: Changes<T>["type"], data: T) {
    const id = uuid();
    await this.changes.add({
      time: Date.now(),
      type,
      data,
      id,
    });
  }

  async applyChange(change: Changes<T>): Promise<boolean> {
    try {
      switch (change.type) {
        case "deleted":
          await this.tableToSync.delete(change.data.id);
          break;
        case "created":
          await this.tableToSync.add(change.data, change.data.id);
          break;
        case "updated":
          await this.tableToSync.update(change.data.id, change.data);
          break;
      }
      return true;
    } catch {
      return false;
    }
  }

  private async clearPendingChanges() {
    return this.changes.clear();
  }

  async synchronizeWithRemote(remoteUrl: string) {
    const url = `${remoteUrl}?since=${this.lastSyncedAt}`;
    const unsyncedLocalChanges = await this.getUnsynchronizedChanges();
    const response = await fetch(url, {
      method: "post",
      body: JSON.stringify(unsyncedLocalChanges),
    });
    const newData: Changes<T>[] = await response.json();
    const allUpdated = await Promise.all(
      newData.map((change) => this.applyChange(change))
    );

    if (allUpdated.every((flag) => !!flag)) {
      // TODO: maybe there are some delays between the operations above and there maybe changes in between
      this.lastSyncedAt = Date.now();
      await this.clearPendingChanges();
    }
  }
}
