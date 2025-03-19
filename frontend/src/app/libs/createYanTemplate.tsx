'use server'

export default async function createYanTemplate(
    category : (null | string)[], background : string, image : (null | string)[]
) {
  const BACKEND_URL = process.env.BACKEND_URL
  const response = await fetch(
    `${BACKEND_URL}/api/yan/template`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        category: category,
        background : background,
        image: image,
      }),
    }
  )
  if (!response.ok) {
    throw new Error("Failed to Get All Yan");
  }

  return await response.json();
    
}