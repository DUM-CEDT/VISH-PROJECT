import React from "react";

interface VishPopupProps {
  text: string;
  onClose: () => void;
}

const VishPopup: React.FC<VishPopupProps> = ({ text, onClose }) => {
  return (
    <>
      {/* Popup กล่องข้อความ */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center">
        <div className="relative flex flex-col border border-white rounded-lg w-[900px] h-[430px] bg-white p-4 shadow-lg">
          
          {/* ปุ่มปิด */}
          <div className="flex justify-end mb-4">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 text-3xl"
            >
              ✕
            </button>
          </div>

          {/* กล่องข้อความ */}
          <div className="border border-black rounded-lg w-full h-[350px] p-6 bg-white">
            <p className="text-gray-800 text-base text-left">{text}</p>
          </div>
        </div>
      </div>

      {/* Overlay แต่ไม่ทำให้ NavBar & Footer โดนเบลอ */}
      <div className="fixed inset-0 bg-[rgba(255,255,255,0.5)] z-[90] pointer-events-none" />
    </>
  );
};

export default VishPopup;
