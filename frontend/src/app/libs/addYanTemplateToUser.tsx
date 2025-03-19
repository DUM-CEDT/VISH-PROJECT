'use server'

export default async function addYanTemplateToUser(
    token : string, yanId : string
) {
  const BACKEND_URL = process.env.BACKEND_URL
  const response = await fetch(
    `${BACKEND_URL}/api/user/add-yan-template/${yanId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      
    }
  )
  if (!response.ok) {
    throw new Error("Failed to Get All Yan");
  }

  return await response.json();
    
}