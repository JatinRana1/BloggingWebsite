import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

const access_token = Cookies.get('access_token');

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASEURL || '',
  withCredentials: true
});

api.interceptors.request.use(
  async (config) => {
    if(access_token) {
        config.headers.Authorization = `Bearer ${access_token}`
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;
    if(error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        let { data } = await api.post('/user/refresh_token', {access_token});
        if(data.status){
          originalRequest.headers['Authorization'] = `Bearer ${data.newAccessToken}`;
          return api(originalRequest);
        }
      } catch (error) {
        return Promise.reject(error);
      }

    }
  }
)

//login endpoint
interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginResponse {
  refreshToken: string;
  accessToken: string;
}

export const login = (data: LoginData, headers: object) => {
  return api.post<LoginResponse>('/user/login', data, headers);
} 
