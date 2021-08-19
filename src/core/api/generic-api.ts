import { genericHttpClient } from "./generic-http-client";

export class GenericApi<T, L = T> {

  constructor(protected _apiPrefix: string) { }

  async loadList(): Promise<L[]> {
    return genericHttpClient.get(`${this._apiPrefix}`);
  }

  async loadById(id: string | number): Promise<T> {
    return genericHttpClient.get(`${this._apiPrefix}/${id}`);
  }

  async create(item: T): Promise<T> {
    return genericHttpClient.post(`${this._apiPrefix}`, item);
  }

  async update(id: string | number, item: T): Promise<T> {
    return genericHttpClient.put(`${this._apiPrefix}/${id}`, item);
  }

  async deleteById(id: string | number): Promise<T> {
    return genericHttpClient.delete(`${this._apiPrefix}/${id}`);
  }
}