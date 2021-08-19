export function defineInnerProp<T>(object:T, innerObjectKey: keyof(T), defineAs: [] | {}) {
  if(!object[`${innerObjectKey}`]) { object[`${innerObjectKey}`] = defineAs }
}