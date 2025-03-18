// lib/getAllVishes.tsx
'use server'

import { VishResponse } from "../../../interface";

export default async function getAllVishes(
  page: number = 0,
  pageSize: number = 24,
  type?: string | null
): Promise<VishResponse> {
  const BACKEND_URL = process.env.BACKEND_URL;

  const queryParams = new URLSearchParams({
    page: page.toString(),
  });

  if (type && (type === 'popular' || type === 'latest')) {
    queryParams.append('type', type);
  }

  const response = await fetch(
    `${BACKEND_URL}/api/vish/getvishes?${queryParams.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch vishes");
  }

  return await response.json() as VishResponse;
}