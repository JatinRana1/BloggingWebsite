import axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASEURL || '',
});

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  userData: {
    id: number;
    email: string;
    name: string;
  }
}

export const login = async (data: LoginData): Promise<LoginResponse> => {
  return ( await api.post<LoginResponse>('login', data)).data;
}
