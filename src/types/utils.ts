export type CreateEditType<T> = T extends { id: string; } ? {
  [K in keyof Omit<T, "id">]: CreateEditType<T[K]>
} & { id?: string; } : T;

export type AllKey<T> = T extends T ? keyof T : never;

export type Modifier<T> = (field: keyof T) => (value: T[typeof field]) => void;