"use client";

import Lamp from "./svg/Lamp";

export default function VishCard({
  text,
  vish_count,
  is_bon,
  bon_condition,
  bon_credit,
  bon_vish_target,
}: {
  text: string;
  vish_count: number;
  is_bon: boolean;
  bon_condition: number;
  bon_credit: number;
  bon_vish_target: number;
}) {
  return (
    <div
      className="relative bg-transparent text-white text-center overflow-visible"
      style={{ position: "relative", width: "320px", height: "190px" }}
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
        <p className="text-lg line-clamp-2">{text}</p>
        <div className="flex justify-center items-center mt-4">
          {is_bon ? (
            bon_condition === 1 ? (
              <span className="flex items-center gap-2" style={{ color: "#F9DFA1" }}>
                <Lamp width={24} height={24} />
                {bon_credit} BATH
              </span>
            ) : (
              <span className="flex items-center gap-2" style={{ color: "#F9DFA1" }}>
                <Lamp width={24} height={24} />
                {bon_vish_target} VISHES
              </span>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}