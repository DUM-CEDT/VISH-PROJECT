"use server";

export default async function vishVish(vishId: string, token: string) {
  const BACKEND_URL = process.env.BACKEND_URL;

  const response = await fetch(`${BACKEND_URL}/api/vish/vishvish`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      vish_id: vishId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to vish/unvish");
  }

  return await response.json();
}