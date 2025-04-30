// lib/refreshToken.ts
import BASE_URL from "@/api/BASE_URL";
import { RefreshTokenResponse } from "@/types";
import axios from "axios";

// Reusable function to refresh access token
export default async function refreshAccessToken(refreshToken: any): Promise<string> {
  try {

    const res = await axios.post(`${BASE_URL}/auth/refresh-token`, { refreshToken });

    const data: RefreshTokenResponse = res.data;

    if (!data.accessToken) {
      throw new Error("No access token returned");
    }

    return data.accessToken;
  } catch (error) {
    throw new Error("Failed to refresh token");
  }
}