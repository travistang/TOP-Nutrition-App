import { IDatabaseChange } from "dexie-observable/api";
import {
  ApplyRemoteChangesFunction,
  IPersistedContext,
  ISyncProtocol,
  PollContinuation,
  ReactiveContinuation,
} from "dexie-syncable/api";
import { toast } from "react-hot-toast";

import { LS_SERVER_CONNECTION } from "../../atoms/ServerConnectionAtom";
import { ServerConnectionConfig } from "../../atoms/ServerConnectionAtom";

type SyncServerResponse = {
  success: boolean;
  errorMessage: string;
  changes: IDatabaseChange[];
  currentRevision: number;
  needsResync: boolean;
  partial: boolean;
  clientIdentity?: string;
};

export class SyncImplementation implements ISyncProtocol {
  partialsThreshold?: number | undefined;
  readonly POLL_INTERVAL_MS: number;

  constructor(pollIntervalMs = 10000) {
    this.POLL_INTERVAL_MS = pollIntervalMs;
  }

  get remoteServerUrl(): string {
    try {
      const serverConnectionConfig = JSON.parse(
        localStorage.getItem(LS_SERVER_CONNECTION) ?? ""
      ) as ServerConnectionConfig;
      return serverConnectionConfig.topNutritionServiceUrl;
    } catch {
      return "";
    }
  }

  sync(
    context: IPersistedContext,
    url: string,
    options: any,
    baseRevision: any,
    syncedRevision: any,
    changes: IDatabaseChange[],
    partial: boolean,
    applyRemoteChanges: ApplyRemoteChangesFunction,
    onChangesAccepted: () => void,
    onSuccess: (continuation: PollContinuation | ReactiveContinuation) => void,
    onError: (error: any, again?: number | undefined) => void
  ): void {
    if (!url) return;

    const request = {
      clientIdentity: context.clientIdentity ?? null,
      baseRevision,
      partial,
      changes,
      syncedRevision,
    };

    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then((response) => response.json())
      .then((response: SyncServerResponse) => {
        if (!response.success) {
          toast.error("Failed to synchronize with remote server");
          onError("", Infinity);
        }
        if (response.clientIdentity) {
          context.clientIdentity = response.clientIdentity;
        }
        context
          .save()
          .then(() => {
            onChangesAccepted();
            applyRemoteChanges(
              response.changes,
              response.currentRevision,
              response.partial,
              response.needsResync
            );
            onSuccess({ again: this.POLL_INTERVAL_MS });
          })
          .catch((error) => {
            toast.error("Failed to synchronize with remote server");
            onError(error, Infinity);
          });
      })
      .catch((error) => {
        onError(error, this.POLL_INTERVAL_MS);
      });
  }
}
