import { AxiosInstance, AxiosResponse } from 'axios';
import { NotificationService } from '../../UI/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { RequestMethod } from '../models/enums/request-method';
import { RequestOptions } from '../models/interfaces/request-options';
import axios from './baseAxios';


class GenericHttpClient {
  private readonly requestMethodsMap: Map<RequestMethod, AxiosInstance['get']> = new Map()
    .set(RequestMethod.Get, axios.get)
    .set(RequestMethod.Post, axios.post)
    .set(RequestMethod.Put, axios.put)
    .set(RequestMethod.Delete, axios.delete);

  async get<T, R = T>(url: string, errorMessage?: string) {
    const method = RequestMethod.Get;
    return this.sendRequest<T, R>({ url, errorMessage, method });
  }

  async post<T, R = T>(url: string, payload: T, errorMessage?: string) {
    const method = RequestMethod.Post;
    return this.sendRequest<T, R>({ url, payload, errorMessage, method });
  }

  async put<T, R = T>(url: string, payload: T, errorMessage?: string) {
    const method = RequestMethod.Put;
    return this.sendRequest<T, R>({ url, payload, errorMessage, method });
  }

  async delete<T, R = T>(url: string, errorMessage?: string) {
    const method = RequestMethod.Delete;
    return this.sendRequest<T, R>({ url, errorMessage, method });
  }

  private async sendRequest<T, R>({ url, method, payload, errorMessage }: RequestOptions<T>): Promise<T> {
    try {
      const requestFn = this.requestMethodsMap.get(method);
      const response = await requestFn<T>(url, payload);
      return response.data;
    } catch (err) {
      if (errorMessage) { NotificationService.error(errorMessage); }
      throw err;
    }
  }
}

export const genericHttpClient = new GenericHttpClient();