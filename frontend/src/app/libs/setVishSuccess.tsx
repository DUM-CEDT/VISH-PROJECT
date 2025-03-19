"use server";

export default async function setVishSuccess(token: string, vish_id: string) {
  const BACKEND_URL = process.env.BACKEND_URL;

  const response = await fetch(`${BACKEND_URL}/api/vish/setvishsuccess`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ vish_id}), 
  });

  if (!response.ok) {
    throw new Error("Failed to set Vish success status");
  }

  return await response.json();
}