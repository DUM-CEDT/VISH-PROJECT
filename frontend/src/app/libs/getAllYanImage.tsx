'use server'

export default async function getAllYanImage(
) {
  const BACKEND_URL = process.env.BACKEND_URL
  const response = await fetch(
    `${BACKEND_URL}/api/yan/image`,
    {
      cache : 'force-cache',
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next : {'revalidate' : 3600}
    }
  );

  if (!response.ok) {
    throw new Error("Failed to Get All Yan");
  }

  return await response.json();
}
