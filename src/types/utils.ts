export type CreateEditType<T> = T extends { id: string; } ? {
  [K in keyof Omit<T, "id">]: CreateEditType<T[K]>
} & { id?: string; } : T;

export type AllKey<T> = T extends T ? keyof T : never;

export type Modifier<T> = (field: keyof T) => (value: T[typeof field]) => void;
export type Optional<T, Ks extends keyof T> = T extends object ? {
  [K in Exclude<keyof T, Ks>]: T[K]
} & {
  [K in Ks]?: T[K]
}: T;