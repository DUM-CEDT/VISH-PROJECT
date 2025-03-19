'use server'

import { VishCategoryResponse } from "../../../interface";

export default async function getVishCategoryById(id: string): Promise<VishCategoryResponse> {
  const BACKEND_URL = process.env.BACKEND_URL;
  const response = await fetch(
    `${BACKEND_URL}/api/vish/category/${id}`,
    {
      cache: 'no-store',
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to get Vish category with id: ${id}`);
  }

  return await response.json() as VishCategoryResponse;
}