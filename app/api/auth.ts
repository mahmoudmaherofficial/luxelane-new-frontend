import api from '@/lib/axiosInterseptor';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';
export const refreshToken = async () => {
  try {
    const response = await api.post(
      '/auth/refresh-token',
      {},
      {
        withCredentials: true,
      }
    );

    const { accessToken } = response.data;
    Cookies.set('accessToken', accessToken, { expires: 1 / (60 * 24) });
    return accessToken;
  } catch (err: AxiosError | Error | any) {
    console.error('Refresh token failed:', err instanceof AxiosError ? err.response?.data : err.message);
    return null;
  }
}