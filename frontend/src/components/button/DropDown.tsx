"use client";

import { useState } from "react";
import DropDownArrow from "../svg/DropDownArrow";

export default function DropDown({
  options,
  size,
  default: defaultOption,
  onChange,
}: {
  options: string[];
  size: string;
  default: string;
  onChange?: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption); // Use the default prop

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false); // Close dropdown after selection
    if (onChange) {
        onChange(option); // Notify parent of the selected option
    }
  };

  return (
    <div className="relative w-full">
      <button
        className={`
          w-full
          bg-white hover:bg-secondary active:bg-primary
          text-black hover:text-white
          border-2 
          border-white
          font-regular
          py-2 px-8
          rounded-2xl
          shadow-[-2px_-2px_10px_rgba(250,250,250,0.5),4px_4px_10px_rgba(62,92,152,0.3)]
          transition-all duration-300 ease-in-out
          group
          flex items-center justify-between
          focus:outline-none
        `}
        style={{ fontSize: size }} // Use the size prop
        onClick={handleToggle}
      >
        <span className="whitespace-nowrap overflow-hidden text-ellipsis w-[80%]">
          {selectedOption}
        </span>
        <DropDownArrow
          className="fill-black transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:fill-white"
          width={size}
          height={size}
        />
      </button>

      {isOpen && (
        <div className="absolute w-full mt-2 bg-white border-2 border-white rounded-2xl shadow-[-2px_-2px_10px_rgba(250,250,250,0.5),4px_4px_10px_rgba(62,92,152,0.3)] z-10">
          {options.map((option, index) => (
            <div
              key={index}
              className="text-center px-8 py-2 text-black font-regular hover:bg-secondary hover:text-white active:bg-primary cursor-pointer rounded-2xl transition-all duration-300 ease-in-out"
              style={{ fontSize: size }} // Apply size to dropdown items
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}