'use server'

export default async function userLogOut() {
  const BACKEND_URL = process.env.BACKEND_URL
  const response = await fetch(
    `${BACKEND_URL}/api/user/logout`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie: document.cookie, // ส่งคุกกี้ในการร้องขอ
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to Log-Out");
  }

  return await response.json();
}