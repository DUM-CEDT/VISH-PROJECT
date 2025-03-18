'use server'

export default async function downloadYan(
    category : (null | string)[], background : string, image : (null | string)[]
) {
  const BACKEND_URL = process.env.BACKEND_URL
  const response = await ( await fetch(
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
  )).json()

  if (response.success == true) {
    const templateId = response.data._id
    const downloadYan = await ( await (fetch(
        `${BACKEND_URL}/api/yan/template/download/${templateId}`, 
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      ))).json()
    console.log(downloadYan)
//   if (!response.ok) {
//     throw new Error("Failed to Get All Yan");
//   }

//   return await response.json();
    }
}