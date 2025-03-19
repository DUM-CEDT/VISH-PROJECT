'use server'

export default async function getAllVishCategories() {
  const BACKEND_URL = process.env.BACKEND_URL;
  const response = await fetch(
    `${BACKEND_URL}/api/vish/categories`,
    {
      cache: 'no-store',
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get all Vish categories");
  }

  return await response.json();
}
