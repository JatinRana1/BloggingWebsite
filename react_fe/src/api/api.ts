import axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASEURL || '',
});

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string
}

export const login = (data: LoginData, headers: object) => {
  return api.post<LoginResponse>('/user/login', data, headers);
} 
