import { AxiosResponse } from 'axios';
import axios from '../../core/api/baseAxios';
import { NotificationService } from '../../UI/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { AnswerSettings } from '../interfaces/answer-settings';
import { Customer } from '../interfaces/customer';
import { CustomerProfile } from '../interfaces/customer-profile';
import { CustomerProfileListItem } from '../interfaces/customer-profile-list-item';
import { OrderSettings } from '../interfaces/order-settings';
import { ParsingSettings } from '../interfaces/parsing-settings';
import { Pricelist } from '../interfaces/pricelist';

const mapResponse = <T>(response: AxiosResponse<T>) => response.data;
const handleError = (error: Error, notificationMessage?: string) => {
  if (notificationMessage) { NotificationService.error(notificationMessage); }
  throw error;
};
const apiPrefix = '/api/customer-profile';

class CustomerProfilesApi {

  static loadCustomerProfileList = () =>
    axios.get<CustomerProfileListItem[]>(`${apiPrefix}/list`)
      .then(mapResponse)
      .catch(error => handleError(error, 'Ошибка загрузки клиентских профилей'));

  static loadCustomerProfile = (profileId: string) =>
    axios.get<CustomerProfile>(`${apiPrefix}/${profileId}`)
      .then(mapResponse)
      .catch(error => handleError(error, 'Ошибка загрузки клиентского профиля'));

  static loadCustomerList = () =>
    axios.get<Customer[]>(`${apiPrefix}/customer-list`)
      .then(mapResponse);

  static createCustomerProfile = (profile: CustomerProfile) =>
    axios.post<CustomerProfile>(`${apiPrefix}`, profile)
      .then(mapResponse)
      .catch(error => handleError(error, 'Ошибка сохранения клиентского профиля'));

  static updateCustomerProfile = (profile: CustomerProfile) =>
    axios.put<CustomerProfile>(`${apiPrefix}`, profile)
      .then(mapResponse)
      .catch(error => handleError(error, 'Ошибка сохранения клиентского профиля'));

  static deleteCustomerProfile = (profileId: string) =>
    axios.delete<CustomerProfileListItem>(`${apiPrefix}/${profileId}`)
      .then(mapResponse)
      .catch(error => handleError(error, 'Ошибка удаления клиентского профиля'));

  static loadOrderSettings = (profileId: string) =>
    axios.get<OrderSettings>(`${apiPrefix}/order-settings/${profileId}`)
      .then(mapResponse)
      .catch(error => handleError(error, 'Ошибка загрузки настроек заказа'));

  static updateOrderSettings = (profileId: string, orderSettings: OrderSettings) =>
    axios.put<OrderSettings>(`${apiPrefix}/order-settings/${profileId}`, orderSettings)
      .then(mapResponse)
      .catch(error => handleError(error, 'Ошибка сохранения настроек заказа'));

  static loadParsingSettings = (profileId: string) =>
    axios.get<ParsingSettings>(`${apiPrefix}/parsing-settings/${profileId}`)
      .then(mapResponse)
      .catch(error => handleError(error, 'Ошибка загрузки настроек парсинга'));

  static updateParsingSettings = (profileId: string, parsingSettings: ParsingSettings) =>
    axios.put<ParsingSettings>(`${apiPrefix}/parsing-settings/${profileId}`, parsingSettings)
      .then(mapResponse)
      .catch(error => handleError(error, 'Ошибка сохранения настроек парсинга'));

  static loadAnswerSettings = (profileId: string) =>
    axios.get<AnswerSettings>(`${apiPrefix}/answer-settings/${profileId}`)
      .then(mapResponse)
      .catch(error => handleError(error, 'Ошибка загрузки настроек ответа'));

  static updateAnswerSettings = (profileId: string, answerSettings: AnswerSettings) =>
    axios.put<AnswerSettings>(`${apiPrefix}/answer-settings/${profileId}`, answerSettings)
      .then(mapResponse)
      .catch(error => handleError(error, 'Ошибка сохранения настроек ответа'));

  static loadPricelists = (profileId: string) =>
    axios.get<Pricelist[]>(`${apiPrefix}/pricelists-settings/${profileId}`)
      .then(mapResponse)
      .catch(error => handleError(error, 'Ошибка загрузки прайслистов'));

  static updatePricelists = (profileId: string, pricelists: Pricelist[]) =>
    axios.put<Pricelist[]>(`${apiPrefix}/pricelists-settings/${profileId}`, pricelists)
      .then(mapResponse)
      .catch(error => handleError(error, 'Ошибка сохранения прайслистов'));

}

export default CustomerProfilesApi;