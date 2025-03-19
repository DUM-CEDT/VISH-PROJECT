"use client";

import { useState } from "react";

export default function YanStarChoice({
  onSelect,
}: {
  onSelect?: (selected: string) => void; // Callback to notify parent of selection
}) {
  const [activeItem, setActiveItem] = useState("ยันต์ของฉัน");

  const handleSelect = (item: string) => {
    setActiveItem(item);
    if (onSelect) onSelect(item); // Call the callback with the selected item
  };

  return (
    <div className="flex items-center justify-center bg-white rounded-full p-2 gap-2">
        <button
          onClick={() => handleSelect("ยันต์ของฉัน")}
          className={`px-8 py-2 rounded-full text-[20px] font-regular w-[50%] transition-all duration-300 min-w-[200px] ${
            activeItem === "ยันต์ของฉัน"
              ? "bg-secondary text-white"
              : "bg-transparent text-black"
          } hover:cursor-pointer`}
        >
          ยันต์ของฉัน
        </button>
        <button
          onClick={() => handleSelect("ดวงดาวของฉัน")}
          className={`px-8 py-2 rounded-full text-[20px] font-regular w-[50%] transition-all duration-300 min-w-[200px] ${
            activeItem === "ดวงดาวของฉัน"
              ? "bg-secondary text-white"
              : "bg-transparent text-black"
          } hover:cursor-pointer`}
        >
          ดวงดาวของฉัน
        </button>
    </div>
  );
}