'use server'

export default async function downloadYanWithSession(
  yanId : number,
  token : string
) {
  const BACKEND_URL = process.env.BACKEND_URL;

  const response = await fetch(
    `${BACKEND_URL}/api/yan/template/download/${yanId}`,
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