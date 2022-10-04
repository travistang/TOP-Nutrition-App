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

export type KeyPaths<T> = T extends object
  ? {
      [K in Exclude<keyof T, number | symbol>]:
        | `${K}`
        | `${K}.${KeyPaths<T[K]>}`;
    }[Exclude<keyof T, number | symbol>]
  : "";

export type AssertKeyPaths<T, Ks> = Ks extends `${infer R}.${infer S}`
  ? R extends keyof T
    ? S extends AssertKeyPaths<T[R], S>
      ? T
      : never
    : never
  : never;

export type DeepValue<T, Ks extends KeyPaths<T> = KeyPaths<T>> = Ks extends ""
  ? T
  : Ks extends keyof T
  ? T[Ks]
  : Ks extends `${infer R}.${infer K}`
  ? R extends keyof T ? K extends KeyPaths<T[R]> ? DeepValue<T[R], K> : never : never : never;
