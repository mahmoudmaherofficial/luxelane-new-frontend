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
  const refreshToken = Cookies.get("refreshToken");
  if (!accessToken && refreshToken) {
    try {
      const newAccessToken = await refreshAccessToken(refreshToken)
      Cookies.set("accessToken", newAccessToken, { expires: 1 / (60 * 24) });
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