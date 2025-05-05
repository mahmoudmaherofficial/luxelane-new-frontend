// lib/refreshToken.ts
import BASE_URL from "@/api/BASE_URL";
import { RefreshTokenResponse } from "@/types";
import axios, { AxiosError } from "axios";

// Reusable function to refresh access token
export default async function refreshAccessToken(): Promise<string | undefined> {
  try {
    const res = await axios.post(`${BASE_URL}/auth/refresh-token`, {}, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    console.log('res', res);

    const { accessToken }: RefreshTokenResponse = res.data;

    // if (!accessToken) {
    //   throw new Error("No access token returned");
    // }

    return accessToken;
  } catch (error:AxiosError | any) {
    if (error.response.status === 403) {
      throw new Error("Unauthorized");
    }
    throw new Error("Failed to refresh token");
  }
}