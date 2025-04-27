//lib/refreshToken.ts
import { RefreshTokenResponse } from "@/types";

// Reusable function to refresh access token
export default async function refreshAccessToken(refreshToken:any): Promise<string> {
  try {
    const res = await fetch("http://localhost:5000/api/auth/refresh-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ refreshToken }),
    });

    const data: RefreshTokenResponse = await res.json();

    if (!data.accessToken) {
      throw new Error("No access token returned");
    }

    return data.accessToken;
  } catch (error) {
    throw new Error("Failed to refresh token");
  }
}