import { createLocalStoragePersistenceAtom } from "./utils";

export const LS_SERVER_CONNECTION = "@nutritionApp/server_connection";

export type ServerConnectionConfig = {
  topDwhUrl: string;
};
export const serverConnectionAtom =
  createLocalStoragePersistenceAtom<ServerConnectionConfig>(
    "serverConnection",
    LS_SERVER_CONNECTION,
    {
      topDwhUrl: "",
    }
  );
