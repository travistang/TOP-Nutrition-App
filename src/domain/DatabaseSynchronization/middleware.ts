import Dexie, { DBCore, DBCoreMutateRequest, DBCoreTable } from "dexie";
import DatabaseSynchronization, { UpdateType } from ".";

const createUpdateHandler = async (
  table: DBCoreTable,
  request: Extract<DBCoreMutateRequest, { type: "add" | "put" }>
) => {
  const now = Date.now();
  const updateType =
    request.type === "add" ? UpdateType.Created : UpdateType.Updated;
  const valuesWithTimestamp = request.values.map((value) => ({
    ...value,
    latestVersion: now,
  }));
  return DatabaseSynchronization.reportToRemote(
    table.name,
    updateType,
    valuesWithTimestamp
  )
    .then(() => DatabaseSynchronization.updateLastUpdateTime())
    .catch(() => {})
    .then(() =>
      table.mutate({
        ...request,
        values: valuesWithTimestamp,
      })
    );
};

const deleteHandler = async (
  table: DBCoreTable,
  request: Extract<DBCoreMutateRequest, { type: "delete" }>
) => {
  const now = Date.now();
  const originalValues = await table.getMany({
    trans: request.trans,
    keys: request.keys,
  });
  const valuesWithTimestamp = originalValues.map((value) => ({
    ...value,
    latestVersion: now,
  }));
  return DatabaseSynchronization.reportToRemote(
    table.name,
    UpdateType.Removed,
    valuesWithTimestamp
  )
    .then(() => DatabaseSynchronization.updateLastUpdateTime())
    .catch(() => {})
    .then(() => table.mutate(request));
};

export const installSynchronizeMiddleware = (database: Dexie, name: string) => {
  database.use({
    stack: "dbcore",
    name,
    create: (database) => {
      return {
        ...database,
        table(tableName) {
          const table = database.table(tableName);
          return {
            ...table,
            mutate: async (mutateRequest) => {
              if (mutateRequest.type === "deleteRange") {
                return table.mutate(mutateRequest);
              }
              if (mutateRequest.type === "delete") {
                return deleteHandler(table, mutateRequest);
              }

              return createUpdateHandler(table, mutateRequest);
            },
          };
        },
      };
    },
  });
};
