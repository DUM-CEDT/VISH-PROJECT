'use server'

export default async function calculateYanLayer(
  scores : number[]
) {
  const BACKEND_URL = process.env.BACKEND_URL
  const response = await fetch(
    `${BACKEND_URL}/api/yan/template/calculate-yan-layers`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        scores: scores,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to Log-In");
  }

  return await response.json();
}
