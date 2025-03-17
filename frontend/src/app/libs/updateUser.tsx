"use server";

export default async function updateUser(
  userid: string,
  userName: string,
  userEmail: string,
  token: string
) {
  const BACKEND_URL = process.env.BACKEND_URL;
  const response = await fetch(
    `${BACKEND_URL}/api/user/edit/${userid}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: userName,
        email: userEmail,
      }),
    }
  );

  if (!response.ok) {
    return new Error("Failed to update user");
  }

  return await response.json();
}
