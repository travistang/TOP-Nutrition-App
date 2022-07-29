export type CreateEditType<T> = T extends { id: string; } ? {
  [K in keyof Omit<T, "id">]: CreateEditType<T[K]>
} & { id?: string }: T;