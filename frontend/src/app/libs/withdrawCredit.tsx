"use server";

export default async function withdrawCredit(token: string , credit:number) {
  const BACKEND_URL = process.env.BACKEND_URL;

  const response = await fetch(`${BACKEND_URL}/api/credit/withdraw`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ "amount" : credit }), 
  });

  if (!response.ok) {
    throw new Error("Failed to withdraw");
  }

  return await response.json();
}