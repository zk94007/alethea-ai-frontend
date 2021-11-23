import axios from 'axios';
import { appConfig } from '../config/app';

const APP_PLATFORM = 'web';

const auth = {
  username: appConfig.username,
  password: appConfig.password
};

export const request = axios.create({
  headers: {
    app_platform: APP_PLATFORM,
    app_version: 2
  },
  apiUrl: appConfig.apiUrl,
  timeout: appConfig.defaultTimeout
});

export const request_upload_url = axios.create({
  headers: {
    app_platform: APP_PLATFORM,
    app_version: 2,
  },
  baseURL: appConfig.apiUrl,
  timeout: appConfig.defaultTimeout,
  auth
});

export function setupHttpConfig() {
  axios.defaults.apiUrl = appConfig.apiUrl;
  axios.defaults.timeout = appConfig.defaultTimeout;
  axios.defaults.headers['Content-Type'] = 'application/json';

  // you can add more default values for http requests here
  // axios.defaults.headers["Authorization"] =
  //   "Basic " + btoa("admin:Mx9fncRCaMjIoKhyWmO3JPK5dPS4BgxI");
}
