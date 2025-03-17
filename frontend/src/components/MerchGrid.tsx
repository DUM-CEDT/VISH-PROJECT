"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button1 from "./button/Button1";
import { useRouter } from "next/navigation";

export default function MerchGrid({
  items = [],
  loading,
}: {
  items: { name: string; price: number; image?: string , id:string }[];
  loading?: boolean;
}) {

  const router = useRouter(); 

  const handleButtonClick = (id : string) => {
    router.push(`/merchandise/${id}`); 
  };

  if (loading) {
    return <div className="p-4 text-white flex justify-center mb-4">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-16">
      {items.map((item, index) => (
        <div key={index} className={"rounded-2xl border-white border-3 bg-primary p-12"}>
          {item.image && (
            <Image 
                src={item.image
                  ? `data:image/jpeg;base64,${item.image}` 
                  : "/Yan.png" }
                alt={item.name} 
                width={0}
                height={0}
                sizes='100vw'
                className="object-contain w-[100%] opacity-100" 
            />
          )}
            <div className="text-[24px] font-regular text-white mt-8 whitespace-nowrap overflow-hidden text-ellipsis w-[95%]">{item.name}</div>
            <div className="text-[24px] font-regular text-white flex justify-between mt-2"> {item.price} บาท <Button1 size={12} icon="GreaterSign" text="" minWidth="40%" onClick={() => handleButtonClick(item.id)}/>  </div>
          </div>
        
      ))}
    </div>
  );
}
