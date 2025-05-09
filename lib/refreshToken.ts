// lib/refreshToken.ts
import { RefreshTokenResponse } from "@/types";
import axios from "axios";

// Reusable function to refresh access token
export default async function refreshAccessToken(): Promise<string | undefined> {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {}, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    const { accessToken }: RefreshTokenResponse = res.data;

    // if (!accessToken) {
    //   throw new Error("No access token returned");
    // }

    return accessToken;
  } catch (error: any) {
    if (error.response.status === 403) {
      throw new Error("Unauthorized");
    }
    throw new Error("Failed to refresh token");
  }
}