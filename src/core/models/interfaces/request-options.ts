import { RequestMethod } from "../enums/request-method";

export interface RequestOptions<T> {
  url: string;
  method: RequestMethod;
  payload?: T;
  errorMessage?: string;
}