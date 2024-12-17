import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASEURL || '',
  withCredentials: true
});

api.interceptors.request.use(
  async (config) => {
    const token = Cookies.get('access_token');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
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
        const { data } = await api.post('/user/refresh_token', {}, {withCredentials: true});
        Cookies.set('access_token', data.newAccessToken);

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
  token: string
}

export const login = (data: LoginData, headers: object) => {
  return api.post<LoginResponse>('/user/login', data, headers);
} 
