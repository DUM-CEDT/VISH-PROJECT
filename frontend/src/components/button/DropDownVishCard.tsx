"use client";

import React, { useState } from "react";
import DropDownArrow from "../svg/DropDownArrow";

interface DropDownProps {
  options: string[];
  defaultOption?: string;
  onChange?: (value: string) => void;
}

const DropDown: React.FC<DropDownProps> = ({
  options,
  defaultOption = "ตัวเลือก",
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <div className="relative w-[130px]">
      <button
        className={`
          w-full h-[50px]
          bg-[#1E3A8A] hover:bg-[#2B4B9A] active:bg-[#3B5BBA]
          text-white
          border-2 
          border-[#1E3A8A]
          font-regular
          px-3
          rounded-t-lg
          ${isOpen ? "rounded-b-none" : "rounded-b-lg"}
          transition-all duration-300 ease-in-out
          group
          flex items-center justify-between
          focus:outline-none
        `}
        onClick={handleToggle}
      >
        <span className="whitespace-nowrap overflow-hidden text-ellipsis w-[80%] text-[16px] font-regular">
          {selectedOption}
        </span>
        <DropDownArrow
          className="fill-white transition-all duration-300 ease-in-out group-hover:scale-110"
          width="18px"
          height="18px"
        />
      </button>
      {isOpen && (
        <div
          className={`
            absolute w-full
            bg-[#1E3A8A]
            border-2 border-t-0 border-[#1E3A8A]
            rounded-b-lg
            z-10
            -mt-[4px]
            max-h-[150px] // เพิ่มความสูงสูงสุด (ประมาณ 3 รายการ)
            overflow-y-auto // เพิ่ม scrollbar เมื่อเกิน
            scrollbar-thin scrollbar-thumb-[#2B4B9A] scrollbar-track-[#1E3A8A] // ปรับแต่ง scrollbar
          `}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className={`
                text-center px-3 py-2
                text-white text-[16px] font-regular
                hover:bg-[#2B4B9A] active:bg-[#3B5BBA]
                cursor-pointer
                ${index === options.length - 1 ? "rounded-b-lg" : ""}
                transition-all duration-300 ease-in-out
              `}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;