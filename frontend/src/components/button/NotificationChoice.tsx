"use client";

import { useState } from "react";

export default function NotifcationChoice({
  onSelect,
}: {
  onSelect?: (selected: string) => void; // Callback to notify parent of selection
}) {
  const [activeItem, setActiveItem] = useState("เครดิต");

  const handleSelect = (item: string) => {
    setActiveItem(item);
    if (onSelect) onSelect(item); // Call the callback with the selected item
  };

  return (
    <div className="flex items-center justify-center bg-white rounded-lg p-2 gap-2">
        <button
          onClick={() => handleSelect("เครดิต")}
          className={`px-8 py-2 rounded-lg text-[20px] font-regular w-[50%] transition-all duration-300 ${
            activeItem === "เครดิต"
              ? "bg-secondary text-white"
              : "bg-transparent text-black"
          } hover:cursor-pointer`}
        >
          เครดิต
        </button>
        <button
          onClick={() => handleSelect("คำสั่งซื้อ")}
          className={`px-8 py-2 rounded-lg text-[20px] font-regular w-[50%] transition-all duration-300 ${
            activeItem === "คำสั่งซื้อ"
              ? "bg-secondary text-white"
              : "bg-transparent text-black"
          } hover:cursor-pointer`}
        >
          คำสั่งซื้อ
        </button>
    </div>
  );
}