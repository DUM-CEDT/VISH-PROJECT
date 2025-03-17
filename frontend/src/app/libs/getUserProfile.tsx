'use server'

import { UserJson } from "../../../interface";

export default async function getUserProfile(token: string): Promise<UserJson> {
  const BACKEND_URL = process.env.BACKEND_URL
  const response = await fetch(
    `${BACKEND_URL}/api/user/me`,
    {
      cache : 'no-store',
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Cannot get user profile");
  }

  return await response.json();
}
