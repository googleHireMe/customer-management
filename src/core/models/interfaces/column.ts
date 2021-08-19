export interface Column<T = any> {
  headerName?: string;
  propName?: keyof (T);
  displayMapper?: (item: T, key: keyof (T)) => JSX.Element | JSX.Element[] | T[keyof (T)] | any;
  getId?: () => string | number;
}