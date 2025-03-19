"use client";
import depositCredit from "@/app/libs/depositCredit";
import Button1 from "@/components/button/Button1";
import { getSession } from "next-auth/react";
import { useState } from "react";

export default function DepositPage() {
  const [cnt, setCnt] = useState(100);
  const [loading,setLoading] = useState(false);
  const [message,setMessage] = useState<string|null>(null);

  const handleDeposit = async () => {
    try {
      setLoading(true);
      setMessage(null);

      // Get session and token
      const session = await getSession();
      const token = session?.user.token; // Adjust based on your session structure
      if (!token) throw new Error("กรุณาเข้าสู่ระบบก่อนทำการฝากเครดิต");

      // Call the deposit server action
      const response = await depositCredit(token, cnt);

      // Handle success
      setMessage("ฝากเครดิตสำเร็จ! จำนวน: " + cnt + " เครดิต");
    } catch (error: any) {
      // Handle error
      setMessage("เกิดข้อผิดพลาด: " + (error.message || "ไม่สามารถฝากเครดิตได้"));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-[8vh] w-[100vw] h-[92vh] flex flex-col gap-4 justify-center items-center">
      <div className="font-light text-[28px]">ขั้นตอนที่ 1</div>
      <div className="font-regular text-[28px] mb-8">ระบุจำนวนเครดิต</div>
      <div className="mb-8">
        <div className="flex items-end">
          <h3>ระบุจำนวนเครดิตที่ต้องการฝาก</h3>
        </div>
        <input
          min="1"
          value={cnt}
          onChange={(e) => setCnt(Number(e.target.value))}
          type="number"
          name="cnt"
          className="bg-white text-black px-4 py-2 rounded-lg min-w-[350px]"
        />
        <h4 className="font-light ">อัตรา 1 บาทต่อ 1 เครดิต</h4>
      </div>
      {message && (
        <div
          className={`text-[20px] ${
            message.includes("สำเร็จ") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </div>
      )}
      <Button1
        text={loading ? "กำลังดำเนินการ..." : "เติมเครดิต"}
        size={20}
        onClick={handleDeposit}
      />
    </div>
  );
}
