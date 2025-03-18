'use server'

export default async function getAllMerch(
  page: number = 1,
  limit: number = 9,
  type?: string
) {
  const BACKEND_URL = process.env.BACKEND_URL;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (type) {
    queryParams.append('type', type);
  }

  const response = await fetch(
    `${BACKEND_URL}/api/merchandise/items?${queryParams.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch merchandise items");
  }

  return await response.json();
}