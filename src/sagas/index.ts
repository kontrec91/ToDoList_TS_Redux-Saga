import axios, { AxiosRequestConfig } from "axios";
import { config } from "dotenv";

import { baseUrl } from "../constants/constants";

const $api = axios.create({
  baseURL: baseUrl,
});

$api.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem("authToken")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        // const response = await axios.get<authResponse>(`${baseUrl}/refresh`)
        const response = await axios.post(`${baseUrl}/refresh`);
        console.log("response when tokens were refreshed", response);
        localStorage.setItem("authToken", response.data.authToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        return $api.request(originalRequest);
      } catch (error) {
        console.log(error);
      }
    }
  }
);

export default $api;
