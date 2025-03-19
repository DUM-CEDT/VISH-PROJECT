"use server";

export default async function getVishStatus(token: string) {
  const BACKEND_URL = process.env.BACKEND_URL;

  const response = await fetch(`${BACKEND_URL}/api/vish/vishstatus`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get vish status");
  }

  return await response.json();
}