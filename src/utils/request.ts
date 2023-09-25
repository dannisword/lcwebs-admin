import axios from "axios";
import * as local from '../utils/use-localStorage';
import router from '../router/index';

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    const token = local.getToken();
    if (token !== null) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data);
  },
  (error) => {
    // router.push("/login");
    console.log(error);
    return Promise.reject(error);
  }
);

export default service;
