'use server'

export default async function userLogIn(
  userEmail: string,
  userPassword: string
) {
  const BACKEND_URL = process.env.BACKEND_URL
  const response = await fetch(
    `${BACKEND_URL}/api/user/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to Log-In");
  }

  return await response.json();
}
