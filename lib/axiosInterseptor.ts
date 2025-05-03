// lib/axiosInterseptor.ts
import axios from "axios";
import Cookies from 'js-cookie';
import refreshAccessToken from "./refreshToken";
import BASE_URL from "@/api/BASE_URL";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) {
    try {
      console.log('refreshing access token');
      const newAccessToken = await refreshAccessToken()
      config.headers.Authorization = `Bearer ${newAccessToken}`;
      return config;
    } catch (error) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    }
  }
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

export default api;