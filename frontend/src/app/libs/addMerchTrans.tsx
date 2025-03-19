'use server'

export default async function addMerchTrans(
    postData : any, token : string
) {
    console.log(postData)
  const BACKEND_URL = process.env.BACKEND_URL
  const response = await fetch(
    `${BACKEND_URL}/api/merchandise/transactions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify(postData),
    }
  )
  if (!response.ok) {
    console.log(await response.json())
    throw new Error("Failed to POST");
  }

  return await response.json();
    
}


