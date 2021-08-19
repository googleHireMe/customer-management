export interface PatchObject<T> {
  id?: string | number;
  key: string;
  value: T[keyof (T)];
};