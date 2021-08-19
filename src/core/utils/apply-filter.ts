export function applyFilter<T>(list: T[], filterByPropsList: Array<keyof(T)>, filter: string) {
  if (!filter) { return list; }
  filter = filter.toLowerCase()
  return list.filter((item) => filterByPropsList.some(filterByProp => item[`${filterByProp}`]?.toString().toLowerCase().includes(filter)));
}