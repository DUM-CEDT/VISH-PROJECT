// src/components/MerchandiseSelector.tsx
"use client"; // Marks this as a Client Component

import { useState } from "react";

export default function MerchandiseChoice({
  onSelect,
}: {
  onSelect?: (selected: string) => void; // Callback to notify parent of selection
}) {
  // State to track the active merchandise type (default to "home")
  const [activeItem, setActiveItem] = useState("home");

  // Handler to update the active item and notify parent
  const handleSelect = (item: string) => {
    setActiveItem(item);
    if (onSelect) onSelect(item); // Call the callback with the selected item
  };

  // Merchandise options
  const items = [
    { id: "home", label: "หน้าแรก" },
    { id: "yantra", label: "ยันต์" },
    { id: "pray", label: "ขอพร" },
    { id: "shop", label: "ร้านค้า" },
    { id: "howto", label: "วิธีการใช้งาน" },
  ];

  return (
    <div className="flex items-center justify-center bg-gray-700 rounded-full p-2">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => handleSelect(item.id)}
          className={`px-6 py-2 rounded-full text-xl font-regular transition-all duration-300 ${
            activeItem === item.id
              ? "bg-secondary text-white shadow-md"
              : "bg-transparent text-white hover:bg-gray-600"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}