export type CreateEditType<T> = T extends { id: string }
  ? {
      [K in keyof Omit<T, "id">]: CreateEditType<T[K]>;
    } & { id?: string }
  : T;

export type AllKey<T> = T extends T ? keyof T : never;

export type Modifier<T> = (field: keyof T) => (value: T[typeof field]) => void;
export type Optional<T, Ks extends keyof T> = T extends object
  ? {
      [K in Exclude<keyof T, Ks>]: T[K];
    } & {
      [K in Ks]?: T[K];
    }
  : T;

export type DropTrailDot<T extends string> = T extends `${infer R}.` ? R : T;
export type KeyPaths<T> = T extends object
  ? {
      [K in Exclude<keyof T, number | symbol>]: DropTrailDot<
        // @ts-ignore
        `${K}` | `${K}.${KeyPaths<T[K]>}`
      >;
    }[Exclude<keyof T, number | symbol>]
  : "";
