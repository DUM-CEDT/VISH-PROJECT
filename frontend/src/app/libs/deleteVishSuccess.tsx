"use server";

export default async function deleteVish(token: string, vish_id: string) {
  const BACKEND_URL = process.env.BACKEND_URL;

  const response = await fetch(`${BACKEND_URL}/api/vish/deletevish`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ vish_id}), 
  });

  if (!response.ok) {
    throw new Error("Failed to delete Vish");
  }

  return await response.json();
}