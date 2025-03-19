"use server";

import { CreateVishRequest, CreateVishResponse } from "../../../interface";

export async function createVish(vishData: CreateVishRequest, token: string) {
  const BACKEND_URL = process.env.BACKEND_URL;
  const url = `${BACKEND_URL}/api/vish/createVish`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(vishData),
    });

    const data: CreateVishResponse = await response.json();
    return data; // ส่งข้อมูลกลับไปทั้งหมด ไม่ว่าจะสำเร็จหรือไม่
  } catch (error) {
    return {
      success: false,
      msg: "Network error occurred",
    };
  }
}