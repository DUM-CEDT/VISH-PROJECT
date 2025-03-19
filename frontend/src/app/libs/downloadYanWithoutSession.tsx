'use server'

export default async function downloadYanWithoutSession(
  yanId : number
) {
  const BACKEND_URL = process.env.BACKEND_URL;

  const response = await fetch(
    `${BACKEND_URL}/api/yan/template/download_nosession/${yanId}`,
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

  return response.json();
}