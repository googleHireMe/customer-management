import axios from "axios";
import store from "../../store/store";
import { finishLoading, startLoading } from "../../UI/BackdropLoader/loaderSlice";
import { baseUrl } from '../consts/consts';

const baseAxios = axios.create({
  baseURL: baseUrl,
});

baseAxios.interceptors.request.use(requestConfig => {
  store.dispatch(startLoading())
  return requestConfig;
}, error => {
  store.dispatch(finishLoading())
  return Promise.reject(error);
});

baseAxios.interceptors.response.use(response => {
  store.dispatch(finishLoading())
  return response;
}, error => {
  store.dispatch(finishLoading())
  return Promise.reject(error);
});

export default baseAxios;