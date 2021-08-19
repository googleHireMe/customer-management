export function defaultPropertyMapper<T>(item: T, key: keyof (T)): T[keyof(T)] { 
  return item[key];
}