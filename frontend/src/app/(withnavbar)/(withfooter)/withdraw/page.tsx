"use client";
import depositCredit from "@/app/libs/depositCredit";
import getMe from "@/app/libs/getMe";
import withdrawCredit from "@/app/libs/withdrawCredit";
import Button1 from "@/components/button/Button1";
import DropDown from "@/components/button/DropDown";
import DropDownAlignLeft from "@/components/button/DropDownAlignLeft";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function WithDrawPage() {
  const [cnt, setCnt] = useState(100);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [account, setAccount] = useState("888-8-8888-8");
  const [userCredit, setUserCredit] = useState(0);

  const handleWithdraw = async () => {
    try {
      setLoading(true);
      setMessage(null);

      // Validate account
      if (!account || !/^\d{3}-\d{1}-\d{4}-\d{1}$/.test(account)) {
        throw new Error("กรุณาระบุเลขบัญชีให้ถูกต้อง (รูปแบบ: XXX-X-XXXX-X)");
      }

      // Validate credit amount
      if (cnt < 100) {
        throw new Error("ขั้นต่ำการถอน 100 เครดิต");
      }
      if (cnt > userCredit) {
        throw new Error("จำนวนเครดิตที่ต้องการถอนมากเกินไป");
      }

      // Get session and token
      const session = await getSession();
      const token = session?.user.token; // Adjust based on your session structure
      if (!token) throw new Error("กรุณาเข้าสู่ระบบก่อนทำการถอนเครดิต");

      // Call the withdraw server action (replace with your actual function)
      const response = await withdrawCredit(token, cnt);

      // Handle success
      setMessage(
        "ถอนเครดิตสำเร็จ! จำนวน: " +
          cnt +
          " เครดิต เหลือ" +
          (userCredit-cnt) +
          " เครดิต"
      );

      const data = await getMe(token);
      if (data.data.credit) {
        setUserCredit(data.data.credit);
      }
    } catch (error: any) {
      // Handle error
      setMessage(
        "เกิดข้อผิดพลาด: " + (error.message || "ไม่สามารถถอนเครดิตได้")
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCredit = async () => {
      try {
        const session = await getSession();
        const token = session?.user.token;
        if (!token) throw new Error("No token found");
        const data = await getMe(token);
        if (data.data.credit) {
          setUserCredit(data.data.credit);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchCredit();
  }, []);

  return (
    <div className="mt-[8vh] w-[100vw] h-[92vh] flex flex-col gap-4 justify-center items-center">
      <div className="font-light text-[28px]">กรุณาใส่ข้อมูลสำหรับ</div>
      <div className="font-regular text-[28px] mb-8">การถอนเครดิต</div>
      <div className="mb-8 flex flex-col gap-4">
        <div>
          <div>เลือกบัญชีธนาคาร</div>
          <DropDownAlignLeft
            options={["SCB", "TTB", "Krungthai", "Krungsri"]}
            size="16px"
            default="KBank"
          />
        </div>
        <div>
          <h3>ระบุเลขบัญชี</h3>
          <input
            min="1"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            type="text"
            name="account"
            className="bg-white text-black px-4 py-2 rounded-lg min-w-[350px]"
          />
        </div>
        <div>
          <h3>ระบุจำนวนเครดิตที่ต้องการถอน</h3>
          <input
            min="1"
            value={cnt}
            onChange={(e) => setCnt(Number(e.target.value))}
            type="number"
            name="cnt"
            className="bg-white text-black px-4 py-2 rounded-lg min-w-[350px]"
          />
          <h4 className="font-light ">จำนวนเครดิตที่ถอนได้ {userCredit} เครดิต</h4>
        </div>
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
        text={loading ? "กำลังดำเนินการ..." : "ถอนเครดิต"}
        size={20}
        onClick={handleWithdraw}
      />
    </div>
  );
}
