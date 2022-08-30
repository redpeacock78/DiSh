/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    timestamp?: number;
  }
  export interface AxiosResponse<T = any> {
    responseTime?: number;
  }
}

const Axios: AxiosInstance = axios.create();
Axios.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    config.timestamp = Date.now();
    return config;
  }
);
Axios.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
  response.responseTime = Date.now() - response.config.timestamp;
  return response;
});

export { AxiosResponse, AxiosError };
export default Axios;
