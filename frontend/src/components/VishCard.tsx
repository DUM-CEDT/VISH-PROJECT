"use client";

import { useState, useEffect, useRef } from "react";
import Lamp from "./svg/Lamp";

interface VishCardProps {
  text: string;
  vish_count: number;
  is_bon: boolean;
  bon_condition: number;
  bon_credit: number;
  bon_vish_target: number;
  distribution?: number;
  is_success?: boolean;
  onClick?: () => void;
}

export default function VishCard({
  text,
  vish_count,
  is_bon,
  bon_condition,
  bon_credit,
  bon_vish_target,
  distribution,
  is_success,
  onClick,
}: VishCardProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isTextClamped, setIsTextClamped] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      const element = textRef.current;
      setIsTextClamped(element.scrollHeight > element.clientHeight);
    }
  }, [text]);

  return (
    <div
      className={`relative bg-transparent text-white text-center overflow-visible ${
        isTextClamped ? "cursor-pointer" : "cursor-default"
      }`}
      style={{ width: "320px", height: "190px" }}
      onClick={isTextClamped ? onClick : undefined}
    >
      <img
        src="/VishCardFrame3.png"
        alt="frame top"
        className="absolute top-0 left-1/2 h-auto"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <img
        src="/VishCardFrame3.png"
        alt="frame bottom"
        className="absolute bottom-0 left-1/2 h-auto"
        style={{ transform: "translate(-50%, 50%) rotate(180deg)" }}
      />
      <img
        src="/VishCardFrame1.png"
        alt="frame left"
        className="absolute left-0 top-0 h-full w-auto"
        style={{ transform: "translateX(-50%)" }}
      />
      <img
        src="/VishCardFrame2.png"
        alt="frame right"
        className="absolute right-0 top-0 h-full w-auto"
        style={{ transform: "translateX(50%)" }}
      />

      <div className="relative z-10 flex flex-col justify-center items-center h-full p-8">
        <p ref={textRef} className="text-lg line-clamp-2">
          {text}
        </p>

        {is_bon && (
          <div className="flex flex-col justify-center items-center mt-4 gap-2">
            {/* ส่วนบน: จำนวนเงินและจำนวนคน */}
            <span className="flex items-center gap-2" style={{ color: "#F9DFA1" }}>
              <Lamp width={24} height={24} />
              {bon_credit} CREDITS / {distribution} PEOPLE
            </span>

            {/* ส่วนล่าง: เงื่อนไขและสถานะ */}
            <span className="text-sm" style={{ color: is_success ? "#A1F9A1" : "#F9A1A1" }}>
              {bon_condition === 1 ? (
                <>
                  TARGET: {bon_vish_target} VISHES -{" "}
                  {is_success ? "SUCCESS" : "IN PROGRESS"}
                </>
              ) : (
                <>{is_success ? "SUCCESS" : "IN PROGRESS"}</>
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}