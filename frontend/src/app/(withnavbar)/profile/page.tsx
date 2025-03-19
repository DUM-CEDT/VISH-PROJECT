"use client";
import Image from "next/image";
import NotifcationChoice from "@/components/button/NotificationChoice";
import { useState } from "react";
import TransactionBlock from "@/components/TransactionBlock";
import MerchTransactionBlock from "@/components/MerchTransactionBlock";
import YanStarChoice from "@/components/button/YanStarChoice";

interface Transaction {
  amount: number;
  category: string;
  created_at: string;
}

interface MerchTransaction {
  name: string;
  status: string;
  created_at: string;
}

export default function ProfilePage() {
  const [selectedNotificationItem, setSelectedNotificationItem] = useState("เครดิต");
  const [selectedYanStarItem, setSelectedYanStarItem] = useState("ยันต์ของฉัน");

  const handleNotificationSelection = (selected: string) => {
    setSelectedNotificationItem(selected);
  };

  const handleYanStarSelection = (selected: string) => {
    setSelectedYanStarItem(selected);
  };

  const transactionArray: Transaction[] = [
    {
      amount: 500,
      category: "deposit",
      created_at: "2025-03-18T10:00:00Z",
    },
    {
      amount: 200,
      category: "withdraw",
      created_at: "2025-03-17T14:30:00Z",
    },
    {
      amount: 1000,
      category: "reward-bon",
      created_at: "2025-03-16T09:15:00Z",
    },
    {
      amount: 50,
      category: "reward-withdraw",
      created_at: "2025-03-15T16:45:00Z",
    },
    {
      amount: 300,
      category: "buyItems",
      created_at: "2025-03-14T12:00:00Z",
    },
    {
      amount: 150,
      category: "refund",
      created_at: "2025-03-13T08:30:00Z",
    },
    {
      amount: 200,
      category: "bon",
      created_at: "2025-03-12T15:20:00Z",
    },
    {
      amount: 100,
      category: "delete-bon",
      created_at: "2025-03-11T11:10:00Z",
    },
  ];

  const merchTransactionArray: MerchTransaction[] = [
    {
      name: "กำไลข้อมือ YanTra",
      status: "รอจัดส่ง",
      created_at: "2025-03-18T09:00:00Z",
    },
    {
      name: "หมวก YanTra",
      status: "กำลังจัดส่ง",
      created_at: "2025-03-17T14:20:00Z",
    },
    {
      name: "แก้วน้ำ YanTra",
      status: "จัดส่งแล้ว",
      created_at: "2025-03-16T10:30:00Z",
    },
    {
      name: "เสื้อยืด YanTra",
      status: "ยกเลิก",
      created_at: "2025-03-15T16:00:00Z",
    },
    {
      name: "กระเป๋า YanTra",
      status: "รอจัดส่ง",
      created_at: "2025-03-14T08:45:00Z",
    },
    {
      name: "เครื่องประดับ YanTra",
      status: "กำลังจัดส่ง",
      created_at: "2025-03-13T12:15:00Z",
    },
    {
      name: "พวงกุญแจ YanTra",
      status: "จัดส่งแล้ว",
      created_at: "2025-03-12T11:00:00Z",
    },
  ];

  return (
    <div className="mt-[8vh] h-[92vh] p-12 flex gap-12">
      <div className=" w-[40%] flex flex-col justify-between">
        <div>
          <div className="flex items-baseline gap-4 bg-primary">
            <Image
              src="/user.png"
              alt="usericon"
              width={0}
              height={0}
              sizes="100vw"
              className="object-contain w-[48px] opacity-100"
            />
            <div className="text-[28px] font-regular">Username</div>
          </div>
          <div className="mt-1">
            <button className="bg-highlight1 px-4 py-1 text-[16px] text-black rounded-full font-regular">
              เครดิตของคุณ : 100
            </button>
          </div>
        </div>
        <div className="bg-[rgba(255,255,255,0.6)] p-6 h-[80%] rounded-xl">
          <div className="text-black font-regular text-[20px]">
            การแจ้งเตือน
          </div>
          <div className="flex flex-col justify-between mt-2 pb-12 h-full gap-4">
            <NotifcationChoice onSelect={handleNotificationSelection} />
            <div className="h-full flex flex-col gap-4 overflow-y-auto rounded-lg">
            {selectedNotificationItem === "เครดิต" ? (
                transactionArray.map((transaction, index) => (
                  <TransactionBlock
                    key={index}
                    category={transaction.category}
                    amount={transaction.amount}
                    created_at={transaction.created_at}
                  />
                ))
              ) : selectedNotificationItem === "คำสั่งซื้อ" ? (
                merchTransactionArray.map((transaction, index) => (
                  <MerchTransactionBlock
                    key={index}
                    category={transaction.status}
                    name={transaction.name}
                    created_at={transaction.created_at}
                  />
                ))): (
                    <div className="text-black">No items selected</div>
                  )}
              
            </div>
          </div>
        </div>
      </div>
      <div className="w-[60%] border-2 border-white rounded-3xl relative p-4">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-2">
          <YanStarChoice onSelect={handleYanStarSelection}/>
        </div>
        
      </div>
    </div>
  );
}
